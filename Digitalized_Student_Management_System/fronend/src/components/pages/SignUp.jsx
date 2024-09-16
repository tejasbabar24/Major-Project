import React, { useState, useEffect } from 'react';
import 'boxicons/css/boxicons.min.css';
import StudentLogo from '../../assets/studentsImg.png';
import FacultyLogo from '../../assets/Faculty.png';
import HODLogo from '../../assets/student.png';
import backgroundImage from '../../assets/loginBackground.jpg';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { motion } from 'framer-motion'
import axios from 'axios'
import { useNavigate } from 'react-router';



function SignUp() {
  const [activeItem, setActiveItem] = useState('HOD');
  const [username,sethod_username]=useState();
  const [email,sethod_email]=useState();
  const[password,sethod_password]=useState();
  const [clgName,sethod_college_name]=useState();
  const [deptName,sethod_department_name]=useState();
  const navigate=useNavigate()

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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

  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post(`http://localhost:8000/register`,{username,email,password,clgName,deptName})
    .then(result =>  { console.log(result)
      navigate('/home')
    })
    .catch(err=>console.log(err))
  }

  const renderComponent = (item) => {
    switch (item) {
      case 'HOD':
        return (
          <div className=' flex flex-col'>
            <form action="" className=' justify-center align-center flex flex-col align-middle text-center ' onSubmit={handleSubmit}>
              <input id='hod_username' type="text" placeholder='Username' className='text-stone-950 p-2 pl-10 rounded w-full border-solid border-r-2 border-b-2 m-3'onChange={(e)=>sethod_username(e.target.value)} />
              <input id='hod_email' type="email" placeholder='Email Id' className='text-stone-950 p-2 pl-10 rounded w-full border-solid border-r-2 border-b-2 m-3' onChange={(e)=>sethod_email(e.target.value)}/>
              <input id='hod_password' type="text" placeholder='Create Password' className='text-stone-950 p-2 pl-10 rounded w-full border-solid border-r-2 border-b-2 m-3' onChange={(e)=>sethod_password(e.target.value)}/>
              <input id='hod_college_name' type="text" placeholder='Enter College Name' className='text-stone-950 p-2 pl-10 rounded w-full border-solid border-r-2 border-b-2 m-3' onChange={(e)=>sethod_college_name(e.target.value)}/>
              <input id='hod_department_name' type="text" placeholder='Enter Department' className='text-stone-950 p-2 pl-10 rounded w-full border-solid border-r-2 border-b-2 m-3' onChange={(e)=>sethod_department_name(e.target.value)}/>
            
            <button type="submit" className='text-stone-950 p-2 pl-10 rounded w-25 bg-purple-500 border-solid border-r-2 border-b-2 w-full ml-4'>Register</button>

            </form>
          </div>
        )
      case 'Parent':
        return FacultyLogo;
      case 'Student':
        return(
          <div className=''>
            <form action="" className='flex flex-col'>
              <div >
                <input type="text" placeholder='First Name' className='text-stone-950 p-2 pl-10 rounded  border-solid border-r-2 border-b-2 m-3' />
                <input type="text" placeholder='Last Name'  className='text-stone-950 p-2 pl-10 rounded  border-solid border-r-2 border-b-2 m-3'  />
              </div>
              <div>
                <input type="text" placeholder='Enter Enrollment No'  className='text-stone-950 p-2 pl-10 rounded border-solid border-r-2 border-b-2 m-3' />
              </div>
            </form>
          </div>
        )
      default:
        return StudentLogo;
    }
  }


  return (
    <div className="flex flex-row w-full h-screen font-merriweather">
      <div
        className="bg-custom-bg bg-cover bg-center h-screen w-2/4  flex justify-end items-center p-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
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
      <div className="w-full h-full flex justify-center items-center bg-slate-100">
        <div className="p-10 rounded" data-aos="fade-up">
          <p className="mb-4 text-stone-950 text-2xl text-center"> {activeItem} Registration</p>
          {renderComponent(activeItem)}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
