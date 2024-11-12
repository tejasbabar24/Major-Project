import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import sideBarLogo from '../../assets/HodHomePageLogo/menu.png';
import HomeLogo from '../../assets/HodHomePageLogo/home.png';
import StudentLogo from '../../assets/HodHomePageLogo/student.png';
import ClassListLogo from '../../assets/HodHomePageLogo/classList.png';
import FacultLogo from '../../assets/HodHomePageLogo/faculty.png';
import HomeworkLogo from '../../assets/HodHomePageLogo/homework.png';
import TimetableLogo from '../../assets/HodHomePageLogo/timetable.png';
import ExamLogo from '../../assets/HodHomePageLogo/exam.png';
import NotifyLogo from '../../assets/HodHomePageLogo/notifyLogo.png';
import ResultLogo from '../../assets/HodHomePageLogo/ResultLogo.png';

function Sidebar() {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData);

  const navItems = [
    { name: "Home", slug: "/", logo: HomeLogo, active: true },
    { name: "Add Faculty", slug: "/add-faculty", logo: FacultLogo, active: true },
    { name: "Class List", slug: "/classroom", logo: ClassListLogo, active: true },
    { name: "Attendance", slug: "/attendance", logo: StudentLogo, active: true },
    { name: "Exam", slug: "/exam", logo: ExamLogo, active: true },
    { name: "Timetable", slug: "/timetable", logo: TimetableLogo, active: true },
    { name: "Homework", slug: "/homework", logo: HomeworkLogo, active: true },
    { name: "Notice", slug: "/notice", logo: NotifyLogo, active: true },
    { name: "Exam Result", slug: "/exam-result", logo: ResultLogo, active: true },
  ];

  const studItems = [
    { name: "Home", slug: "/", logo: HomeLogo, active: true },
    { name: "Join Class", slug: "/classroom", logo: FacultLogo, active: true },
    { name: "My Classes", slug: "/classroom", logo: ClassListLogo, active: true },
    { name: "My Attendance", slug: "/attendance", logo: StudentLogo, active: true },
    { name: "Exam", slug: "/exam", logo: ExamLogo, active: true },
    { name: "View Timetable", slug: "/timetable", logo: TimetableLogo, active: true },
    { name: "Homework", slug: "/homework", logo: HomeworkLogo, active: true },
    { name: "View Notice", slug: "/notice", logo: NotifyLogo, active: true },
    { name: "Exam Result", slug: "/exam-result", logo: ResultLogo, active: true },
  ];

  const renderArr = userData?.role === "Student" ? studItems : navItems;

  return (
    <div className="flex">
      <div className="w-72 bg-gradient-to-b from-gray-800 to-gray-600 min-h-screen shadow-2xl transition-all duration-300">
        {/* Sidebar Header */}
        <div className="flex px-6 pt-4 items-center">
          <img className="w-12 h-12 mr-3" src={BookLogo} alt="College Logo" />
          <h1 className="text-indigo-200 font-bold text-xl">COLLEGE</h1>
        </div>

        {/* <div className="mt-6 flex justify-start">
          <img className="w-8 h-8 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" src={sideBarLogo} alt="Collapse Sidebar" />
        </div> */}
        {/* User Info */}
        {/* <div className="text-center mt-6 mb-4">
          <h2 className="text-lg font-semibold text-indigo-200">{userData?.role || "User"}</h2>
          <p className="text-sm text-gray-300">{userData?.username || "Guest"}</p>
        </div> */}

        {/* Navigation Menu */}
        <nav className="mt-6">
          <ul className="space-y-2">
            {renderArr.map((item) =>
              item.active ? (
                <li
                  key={item.name}
                  className="flex items-center px-6 py-3 text-white transition-transform transform hover:scale-105 hover:bg-gray-700 hover:shadow-md rounded-lg cursor-pointer"
                  onClick={() => navigate(item.slug)}
                >
                  <img className="w-8 h-8 mr-4" src={item.logo} alt={`${item.name}-logo`} />
                  <span className="text-md font-medium">{item.name}</span>
                </li>
              ) : null
            )}
          </ul>
        </nav>

        {/* Collapsible Icon */}
      </div>
    </div>
  );
}

export default Sidebar;
