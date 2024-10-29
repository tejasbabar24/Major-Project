import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import TextField from '@mui/material/TextField';
import Button from '../Button';
import Buttons from '@mui/material/Button';
import { MdOutlineAdd } from "react-icons/md";
import ClassCard from './ClassCard';
import user from '../../assets/classCards/user.png';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 0 : `-${drawerWidth}px`,
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? `${drawerWidth}px` : '0',
  width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
}));

export default function ClassroomHomePage() {
  const [open, setOpen] = React.useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false); 
  const [joinDrawerOpen, setJoinDrawerOpen] = React.useState(false); 

  const [className, setClassName] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [section, setSection] = React.useState('');
  const [year, setYear] = React.useState('');

  const [joinId, setJoinId] = React.useState('');

  const showData = (e) => {
    e.preventDefault(); 
    console.log(className, subject, joinId, section, year);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#8E6AC4' }}> 
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
              onClick={() => setRightDrawerOpen(!rightDrawerOpen)}
              edge="end"
            >
              <Buttons variant="contained" sx={{ fontSize: "15px" , backgroundColor: '#3A2B51'}}>
                Create Class <MdOutlineAdd />
              </Buttons>
            </IconButton>

            <IconButton
              color="inherit"
              aria-label="open right drawer"
              onClick={() => setJoinDrawerOpen(!joinDrawerOpen)}
              edge="end"
            >
              <Buttons variant="contained" sx={{ fontSize: "15px",  backgroundColor: '#3A2B51' }}>
                Join Class <MdOutlineAdd />
              </Buttons>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: '64px',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
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
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
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
        <Box sx={{ mt: 8 }}>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5'>
            <ClassCard name={"Software Testing"} createdBy={"sadaphule"} image={user}/>
            <ClassCard name={"Computer Network "} createdBy={"A wankar"} image={user}/>
            <ClassCard name={"Data Analytics Using R"} createdBy={"V patil"} image={user}/>
            <ClassCard name={"Data Structures"} createdBy={"lokhande"} image={user}/>
            <ClassCard name={"Computer Security"} createdBy={"R molawade"} image={user}/>
            <ClassCard name={"Computer science"}  createdBy={"Mysterio"} image={user}/>
            <ClassCard name={"physics"} createdBy={"unknown"} image={user}/>
            <ClassCard name={"mathematics"} createdBy={" A patil"} image={user}/>
            <ClassCard name={"Biology"} createdBy={"sunny leone"} image={user}/>
          </div>
        </Box>
      </Main>

      <Drawer
        sx={{
          width: drawerWidth,
          marginLeft:0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            marginTop: '64px',
          },
        }}
        variant="persistent"
        anchor="right"
        open={rightDrawerOpen}
      >
        <Divider />
        <form onSubmit={showData} className='p-5 flex justify-center flex-col'> 
          <TextField label={' Class Name'} id="classname" margin="normal" onChange={(e) => setClassName(e.target.value)} />
          <TextField label={' Subject'} id="subject" margin="normal" onChange={(e) => setSubject(e.target.value)} />
          <TextField label={' Section'} id="section" margin="normal" onChange={(e) => setSection(e.target.value)} />
          <TextField label={' Year'} id="year" margin="normal" onChange={(e) => setYear(e.target.value)} />
          <Button type='submit' className='w-18 h-6.6 text-white text-sm text-center'>Create</Button>
        </form>   
      </Drawer>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            marginTop: '64px',
          },
        }}
        variant="persistent"
        anchor="right"
        open={joinDrawerOpen}
      >
        <Divider />
        <form className='p-5 flex justify-center flex-col'> 
          <TextField label={'Enter Class Code '} id="classname" margin="normal" onChange={(e) => setJoinId(e.target.value)} />
          <Button type='submit' className='w-18 h-6.6 text-white text-sm text-center'>Join</Button>
        </form>   
      </Drawer>
    </Box>
  );
}
