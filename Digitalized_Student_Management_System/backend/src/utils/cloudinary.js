import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";
import axios from 'axios';
import path from 'path';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const fileName = path.basename(localFilePath)
        const response = await cloudinary.uploader.upload(localFilePath, {
            public_id: fileName, 
            overwrite: true,
            resource_type: "auto",
        });

         fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log(error);
        return null;
    }
}

const downloadFromCloudinary = async (cloudinaryUrl, downloadDir = 'C:/Downloads') => {
  try {
    
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    const urlObj = new URL(cloudinaryUrl);
    const fileNameWithFormat = path.basename(urlObj.pathname);
    const [fileName, fileFormat] = fileNameWithFormat.split('.');
    const downloadPath = path.join(downloadDir, `${fileName}.${fileFormat}`);

    const response = await axios({
      url: cloudinaryUrl,
      method: 'GET',
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(downloadPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`File downloaded successfully to ${downloadPath}`);
        resolve(downloadPath);
      });
      writer.on('error', (err) => {
        console.error('Error writing file:', err);
        reject(err);
      });
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};


export { uploadOnCloudinary , downloadFromCloudinary}