import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { IconButton, List, ListItem, ListItemIcon, ListItemText, useMediaQuery } from "@mui/material";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import MenuIcon from "@mui/icons-material/Menu";

import Buttons from "@mui/material/Button";
import { MdOutlineAdd } from "react-icons/md";
import DragAndDropFileUpload from "../dragNdrop/DragNdrop.jsx";
import { useSelector } from "react-redux";
import { Select, SelectItem } from "@nextui-org/react";
import user from "../../assets/classCards/user.png";
import TimetableImg from './TimetableImg.png'
import AttendanceCard from "../attendance/attendanceCard.jsx";
import {Input} from "@nextui-org/react";
import {Checkbox} from "@nextui-org/react";
import {Button} from "@nextui-org/react";

const drawerWidth = 320;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0", // Override for small screens
    },
  })
);

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
   
    marginLeft: open ? `${drawerWidth}px` : "0",
    [theme.breakpoints.down("sm")]: {
      width: "100%", // Full width for small screens
      marginLeft: "0", // No margin for small screens
    },
  })
);

export default function Timetable() {
  const userData = useSelector((state) => state.auth.userData);
  const [open, setOpen] = React.useState(true);
  const [role] = React.useState(userData.role);
  const [selectedClass ,setselectedClass] = React.useState('')
  const [files, setFiles] = React.useState([]);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const[tableName , setTableName] = React.useState('')
  const [myIndex , setMyIndex] = React.useState(0)

  const [config, setConfig] =React.useState({
    lectureDuration: "",
    practicalDuration: "",
    breakDuration: "",
    breakTime: "",
    dayDuration: "",
    includeSaturday: false,
    startTime: "",
  });

  const [subjects, setSubjects] = React.useState([
    { name: "", lectureHours: "", practicalHours: "", teacher: "" },
  ]);

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: "", lectureHours: "", practicalHours: "", teacher: "" }]);
  };

  const handleSubmit = () => {
    console.log("Config Data:", config);
    console.log("Subjects Data:", subjects);
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const toggleDrawer = () => setOpen(!open);

  const renderContent = () => {
    if ( selectedClass ==='upload') {
      return (
        <div
        className={`flex justify-center items-center w-full align-middle mt-0 ${
          window.innerWidth < 768 ? "flex-col" : "flex-row"
        }`}
      >
        {/* <img
          src={TimetableImg}
          alt="Timetable"
          className={` ${window.innerWidth < 768 ? "h-42 w-42" : "h-40 w-40"}`}
        /> */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="p-6 flex flex-col gap-10 mt-16 border rounded-xl"
        >
          <p className="text-center text-lg">Fill All The Fields</p>
  
          {/* Config Fields */}
          <div className="flex flex-col gap-3">
          <div>
          <Input
                label="Time Table Name" 
                placeholder="Enter Name"
                value={tableName}
                onChange={ ()=>{setTableName()} }
              />
          </div>
            <div className="flex flex-row gap-3">
              <Input
                label="Lecture Duration"
                placeholder="Enter duration"
                value={config.lectureDuration}
                onChange={(e) => setConfig({ ...config, lectureDuration: e.target.value })}
              />
              <Input
                label="Practical Duration"
                placeholder="Enter duration"
                value={config.practicalDuration}
                onChange={(e) => setConfig({ ...config, practicalDuration: e.target.value })}
              />
            </div>
            <div className="flex flex-row gap-3">
              <Input
                label="Break Duration"
                placeholder="Enter duration"
                value={config.breakDuration}
                onChange={(e) => setConfig({ ...config, breakDuration: e.target.value })}
              />
              <Input
                label="Break Time"
                placeholder="Enter time"
                value={config.breakTime}
                onChange={(e) => setConfig({ ...config, breakTime: e.target.value })}
              />
            </div>
            <div className="flex flex-row gap-3">
              <Input
                label="Day Duration"
                placeholder="Enter duration"
                value={config.dayDuration}
                onChange={(e) => setConfig({ ...config, dayDuration: e.target.value })}
              />
              <Input
                label="Start Time"
                placeholder="Enter start time"
                value={config.startTime}
                onChange={(e) => setConfig({ ...config, startTime: e.target.value })}
              />
            </div>
            <div className="flex flex-row gap-3">
              <label>
                Include Saturday 
                <Checkbox defaultSelected color="success"
                  type="checkbox"
                  checked={config.includeSaturday}
                  onChange={(e) => setConfig({ ...config, includeSaturday: e.target.checked })}
                />
              </label>
            </div>
          </div>
  
          {/* Subject Fields */}
          <div className="flex flex-col gap-6">
            {subjects.map((subject, index) => (
                
              <div key={index} className="flex flex-row gap-3">
                <Input
                  label="Subject Name"
                  placeholder="Enter subject name"
                  value={subject.name}
                  onChange={(e) => {
                    setMyIndex(index)
                    const updatedSubjects = [...subjects];
                    updatedSubjects[index].name = e.target.value;
                    setSubjects(updatedSubjects);
                  }}
                />
                <Input
                  label="Lecture Hours"
                  placeholder="Enter hours"
                  value={subject.lectureHours}
                  onChange={(e) => {
                    const updatedSubjects = [...subjects];
                    updatedSubjects[index].lectureHours = e.target.value;
                    setSubjects(updatedSubjects);
                  }}
                />
                <Input
                  label="Practical Hours"
                  placeholder="Enter hours"
                  value={subject.practicalHours}
                  onChange={(e) => {
                    const updatedSubjects = [...subjects];
                    updatedSubjects[index].practicalHours = e.target.value;
                    setSubjects(updatedSubjects);
                  }}
                />
                <Input
                  label="Teacher Name"
                  placeholder="Enter teacher name"
                  value={subject.teacher}
                  onChange={(e) => {                   
                    const updatedSubjects = [...subjects];
                    updatedSubjects[index].teacher = e.target.value;
                    setSubjects(updatedSubjects);
                  }}
                />
              </div>
            ))}
            <div className=" flex-row gap-2x">
                <Button color="success"  className="w-fit mr-4" onClick={handleAddSubject} >
                Add Subject
                </Button>

                <Button
                color="danger"
                onClick={() => removeSubject(myIndex)}
                >
                Remove
                </Button>
            </div>
          </div>
  
          {/* Submit Button */}
          <div className=" flex w-full justify-center ">
            <Button type="submit" className="mt-2 w-fit items-center bg-blue-500 text-white">
                Submit
            </Button>
          </div>
        </form>
      </div>
      );
    } 
     if (role === "Student") {
      const dummyData = [
        { subject: "Operating System", marks: 19 },
        { subject: "Software Testing", marks: 10 },
        { subject: "Computer Networks", marks: 18 },
        { subject: "Java", marks: 20 },
        { subject: "Python", marks: 5 },
      ];
  
      return (
        <Table
          aria-label="Student Results"
          className="min-h-[400px] w-full bg-white p-4 shadow-lg rounded-lg border border-gray-200"
        >
          <TableHeader>
            <TableColumn>Subject</TableColumn>
            <TableColumn>Marks</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody>
            {dummyData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.marks}</TableCell>
                <TableCell>{item.marks > 7 ? "Pass" : "Fail"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    } 
     if (selectedClass === "classes") {
      return (
        <div className={`flex flex-wrap mt-7 ${isSmallScreen ? 'grid grid-cols-2' : 'grid grid-cols-5'}`}>
                <div className="p-2">
                  <AttendanceCard name={"NMA"} date={"24-11-2024"} fileUrl={TimetableImg} />
                </div>
                <div className="p-2">
                  <AttendanceCard name={"NMA"} date={"24-11-2024"} fileUrl={TimetableImg} />
                </div>
                <div className="p-2">
                  <AttendanceCard name={"NMA"} date={"24-11-2024"} fileUrl={TimetableImg} />
                </div>
                <div className="p-2">
                  <AttendanceCard name={"NMA"} date={"24-11-2024"} fileUrl={TimetableImg} />
                </div>
                <div className="p-2">
                  <AttendanceCard name={"NMA"} date={"24-11-2024"} fileUrl={TimetableImg} />
                </div>
                <div className="p-2">
                  <AttendanceCard name={"NMA"} date={"24-11-2024"} fileUrl={TimetableImg} />
                </div>
         </div>


      );
    }
  
    // Fallback for invalid role or unhandled states
    return <div>Please select an action or class from the sidebar.</div>;
  };
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: "#8E6AC4" }}>
          {isSmallScreen && (
            <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h4" sx={{ marginLeft: "35%" }}>
            Time Table
          </Typography>
        </Toolbar>
      </AppBar>
      {role === "Teacher" ?
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: isSmallScreen ? "56px" : "64px",
          },
        }}
        variant={isSmallScreen ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <Divider />
        <List>
          {role === "Teacher" && (
            <ListItem>
              <Buttons
                className="cursor-pointer"
                variant="contained"
                onClick={() => { setselectedClass('upload'), isSmallScreen? toggleDrawer() :null }}
                sx={{ fontSize: "15px", backgroundColor: "#3A2B51" }}
              >
                Generate Timetable <MdOutlineAdd />
              </Buttons>
            </ListItem>
          )}
          <Typography variant="h6" sx={{ textAlign: "center", paddingTop: 2 }}>
            Your Timetables
          </Typography>
          <ListItem className="hover:bg-gray-100 cursor-pointer" onClick={()=>{ setselectedClass('classes'), isSmallScreen? toggleDrawer() :null}}>
            <ListItemIcon>
              <img src={user} alt="User Profile" className="w-12 h-12 rounded-full" />
            </ListItemIcon>
            <ListItemText primary="View Timetable" />
          </ListItem>
        </List>
      </Drawer>
      :null}

      <Main open={open}>
        <Box sx={{ mt: 8 }}>{renderContent()}</Box>
      </Main>
    </Box>
  );
}
