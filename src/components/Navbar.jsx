import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

const Navbar = () => {
  const [userName, setUserName] = useState("U");
  const [index, setIndex] = useState(1);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  console.log(location.pathname, "loc");

  const navigate = useNavigate();

  const Logout = () => {
    setShowProfile(false);
    signOut(auth)
      .then(() => {
        navigate("/login");
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
      listname : "Dashboard",
      listlink :"/dashboard"
    },
    {
      listname : "Company",
      listlink :"/company"
    },
    {
      listname : "Contract",
      listlink :"/contract"
    },
    {
      listname : "Sub Contract",
      listlink :"/subcontract"
    },
    {
      listname : "Employee",
      listlink :"/employee"
    }
  ]






  const Lists = (props) => {
    return (<Link to={props.listlink}>
            <List sx={{py:0}}>
              <ListItem
                sx={{
                  background:
                    location.pathname === props.listlink ? "#3596d9" : "",
                }}
                disablePadding
              >
                <ListItemButton sx={{color:"#fff"}}>{props.listname}</ListItemButton>
              </ListItem>
            </List>
    </Link>)
  }

  return (
    <>
      <nav id="sidebar" style={{ height: "100vh", position: "relative" }}>
        <div
          className="sidebar-header d-flex"
          style={{ justifyContent: "space-between" }}
        >
          <h3>Shalbro</h3>
          <Tooltip title={userName}>
            <Avatar>{userName.charAt(0).toUpperCase()}</Avatar>
          </Tooltip>
        </div>

        <ul className="list-unstyled components">
          {urls.map((post) => <Lists listname={post.listname} listlink={post.listlink} />)}
        </ul>

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
      </nav>
    </>
  );
};

export default Navbar;
