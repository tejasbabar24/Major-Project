import React from 'react';
import classCardLogo from '../../assets/classCards/classCardLogo.jpg';

function ClassCard({classData,image}) {
  return (
    <div className="border border-solid rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
      <div
        className="bg-cover bg-center h-44 w-full" 
        style={{ backgroundImage: `url(${classCardLogo})` }}
      >
        <div className="bg-black bg-opacity-50 p-4 mt-0 flex align-middle justify-center">
          <img 
            src={image} 
            alt="User Profile" 
            className="w-14 h-14 rounded-full mb-2  border solid white " 
          />
          </div>
          <div className='bg-black bg-opacity-50 pl-4 h-full flex flex-col '>
          <h2 className="text-white text-lg font-semibold">{classData.classname}</h2>
          <p className="text-white text-sm">By- {classData.owner}</p>
        </div>
      </div>
    </div>
  );
}

export default ClassCard;
