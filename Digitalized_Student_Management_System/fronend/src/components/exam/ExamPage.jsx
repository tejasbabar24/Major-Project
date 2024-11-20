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
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner} from "@nextui-org/react";

import Button from "../Button"; // Custom button component
import Buttons from "@mui/material/Button";
import { MdOutlineAdd } from "react-icons/md";
import DragAndDropFileUpload from "../dragNdrop/DragNdrop.jsx";
import { useSelector } from "react-redux";
import {Select, SelectItem} from "@nextui-org/react";
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
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const handleFilesUploaded = (files) => setUploadedFiles(files);
  const [files, setFiles] = React.useState([]);
  const [selectedClass, setSelectedClass] = React.useState(""); // Initialize with an empty state or a meaningful default

  const renderContent = (selectedClass) => {
    switch (selectedClass) {
      case "uploadresult":
        return (
        <div className="flex justify-center items-center w-full   h-screen bg-gray-100">
        
        <form
          action=""
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg flex flex-col gap-10"
        >
          <p className=" text-center text-lg">Upload students Marks File</p>
            <Select
              label="Your Class"
              placeholder="Select Class"
              className="w-full"
              color="success"
              defaultValue="CS"
            >
              <SelectItem value="CS">CS</SelectItem>
              <SelectItem value="ST">ST</SelectItem>
              <SelectItem value="NMA">NMA</SelectItem>
              <SelectItem value="DAR">DAR</SelectItem>
            </Select>
         
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
        )

        case "viewresult":
          const dummyData = [
            { subject: "Opearating System", marks: 85, status: "Passed" },
            { subject: "Software Testing", marks: 78, status: "Passed" },
            { subject: "Computer Networks", marks: 92, status: "Passed" },
            { subject: "Java ", marks: 65, status: "Passed" },
            { subject: "Python", marks: 30, status: "Failed" },
          ];
        
          return (
            <Table
              aria-label="Student Results"
              className="min-h-[400px] w-full bg-white p-4 shadow-md rounded-lg"
            >
              <TableHeader>
                <TableColumn key="subject">Subject</TableColumn>
                <TableColumn key="marks">Marks</TableColumn>
                <TableColumn key="status">Status</TableColumn>
              </TableHeader>
              <TableBody>
                {dummyData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{item.marks}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          );
        
      default:
        return <div>Please select an action or class from the sidebar.</div>;
    }
  };

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
            {role === "Teacher" && (
              <ListItem>
                <Buttons
                  className="cursor-pointer"
                  variant="contained"
                  onClick={() => setSelectedClass("uploadresult")}
                  sx={{ fontSize: "15px", backgroundColor: "#3A2B51" }}
                >
                  Upload Result <MdOutlineAdd />
                </Buttons>
              </ListItem>
            )}

            <Typography variant="h6" sx={{ textAlign: "center", paddingTop: 2 }}>
              Your Classes
            </Typography>

            <ListItem className="hover:bg-gray-100 cursor-pointer" onClick={()=>setSelectedClass('viewresult')}>
              <ListItemIcon className="mr-3">
                <img
                  src={user}
                  alt="User Profile"
                  className="w-12 h-12 rounded-full mb-2 border solid white"
                />
              </ListItemIcon>
              Show Result
            </ListItem>
          </List>
        </Drawer>
      )}

      <Main open={open}>
        <Box sx={{ mt: 8 }}>{renderContent(selectedClass)}</Box>
      </Main>
    </Box>
  );
}
