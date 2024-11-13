import axios from 'axios';
import fs from 'fs';
import path, { format } from 'path';
import cloudinary from '../config/cloudinaryConfig.js';

const downloadFromCloudinary=async(cloudinaryUrl, name,format,downloadDir = 'C:/Downloads')=>{
  try {

    const downloadPath = path.join(downloadDir, `${name}.${format}`);

    const response = await axios({
      url: cloudinaryUrl,
      method: 'GET',
      responseType: 'stream'
    });

    // Save file locally
    const writer = fs.createWriteStream(downloadPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`File downloaded successfully to ${downloadPath}`);
        resolve(downloadPath);
      });
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
}

export default downloadFromCloudinary;
