import face_recognition
import requests
import cv2
import csv
import dlib
import os
import cloudinary
import cloudinary.uploader
import cloudinary.api
import numpy as np
from datetime import datetime
from dotenv import load_dotenv
from flask_cors import CORS
from io import BytesIO
from PIL import Image
from flask import Flask, request, jsonify
from pymongo import MongoClient

load_dotenv()

app = Flask(__name__)
CORS(app,supports_credentials=True, origins=["http://localhost:5173","http://localhost:8000"])

cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

client = MongoClient(os.getenv('MONGODB_URI'))
db = client.acadamix 

detector = dlib.get_frontal_face_detector()
new_path = "./photos"
now = datetime.now()
current_date = now.strftime("%Y-%m-%d")

@app.route('/reg-encode', methods=['POST'])
def regEncoding():
    encodeArr = []
    cloudArr = request.json.get('img', [])
    
    for imgId in cloudArr:
        response = requests.get(imgId)
        print(response)
        if response.status_code == 200:
            try:
                img = Image.open(BytesIO(response.content))
                # Convert the image to grayscale
                img_gray = img.convert('L')  # 'L' mode converts to 8-bit grayscale
                img_array = np.array(img_gray)
                encoded_face = encode(img_array)
                print(encoded_face)
                encodeArr.append(encoded_face)
            except Exception as e:
                encodeArr.append({"error": f"Failed to process image with ID {imgId}: {str(e)}"})
        else:
            encodeArr.append({"error": f"Failed to fetch image with ID {imgId}"})

    return jsonify(encodeArr)
def encode(image):
        if image is None:
            return jsonify({"error": "Could not decode the image"}), 400

        face_locations = face_recognition.face_locations(image)
        encoded_faces = face_recognition.face_encodings(image, face_locations)

        if len(encoded_faces) > 0:
            return encoded_faces[0].tolist()
        else:
            return {"error": "No face found in the image"}

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

@app.route('/face_recognition',methods=['POST'])
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
    app.run(debug=True,port=5001)
