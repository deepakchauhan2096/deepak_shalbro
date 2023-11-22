import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
} from "@mui/material";
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import HistoryIcon from '@mui/icons-material/History';
const EmployeeNavbar = (props) => {
  const [userName, setUserName] = useState("U");
  const [showProfile, setShowProfile] = useState(false);
  const handleClose = () => {
    setShowProfile(false);
  };
  const handleOpen = () => {
    setShowProfile(true);
  };
  const location = useLocation();

  //pathname for navigation
  console.log(location.pathname, "loc");
  const navigate = useNavigate();

  const Logout = () => {
   
  };



  const urls = [
    {
      listname: "Attendence",
      listlink: "/employee/attendance",
      icons: <FingerprintIcon />
    },
    {
      listname: "History",
      listlink: "/employee/history",
      icons: <HistoryIcon />
    },
  ];

  const Lists = (props) => {
    return (
      <Box role="presentation" sx={{ width: 250 }}>
        <List sx={{ py: 0 }}>
          <Link to={props.listlink}>
            <ListItem
              sx={{
                background:
                  location.pathname === props?.listlink ? "#3596d9" : "",
              }}
              disablePadding
            >
              <ListItemButton sx={{ color: "#fff" }}>
              <span>{props.icons}</span> {props.listname}
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Box>
    );
  };

  const post = props.state;

  console.log(post, "empdata 222");

  return (
    <>
      <Drawer
        open={showProfile}
        onClose={handleClose}
        anchor="left"
        variant="permanent"
        PaperProps={{
          className: "sidebar",
          sx: {
            overflow: "hidden",
          },
        }}
      >
        <div
          className="sidebar-header d-flex"
          style={{ justifyContent: "space-between" }}
        >
          <h3
            className="text-light"
            style={{ fontSize: "20px", lineHeight: "33px" }}
          >
            {post?.EMPLOYEE_NAME}
          </h3>
          <Tooltip title={post?.EMPLOYEE_NAME}>
            <Avatar>{post?.EMPLOYEE_NAME?.charAt(0).toUpperCase()}</Avatar>
          </Tooltip>
        </div>

        <Divider />

        {urls.map((post) => (
          <Lists  icons={post.icons} listname={post.listname} listlink={post.listlink}  />
        ))}

        <div
          className="login sidebar_footer position-absolute"
          style={{ bottom: "0" }}
        >
          <div className="logout_icon">
            <LogoutIcon style={{ display: "inline" }} />{" "}
            <div className="logout_icon d-inline" onClick={Logout}>
              Logout
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default EmployeeNavbar;
