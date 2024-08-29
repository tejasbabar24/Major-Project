import React, { useState, useEffect } from 'react';
import 'boxicons/css/boxicons.min.css';
import StudentLogo from '../assets/studentsImg.png';
import FacultyLogo from '../assets/Faculty.png';
import HODLogo from '../assets/student.png';
import backgroundImage from '../assets/loginBackground.jpg';
import { useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css'; 
import AOS from 'aos';
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';


function LoginPage() {
  const [activeItem, setActiveItem] = useState('Student');
  const navigate = useNavigate()
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  const handleItemClick =(item)=>{
    setActiveItem(item);
  }

  
  const switchImage = () => {
    switch (activeItem) {
      case 'HOD':
        return HODLogo;
      case 'Faculty':
        return FacultyLogo;
      case 'Student':
        return StudentLogo;
      case 'Parent':
        return StudentLogo;
      default:
        return StudentLogo;
    }
  };

 

  return (
    <div className="flex flex-row w-full h-screen font-merriweather">
      <div
        className="bg-custom-bg bg-cover bg-center h-screen w-2/4  flex justify-end items-center p-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="justify-start items-start" id="imgDiv">
          <motion.img
            key={activeItem}

            initial={{ x:-100 }} 
            animate={{ x:0 }}
            exit={{x:100}} 
            transition={{ duration:1.5  }}

            src={switchImage()}
            alt={activeItem}
            className="w-full"
          />
        </div>
        
        
        
        <ol className="w-40 text-right mr-0 text-white">
          <li
            className={`mt-5 p-2 cursor-pointer rounded-l-md border-black border-l-2 border-b-2 ${activeItem === 'HOD' ? 'bg-slate-100 text-black' : 'bg-purple-500'}`}
            onClick={() => handleItemClick('HOD')}
          >
            HOD
          </li>
          <li
            className={`mt-5 p-2 cursor-pointer rounded-l-md border-black border-l-2 border-b-2 ${activeItem === 'Faculty' ? 'bg-slate-100 text-black' : 'bg-purple-500'}`}
            onClick={() => handleItemClick('Faculty')}
          >
            Faculty
          </li>
          <li
            className={`mt-5 p-2 cursor-pointer rounded-l-md border-black border-l-2 border-b-2 ${activeItem === 'Student' ? 'bg-slate-100 text-black' : 'bg-purple-500'}`}
            onClick={() => handleItemClick('Student')}
          >
            Student
          </li>
          <li
            className={`mt-5 p-2 cursor-pointer rounded-l-md border-black border-l-2 border-b-2 ${activeItem === 'Parent' ? 'bg-slate-100 text-black' : 'bg-purple-500'}`}
            onClick={() => handleItemClick('Parent')}
          >
            Parent
          </li>
       
        </ol>
      </div>
      <div className="w-full h-full flex justify-center items-center bg-slate-100">
        <div className="p-10 rounded" data-aos="fade-up">
          <p className="mb-4 text-stone-950 text-2xl text-center"> {activeItem} Login</p>
          <div className="relative mb-4">
            <i className="bx bx-user absolute left-3 top-3 text-gray-400"></i>
            <input
              type="text"
              placeholder="Username"
              className="text-stone-950 p-2 pl-10 rounded w-full border-solid border-r-2 border-b-2"
            />
          </div>
          <div className="relative">
            <i className="bx bx-lock-alt absolute left-3 top-3 text-gray-400"></i>
            <input
              type="password"
              placeholder="Password"
              className="text-stone-950 p-2 pl-10 rounded w-full border-solid border-r-2 border-b-2"
            />
          </div>
          <button type="button" className="text-orange-400 text-sm">Forgot password?</button>
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="bg-purple-400 rounded text-white mt-4 w-full h-8"
            >
              Login
            </button>
          </div>
          <div className="text-center mt-3">
            --------------------------
          </div>
          <div className="text-center mt-3 text-2xl hover:text-purple-500">
            <i className="bx bxl-google-plus-circle"></i>
          </div>
          <div className='text-center mt-3 text-md hover:text-purple-500'>
            <Link to='/signup'>dont have an account ? </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
