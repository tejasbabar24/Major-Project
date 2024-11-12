import face_recognition
import requests
import numpy as np
import os
from dotenv import load_dotenv
from flask_cors import CORS
from io import BytesIO
from PIL import Image
from flask import Flask, request, jsonify
from pymongo import MongoClient

load_dotenv()

app = Flask(__name__)
CORS(app)

client = MongoClient(os.getenv('MONGODB_URI'))
db = client.acadamix 

if db.list_collection_names():
    print("Database connected successfully.")
else:
    print("Database connection failed.")

@app.route('/reg-encode', methods=['POST'])
def regEncoding():
        encodeArr=[]
        cloudArr=request.json.get('img',[])

        for imgId in cloudArr:
            response = requests.get(imgId)
            if response.status_code == 200:
                img = Image.open(BytesIO(response.content))
                img_array = np.array(img)
                encoded_face = encode(img_array)
                encodeArr.append(encoded_face)
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

@app.route('/')
def detection():
    stud=db.students.find_one({"username":"fs22co042"})
    
    print("First encoding element:", stud['encoding'][0])
    return f"<h1>First encoding element: {stud['encoding'][0]}</h1>"


if __name__ == "__main__":
    app.run(debug=True,port=5001)
