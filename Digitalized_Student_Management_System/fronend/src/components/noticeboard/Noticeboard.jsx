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
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";
import Button from "../Button"; // Custom button component
import Buttons from "@mui/material/Button";
import { MdOutlineAdd } from "react-icons/md";
import classBackground from "../../assets/classCards/classbackground.jpg"; 
import noticeboardimgg2 from './noticeboardimgg2.jpg'
import DragAndDropFileUpload from '../dragNdrop/DragNdrop.jsx'

import { useSelector } from "react-redux";
import { useEffect } from "react";

const drawerWidth = 320;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "100vh",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 0 : `-${drawerWidth}px`,
    backgroundImage: `url(${noticeboardimgg2})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    

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

export default function Noticeboard() {
  const userData = useSelector((state) => state.auth.userData);
  const [open, setOpen] = React.useState(false);
  const [classname, setClassName] = React.useState("");
  

  const clearFields = () => {
    setClassName("");
    
  };

  useEffect(() => {
    clearFields();
  }, [open]);

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    // Handle class creation or join logic here
    clearFields();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "",
            justifyContent: "",
            backgroundColor: "#8E6AC4",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open right drawer"
            onClick={() => setOpen(!open)}
            edge="end"
          >
            <Buttons
              variant="contained"
              sx={{ fontSize: "15px", backgroundColor: "#3A2B51" }}
            >
              {userData.role === "Teacher" ? "Create" : "Join"} <MdOutlineAdd />
            </Buttons>
          </IconButton>

          <Typography variant="h4" noWrap component="div" sx={{marginLeft:'35%' }}>
            Notice Board
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
        <Typography variant="h6" className="pt-2 ml-4">
          {userData.role === "Teacher" ? "Publish notice" : "Join Class"}
        </Typography>
        <form onSubmit={handleFormSubmit} className="pl-5 pr-5 pb-5 flex flex-col">
          <TextField
            label="Class Name"
            margin="normal"
            value={classname}
            onChange={(e) => setClassName(e.target.value)}
          />
          
          <DragAndDropFileUpload/>
          <Button
            type="submit"
            className="w-18 h-8 text-white text-sm text-center bg-purple-500"
          >
            {userData.role === "Teacher" ? "Create" : "Join"}
          </Button>
        </form>
      </Drawer>

      <Main open={open}>
        <Box sx={{ mt: 8, padding: "16px" }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
            {/* Class Cards Placeholder */}
            {/* <ClassCard name="Class Name" createdBy="Teacher" image={user} /> */}
          </div>
        </Box>
      </Main>
    </Box>
  );
}
