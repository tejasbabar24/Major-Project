import React, { useState, useEffect, useRef } from 'react';
import 'boxicons/css/boxicons.min.css';
import StudentLogo from './studentsImg.png';
import FacultyLogo from './Faculty.png';
import HODLogo from './student.png';
import backgroundImage from './loginBackground.jpg';
import ScrollReveal from 'scrollreveal';

function LoginPage() {
  const [activeItem, setActiveItem] = useState('Student');
  const imageRef = useRef(null); 

  const handleItemClick = (item) => {
    setActiveItem(item);
    console.log(imageRef.current);
    console.log(activeItem);

    
  };

  const switchImage = () => {
    switch (activeItem) {
      case 'HOD':
        return HODLogo ;
      case 'Faculty':
        return FacultyLogo;
      case 'Student':
        return StudentLogo;
      default:
        return StudentLogo;
    }
  };

const Animation =(para)=>{
  const sr = ScrollReveal();

  
  sr.reveal(para, {
    duration: 1000,           // Duration of the animation in milliseconds
    distance: '50px',         // Distance the element moves during the animation
    easing: 'ease-in-out',    // Easing function for the animation
    origin: 'left',         // Direction from which the element animates
    opacity: 0,               // Initial opacity of the element
    reset: true               // Whether the animation should reset when the element leaves the viewport
  });
}

  useEffect(() => {
    Animation(imageRef.current)
  }, [activeItem]);
 

  return (
    <div className="flex flex-row w-full h-screen font-merriweather">
      <div
        className="bg-custom-bg bg-cover bg-center h-screen w-2/4 h-full flex justify-end items-center p-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="justify-start items-start">
          <img
            src={switchImage()}
            alt={activeItem}
            className="w-full"
            ref={imageRef} 
          />
        </div>
        
        <ol className="w-40 text-right mr-0 text-white">
          <li
            className={`mt-5 p-2 rounded-l-md border-black border-l-2 border-b-2 ${activeItem === 'HOD' ? 'bg-slate-100 text-black' : 'bg-purple-500'}`}
            onClick={() => {handleItemClick('HOD') }}
            
          >
            HOD
          </li>
          <li
            className={`mt-5 p-2 rounded-l-md border-black border-l-2 border-b-2 ${activeItem === 'Faculty' ? 'bg-slate-100 text-black' : 'bg-purple-500'}`}
            onClick={() => handleItemClick('Faculty')}
            
          >
            Faculty
          </li>
          <li
            className={`mt-5 p-2 rounded-l-md border-black border-l-2 border-b-2 ${activeItem === 'Student' ? 'bg-slate-100 text-black' : 'bg-purple-500'}`}
            onClick={() => handleItemClick('Student')}
            
          >
            Student
          </li>
        </ol>
      </div>
      <div className="w-full h-full flex justify-center items-center bg-slate-100">
        <div className="p-10 rounded">
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
          <button type="button" className="text-orange-400 text-sm" >Forgot password?</button>
          <div className="text-center">
            <button
              type="button"
              onClick={() => console.log('Login clicked')}
              className="bg-purple-400 rounded text-white mt-4 w-full h-8"
              
            >
              Login
            </button>
          </div>
          <div className="text-center mt-3" >
            --------------------------
          </div>
          <div className="text-center mt-3 text-2xl hover:text-purple-500" >
            <i className="bx bxl-google-plus-circle"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
