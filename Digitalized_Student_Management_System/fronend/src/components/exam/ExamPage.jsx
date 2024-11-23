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
import Button from "../Button"; // Custom button component
import Buttons from "@mui/material/Button";
import { MdOutlineAdd } from "react-icons/md";
import DragAndDropFileUpload from "../dragNdrop/DragNdrop.jsx";
import { useSelector } from "react-redux";
import { Select, SelectItem } from "@nextui-org/react";
import user from "../../assets/classCards/user.png";
import examimg from './examimg.jpg';
import AttendanceCard from "../attendance/attendanceCard.jsx";

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

export default function ExamPage() {
  const userData = useSelector((state) => state.auth.userData);
  const [open, setOpen] = React.useState(true);
  const [role] = React.useState(userData.role);
  const [selectedClass ,setselectedClass] = React.useState('')
  const [files, setFiles] = React.useState([]);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const toggleDrawer = () => setOpen(!open);

  const renderContent = () => {
    if ( selectedClass ==='upload') {
      return (
        <div className={`flex justify-center items-center w-full align-middle ${isSmallScreen ? 'flex-col' : 'flex-row'}`}>
          <img src={examimg} alt="Exam" className={` ${isSmallScreen ? 'h-42 w-42' : "h-46 w-46"}`} />
          <form className="p-6 flex flex-col gap-10 mt-16">
            <p className="text-center text-lg">Upload Students' Marks File</p>
            <Select 
              label="Your Class" 
              placeholder="Select Class" 
              className="w-full" 
              color="success" 
              defaultValue="CS"
              onChange={(e) => setselectedClass(e.target.value)}
            >
              <SelectItem value="CS">CS</SelectItem>
              <SelectItem value="ST">ST</SelectItem>
              <SelectItem value="NMA">NMA</SelectItem>
              <SelectItem value="DAR">DAR</SelectItem>
            </Select>
            <DragAndDropFileUpload files={files} setFiles={setFiles} />
            <Button type="submit" className="w-18 h-8 mt-4 text-white text-sm text-center bg-purple-500">
              Upload Attendance
            </Button>
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
                  <AttendanceCard name={"NMA"} date={"24-11-2024"} fileUrl={examimg} />
                </div>
                <div className="p-2">
                  <AttendanceCard name={"NMA"} date={"24-11-2024"} fileUrl={examimg} />
                </div>
                <div className="p-2">
                  <AttendanceCard name={"NMA"} date={"24-11-2024"} fileUrl={examimg} />
                </div>
                <div className="p-2">
                  <AttendanceCard name={"NMA"} date={"24-11-2024"} fileUrl={examimg} />
                </div>
                <div className="p-2">
                  <AttendanceCard name={"NMA"} date={"24-11-2024"} fileUrl={examimg} />
                </div>
                <div className="p-2">
                  <AttendanceCard name={"NMA"} date={"24-11-2024"} fileUrl={examimg} />
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
            Result
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
                onClick={() => { setselectedClass('upload')}}
                sx={{ fontSize: "15px", backgroundColor: "#3A2B51" }}
              >
                Upload Result <MdOutlineAdd />
              </Buttons>
            </ListItem>
          )}
          <Typography variant="h6" sx={{ textAlign: "center", paddingTop: 2 }}>
            Your Classes
          </Typography>
          <ListItem className="hover:bg-gray-100 cursor-pointer" onClick={()=>{ setselectedClass('classes')}}>
            <ListItemIcon>
              <img src={user} alt="User Profile" className="w-12 h-12 rounded-full" />
            </ListItemIcon>
            <ListItemText primary=" NMA" />
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
