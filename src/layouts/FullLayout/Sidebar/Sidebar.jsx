import React from "react";
import { useLocation } from "react-router";
import { Link, NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { SidebarWidth } from "../../../assets/global/Theme-variable";
import LogoIcon from "../Logo/LogoIcon";

import Menuitems from "./data";
import natureBg from "../../../assets/images/backgrounds/n3.jpg";

const Sidebar = (props) => {
  const [open, setOpen] = React.useState(true);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  const SidebarContent = (
    <Box sx={{
      p: 3,
      // height: "calc(100vh - 40px)",
      height: "calc(100vh)",
      backgroundImage: `url(${natureBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <img src="" alt="" />
      <Link to="/dashboard">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LogoIcon />
        </Box>
      </Link>

      <Box>
        <List
          sx={{
            mt: 1,
            color: '#ead4f7'
          }}
        >
          {Menuitems.map((item, index) => {
            //{/********SubHeader**********/}

            return (
              <List component="li" disablePadding key={item.title}>
                <ListItem
                  onClick={() => handleClick(index)}
                  button
                  component={NavLink}
                  to={item.href}
                  selected={pathDirect === item.href}
                  sx={{
                    mb: 1,
                    ...(window.location.pathname === item.href ||
                      window.location.pathname === item.post_path ||
                      window.location.pathname.startsWith(item.edit_path) ||
                      window.location.pathname.startsWith(item.view_path)
                    )
                    && {
                      color: "white",
                      backgroundColor: (theme) => `${theme.palette.primary.main}!important`,
                    },
                  }}

                >
                  <ListItemIcon
                    sx={{

                      ...(pathDirect === item.href || window.location.pathname === item.post_path) && {
                        color: "white",
                      },
                      color: '#ead4f7'
                    }}
                  >
                    <item.icon width="20" height="20" />
                  </ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                </ListItem>
              </List>
            );
          })}
        </List>
      </Box>
      {/* <Buynow /> */}
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={props.isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      PaperProps={{
        sx: {
          width: SidebarWidth,
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

export default Sidebar;
