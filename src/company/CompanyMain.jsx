import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import AddProject from "../modal/AddProject";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Skeleton,
  Tooltip,
  styled,
} from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ProjectCreate from "./ProjectCreate";
import ProjectUpload from "./ProjectUpload";
import EmployeeSrc from "../Employee/EmployeeSrc";
import EmployeeAttendance from "../Employee/EmployeeAttendance";
import { MyContext } from "./Mycontext";
import CompanyDashboard from "./CompanyDashboard";
import Project from "./Project";

const CompanyMain = () => {
  const [open, setOpen] = React.useState(false);
  const [navIndex, setNavIndex] = useState(0);
const [projectData,setProjectData] = useState({})
  // modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // get Company data
  const navigate = useNavigate();
  const location = useLocation();


  console.log("location of the Project cerattion", location.state);

  // useEffect(() => {
  //   setText(location.state.props);
  // }, [setText]);

  useEffect(() => {
    fetchProjects();
  }, [location.state.props]);


  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const fetchProjects = async (e) => {
    try {
      const response = await axios.put(
        "http://3.84.137.243:5001/get_projects",
        {
          PROJECT_PARENT_ID: location.state.props.COMPANY_ID,
          PROJECT_PARENT_USERNAME: location.state.props.COMPANY_USERNAME,
          PROJECT_MEMBER_PARENT_ID: location.state.props.COMPANY_PARENT_ID,
          PROJECT_MEMBER_PARENT_USERNAME:
            location.state.props.COMPANY_PARENT_USERNAME,
        },
        { headers }
      );
      setTimeout(() => {
        const data = response.data;
        setProjectData(data?.result);
      
        console.log("contracts Data : =>", data);
      }, 1000);
    } catch (err) {
      console.log("Something Went Wrong: =>", err);
    }
  };

  console.log(projectData, "projectdata");

    
  const NavScreen = styled(Paper)((props) => ({
    height: "calc(100vh)",
    padding: 0,
    paddingBottom: "0",
    overflow: "auto",
    borderRadius: 0,
    Border: 0,
    background: "#277099",
    display: props.screenIndex ? "block" : "none",
  }));

  const MyScreen = styled(Paper)((props) => ({
    height: "calc(100vh)",
    padding: 0,
    paddingBottom: "0",
    overflow: "auto",
    borderRadius: 0,
    Border: 0,
    display: props.screenIndex ? "block" : "none",
  }));

  const MyScreenbox = styled(Paper)((props) => ({
    height: "calc(100vh - 50.5px)",
    paddingBottom: "0",
    borderRadius: 0,
    Border: 0,
    position: "relative",
    boxShadow: "none",
  }));

  const urls = [
    {
      listname: "Project",
    },
    {
      listname: "Dashboard",
    },
    {
      listname: "Document",
    },
    {
      listname: "Employees",
    }
  ];

  console.log(navIndex, "navindex");

  // navigation list

  const Lists = (props) => {
    return (
      <Box role="presentation" sx={{ width: 250 }}>
        <List sx={{ py: 0 }} onClick={() => setNavIndex(props.value)}>
          <ListItem
            sx={{
              background: props.value === navIndex ? "#3596d9" : "",
            }}
            disablePadding
          >
            <ListItemButton sx={{ color: "whitesmoke" }}>
              {props.listname}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    );
  };


  return (
    <>
      <Drawer
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
          <h4>{location.state.props.COMPANY_NAME}</h4>

          <Tooltip title={location.state.props.COMPANY_USERNAME}>
            <Avatar>
              {[location.state.props.COMPANY_NAME][0]?.charAt(0).toUpperCase()}
            </Avatar>
          </Tooltip>
        </div>

        <Divider />

        {urls.map((post, index) => (
          <Lists
            listname={post.listname}
            listlink={post.listlink}
            value={index}
          />
        ))}

        <div
          className="login sidebar_footer position-absolute"
          style={{ bottom: "0" }}
        >
          <div className="logout_icon">
            <div className="logout_icon d-inline">
              <Button className="text-white" onClick={() => navigate(-1)}>
                <LogoutIcon style={{ display: "inline" }} /> Exit
              </Button>
            </div>
          </div>
        </div>
      </Drawer>

      <NavScreen screenIndex={navIndex === 0}>
        <Project recieveData={location.state.props} />
      </NavScreen>

      <NavScreen screenIndex={navIndex === 1}>
        <CompanyDashboard />
      </NavScreen>

      <NavScreen screenIndex={navIndex === 2}>
        <Box className="box">
          <MyScreen screenIndex={true}>
            <MyScreenbox sx={{ m: 3 }}>
              <ProjectUpload empData={location.state.props}/>
            </MyScreenbox>
          </MyScreen>
        </Box>
      </NavScreen>

      <NavScreen screenIndex={navIndex === 3}>
        <EmployeeSrc empData={location.state.props} AssignProjectData={projectData} />
      </NavScreen>
    </>
  );
};

export default CompanyMain;
