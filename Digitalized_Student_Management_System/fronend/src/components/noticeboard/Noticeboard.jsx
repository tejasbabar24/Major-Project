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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "../Button"; // Custom button component
import Buttons from "@mui/material/Button";
import { MdOutlineAdd } from "react-icons/md";
import noticeboardimgg2 from './noticeboardimgg2.jpg';
import NMA1 from './NMA1.pdf'
import DragAndDropFileUpload from '../dragNdrop/DragNdrop.jsx';

import { useSelector } from "react-redux";
import { useEffect } from "react";
import NoticeCard from "./NoticeCard.jsx";

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
    // backgroundImage: `url(${})`,
    // backgroundSize: "cover",
    // backgroundPosition: "center",
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
  const [classes, setClasses] = React.useState('');

  const clearFields = () => {
    setDescription("");
  };

  const handleChange = (event) => {
    setClasses(event.target.value);
  };

  useEffect(() => {
    setRole(userData.role); // Ensure role updates correctly on user data change
    clearFields();
  }, [open, userData]); // Dependency on userData

  const handleFormSubmit = (e) => {
    e.preventDefault();
    clearFields();
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
              <Buttons variant="contained" sx={{ fontSize: "15px", backgroundColor: "#3A2B51" }}>
                Create <MdOutlineAdd />
              </Buttons>
            </IconButton>
          )}
          <Typography variant="h4" sx={{ marginLeft: '35%' }}>
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
          <form onSubmit={handleFormSubmit} className="pl-5 pr-5 pb-5 flex flex-col">
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
                <MenuItem value="ALL">ALL</MenuItem>
                <MenuItem value={'SYFS'}>SYSS</MenuItem>
                <MenuItem value={"SYSS"}>SYFS</MenuItem>
                <MenuItem value={"TYFS"}>TYFS</MenuItem>
              </Select>
            </FormControl>
            <DragAndDropFileUpload />
            <Button type="submit" className="w-18 h-8 mt-4 text-white text-sm text-center bg-purple-500">
              Create
            </Button>
          </form>
        </Drawer>
      )}

      <Main open={open}>
        <Box sx={{ mt: 8, padding: "16px" }}>
          <div className="flex flex-col gap-2">
            <NoticeCard fileUrls={[noticeboardimgg2 , NMA1] } date={'11/12/24'} from={"sadaphule"} to={'SYFS'} desc={'All students are hereby informed that they must need to follow schedule of projects demonstration given by mentors. If you were planned to go out of mumbai and not able to come to institute then you must had shown to mentor. Dont give any excuses as follow up to mentor and submission is needed from ur side.'}/>
            <NoticeCard  date={'11/12/24'} from={"molawade"} to={'SYFS'} desc={'The project groups who are under my guidance (R. V. Molawade),have to meet me on Thursday along with your project workdone and soft copy of blackbook at 11.00am'}/>
            <NoticeCard fileUrls={[noticeboardimgg2 , NMA1] } date={'11/12/24'} from={"komatwar"} to={'SYFS'} desc={'All students are hereby informed that they must need to follow schedule of projects demonstration given by mentors. If you were planned to go out of mumbai and not able to come to institute then you must had shown to mentor. Dont give any excuses as follow up to mentor and submission is needed from ur side.'}/>
            <NoticeCard fileUrls={[noticeboardimgg2 , NMA1] } date={'11/12/24'} from={"wankar"} to={'SYFS'} desc={'All students have to write these assignments of EDP and EVS in hand written files and bring it while coming to the practical examination.'}/>
          </div>
        </Box>
      </Main>
    </Box>
  );
}
