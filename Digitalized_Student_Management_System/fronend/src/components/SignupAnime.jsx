import React,{useState} from 'react'
import StudentLogo from '../assets/studentsImg.png';
import FacultyLogo from '../assets/Faculty.png';
import HODLogo from '../assets/student.png';
import backgroundImage from '../assets/loginBackground.jpg';
import { motion } from 'framer-motion'




function SignupAnime({
  image,
  ...props
}) {
  const [activeItem, setActiveItem] = useState('HOD');

  const handleItemClick = (item) => {
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
      default:
        return StudentLogo;
    }
  };
  return (
    <div
        className="bg-custom-bg bg-cover bg-center h-screen w-2/4  flex justify-end items-center p-0"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="justify-start items-start" id="imgDiv">
          <motion.img
            key={activeItem}

            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ duration: 1.5 }}

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
            className={`mt-5 p-2 cursor-pointer rounded-l-md border-black border-l-2 border-b-2 ${activeItem === 'Student' ? 'bg-slate-100 text-black' : 'bg-purple-500'}`}
            onClick={() => handleItemClick('Student')}
          >
            Student
          </li>
          <li
            className={`mt-5 p-2 rounded-l-md border-black border-l-2 border-b-2 ${activeItem === 'Parent' ? 'bg-slate-100 text-black' : 'bg-purple-500'}`}
            onClick={() => handleItemClick('Parent')}
          >
            Parent
          </li>
       </ol>
      </div>
  )
}

export default SignupAnime
