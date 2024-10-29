import React from 'react'
import Card from '../../components/Card'; 
import StudentLogo from '../../assets/HodHomePageLogo/student.png'
import ClassListLogo from '../../assets/HodHomePageLogo/classList.png' 
import FacultLogo from '../../assets/HodHomePageLogo/faculty.png'
import HomeworkLogo from '../../assets/HodHomePageLogo/homework.png'
import TimetableLogo from '../../assets/HodHomePageLogo/timetable.png'
import ExamLogo from '../../assets/HodHomePageLogo/exam.png'
import NotifyLogo from '../../assets/HodHomePageLogo/notifyLogo.png'
import ResultLogo from '../../assets/HodHomePageLogo/ResultLogo.png'
import ProfileLogo from '../../assets/HodHomePageLogo/profileLogo.png'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useSelector } from 'react-redux';

function Home() {
    const userData = useSelector(state => state.auth.userData);
    console.log(userData);
    
  return (
    <div className="w-full flex bg-gray-200">
      <Sidebar/>
     <div className='flex flex-col w-full'>
        <div className='bg-white h-20'>
        
        <div className='py-4 px-6 flex justify-between'>
        <div className=''>
          <h1 className='font-bold'>{userData.role}</h1>
          <h2 className=''>{userData.username}</h2>
        </div>

        <div className='flex items-center gap-x-3'>
           
          <img className='w-10 h-10 cursor-pointer  ' src={ProfileLogo} alt="profile" />
          <img className='cursor-pointer' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAW1JREFUSEvtlrsuRUEUhr8jHkAUElFqEbXC5QHwEhrR8BoSUVGIzoO4NCQiwTMIEQpaBPMne5Ix9hzrzOzYpziT7GbPzPrWZdbM36Gl0WmJS9+BR4AZYKgwI5/ALfAS26mLeAvYBoYLoX77uwNvAvuhvRg8Adw1BAzNfDnwGPDsf8bgeeC0mlTk14VOzAK7lY0F4CwFXgSOq8kl4KQQnLQXRzwAp1I9B0y67+iPUphTrf7VgdDQwfrVf9WcN3gAbAAfCQfMYOtZCg1eACvOgaeazWZwGHE3J8I20boHYBW4jDaZweFCa/R+3Zu7fNaiuv8LWHVeBw4Dj83g3FTrKlSdz3NTbU1vGMkVsFzVOd6fFbGlndTHqqvqWzfMYOuVqQtkClAfdxuNg3NK8uPRGTwSrQmBceDeWsAe1kn6yPZjSoHov4TZTgMK0zMk9iSj9kJHU7p6FJiGYt0teXvjwK9xdvpO0PdQvrylrUX8DZOyaB9ap/VCAAAAAElFTkSuQmCC"/>
          
        </div>
        </div>

        </div>

        <div className='mx-6 my-10'>
        <div className='grid grid-cols-4 gap-5'>
        
        <Card 
        label="Add Faculty"
        logo={FacultLogo}
        slug='add-faculty'
        />
        <Card
          logo={ClassListLogo}
          slug="class-list"
          className=''
          label="Class List"
        />
        <Card
          logo={StudentLogo}
          slug='attendance'
          label="Attendance"
        />
        <Card
          logo={ExamLogo}
          label="Exam"
          slug='exam'
        />
         <Card
          logo={TimetableLogo}
          label="Timetable"
          slug='timetable'
        />
        <Card
          logo={HomeworkLogo}
          label="Homework"
          slug='homework'
        />
        <Card
          logo={NotifyLogo}
          label="Notice"
          slug='notice'
        />
        <Card
          logo={ResultLogo}
          label="Exam Result"
          slug='exam-result'
        />
        

        </div>
      </div>
    </div>
  </div>
   

    
  )
}

export default Home
