import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
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

const EmployeeNavbar = (props) => {
  const [userName, setUserName] = useState("U");

  const [showProfile, setShowProfile] = useState(false);

  const handleClose = () => {
    setShowProfile(false)
  }

  const handleOpen = () => {
    setShowProfile(true)
  }


  const location = useLocation();
  console.log(location.pathname, "loc");

  const navigate = useNavigate();

  const Logout = () => {
    setShowProfile(false);
    signOut(auth)
      .then(() => {
        navigate("/employee/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.email);
      } else setUserName("");
    });
  }, []);

  const urls = [
    {
      listname: "Attendence",
      listlink: "/dashboard",
    },
    {
      listname: "My Project",
      listlink: "/project",
    }
  ];



  const Lists = (props) => {
    return (
      
      <Box role="presentation" sx={{width:250}}>
        
          <List sx={{ py: 0 }}>
            <ListItem
              sx={{
                background:
                  location.pathname === props?.listlink ? "#3596d9" : "",
              }}
              disablePadding
            >
              <ListItemButton sx={{ color: "#fff" }}>
                {props.listname}
              </ListItemButton>
            </ListItem>
          </List>
      </Box>
    );
  };


  const post = props.empData
  
//  console.log(props.empData, "empdata")
  return (
    <>
    
      <Drawer
        open={showProfile}
        onClose={handleClose}
        anchor="left"
        variant="permanent"
        PaperProps={{
          className: "sidebar",
          sx:{
            overflow:"hidden"
          }
        }}
      >
        
        <div
          className="sidebar-header d-flex"
          style={{ justifyContent: "space-between" }}
        >
          <h3 className="text-white">{post?.EMPLOYEE_NAME}</h3>
          <Tooltip title={post?.EMPLOYEE_NAME}>
            <Avatar>{post?.EMPLOYEE_NAME?.charAt(0).toUpperCase()}</Avatar>
          </Tooltip>
        </div>

        <Divider/>

        {urls.map((post) => (
          <Lists listname={post.listname} listlink={post.listlink} />
        ))}

        <div
          className="login sidebar_footer position-absolute"
          style={{ bottom: "0" }}
        >
          <div className="logout_icon">
            <LogoutIcon style={{ display: "inline" }} />{" "}
            <div className="logout_icon d-inline" onClick={Logout}>
              Exit
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default EmployeeNavbar;
