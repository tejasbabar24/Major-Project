import 'boxicons/css/boxicons.min.css';
import StudentLogo from '../assets/studentsImg.png';
import FacultyLogo from '../assets/Faculty.png';
import HODLogo from '../assets/student.png';
import backgroundImage from '../assets/loginBackground.jpg';
import { motion } from 'framer-motion'
import axios from 'axios'
import { useNavigate } from 'react-router';
import Input from './Input';
import Button from './Button';
import { login } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Loading from './Loading';

function SignUp() {
  const [loading , setLoading] = useState();
  const [stud_images, set_Stud_images]= useState([]);
  const [activeItem, setActiveItem] = useState('Teacher');
  // teacher states
  const [Teach_username, set_Teach_username] = useState();
  const [Teach_email, set_Teach_email] = useState();
  const [Teach_password, set_Teach_password] = useState();

  // Student states 
  const [Stud_username, set_Stud_username] = useState();
  const [Stud_email, set_Stud_email] = useState();
  const [Stud_password, set_Stud_password] = useState();

  //Parent states

  const handleImages=(e)=>{
    const files = Array.from(e.target.files)
    set_Stud_images(files)
  }

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleItemClick = (item) => {
    setActiveItem(item);
  }

  // animation
  /* const startAnimation=()=>{
    setLoading(true)
     setTimeout(() => {
      setLoading(false);
  }, 3000);
  } */


  const switchImage = () => {
    switch (activeItem) {
      case 'Teacher':
        return HODLogo;
      case 'Faculty':
        return FacultyLogo;
      case 'Student':
        return StudentLogo;

      default:
        return StudentLogo;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
  }, 3000);
    axios.post(`http://localhost:8000/users/register`, {Teach_username ,Teach_email,Teach_password , Stud_email, Stud_username, Stud_password, stud_images})
      .then(result => {
        console.log(result)
        if (result) dispatch(login(result.data))
        navigate('/home')
      })
      .catch(err => console.log(err))
  }

  
  const renderComponent = (item) => {
    switch (item) {
      case 'Teacher':
        return (
          
          <div className=' flex flex-col'>
            <form action="" className=' justify-center align-center flex flex-col align-middle text-center ' onSubmit={handleSubmit}>
              <Input
                type="text" placeholder='Role'
                value={activeItem}
                className='text-stone-950 p-2 pl-10 rounded w-full border-solid border-r-2 border-b-2 m-3'
                onChange={(e) => setActiveItem(e.target.value)}
                readOnly />

              <Input
                type="text" placeholder='Username'
                className='text-stone-950 p-2 pl-10 rounded w-full border-solid border-r-2 border-b-2 m-3'
                onChange={(e) => set_Teach_username(e.target.value)} />

              <Input
                type="email"
                placeholder='Email Id'
                className='text-stone-950 p-2 pl-10 rounded w-full border-solid border-r-2 border-b-2 m-3'
                onChange={(e) => set_Teach_email(e.target.value)} />

              <Input type="password"
                 placeholder='Create Password'
                 className='text-stone-950 p-2 pl-10 rounded w-full border-solid border-r-2 border-b-2 m-3' 
                 onChange={(e) => set_Teach_password(e.target.value)} />

              <Loading show={loading}/>

              <Button type="submit" className='text-stone-950 p-2 pl-10 rounded w-25 bg-purple-500 border-solid border-r-2 border-b-2 w-full ml-4'
              >Register</Button>

            </form>
          </div>
        )


      case 'Parent':
        return FacultyLogo;


      case 'Student':
        return (
          <div className=''>
            <form action="" className='flex flex-col'>
              <div >
                <Input type="email" 
                  placeholder='Enter Email' 
                  className='text-stone-950 p-2 pl-10 rounded w-full border-solid border-r-2 border-b-2 m-3' 
                  onChange={(e)=>set_Stud_email(e.target.value)}/>

                <Input type="text" 
                  placeholder='Enter Enrollment Number' 
                  className='text-stone-950 p-2 pl-10 rounded w-full  border-solid border-r-2 border-b-2 m-3'
                  onChange={(e)=>set_Stud_username(e.target.value)} />

                
                <Input type="password" 
                  placeholder='Create Password' 
                  className='text-stone-950 p-2 pl-10 rounded w-full border-solid border-r-2 border-b-2 m-3' 
                  onChange={(e)=>set_Stud_password(e.target.value)}/>
                
                <label htmlFor="" className=' text-gray-600 text-sm pl-5'>Select Min-3 images for face identity</label>
                <Input type="file"
                  accept="image/*"
                  multiple
                  className='text-stone-950 text-sm  rounded mt-2 w-full border-solid border-r-2 border-b-2 bg-white  ' 
                  onChange={handleImages}
                />
                <div className=' flex '>
                  {
                    stud_images.map((image , index)=>(
                      <div key={index} className=' flex-row border-solid '>
                        <img src={URL.createObjectURL(image)}
                        alt={`preview ${index}`}
                        className="w-16 h-16 object-cover border rounded mr-2 mt-3" />
                      </div>
                    ))
                  }
                </div>
                <Button type="submit" className='text-stone-950 p-2 pl-10 mt-14 rounded w-25 bg-purple-500 border-solid border-r-2 border-b-2 w-full ml-4'>Register</Button>


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
            className={`mt-5 p-2 cursor-pointer rounded-l-md border-black border-l-2 border-b-2 ${activeItem === 'Teacher' ? 'bg-slate-100 text-black' : 'bg-purple-500'}`}
            onClick={() => handleItemClick('Teacher')}
          >
            Teacher
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
