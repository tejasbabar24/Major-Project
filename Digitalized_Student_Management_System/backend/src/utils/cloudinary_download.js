import axios from 'axios';
import fs from 'fs';
import path from 'path';

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

export { downloadFromCloudinary };
