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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import { MdOutlineAdd } from "react-icons/md";
import DragAndDropFileUpload from '../dragNdrop/DragNdrop.jsx';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import attendancelogo from './attendancelogo.png';
import AttendanceCard from "./attendanceCard.jsx";

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
  const [open, setOpen] = useState(true);
  const [classes, setClasses] = useState('');
  const [role, setRole] = useState(userData.role);
  const [dupRole , setDupRole] = useState(''); 
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const handleFilesUploaded = (files) => setUploadedFiles(files[0]);

  const handleClassChange = (event) => setClasses(event.target.value);

  const handleClassClick = (className) => {
    if (className === 'Upload Attendance') {
      setSelectedClass('uploadAttendance'); // Set this when "Upload Attendance" is clicked
    } else {
      setSelectedClass(className);
    }
     // Assuming you want to set this on click
  };

  useEffect(() => {
    if (userData?.role) setRole(userData.role);
  }, [userData]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <StyledAppBar position="fixed">
        <Toolbar sx={{ backgroundColor: "#8E6AC4" }}>
          {role === "Teacher" && (
            <IconButton
              color="inherit"
              aria-label="reload page"
              onClick={() => window.location.reload()}
              edge="end"
            >
              <Button variant="contained" sx={{ fontSize: "15px", backgroundColor: "#3A2B51" }}>
                Create <MdOutlineAdd />
              </Button>
            </IconButton>
          )}
          <Typography variant="h4" sx={{ marginLeft: '35%' }}>
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
            backgroundColor: '#AF96D5'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Divider />
        <Typography variant="h6" sx={{ textAlign: 'center', paddingTop: 2 }}>
          Your Classes
        </Typography>

        <ol className="flex flex-col items-center mt-4 text-lg text-center">
          { userData.role==="Teacher"?  ( 
            <li 
              className="h-8 hover:bg-slate-600 w-full" 
              onClick={() => handleClassClick("Upload Attendance")}
            >
              Upload Attendance

            </li>
          ) :  null }
          
          {["Data Structure", "Computer Networks", "Java Programming", "Database System", "Python", "Operating System"].map((className) => (
            <li key={className} className="h-8 hover:bg-slate-600 w-full" onClick={() => handleClassClick(className)}>
              {className}
            </li>
          ))}
        </ol>
      </Drawer>
      
      <Main open={open}>
        <Box sx={{ mt: 8, padding: "16px" }}>
          {  selectedClass === 'uploadAttendance' && (
            <div className="flex items-center justify-center mt-16">
              <img src={attendancelogo} alt="Attendance Logo" className="h-100 w-26" />
              <div className="w-56">
                <form className="flex flex-col justify-center">
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="select-class-label">Classes</InputLabel>
                    <Select
                      labelId="select-class-label"
                      id="select-class"
                      value={classes}
                      label="Select Class"
                      onChange={handleClassChange}
                      sx={{ width: '200px' }}
                    >
                      <MenuItem value="ALL">ALL</MenuItem>
                      <MenuItem value="SYFS">SYFS</MenuItem>
                      <MenuItem value="SYSS">SYSS</MenuItem>
                      <MenuItem value="TYFS">TYFS</MenuItem>
                    </Select>
                    <Typography variant="subtitle2" sx={{ mt: 2 }}>
                      Select Images to Upload
                    </Typography>
                  </FormControl>
                  <DragAndDropFileUpload onFilesUploaded={handleFilesUploaded} />
                  <Button type="submit" className="w-18 h-8 mt-4 text-white text-sm text-center bg-purple-500">
                    Upload Attendance
                  </Button>
                </form>
              </div>
            </div>  
          )}

          { selectedClass !== 'uploadAttendance' && (
            <div className="ml-50">
              <AttendanceCard name={selectedClass} date={'24/20/24'} />
            </div>
          )}
        </Box>
      </Main>
    </Box>
  );
}
