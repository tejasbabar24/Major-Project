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
  const [role, setRole] = React.useState(userData.role);
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const handleFilesUploaded = (files) => setUploadedFiles(files);
  const [files, setFiles] = React.useState([]);
  const [selectedClass, setSelectedClass] = React.useState(""); // Initialize with an empty state or a meaningful default

  const renderContent = () => {
    switch (role) {
      case "Teacher":
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

        case "Student":
          
          const dummyData = [
            { subject: "Opearating System", marks: 19,  },
            { subject: "Software Testing", marks: 10},
            { subject: "Computer Networks", marks: 18,  },
            { subject: "Java ", marks: 20,  },
            { subject: "Python", marks: 5,  },
          ];
        
          return (
            <Table
                aria-label="Student Results"
                className="min-h-[400px] w-full bg-white p-4 shadow-lg rounded-lg border border-gray-200"
              >
                <TableHeader className="border-b-2 border-gray-200">
                  <TableColumn key="subject" className="text-left text-lg font-semibold text-gray-700 px-4 py-2">
                    Subject
                  </TableColumn>
                  <TableColumn key="marks" className="text-left text-lg font-semibold text-gray-700 px-4 py-2">
                    Marks
                  </TableColumn>
                  <TableColumn key="status" className="text-left text-lg font-semibold text-gray-700 px-4 py-2">
                    Status
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {dummyData.map((item, index) => (
                    <TableRow key={index} className="odd:bg-gray-50 even:bg-white hover:bg-gray-100 transition-colors">
                      <TableCell className="text-left text-sm text-gray-600 px-4 py-2">{item.subject}</TableCell>
                      <TableCell className="text-left text-sm text-gray-600 px-4 py-2">{item.marks}</TableCell>
                      <TableCell className="text-left text-sm text-gray-600 px-4 py-2">{item.marks> 7 ? 'Pass': "Failed " }</TableCell>
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

      {/* {role === "Teacher" && (
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
      )} */}

      <Main open={open}>
        <Box sx={{ mt: 8 }}>{renderContent()}</Box>
      </Main>
    </Box>
  );
}
