import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Buttons from "@mui/material/Button";
import { MdOutlineAdd } from "react-icons/md";
import DragAndDropFileUpload from '../dragNdrop/DragNdrop.jsx';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import attendancelogo from'./attendancelogo.png'

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

const AppBar = styled(MuiAppBar, {
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
  const [open, setOpen] = React.useState(true);
  const [classes, setClasses] = React.useState('');
  const [role, setRole] = React.useState(userData.role); 

  const handleChange = (event) => {
    setClasses(event.target.value);
  };

  useEffect(() => {
    if (userData && userData.role) {
      setRole(userData.role); 
    }
  }, [userData]); 

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: "#8E6AC4" }}>
          {role === "Teacher" && ( // Show Create button only for Teachers
            <IconButton
              color="inherit"
              aria-label="open right drawer"
              onClick={() => setOpen(!open)} // Toggle the drawer
              edge="end"
            >
              <Buttons variant="contained" sx={{ fontSize: "15px", backgroundColor: "#3A2B51" }}>
                Create <MdOutlineAdd />
              </Buttons>
            </IconButton>
          )}
          <Typography variant="h4" sx={{ marginLeft: '35%' }}>
            Attendance
          </Typography>
        </Toolbar>
      </AppBar>
      
      
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              marginTop: "64px",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <Divider />
          <Typography variant="h6" className="pt-2 ml-6">
            Publish Notice
          </Typography>
        </Drawer>
      

      <Main open={open}>
        <Box sx={{ mt: 8, padding: "16px" }}>
          {role === 'Teacher' && ( // Only show for Teacher role
          <div className=" flex items-center">
          <div>
            <img src={attendancelogo} alt="" />
          </div>
            <div className="w-56 "   >
              <form>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Classes</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={classes}
                    label="Select class"
                    onChange={handleChange}
                  >
                    <MenuItem value="ALL">ALL</MenuItem>
                    <MenuItem value="SYFS">SYFS</MenuItem>
                    <MenuItem value="SYSS">SYSS</MenuItem>
                    <MenuItem value="TYFS">TYFS</MenuItem>
                  </Select>
                </FormControl>
                <DragAndDropFileUpload />
              </form>
            </div>
            </div>  
          )}

          {role === 'Student' && ( // Only show for Student role
            <div>
              Student Content
            </div>
          )}
        </Box>
      </Main>
    </Box>
  );
}
