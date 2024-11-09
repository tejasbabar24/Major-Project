
import face_recognition
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/encode', methods=['POST'])
def encode(image):
        face_locations = face_recognition.face_locations(image)
        encoded_faces = face_recognition.face_encodings(image, face_locations)

        if len(encoded_faces) > 0:
            return jsonify(encoded_faces[0].tolist())
        else:
            return jsonify({"error": "No face found in the image"}), 404

def regEncoding():
        encodeArr=[]
        cloudArr=request.json.get('img')
        for imgId in cloudArr:
            response = requests.get(imgId)
            encodeArr+=encode(response)
        return jsonify(encodeArr)

if __name__ == "__main__":
    app.run(debug=True)
