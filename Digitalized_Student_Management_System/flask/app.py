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

new_path = "./photos"
now = datetime.now()
current_date = now.strftime("%Y-%m-%d")

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


def encode(image):
    if image is None or image.size == 0:
        return jsonify({"error": "Could not decode the image"}), 400
    try:
        # Convert the image to RGB if it's not in that mode
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Convert image to a numpy array
        img_array = np.array(image)

        # Face detection using the CNN model (more accurate but slower)
        face_locations = face_recognition.face_locations(
            img_array, model="cnn", number_of_times_to_upsample=2
        )
        print("Detected face locations:", face_locations)

        # Get face encodings based on the detected face locations
        encoded_faces = face_recognition.face_encodings(img_array, face_locations)
        print("Encoded faces:", encoded_faces)

        # If faces are found, return a list of encodings
        if len(encoded_faces) > 0:
            # Return all encodings as a list
            return jsonify([encoding.tolist() for encoding in encoded_faces])

        else:
            return jsonify({"error": "No face found in the image"}), 400
    
    except Exception as e:
        return jsonify({"error": f"An error occurred while processing the image: {str(e)}"}), 500

def save(img,name,bbox,width=180,height=227):
    x,y,w,h=bbox
    imgCrop = img[y:h,x:w]
    imgCrop = cv2.resize(imgCrop,(width,height))
    cv2.imwrite(name+".jpg",imgCrop)

def crop(img,bbox,width=180,height=227):
    x,y,w,h=bbox
    imgCrop = img[y:h,x:w]
    imgCrop = cv2.resize(imgCrop,(width,height))
    return imgCrop

def faces(images):  
    encodedFaces = []
    for count,img in enumerate(images):
        image = Image.open(img)
        image = np.array(image) 
        frame = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
        faces = detector(gray)
        fit = 20
        for counter,face in enumerate(faces):
            print(counter)
            x1,y1 = face.left(),face.top()
            x2,y2 = face.right(),face.bottom()
            save(image,new_path+str(count)+"/"+str(counter),(x1,y1,x2,y2))
            encodedFaces.append(encode(crop(image,(x1,y1,x2,y2))))
    print("Encoding done of cropped faces")
    return encodedFaces

@flask.route('/face_recognition',methods=['POST'])
def detection():
    filename=f"{current_date}.csv"
    f = open(filename,'w+',newline='')
    lnwriter = csv.writer(f)
    Code = request.form.get('classCode')
    
    if 'image' not in request.files:
        return jsonify({"error": "No image part"}), 400
    
    img = request.files.getlist('image')
    
    students = db.students.find({"classCode": Code})
      
    student_data = {}
    for student in students:
        if 'encoding' in student and student['encoding']:  
            encoding = student['encoding'][0]
            if 'username' in student:
                username = student['username']
                student_data[username] = encoding
    
    known_encodings = [np.array(encoding) for encoding in student_data.values()]
    stud_name = list(student_data.keys())
    face_names = []
    
    face_encodings = faces(img)

    print(len(face_encodings))
    
    counter = 0
    print(type(known_encodings))
    print(type(face_encodings))
    for face_encoding in face_encodings:
        tolerance_threshold = 0.5
        name=""
        
        face_encoding = np.array(face_encoding)
        face_distance = face_recognition.face_distance(known_encodings,face_encoding)
        matches = face_distance < tolerance_threshold
        
        print(str(counter)+". "+str(matches)+ " : "+str(face_distance))
        
        best_match_index = np.argmin(face_distance)
        counter = counter + 1
        
        if matches[best_match_index]:
            name = stud_name[best_match_index]
            if name in face_names:
                continue
            face_names.append(name)
        if name in stud_name:
            print(face_names)
            current_time = now.strftime("%H-%M-%S")
            lnwriter.writerow([name,current_time])
            print(name+" Present")
    f.close()

    original_name = os.path.splitext(os.path.basename(filename))[0]
    upload_result = cloudinary.uploader.upload(filename, resource_type="raw",public_id=original_name)
     
    attendance_record = {
    "filename": filename,  
    "attachment": upload_result["secure_url"], 
    "createdAt": datetime.now()
    }        

    os.remove(attendance_record["filename"])
    update_result=db.classrooms.update_one(
    {"classCode": Code}, {"$push": {"attendance":attendance_record }})

    response = {
            "status": "success",
            "message": "File uploaded and attendance record added successfully.",
        }    
    
    return jsonify(response),200

if __name__ == "__main__":
    flask.run(debug=True,port=5001)
