import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'

import "boxicons/css/boxicons.min.css";

function Viewclassroom() {
  const [active, setActive] = useState('stream');
  const {classId} = useParams();    
  const classData = useSelector(state => state.class.classData)
  const classInfo = classData.filter((item)=>{
    return item.classCode === classId
  })[0]
  
  console.log(classInfo);
  
  const renderComponent = () => {
    switch (active) {
      case 'stream':
        return (
          <div className="flex space-x-4 mt-4">
            
            <div className="bg-white rounded-lg shadow p-4 w-1/8">
              <h2 className="text-lg font-semibold">Upcoming</h2>
              <p className="text-gray-600 mt-2">No work due</p>
            </div>
            
            <div className="flex-1 bg-white rounded-lg shadow p-4 flex items-center">
              <i className="bx bx-user-circle text-4xl"></i>
              <input
                type="text"
                placeholder="Announce something to class"
                className="w-full bg-gray-100 p-2 rounded-lg focus:outline-none"
              />
            </div>
          </div>
        );
      case 'assignment':
        return (
          <div className="bg-white rounded-lg shadow p-4 mt-4">
            <h2 className="text-lg font-semibold">Assignments</h2>
            <p className="text-gray-600 mt-2">No assignments yet</p>
          </div>
        );
      case 'students':
        return (
          <div className="bg-white rounded-lg shadow p-4 mt-4 max-h-80 overflow-y-auto">
            <h2 className="text-2xl font-semibold">Teachers</h2>
            <ol className=' list-disc pl-8 '>
              <li>Wankar</li>
              <li>Molawade</li>
              <li>Komatwar</li>
            </ol>
            <h2 className="text-2xl font-semibold mt-4">Students</h2>
               <ol className="list-disc pl-8">
                <li>Shrey</li>
                <li>Rucha</li>
                <li>Janhvi</li>
                <li>Swapnil</li>
                <li>Tejas</li>
                <li>Sahil</li>
                <li>Aarya</li>
                <li>Anshika</li>
                <li>Arnav</li>
                <li>Shrey</li>
                <li>Rucha</li>
                <li>Janhvi</li>
                <li>Swapnil</li>
                <li>Tejas</li>
              </ol>
            </div>
          
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-lg py-4 px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <i className="bx bx-plus"></i>
          <a href="#" className="text-blue-800 font-bold text-2xl">
            StudyRoom
          </a>
        </div>
        <div className="flex space-x-4 items-center">
          <i className="bx bx-plus text-2xl"></i>
          <i className="bx bxs-grid text-2xl"></i>
          <i className="bx bx-user-circle text-2xl"></i>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto mt-8">
        {/* class info*/}
        <div className="bg-blue-600 text-white p-6 rounded-lg flex items-center space-x-4 mb-6">
          <div>
            <h1 className="text-3xl font-semibold">{classInfo.classname.toUpperCase()}</h1>
            <p className="text-lg">{classInfo.section.toUpperCase()}</p>
            <p className="text-sm mt-2">
              Class Code: <span className="font-mono">{classInfo.classCode}</span>
            </p>
          </div>
        </div>

        
        <div className="flex flex-col gap-2">
          <div className="bg-white rounded-lg shadow p-4">
            <ol className="flex gap-x-20 justify-center">
              <li
                className={`cursor-pointer ${active === 'stream' ? 'font-bold text-blue-600' : ''}`}
                onClick={() => setActive('stream')}
              >
                Stream
              </li>
              <li
                className={`cursor-pointer ${active === 'assignment' ? 'font-bold text-blue-600' : ''}`}
                onClick={() => setActive('assignment')}
              >
                <i className="bx bx-clipboard"></i> Assignment
              </li>
              <li
                className={`cursor-pointer ${active === 'students' ? 'font-bold text-blue-600' : ''}`}
                onClick={() => setActive('students')}
              >
                <i className="bx bxs-user"></i> Students
              </li>
            </ol>
          </div>

          {/* Dynamic Content based on Active Tab */}
          <div>{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Viewclassroom;
