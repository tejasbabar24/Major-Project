import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import 'boxicons/css/boxicons.min.css';
import { Avatar, Button, TextField } from '@mui/material';
import Announcements from './Assignments';

function Viewclassroom() {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [active, setActive] = useState('assignment');
  const [students, setStudents] = useState([]);
  const { classId } = useParams();
  const classData = useSelector((state) => state.class.classData);
  const userData = useSelector((state) => state.auth.userData);
  const [classInfo, setClassInfo] = useState({});

  // Update classInfo whenever classData or classId changes
  useEffect(() => {
    if (classData && classData.length > 0) {
      const classDetails = classData.find((item) => item.classCode === classId);
      setClassInfo(classDetails || {});
    }
  }, [classData, classId]);

  // Fetch joined students
  useEffect(() => {
    axios
      .post('http://localhost:8000/class/joined-students', { classCode: classId })
      .then((result) => {
        setStudents(result.data.data.students);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [classId]);

  // Handle file input
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Handle assignment upload
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('title', inputValue);
    formData.append('classCode', classId);
    formData.append('attachment', image);

    axios
      .post('http://localhost:8000/class/post-assignment', formData)
      .then((result) => {
        setClassInfo(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setShowInput(false);
    setImage(null);
    setInput('');
  };

  // Render component based on active tab
  const renderComponent = () => {
    switch (active) {
      case 'assignment':
        return (
          <div className="p-4 overflow-hidden -mt-[2.4rem] ml-4">
            {
              userData.role === "Teacher" ? 
              (

            <div className="shadow-md rounded-md overflow-hidden min-h-[4.5rem] mb-6 mt-6">
              <div className="p-7 w-[70vw] bg-white">
                {showInput ? (
                  <form className="flex flex-col items-start">
                    <TextField
                      id="filled-multiline-flexible"
                      multiline
                      label="Announce Something to class"
                      variant="filled"
                      value={inputValue}
                      className="w-[50vw]"
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="flex justify-between w-[50vw] mt-5">
                      <input
                        onChange={handleChange}
                        variant="outlined"
                        color="primary"
                        type="file"
                      />
                      <div>
                        <Button onClick={() => setShowInput(false)}>Cancel</Button>
                        <Button onClick={handleUpload} color="primary" variant="contained">
                          Post
                        </Button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div
                    className="flex items-center cursor-pointer !important"
                    onClick={() => setShowInput(true)}
                  >
                    <Avatar />
                    <div className="ml-4">Post Assignment</div>
                  </div>
                )}
              </div>
            </div>
              ) : null
            }
            {classInfo.assignment &&
              classInfo.assignment.map((item, index) => (
                <Announcements key={index} assignment={item} classData={classInfo} />
              ))}
          </div>
        );
      case 'students':
        return (
          <div className="bg-white rounded-lg shadow p-4 mt-4 max-h-80 overflow-y-auto">
            <h2 className="text-2xl font-semibold">Teacher</h2>
            <ol className="list-disc pl-8">
              <li>{classInfo.owner?.toUpperCase()}</li>
            </ol>
            <h2 className="text-2xl font-semibold mt-4">Students</h2>
            <ol className="list-disc pl-8">
              {students.map((student) => (
                <li key={student.username}>{student.username.toUpperCase()}</li>
              ))}
            </ol>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-lg py-4 px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <i className="bx bx-plus"></i>
          <a href="#" className="text-blue-800 font-bold text-2xl">
            StudyRoom
          </a>
        </div>
        <div className="flex space-x-4 items-center">
          <i className="bx bx-plus text-2xl"></i>
          <i className="bx bxs-grid text-2xl"></i>
          <i className="bx bx-user-circle text-2xl"></i>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="bg-blue-600 text-white p-6 rounded-lg flex items-center space-x-4 mb-6">
          <div>
            <h1 className="text-3xl font-semibold">{classInfo.classname?.toUpperCase()}</h1>
            <p className="text-lg">{classInfo.section?.toUpperCase()}</p>
            <p className="text-sm mt-2">
              Class Code: <span className="font-mono">{classInfo.classCode}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="bg-white rounded-lg shadow p-4">
            <ol className="flex gap-x-20 justify-center">
              <li
                className={`cursor-pointer ${
                  active === 'assignment' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => setActive('assignment')}
              >
                <i className="bx bx-clipboard"></i> Assignment
              </li>
              <li
                className={`cursor-pointer ${
                  active === 'students' ? 'font-bold text-blue-600' : ''
                }`}
                onClick={() => setActive('students')}
              >
                <i className="bx bxs-user"></i> Students
              </li>
            </ol>
          </div>

          <div>{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Viewclassroom;
