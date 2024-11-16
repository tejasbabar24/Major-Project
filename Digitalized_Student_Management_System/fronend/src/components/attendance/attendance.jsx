import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { MdOutlineAdd } from "react-icons/md";
import DragAndDropFileUpload from "../dragNdrop/DragNdrop.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import attendancelogo from "./attendancelogo.png";
import AttendanceCard from "./attendanceCard.jsx";
import axios from "axios";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import classBackground from "../../assets/classCards/classbackground.jpg"; // Ensure you have this asset
import user from "../../assets/classCards/user.png"; // Ensure you have this asset
import Papa from 'papaparse';
import HighlightedCalendar from "./Calendar.jsx";
import DonutChart from "./DonutChart.jsx";
import ShowAttendance from "./ShowAttendace.jsx";

const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "100vh",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 0 : `-${drawerWidth}px`,
    backgroundImage: `url(${classBackground})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
  })
);

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? `${drawerWidth}px` : "0",
  width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
}));

export default function Attendance() {
  const userData = useSelector((state) => state.auth.userData);
  const defaultSelect = userData.role === "Teacher" ? "uploadAttendance" : null
  const [open, setOpen] = useState(true);
  const [classes, setClasses] = useState("");
  const [role, setRole] = useState(userData.role);
  const [dupRole, setDupRole] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedClass, setSelectedClass] = useState(defaultSelect);
  const [createdClasses, setCreatedClasses] = React.useState([]);
  const [joinedClasses, setJoinedClasses] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  const [myAttendance,setMyAttendance] = useState([]);
  const handleFilesUploaded = (files) => setUploadedFiles(files);

const [processedUrls, setProcessedUrls] = useState([]);
const highlightedDates = ["2024-11-10", "2024-11-12"];


const handleParseFromUrl = (csvUrl) => {
  // Check if the URL has already been processed
  if (!processedUrls.includes(csvUrl)) {
    setProcessedUrls((prevUrls) => [...prevUrls, csvUrl]);

    Papa.parse(csvUrl, {
      download: true, // Enables fetching from a remote URL
      header: true, // Adjust based on your CSV structure
      skipEmptyLines: true,
      complete: (results) => {
        console.log(results.data);
        const foundData = results.data.find(
          (item) => item.Enrollment_Number === userData.username
        );
        console.log("Found Data:", foundData);

        if (foundData) {
          // Appending the found data to the attendance state
          setMyAttendance((prevAttendance) => [...prevAttendance, foundData]);
        }
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }
};

useEffect(() => {
  if (userData.role === "Student") {
    // Find the selected class from joinedClasses
    const selectedClassData = joinedClasses.find(
      (item) => item.classname === selectedClass?.toLowerCase()
    );

    if (selectedClassData && selectedClassData.attendance?.length > 0) {
      // Only handle the attendance once for the selected class
      selectedClassData.attendance.forEach((item) => {
        if (item.attachment) {
          handleParseFromUrl(item.attachment);
        }
      });
    }
  }
}, [selectedClass, joinedClasses, userData.role]); // Re-run only when necessary


  const handleClassChange = (event) => setClasses(event.target.value);


  const handleClassClick = (className) => {
    if (className === "Upload Attendance") {
      setSelectedClass("uploadAttendance"); // Set this when "Upload Attendance" is clicked
    } else {
      setSelectedClass(className);
    }
    // Assuming you want to set this on click
  };
  const clearFields = () => {
    setUploadedFiles([]);
    setClasses("");
    setSelectedClass(classes)
    setFiles([])
    
  };
  const uploadAttendance = (e) => {
    e.preventDefault();
    const classDetails = createdClasses.find(
      (item) => item.classname === classes.toLowerCase()
    );

    const formData = new FormData();
    formData.append("classCode", classDetails.classCode);
    uploadedFiles.forEach((image, index) => {
      formData.append("image", image);
    });

    axios
      .post("http://localhost:5001/face_recognition", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((result) => {
        console.log(result.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
      clearFields()
  };

  if (userData.role === "Teacher") {
    useEffect(() => {
      axios
        .get("http://localhost:8000/class/created-classes")
        .then((result) => {
          setCreatedClasses(result.data.data.classes);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [createdClasses]);
  } else if (userData.role === "Student") {
    useEffect(() => {
      axios
        .get("http://localhost:8000/class/joined-classes")
        .then((result) => {
          setJoinedClasses(result.data.data.classArr);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [joinedClasses]);
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <StyledAppBar position="fixed">
        <Toolbar sx={{ backgroundColor: "#8E6AC4" }}>
          
          <Typography variant="h4" sx={{ marginLeft: "35%" }}>
            Attendance
          </Typography>
        </Toolbar>
      </StyledAppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "64px",
            backgroundColor: "",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Divider />
        
        
        <List >
          {userData.role === "Teacher" ? (
            <>
            <ListItem
            >
              <Button
              className="cursor-pointer"

                variant="contained"
            onClick={() => handleClassClick("Upload Attendance")}

                sx={{ fontSize: "15px", backgroundColor: "#3A2B51" }}
              >
                Upload Attendance <MdOutlineAdd />
              </Button>
            </ListItem>
            <Typography variant="h6" sx={{ textAlign: "center", paddingTop: 2 }}>
          Your Classes
        </Typography>
            {createdClasses.map((item) => (
              <ListItem
                key={item.classCode}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleClassClick(item.classname.toUpperCase())}
              >
                <ListItemIcon className="mr-3">
                <img 
                  src={user} 
                  alt="User Profile" 
                  className="w-12 h-12 rounded-full mb-2  border solid white " 
                />
                </ListItemIcon>
                {item.classname.toUpperCase()}
              </ListItem>
            ))}
            </>

          ) : userData.role === "Student" ? (joinedClasses.map((item) => (
            <ListItem
                key={item.classCode}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleClassClick(item.classname.toUpperCase())}
              >
                <ListItemIcon className="mr-3">
                <img 
                  src={user} 
                  alt="User Profile" 
                  className="w-12 h-12 rounded-full mb-2  border solid white " 
                />
                </ListItemIcon>
                {item.classname.toUpperCase()}
              </ListItem>
          )))
          :
            null
        }

          
        </List>
        {/* <List>
          {
          renderClass.map((item) => (
            <ListItem key={item.classCode} disablePadding>
              <ListItemButton onClick={()=>navigate(`/class/${item.classCode}`)}>
                <ListItemIcon className="mr-3">
                <img 
                  src={user} 
                  alt="User Profile" 
                  className="w-12 h-12 rounded-full mb-2  border solid white " 
                />
                </ListItemIcon>
                <ListItemText primary={item.classname.toUpperCase()} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>

      <Main open={open}>
        <Box sx={{ mt: 8, padding: "16px" }}>
          {selectedClass === "uploadAttendance" && (
            <div className="flex items-center justify-center mt-16">
              <img
                src={attendancelogo}
                alt="Attendance Logo"
                className="h-100 w-26"
              />
              <div className="w-56">
                <form
                  className="flex flex-col justify-center"
                  onSubmit={uploadAttendance}
                >
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="select-class-label">Classes</InputLabel>
                    <Select
                      labelId="select-class-label"
                      id="select-class"
                      value={classes}
                      label="Select Class"
                      onChange={handleClassChange}
                      sx={{ width: "200px" }}
                    >
                      {createdClasses.map((item) => (
                        <MenuItem
                          key={item.classCode}
                          value={item.classname.toUpperCase()}
                        >
                          {item.classname.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography variant="subtitle2" sx={{ mt: 2 }}>
                      Select Images to Upload
                    </Typography>
                  </FormControl>
                  <DragAndDropFileUpload
                    onFilesUploaded={handleFilesUploaded}
                    files={files} 
                    setFiles={setFiles}
                  />
                  <Button
                    type="submit"
                    className="w-18 h-8 mt-4 text-white text-sm text-center bg-purple-500"
                  >
                    Upload Attendance
                  </Button>
                </form>
              </div>
            </div>
          )}

          {selectedClass !== "uploadAttendance" && (
            <div className="ml-50">
              
              {
              userData.role === "Teacher" ? (

                createdClasses.find(
                  (item) => item.classname === selectedClass.toLowerCase()
                ) ? (
                  createdClasses.find(
                    (item) => item.classname === selectedClass.toLowerCase()
                  ).attendance?.length > 0 ? (
                    createdClasses
                      .find(
                        (item) => item.classname === selectedClass.toLowerCase()
                      )
                      .attendance.sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      ) // Sorting by createdAt
                      .map((item) => (
                        <AttendanceCard
                          key={item.createdAt}
                          name={selectedClass}
                          date={item.createdAt}
                          fileUrl={item.attachment}
                        />
                      ))
                  ) : (
                    <div>No attendance found</div>
                  )
                ) : (
                  <div>Class not found</div>
                )
              ) : userData.role === "Student" ? (
                joinedClasses.find(
                  (item) => item.classname === selectedClass?.toLowerCase()
                ) ? (
                  joinedClasses.find(
                    (item) => item.classname === selectedClass?.toLowerCase()
                  ).attendance?.length > 0 ? (
                    joinedClasses
                      .find(
                        (item) => item.classname === selectedClass?.toLowerCase()
                      )
                      .attendance.sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      ) // Sorting by createdAt
                      .map((item,index) => (
                        <AttendanceCard
                          key={index}
                          name={selectedClass}
                          date={item.createdAt}
                          fileUrl={item.attachment}
                        />
                      ))
                  ) : (
                    <div className="flex flex-col gap-12 bg-gray-50 p-0 border-box border border-gray-200 shadow-lg w-full h-full">
                      {/* Header Section */}
                      <h1 className="text-xl font-bold text-center text-gray-800 py-4 border-b border-gray-300">
                       {selectedClass} Attendance Dashboard
                      </h1>

                      {/* Top Section: Calendar and Donut Chart */}
                      <div className="flex flex-col md:flex-row justify-between items-start gap-8 px-4">
                        {/* Calendar Section */}
                        <div className="flex-1 bg-white rounded-md border border-gray-300 shadow-md p-4">
                          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                            Highlighted Calendar
                          </h2>
                          <HighlightedCalendar highlightedDates={highlightedDates} />
                        </div>

                        {/* Donut Chart Section */}
                        <div className="flex-1 bg-white rounded-md border border-gray-300 shadow-md p-4">
                          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                            Attendance Overview
                          </h2>
                          <DonutChart />
                        </div>
                      </div>

                      {/* Bottom Section: Show Attendance */}
                      <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mx-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                          Detailed Attendance Records
                        </h2>
                        <ShowAttendance />
                      </div>
                    </div>
                  )
                ) : (
                  <div>Class not found</div>
                )
              )
              : null
              }
            </div>
          )}
        </Box>
      </Main>
    </Box>
  );
}
