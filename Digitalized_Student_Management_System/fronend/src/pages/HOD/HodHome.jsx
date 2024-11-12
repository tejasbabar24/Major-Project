import React, { useState } from 'react';
import Card from '../../components/Card'; 
import { useSelector } from 'react-redux';
import {
  StudentLogo, ClassListLogo, FacultLogo, HomeworkLogo, TimetableLogo,
  ExamLogo, NotifyLogo, ResultLogo, ProfileLogo, BookLogo ,sideBarLogo
} from '../../assets/HodHomePageLogo';
import { useNavigate } from 'react-router';
import "boxicons/css/boxicons.min.css";
import { RxCross2 } from "react-icons/rx";

function Home() {
    const userData = useSelector(state => state.auth.userData);
    const navItems = [
      {
        name:"Add Faculty",
        slug:"/add-faculty",
        logo: FacultLogo,
        active:true
      },
      {
        name:"Class List",
        slug:"/classroom",
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
      const studItems = [
      
      {
        name:"Join Class",
        slug:"/classroom",
        logo: FacultLogo,
        active:true
      },
      {
        name:"My Classes",
        slug:"/class-list",
        logo: ClassListLogo,
        active:true
      },
      {
        name:"My Attendance",
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
        name:"View Timetable",
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
        name:"View Notice",
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
    const renderArr =
    userData.role === "Student" 
    ? studItems 
    : userData.role === "Teacher" 
    ? navItems 
    : [];
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-100 to-indigo-200">
      
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="md:hidden p-4 text-gray-600 focus:outline-none"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <img src={sideBarLogo} alt="Menu" className="w-8 h-8" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-gray-800 to-gray-600 min-h-screen shadow-2xl transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:static md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex px-4 pt-4 justify-between">
          <div className='flex items-center'>
          <img className="w-10 h-10 md:w-12 md:h-12 mr-3" src={BookLogo} alt="College Logo" />
          <h1 className="text-indigo-200 font-bold text-lg md:text-xl">COLLEGE</h1>
          </div>
          <button className='md:hidden' onClick={() => setSidebarOpen(false)}>
          <RxCross2 className="text-white w-8 h-8 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"/>
          </button>

        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          <ul className="space-y-2">
            {renderArr.map((item) =>
              item.active ? (
                <li
                  key={item.name}
                  className="flex items-center px-4 md:px-6 py-3 text-white transition-transform transform hover:scale-105 hover:bg-gray-700 hover:shadow-md rounded-lg cursor-pointer"
                  onClick={() => {
                    navigate(item.slug);
                    setSidebarOpen(false);  // Close sidebar on navigation
                  }}
                >
                  <img className="w-6 h-6 md:w-8 md:h-8 mr-3 md:mr-4" src={item.logo} alt={`${item.name}-logo`} />
                  <span className="text-sm md:text-md font-medium">{item.name}</span>
                </li>
              ) : null
            )}
          </ul>
        </nav>
      </div>
      
      {/* Main Content Section */}
      <div className="flex flex-col w-full p-4 md:p-6">
        
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-lg md:text-2xl font-semibold text-gray-700">{userData?.role || "Guest"}</h1>
            <h2 className="text-md md:text-lg text-gray-500">{userData?.username || "Guest User"}</h2>
          </div>
          <div className="flex items-center gap-x-3 md:gap-x-4 mt-4 md:mt-0">
            <img className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-indigo-300 cursor-pointer hover:scale-105 transition-transform duration-200" src={ProfileLogo} alt="profile" />
            <img className="cursor-pointer w-6 h-6 md:w-8 md:h-8 opacity-70 hover:opacity-100 transition-opacity duration-200" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAW1JREFUSEvtlrsuRUEUhr8jHkAUElFqEbXC5QHwEhrR8BoSUVGIzoO4NCQiwTMIEQpaBPMne5Ix9hzrzOzYpziT7GbPzPrWZdbM36Gl0WmJS9+BR4AZYKgwI5/ALfAS26mLeAvYBoYLoX77uwNvAvuhvRg8Adw1BAzNfDnwGPDsf8bgeeC0mlTk14VOzAK7lY0F4CwFXgSOq8kl4KQQnLQXRzwAp1I9B0y67+iPUphTrf7VgdDQwfrVf9WcN3gAbAAfCQfMYOtZCg1eACvOgaeazWZwGHE3J8I20boHYBW4jDaZweFCa/R+3Zu7fNaiuv8LWHVeBw4Dj83g3FTrKlSdz3NTbU1vGMkVsFzVOd6fFbGlndTHqqvqWzfMYOuVqQtkClAfdxuNg3NK8uPRGTwSrQmBceDeWsAe1kn6yPZjSoHov4TZTgMK0zMk9iSj9kJHU7p6FJiGYt0teXvjwK9xdvpO0PdQvrylrUX8DZOyaB9ap/VCAAAAAElFTkSuQmCC" />
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {renderArr.map((item, index) =>
            item.active ? (
              <Card
                key={index}
                label={item.name}
                logo={item.logo}
                slug={item.slug}
                className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center 
                          transform transition-transform hover:scale-105 hover:shadow-2xl duration-200"
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
