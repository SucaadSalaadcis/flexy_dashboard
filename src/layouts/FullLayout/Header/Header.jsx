import React from "react";
//import { Link } from 'react-router-dom';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
  Typography,
} from "@mui/material";

import userimg from "../../../assets/images/users/user.jpg";


const pathLink = [
  { pathname: '/dashboard', text: 'Dashboard', },
  { pathname: '/permission', text: 'Permission', post_path: '/' },
  { pathname: '/country', text: 'Country', post_path: '/country_post' },
  { pathname: '/state', text: 'State', post_path: '/state_post' },
  { pathname: '/city', text: 'City', post_path: '/city_post' },
  { pathname: '/branch', text: 'Branch', post_path: '/branch_post' },
  { pathname: '/zone', text: 'Zone', post_path: '/zone_post' },
  { pathname: '/site', text: 'Site', post_path: '/site_post' },
  { pathname: '/user', text: 'User', post_path: '/user_post' },
]

import { useLocation } from "react-router-dom";

const Header = (props) => {

  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 4
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };



  return (
    <AppBar sx={{ ...props.sx, backgroundColor: '#a41af4' }} elevation={0} className={props.customClass}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <MenuOutlinedIcon width="20" height="20" />
        </IconButton>

        <Typography>{
          pathLink.map(item => (
            <div className="ml-10 md:ml-0">
              <Typography sx={{ color: 'white', fontSize: '25px' }}>
                {(location.pathname === item.pathname || location.pathname === item.post_path) && item.text}
              </Typography>
            </div>
          ))
        }</Typography>


        <Box flexGrow={1} />

        {/* ------------------------------------------- */}
        {/* Notifications Dropdown */}
        {/* ------------------------------------------- */}
        <IconButton
          aria-label="menu"
          sx={{ color: 'white' }}
          aria-controls="notification-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <NotificationsNoneOutlinedIcon width="20" height="20" />
        </IconButton>
        <Menu
          id="notification-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "200px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          <MenuItem onClick={handleClose}>Action</MenuItem>
          <MenuItem onClick={handleClose}>Action Else</MenuItem>
          <MenuItem onClick={handleClose}>Another Action</MenuItem>
        </Menu>
        {/* ------------------------------------------- */}
        {/* End Notifications Dropdown */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "25px",
            ml: 1,
          }}
        ></Box>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={userimg}
              alt={userimg}
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </Box>
        </Button>

        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "250px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          <MenuItem onClick={handleClose4}>
            <Avatar
              sx={{
                width: "35px",
                height: "35px",
              }}
            />
            <Box
              sx={{
                ml: 2,
              }}
            >
              My account
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose4}>
            <ListItemIcon>
              <PersonAddOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={handleClose4}>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose4}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>

    </AppBar>
  );
};

export default Header;
