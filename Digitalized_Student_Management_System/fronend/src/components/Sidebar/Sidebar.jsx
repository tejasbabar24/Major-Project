import React from 'react'
import {useNavigate} from 'react-router-dom'
import sideBarLogo from '../../assets/HodHomePageLogo/menu.png'
import HomeLogo from '../../assets/HodHomePageLogo/home.png'
import StudentLogo from '../../assets/HodHomePageLogo/student.png'
import ClassListLogo from '../../assets/HodHomePageLogo/classList.png' 
import FacultLogo from '../../assets/HodHomePageLogo/faculty.png'
import HomeworkLogo from '../../assets/HodHomePageLogo/homework.png'
import TimetableLogo from '../../assets/HodHomePageLogo/timetable.png'
import ExamLogo from '../../assets/HodHomePageLogo/exam.png'
import NotifyLogo from '../../assets/HodHomePageLogo/notifyLogo.png'
import ResultLogo from '../../assets/HodHomePageLogo/ResultLogo.png'
import BookLogo from '../../assets/HodHomePageLogo/book.png'

function Sidebar() {
  //const navigate = useNavigate();
    const role = "HOD";
    const name = "DhulShettee"
    const navItems = [
    {
      name:"Home",
      slug:"/",
      logo: HomeLogo,
      active:true
    },
    {
      name:"Add Faculty",
      slug:"/add-faculty",
      logo: FacultLogo,
      active:true
    },
    {
      name:"Class List",
      slug:"/class-list",
      logo: ClassListLogo,
      active:true
    },
    {
      name:"Attendance",
      slug:"/attendance",
      logo: StudentLogo,
      active:true
    },
    {
      name:"Exam",
      slug:"/exam",
      logo: ExamLogo,
      active:true
    },
    {
      name:"Timetable",
      slug:"/timetable",
      logo: TimetableLogo,
      active:true
    },
    {
      name:"Homework",
      slug:"/homework",
      logo: HomeworkLogo,
      active:true
    },
    {
      name:"Notice",
      slug:"/notice",
      logo: NotifyLogo,
      active:true
    },
    {
      name:"Exam Result",
      slug:"/exam-result",
      logo: ResultLogo,
      active:true
    },
  ]
  return (
    <div className='flex'>
      <div className='w-64 bg-gray-700  min-h-screen'>
      <div className='flex px-6 pt-2 items-center'>
        <img className='w-10 h-10' src={BookLogo} alt="" />
        <h1 className='text-white font-bold ml-4'>COLLEGE</h1>
      </div>
      <div className='pl-3'>
      <img className=' w-10 h-10 cursor-pointer' src={sideBarLogo} alt="" />
      </div>
      <nav>
        <ul className='pl-3 mt-4'>
          {
            navItems.map((item)=>
              item.active ? (
                <li className='flex my-2 text-white items-center my-4 hover:bg-gray-500' key={item.name}>
                  <img className='w-10 h-10 cursor-pointer' src={item.logo} alt={`${item.name}-logo`} />
                  <button onClick={()=>/*navigate(item.slug)*/console.log("navigate(item.slug)")
                  }
                    className='pl-3'
                    >
                    {item.name}
                  </button>
                </li>
              ) : null
            )
          }
        </ul>
      </nav>
    </div>

    
    </div>


  )
}

export default Sidebar
