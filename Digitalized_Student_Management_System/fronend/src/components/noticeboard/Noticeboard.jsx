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
import NoticeCard from "./NoticeCard.jsx";
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

export default function Noticeboard() {
  const userData = useSelector((state) => state.auth.userData);
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [role, setRole] = React.useState(userData.role);
  const [classes, setClasses] = React.useState("");
  const [joinedClasses, setJoinedClasses] = React.useState([]);
  const [uploadFiles, setUploadedFiles] = React.useState([]);
  const [createdClasses, setCreatedClasses] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  const handleFilesUploaded = (files) => {  
    setUploadedFiles(files[0]);
  };

  useEffect(() => {
    if (userData.role === "Teacher") {
      axios
        .get("http://localhost:8000/class/created-classes")
        .then((result) => {
          setCreatedClasses(result.data.data.classes);
        })
        .catch((err) => console.log(err));
    } else if (userData.role === "Student") {
      axios
        .get("http://localhost:8000/class/joined-classes")
        .then((result) => {
          setJoinedClasses(result.data.data.classArr);
        })
        .catch((err) => console.log(err));
    }
  }, [createdClasses,joinedClasses]);

  const clearFields = () => {
    setDescription("");
    setUploadedFiles([]);
    setOpen(false)
    setClasses("");
    setFiles([])
    
  };

  const handleChange = (event) => {
    setClasses(event.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", description);
    formData.append("classname", classes);
    formData.append("attachment", uploadFiles);

    axios
      .post("http://localhost:8000/class/notice", formData)
      .then((result) => {
        const newNotice = result.data.data;
        
        // Update the state with the new notice
        if (role === "Teacher") {
          setCreatedClasses((prevClasses) => {
            return prevClasses.map((classInfo) =>
              classInfo.classname === classes
                ? { ...classInfo, notice: [newNotice, ...classInfo.notice] }
                : classInfo
            );
          });
        } else if (role === "Student") {
          setJoinedClasses((prevClasses) => {
            return prevClasses.map((classInfo) =>
              classInfo.classname === classes
                ? { ...classInfo, notice: [newNotice, ...classInfo.notice] }
                : classInfo
            );
          });
        }
      })
      .catch((error) => console.log(error));
      clearFields()
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: "#8E6AC4" }}>
          {role === "Teacher" && (
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
                Create <MdOutlineAdd />
              </Buttons>
            </IconButton>
          )}
          <Typography variant="h4" sx={{ marginLeft: "35%" }}>
            Notice Board
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
          <Typography variant="h6" className="pt-2 ml-6">
            Publish Notice
          </Typography>
          <form
            onSubmit={handleFormSubmit}
            className="pl-5 pr-5 pb-5 flex flex-col"
          >
            <TextField
              label="Description"
              margin="normal"
              value={description}
              multiline
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="large">
              <InputLabel id="demo-select-small-label">Classes</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={classes}
                label="select class"
                onChange={handleChange}
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
            </FormControl>
            <DragAndDropFileUpload onFilesUploaded={handleFilesUploaded} files={files} setFiles={setFiles}/>
            <Button
              type="submit"
              className="w-18 h-8 mt-4 text-white text-sm text-center bg-purple-500"
            >
              Create
            </Button>
          </form>
        </Drawer>
      )}

      <Main open={open}>
        <Box sx={{ mt: 8, paddingLeft: userData.role === "Student" ? "320px" : "0px" }}>
          <div className="flex flex-col gap-2">
            {userData.role === "Teacher"
              ? createdClasses
                  .flatMap((classInfo) =>
                    classInfo.notice.map((notice) => ({
                      ...notice,
                      owner: classInfo.owner,
                      classname: classInfo.classname,
                    }))
                  )
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt (most recent first)
                  .map((sortedNotice) => (
                    <NoticeCard
                      key={sortedNotice.createdAt}
                      fileUrls={[sortedNotice.attachment]}
                      date={sortedNotice.createdAt}
                      from={sortedNotice.owner}
                      to={sortedNotice.classname}
                      desc={sortedNotice.description}
                    />
                  ))
              : joinedClasses
                  .flatMap((classInfo) =>
                    classInfo.notice.map((notice) => ({
                      ...notice,
                      owner: classInfo.owner,
                      classname: classInfo.classname,
                    }))
                  )
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt (most recent first)
                  .map((sortedNotice) => (
                    <NoticeCard
                      key={sortedNotice.createdAt}
                      fileUrls={[sortedNotice.attachment]}
                      date={sortedNotice.createdAt}
                      from={sortedNotice.owner}
                      to={sortedNotice.classname}
                      desc={sortedNotice.description}
                    />
                  ))}
          </div>
        </Box>
      </Main>
    </Box>
  );
}
