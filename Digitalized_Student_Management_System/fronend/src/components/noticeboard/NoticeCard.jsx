import React, { useState } from "react";
import filelogo from './filelogo.png'

function NoticeCard({ fileUrls = [] , desc , from , to , date}) {
  const [colors] = useState(['#cfffc0', '#feffa6', '#f5beff', '#dec4ff', '#ffd2b9']);
  
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const randomColor = getRandomColor();

  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif|bmp)$/i.test(url);
  };

  return (
    <div className="text-md w-full p-4 rounded-lg" style={{ backgroundColor: randomColor }}>
      <div className="flex flex-row justify-between">
        <h2 className="text-lg"> Date - {date} </h2>
        <h2 className="text-lg"> From - {from} </h2>
        <h2 className="text-lg"> To - {to} </h2>
      </div>
      <div className="flex flex-row gap-4 border-t border-stone-950 p-3">
        <div>
          {desc}
        </div>
        <div className="border-l border-stone-950 w-1/3 gap-2 p-3 flex flex-row">
          {fileUrls.length > 0 ? (
            fileUrls.map((url, index) => (
              <a href={url} target="_blank" rel="noopener noreferrer" key={index} className="text-sm">
                <img 
                  src={isImage(url) ? url : filelogo} 
                  alt={`Notice attachment ${index + 1}`} 
                  className="w-full h-8 object-cover rounded-lg mb-2 " 
                />{` file ${index + 1}`} 
              </a>
            ))
          ) : (
            <p>No attachments available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoticeCard;
