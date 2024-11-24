import cv2
import csv
import numpy as np
import time
from insightface.app import FaceAnalysis
from pathlib import Path
import requests
import os
import cloudinary
import cloudinary.uploader
import cloudinary.api
from datetime import datetime
from dotenv import load_dotenv
from flask_cors import CORS
from io import BytesIO
from PIL import Image
from flask import Flask, request, jsonify
from pymongo import MongoClient

load_dotenv()

flask = Flask(__name__)
CORS(flask,supports_credentials=True, origins=["http://localhost:5173","http://localhost:8000"])

app = FaceAnalysis(providers=['CPUExecutionProvider']) 
app.prepare(ctx_id=0, det_size=(640, 640))  

cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

client = MongoClient(os.getenv('MONGODB_URI'))
db = client.acadamix 

output_path= Path("./photos")
current_date = datetime.now().strftime("%Y-%m-%d")

@flask.route('/reg-encode', methods=['POST'])
def regEncoding():
    # Extract Cloudinary image URLs from the request
    cloud_image_links = request.json.get('img', [])
    print("cloud_image_links:", cloud_image_links)

    if not cloud_image_links:
        return jsonify({"error": "No image links provided"}), 400

    # Prepare lists to store results
    downloaded_images = []
    errors = []

    # Download images and store in a list
    for img_url in cloud_image_links:
        try:
            response = requests.get(img_url)
            if response.status_code == 200:
                # Convert the downloaded image to a format usable by OpenCV
                image = np.array(Image.open(BytesIO(response.content)))
                downloaded_images.append((img_url, image))
            else:
                errors.append({"image_url": img_url, "error": "Failed to fetch image"})
        except Exception as e:
            errors.append({"image_url": img_url, "error": str(e)})

    if not downloaded_images:
        return jsonify({
            "errors": errors,
            "encodings": []
        }), 400

    # Compute the average encoding for the downloaded images
    average_encoding = compute_average_encoding_from_images([img[1] for img in downloaded_images])

    # Check if a valid average encoding was computed
    if average_encoding is None:
        return jsonify({
            "errors": errors + [{"error": "No valid face embeddings found in the images."}],
            "encodings": []
        }), 400

    # Return the structured response with the average encoding
    return jsonify({
        "errors": errors,
        "encodings": average_encoding.tolist()
    }), 200

def compute_average_encoding_from_images(images):
    """
    Computes the average face encoding from a list of OpenCV image arrays.
    """
    embeddings = []
    for image in images:
        # Analyze the image and extract faces
        faces = app.get(image)  # Replace with your face detection model/method
        if not faces:
            print("No faces detected in one of the images")
            continue

        # Use the embedding of the first detected face
        embeddings.append(faces[0].embedding)

    # Compute the average embedding if there are any valid embeddings
    if embeddings:
        return np.mean(embeddings, axis=0)
    else:
        return None

@flask.route('/face_recognition',methods=['POST'])
def recognize_faces_in_photos():
    
    current_date = datetime.now().strftime("%Y-%m-%d")
    csv_file = output_path / f"recognized_{current_date}.csv"
    Code = request.form.get('classCode')    
    
    recognized_students = set()    

    students = db.students.find({"classCode": Code})
    
    known_encodings = {}

    for student in students:
        if 'encoding' in student and student['encoding']:  # Ensure 'encoding' exists and is not empty
            if isinstance(student['encoding'], list) and len(student['encoding']) > 0:
                encoding = student['encoding'][0]  # Take the first encoding
                if isinstance(encoding, (list, np.ndarray)):  # Validate that the encoding is array-like
                    if 'username' in student:  # Ensure 'username' exists
                        person_name = student['username']

                        # Store the encoding in the known_faces dictionary
                        known_encodings[person_name] = np.array(encoding)

    # Ensure the data is sent as JSON
    if 'image' not in request.files:
        return jsonify({"error": "No files found in request"}), 400

    # Extract the photo paths
    group_photos = request.files.getlist('image')
    if not group_photos:
        return jsonify({"error": "No photos in the files array"}), 400
    # Process each photo
    for photo_file in group_photos:
        start_time = time.time()
        # Read file content into an OpenCV-compatible format
        file_content = photo_file.read()  # Read the file bytes
        np_arr = np.frombuffer(file_content, np.uint8)
        image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)  # Decode the image

        if image is None:
            print(f"Error reading image: {photo_file.filename}")
            continue

        # Detect faces in the group photo
        faces = app.get(image)  # Assuming `app.get()` detects faces
        if not faces:
            print(f"No faces detected in {photo_file.filename}")
            continue

        for face in faces:
            group_embedding = face.embedding
            matched = False

            # Compare with known encodings
            for person_name, known_embedding in known_encodings.items():
                # Compute cosine similarity
                similarity = np.dot(known_embedding, group_embedding) / (
                    np.linalg.norm(known_embedding) * np.linalg.norm(group_embedding)
                )
                if similarity > 0.6:  # Threshold for match
                    print(f"Match found for {person_name} with similarity {similarity:.2f}")
                    recognized_students.add(person_name)

                    # Annotate the image
                    x1, y1, x2, y2 = face.bbox.astype(int)
                    cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    cv2.putText(
                        image,
                        f"{person_name}: {similarity:.2f}",
                        (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.5,
                        (0, 255, 0),
                        1,
                    )
                    matched = True
                    break

            if not matched:
                print("Face detected but no match found.")

        # Save the annotated image
        end_time = time.time()
        print(f"Time taken for {photo_file}: {end_time - start_time:.2f} seconds")

    # Write recognized names to the CSV file
    with csv_file.open('w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["Name", "Timestamp"])
        timestamp = datetime.now().strftime("%H:%M:%S")
        for student in recognized_students:
            writer.writerow([student, timestamp])

    upload_result = cloudinary.uploader.upload(
    csv_file,
    resource_type="raw",  # Specify "raw" for non-image files
    )
    os.unlink(csv_file)

    filename = os.path.splitext(os.path.basename(csv_file))[0]
    attendance_record = {
    "filename": filename,  
    "attachment": upload_result["secure_url"], 
    "createdAt": datetime.now()
    }        

    update_result=db.classrooms.update_one(
    {"classCode": Code}, {"$push": {"attendance":attendance_record }})

    response = {
            "status": "success",
            "message": "File uploaded and attendance record added successfully.",
        }    
    
    return jsonify(f"Recognition completed. Recognized names saved to {csv_file}")

if __name__ == "__main__":
    flask.run(debug=True,port=5001)
