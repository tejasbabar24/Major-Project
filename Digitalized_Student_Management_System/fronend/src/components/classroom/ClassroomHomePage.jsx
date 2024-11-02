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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import Button from "../Button"; // Ensure this is your custom button component
import Buttons from "@mui/material/Button";
import { MdOutlineAdd } from "react-icons/md";
import ClassCard from "./ClassCard"; // Ensure you have this component
import user from "../../assets/classCards/user.png"; // Ensure you have this asset
import classBackground from "../../assets/classCards/classbackground.jpg"; // Ensure you have this asset
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const drawerWidth = 240;

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

export default function ClassroomHomePage() {
  const [createdClasses, setCreatedClasses] = React.useState([]);
  const [joinedClasses, setJoinedClasses] = React.useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const [open, setOpen] = React.useState(false);
  const [joinDrawerOpen, setJoinDrawerOpen] = React.useState(false);
  const [classname, setClassName] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [section, setSection] = React.useState("");
  const [year, setYear] = React.useState("");
  const [joinId, setJoinId] = React.useState("");


  useEffect(()=>{
    //Query 
  },[])  


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/class/create-class`, {
        classname,
        subject,
        section,
        year,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const join = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/class/join-class`, { classCode: joinId })
      .then((result) => {
        console.log(result.data.message);
        console.log(result.data.data.student);
        console.log(result.data.data.classroom);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#8E6AC4",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
          >
          <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div">
            StudyRoom
          </Typography>
          <div>
            <IconButton
              color="inherit"
              aria-label="open right drawer"
              onClick={() => setJoinDrawerOpen(!joinDrawerOpen)}
              edge="end"
            >
              <Buttons
                variant="contained"
                sx={{ fontSize: "15px", backgroundColor: "#3A2B51" }}
              >
               {userData.role ==="Teacher" ? "Create" : "Join"} <MdOutlineAdd />
              </Buttons>
            </IconButton>
          </div>
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
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Main open={open}>
        <Box sx={{ mt: 8, padding: "16px" }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
            {
              createdClasses.map((item)=>{
                <ClassCard classData={item} image={user}/>
              })
            }
            {
              joinedClasses.map((item)=>{
                <ClassCard classData={item} image={user}/>
              })
            }

            <ClassCard
              name={"Software Testing"}
              createdBy={"sadaphule"}
              image={user}
            />
            <ClassCard
              name={"Computer Network "}
              createdBy={"A wankar"}
              image={user}
            />
            <ClassCard
              name={"Data Analytics Using R"}
              createdBy={"V patil"}
              image={user}
            />
            <ClassCard
              name={"Data Structures"}
              createdBy={"lokhande"}
              image={user}
            />
            <ClassCard
              name={"Computer Security"}
              createdBy={"R molawade"}
              image={user}
            />
            <ClassCard
              name={"Computer science"}
              createdBy={"Mysterio"}
              image={user}
            />
            <ClassCard name={"Physics"} createdBy={"unknown"} image={user} />
            <ClassCard
              name={"Mathematics"}
              createdBy={"A patil"}
              image={user}
            />
            <ClassCard
              name={"Biology"}
              createdBy={"sunny leone"}
              image={user}
            />
          </div>
        </Box>
      </Main>

      <Drawer
        sx={{
          backgroundImage: `url(${classBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            marginTop: "64px",
          },
        }}
        variant="persistent"
        anchor="right"
        open={joinDrawerOpen}
      >
        <Divider />
        {
          userData.role === "Teacher" ? (
<div>
        <p className="pt-2 ml-14 text-xl">Create Class</p>
          <form
            onSubmit={handleSubmit}
            className="pl-5 pr-5 pb-5 flex justify-center flex-col"
          >
            <TextField
              label={" Class Name"}
              margin="normal"
              onChange={(e) => setClassName(e.target.value)}
            />
            <TextField
              label={" Subject"}
              margin="normal"
              onChange={(e) => setSubject(e.target.value)}
            />
            <TextField
              label={" Section"}
              margin="normal"
              onChange={(e) => setSection(e.target.value)}
            />
            <TextField
              label={" Year"}
              margin="normal"
              onChange={(e) => setYear(e.target.value)}
            />
            <Button
              type="submit"
              className="w-18 h-8 text-white text-sm text-center bg-purple-500"
            >
              Create
            </Button>
          </form>
</div>
          ) : (
            <div>
              <p className="pt-3 ml-14 text-xl">Join Class</p>
          <form
            onSubmit={join}
            className="p-5 pt-0 flex justify-center flex-col"
          >
            <TextField
              label={"Enter Class Code"}
              margin="normal"
              onChange={(e) => setJoinId(e.target.value)}
            />
            <Button
              type="submit"
              className="w-18 h-8  text-white text-sm text-center bg-purple-500"
            >
              Join
            </Button>
          </form>
        </div>
          )
        }
          <Divider />
          
      </Drawer>
    </Box>
  );
}
