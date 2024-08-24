import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import logo from './studentsImg.png'

function LoginPage() {
  const [activeItem, setActiveItem] = useState("Student");

  
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="bg-yellow-200 bg-gradient-to-r from-yellow-400 to-orange-500 w-2/4 h-full flex justify-end items-center p-0">
      <img src={logo} alt="" className='w-full'/>
        <ol className='w-40 text-right mr-0 text-white'>
          <li 
            className={`mt-5 p-2 rounded-l-md border-black border-l-2 border-b-2 ${activeItem === 'Principal' ? 'bg-white text-black' : 'bg-orange-500'}`} 
            onClick={() => handleItemClick('Principal')}
          >
            Principal
          </li>
          <li 
            className={`mt-5 p-2 rounded-l-md border-black border-l-2 border-b-2 ${activeItem === 'HOD' ? 'bg-white text-black' : 'bg-orange-500'}`} 
            onClick={() => handleItemClick('HOD')}
          >
            HOD
          </li>
          <li 
            className={`mt-5 p-2 rounded-l-md border-black border-l-2 border-b-2 ${activeItem === 'Faculty' ? 'bg-white text-black' : 'bg-orange-500'}`} 
            onClick={() => handleItemClick('Faculty')}
          >
            Faculty
          </li>
          <li 
            className={`mt-5 p-2 rounded-l-md border-black border-l-2 border-b-2 ${activeItem === 'Student' ? 'bg-white text-black' : 'bg-orange-500'}`} 
            onClick={() => handleItemClick('Student')}
          >
            Student
          </li>
        </ol>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="p-10 rounded">
          <p className="mb-4 text-stone-950 text-2xl text-center">Login</p>
          <div className="relative mb-4">
            <i className='bx bx-user absolute left-3 top-3 text-gray-400'></i>
            <input
              type="text"
              placeholder="Username"
              className="text-stone-950 p-2 pl-10 rounded w-full border-solid border-r-2 border-b-2"
            />
          </div>
          <div className="relative">
            <i className='bx bx-lock-alt absolute left-3 top-3 text-gray-400'></i>
            <input
              type="password"
              placeholder="Password"
              className="text-stone-950 p-2 pl-10 rounded w-full border-solid border-r-2 border-b-2"
            />
          </div>
          <button type="button" className='text-orange-400 text-sm'>Forgot password?</button>
          <div className='text-center'>
            <button type="button" onClick={() => console.log('Login clicked')} className='bg-orange-500 rounded mt-4 w-full h-8'>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
