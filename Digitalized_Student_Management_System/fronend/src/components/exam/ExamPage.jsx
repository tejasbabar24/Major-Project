import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "../Button"; // Custom button component
import Buttons from "@mui/material/Button";
import { MdOutlineAdd } from "react-icons/md";
import DragAndDropFileUpload from "../dragNdrop/DragNdrop.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import user from "../../assets/classCards/user.png";

import axios from "axios";

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

export default function ExamPage() {
  const userData = useSelector((state) => state.auth.userData);
  const [open, setOpen] = React.useState(true);
  const [role, setRole] = React.useState("Teacher");
 
 
 
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: "#8E6AC4" }}>
          
          <Typography variant="h4" sx={{ marginLeft: "35%" }}>
           Result
          </Typography>
        </Toolbar>
      </AppBar>

      {role === "Teacher" && (
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

          <List>
          {userData.role === "Teacher" ? <ListItem>
            <Buttons
              className="cursor-pointer"
                variant="contained"
                sx={{ fontSize: "15px", backgroundColor: "#3A2B51" }}
              >
                Upload Result <MdOutlineAdd />
              </Buttons>            
            </ListItem>
             : null }

            <Typography variant="h6" sx={{ textAlign: "center", paddingTop: 2 }}>
                Your Classes
            </Typography>
            
            <ListItem className="hover:bg-gray-100 cursor-pointer" >                
                <ListItemIcon className="mr-3">
                    <img 
                        src={user} 
                        alt="User Profile" 
                        className="w-12 h-12 rounded-full mb-2  border solid white " 
                    />
                </ListItemIcon>
                React
              </ListItem>

          </List>
         
        </Drawer>
      )}

      <Main open={open}>
        <Box sx={{ mt: 8, paddingLeft: userData.role === "Student" ? "320px" : "0px" }}>

        <div>
            
        </div>
         
        </Box>
      </Main>
    </Box>
  );
}
