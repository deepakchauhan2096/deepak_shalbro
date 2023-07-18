
import React, { useState, useEffect } from "react";
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
  Tooltip,
  styled,
} from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { Link, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "./Navbar";
import ProjectCreate from "./ProjectCreate";

import Upload from "./ProjectUpload";
import ProjectUpload from "./ProjectUpload";
import EmployeeCreate from "../Employee/EmployeeCreate";
import EmployeeSrc from "../Employee/EmployeeSrc";
import EmployeeAttendance from "../Employee/EmployeeAttendance";
import FileInput from "./FileInput"
import AllDocument from "./AllDocument";
import UploadUi from "./UploadUi";

const CompanyDashboard = () => {
  const [data, setData] = useState({
    row: {
      PROJECT_ID: 52,
      PROJECT_PARENT_ID: 45,
      PROJECT_PARENT_USERNAME: "company21",
      PROJECT_MEMBER_PARENT_ID: 18,
      PROJECT_MEMBER_PARENT_USERNAME: "deepanshu1",
      PROJECT_ROLE: "",
      PROJECT_NAME: "construction",
      PROJECT_PHONE: 7988155813,
      PROJECT_USERNAME: "contract01",
      PROJECT_START_DATE: "2023-06-01",
      PROJECT_END_DATE: "2023-06-26",
      PROJECT_SUPERVISOR: "Jigyashuu",
      PROJECT_PROGRESS: "40",
      __v: 0,
    },
  });

  
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = useState(1);
  const [ProjectData, setProjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [navIndex, setNavIndex] = useState(0);
  const [updatedata, setUpdateData] = useState([]);


 // modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log("all contracts: =>>>",ProjectData)
  const location = useLocation();

  console.log("location of the Project cerattion", location.state);

  useEffect(() => {
    fetchProjects();
  },[]);


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
        setIsLoading(false);
        console.log("contracts Data : =>", data);
      }, 1000);
    } catch (err) {
      console.log("Something Went Wrong: =>", err);
    }
  };

  const columns = [
    { field: "PROJECT_ID", headerName: "ID", width: 90 },

    {
      contractname: "Contracts",
      counts: "300",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing",
      url: "Learn More",
    },
    {
      contractname: "Employees",
      counts: "200",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing",
      url: "Learn More",
    },
    {
      contractname: "Supplier",
      counts: "200",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing",
      url: "Learn More",
    },
    {
      contractname: "Sub-Contractors",
      counts: "200",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing",
      url: "Learn More",
    },
    {
      contractname: "Payments",
      counts: "200",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing",
      url: "Learn More",
    },
    {
      contractname: "Reminders",
      counts: "200",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing",
      url: "Learn More",
    },
    {
      contractname: "Reminders",
      counts: "200",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing",
      url: "Learn More",
    },
  ];

  const data2 = [
    {
      Paymentstatus: "15",
      Pending: "300",
      Paymentcomplete: "14",
      Approval: "Learn More",
    },
  ];

  const card = (
    <>
      {data.map((post) => (
        <Grid xl={4} xs={12} item spacing={3}>
          <Card sx={{ m: 0.5 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 0 }} color="primary">
                {post.contractname}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Total {post.contractname}: {post.counts}
              </Typography>
              <Typography component="div">{post.description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">{post.url}</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );

  const card2 = (
    <>
      {data2.map((post) => (
        <Grid xl={12} item spacing={3}>
          <Card sx={{ m: 0.5 }}>
            <CardContent>
              <Typography
                variant="h5"
                sx={{ mb: 1, display: "inline-block" }}
                color="primary"
              >
                Payment Status{" "}
                <Typography
                  sx={{
                    display: "inline-block",
                    color: "#fff",
                    background: "red",
                    px: 1,
                    borderRadius: 10,
                  }}

                ></Typography>
              </Typography>
              <Typography
                variant=""
                sx={{ mb: 1, display: "inline-block" }}
                color="primary"
              >
                Panding{" "}
                <Typography
                  sx={{
                    display: "inline-block",
                    color: "#333",
                    background: "yellow",
                    px: 1,
                    borderRadius: 10,
                  }}
                >
                  {post.Pending}
                </Typography>
              </Typography>
              <Typography
                variant=""
                sx={{ mb: 1, display: "inline-block" }}
                color="primary"
              >
                Payment Complete{" "}
                <Typography
                  sx={{
                    display: "inline-block",
                    color: "#fff",
                    background: "green",
                    px: 1,
                    borderRadius: 10,
                  }}
                >
                  {post.Paymentcomplete}
                </Typography>
              </Typography>
              <Typography
                variant=""
                sx={{ mb: 1, display: "inline-block" }}
                color="primary"
              >
                Waiting for Approval{" "}
                <Typography
                  sx={{
                    display: "inline-block",
                    color: "#fff",
                    background: "red",
                    px: 1,
                    borderRadius: 10,
                  }}
                >
                  {post.Paymentcomplete}
                </Typography>
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">{post.url}</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );

  return (
    <>
      <Box className="box" overflow={"auto"}>
        <Grid container spacing={2} sx={{ p: 3.5 }}>
          <Grid container item xl={9} xs={12}>
            {card}
          </Grid>

          <Grid container item xl={3} xs={12}>
            {card2}
          </Grid>
        </Grid>
      </Box>

    </>
  );
};

export default CompanyDashboard;
