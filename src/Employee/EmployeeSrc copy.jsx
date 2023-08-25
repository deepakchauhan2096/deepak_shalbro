import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EmployeeCreate from "./EmployeeCreate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import teamImg1 from "../assests/images/team-1.jpg";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import "../assests/css/employeesrc.css";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Skeleton,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Snippet from "./Snippet";
import EmployeePDF from "../Invoices/EmployeePDF";
import { PDFViewer, ReactPDF, PDFDownloadLink } from "@react-pdf/renderer";
import EmployeeTimeSheet from "./EmployeeTimeSheet";
import EmployeeEdit from "./EmployeeEdit";
// import env from "react-dotenv";

const EmployeeSrc = (props) => {
  //isLoading this is for the Skeleton
  const [isLoading, setIsLoading] = useState(true);
  // assigned Project which is selected from using dropdown
  const [assignedProject, setAssignedProject] = useState([]);
  // all employee data
  const [allempData, setAllempData] = useState({
    COMPANY_PARENT_ID: 18,
    COMPANY_PARENT_USERNAME: "deepanshu1",
  });
  // adding employee and it show chnages on run time
  const [updatedata, setUpdateData] = useState(false);
  // all projects data which is existing projects
  const allProjectData = props.AssignProjectData;
  // Assinging Projects
  const [filterData, setFilteredData] = useState({
    row: {
      EMPLOYEE_DOB: "",
      EMPLOYEE_EMPLMNTTYPE: "",
      EMPLOYEE_HIRE_DATE: "",
      EMPLOYEE_HOURLY_WAGE: "",
      EMPLOYEE_ADD: "",
      EMPLOYEE_STATE: "",
      EMPLOYEE_CITY: "",
      EMPLOYEE_PARENT_ID: "",
      EMPLOYEE_PARENT_USERNAME: "",
      EMPLOYEE_MEMBER_PARENT_ID: "",
      EMPLOYEE_MEMBER_PARENT_USERNAME: "",
      EMPLOYEE_ROLE: "",
      EMPLOYEE_NAME: "",
      EMPLOYEE_PHONE: "",
      EMPLOYEE_EMAIL: "",
      EMPLOYEE_USERNAME: "",
      __v: 0,
    },
  });
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = useState(1);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const rows = allempData;

  const filterallempData = props.empData;

  const getallparam = allProjectData.filter(
    (e) => e.PROJECT_NAME === selectedProject
  );

  useEffect(() => {
    fetchAllEmployee();
  }, [updatedata]);

  const handleAssignProject = (e) => {
    e.preventDefault();

    // Create a new object that combines the selected project data and employee data
    const mergedData = {
      PROJECT_ID: getallparam[0]?.PROJECT_ID,
      PROJECT_PARENT_ID: getallparam[0]?.PROJECT_PARENT_ID,
      PROJECT_MEMBER_PARENT_ID: getallparam[0]?.PROJECT_MEMBER_PARENT_ID,
      PROJECT_MEMBER_PARENT_USERNAME:
        getallparam[0]?.PROJECT_MEMBER_PARENT_USERNAME,
      PROJECT_USERNAME: getallparam[0]?.PROJECT_USERNAME,
      EMPLOYEE_ID: rows[0]?.EMPLOYEE_ID,
      EMPLOYEE_PARENT_ID: rows[0]?.EMPLOYEE_PARENT_ID,
      EMPLOYEE_PARENT_USERNAME: rows[0]?.EMPLOYEE_PARENT_USERNAME,
      EMPLOYEE_MEMBER_PARENT_ID: rows[0]?.EMPLOYEE_MEMBER_PARENT_ID,
      EMPLOYEE_MEMBER_PARENT_USERNAME: rows[0]?.EMPLOYEE_MEMBER_PARENT_USERNAME,
    };

    // Validate the form data before submission

    axios
      .post("http://18.211.130.168:5001/assign_project", mergedData, {
        headers,
      })
      .then((response) => {
        setSelectedProject(response.data.result);
        setIsSuccessMessageVisible(true);
      })
      .catch((error) => {
        console.error(error, "ERR");
      });
  };

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const fetchAllEmployee = async () => {
    try {
      const response = await axios.put(
        "http://18.211.130.168:5001/get_employee",
        {
          EMPLOYEE_MEMBER_PARENT_ID: filterallempData?.COMPANY_PARENT_ID,
          EMPLOYEE_MEMBER_PARENT_USERNAME:
            filterallempData?.COMPANY_PARENT_USERNAME,
          EMPLOYEE_PARENT_USERNAME: filterallempData?.COMPANY_USERNAME,
          EMPLOYEE_PARENT_ID: filterallempData?.COMPANY_ID,
        },
        { headers }
      );
      setTimeout(() => {
        const data = response.data;
        setAllempData(data.result);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      console.log("something Went wrong: =>", err);
    }
  };

  const columns = [
    { field: "EMPLOYEE_ID", headerName: "ID", width: 60 },
    {
      field: "EMPLOYEE_USERNAME",
      headerName: "Username",
      width: 120,
      // editable: true,
    },
    {
      field: "EMPLOYEE_NAME",
      headerName: "Name",
      width: 120,
      // editable: true,
    },
    {
      field: "EMPLOYEE_EMAIL",
      headerName: "E-mail",
      width: 120,
      // editable: true,
    },
    {
      field: "EMPLOYEE_ROLE",
      headerName: "Employee Role",
      width: 120,
      // editable: true,
    },
    {
      field: "EMPLOYEE_PHONE",
      headerName: "Phone",
      width: 110,
      // editable: true,
    },
    {
      field: "EMPLOYEE_HIRE_DATE",
      headerName: "Hire Date",
      width: 100,
      // editable: true,
    },
    {
      field: "EMPLOYEE_HOURLY_WAGE",
      headerName: "Hourly Wages",
      width: 110,
      // editable: true,
    },

    {
      field: "EMPLOYEE_EMPLMNTTYPE",
      headerName: "Employement Type",
      width: 120,
      // editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            className="view-btn primary btn btn-success"
            style={{ padding: "2px 2px" }}
            onClick={(event) => {
              handleClick(cellValues);
            }}
          >
            view
          </Button>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (cellValues) => {
        return (
          <Button
            // onClick={(event) => {
            //   handleEdit(cellValues);
            // }}
          >
            <EmployeeEdit edit={cellValues} refetch={fetchAllEmployee}/>
          </Button>
        );
      },
    },
  ];

  function downloadPDF(pdf) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "abc.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  const handleClick = (event) => {
    setFilteredData(event);
    handleOpen();
  };


  const MyScreen = styled(Paper)((props) => ({
    height: "calc(100vh - 32px)",
    padding: 0,
    paddingBottom: "0",
    overflow: "auto",
    borderRadius: 0,
    Border: 0,
    display: props.screenIndex ? "block" : "none",
  }));

  const Animations = () => {
    return (
      <Box sx={{ width: "100%" }}>
        <Skeleton animation="pulse" height={60} />
        <Skeleton animation="pulse" height={50} />
        <Skeleton animation="pulse" height={50} />
        <Skeleton animation="pulse" height={50} />
        <Skeleton animation="pulse" height={50} />
        <Skeleton animation="pulse" height={50} />
        <Skeleton animation="pulse" height={50} />
        <Skeleton animation="pulse" height={50} />
      </Box>
    );
  };

  return (
    <>
      <Box className="box" style={{ background: "#277099" }}>
        <EmployeeCreate
          mainData={filterallempData}
          name={"Employee"}
          refetch={fetchAllEmployee}
        />

        <MyScreen sx={{ display: "block", padding: 3 }}>
          <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
            {isLoading ? (
              <Animations />
            ) : (
              <DataGrid
                sx={{ border: "none" }}
                rows={rows}
                columns={columns}
                getRowId={(row) => row.EMPLOYEE_ID}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 20,
                    },
                  },
                }}
                density="compact"
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            )}
          </Box>
        </MyScreen>
      </Box>

      <Box
        style={{
          display: open ? "block" : "none",
        }}
        className="box position-absolute overflow-auto"
      >
        <div
          className="container-fluid pb-0 g-0 position-sticky top-0 "
          style={{ background: "#277099" }}
        >
          <Button
            onClick={handleClose}
            variant="contained"
            className="btn rounded-0 border-0"
            size="small"
          >
            <ArrowBackIcon style={{ fontSize: "22.5px" }} />
          </Button>
          {["Employee Details", "Timesheet", "Worksheet", "Acknowledge"].map(
            (item, value) => (
              <Button
                onClick={(e, index) => setIndex(value)}
                variant={index === value ? "outlined" : "outlined"}
                className={
                  index === value
                    ? "btn button border-bottom-0 bg-white"
                    : "btn rounded-0 border-bottom-0  rounded-0 text-light"
                }
                size="small"
              >
                {item}
              </Button>
            )
          )}
        </div>

        <MyScreen screenIndex={index === 0} sx={{ padding: 3 }}>
          {/* <Grid container xl={12}> */}
            {/* <Grid item xl={6} pr={2}>
              <Card
                sx={{
                  display: "flex",
                  height: "250px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 200 }}
                  image={teamImg1}
                  alt="Live from space album cover"
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {filterData.row.EMPLOYEE_NAME}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Email : {filterData.row.EMPLOYEE_EMAIL}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Phone : {filterData.row.EMPLOYEE_PHONE}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Password : {filterData.row.EMPLOYEE_PASSWORD}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Address : {filterData.row.EMPLOYEE_STATE}
                      {""}
                      {filterData.row.EMPLOYEE_CITY}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
            <Grid item xl={3} pl={2} screenIndex={index === 1}>
              <Card
                sx={{
                  display: "flex",
                  height: "250px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      Work detail
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Employee role : {filterData.row.EMPLOYEE_ROLE}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Employee type : {filterData.row.EMPLOYEE_EMPLMNTTYPE}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Hire Date : {filterData.row.EMPLOYEE_HIRE_DATE}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Hourly Wages : {filterData.row.EMPLOYEE_HOURLY_WAGE}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
            <Grid item xl={3} pl={2}>
              <Card
                sx={{
                  display: "flex",
                  height: "250px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      Salary detail
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Amount : {filterData.row.EMPLOYEE_ROLE}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Date : {filterData.row.EMPLOYEE_EMPLMNTTYPE}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Payment type : {filterData.row.EMPLOYEE_HIRE_DATE}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid> */}

            {/* <Grid item xl={12} pt={2}>
              <Card
                sx={{
                  display: "flex",
                  height: "250px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                
                  <h4 style={{ margin: "10px" }}>
                    Assigning Projects to{" "}
                    <span style={{ color: "tan" }}>
                      {filterData.row.EMPLOYEE_NAME}
                    </span>
                  </h4>
                  <Box m={2} display="flex" alignItems="center">
                    <div class="select">
                      <select
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                        name="format"
                        id="format"
                      >
                        <option value="Select Project" selected>
                          Select Project
                        </option>
                        {allProjectData.map((project, key) => {
                          return (
                            <option value={project.PROJECT_NAME} key={key}>
                              {project.PROJECT_NAME}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <button
                      variant="contained"
                      onClick={handleAssignProject}
                      className="assignBtn"
                    >
                      Assign Project
                    </button>

                    <Snackbar
                      open={isSuccessMessageVisible}
                      autoHideDuration={3000} 
                      onClose={() => setIsSuccessMessageVisible(false)} 
                      message="Project assigned successfully!"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Box>
                      <Typography variant="div" color="text.secondary">
                        List of Projects Assigned to Employee:
                      </Typography>
                      <List>
                        {allProjectData.map((projects) => (
                          <ListItem key={projects.PROJECT_ID}>
                            <ListItemText primary={projects.PROJECT_NAME} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Grid> */}
          {/* </Grid> */}


          <div className="table-container">
  <div className="table-row">
    <div className="table-cell employee-details">
      {/* Employee details */}
      <Card
                sx={{
                  display: "flex",
                  height: "250px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 200 }}
                  image={teamImg1}
                  alt="Live from space album cover"
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {filterData.row.EMPLOYEE_NAME}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Email : {filterData.row.EMPLOYEE_EMAIL}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Phone : {filterData.row.EMPLOYEE_PHONE}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Password : {filterData.row.EMPLOYEE_PASSWORD}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Address : {filterData.row.EMPLOYEE_STATE}
                      {""}
                      {filterData.row.EMPLOYEE_CITY}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
    </div>
    <div className="table-cell work-details">
      {/* Work details */}
      <Card
                sx={{
                  display: "flex",
                  height: "250px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      Work detail
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Employee role : {filterData.row.EMPLOYEE_ROLE}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Employee type : {filterData.row.EMPLOYEE_EMPLMNTTYPE}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Hire Date : {filterData.row.EMPLOYEE_HIRE_DATE}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Hourly Wages : {filterData.row.EMPLOYEE_HOURLY_WAGE}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
    </div>
    <div className="table-cell salary-details">
      {/* Salary details */}
      {/* ... Replace the Card component with the content */}
    </div>
  </div>
  <div className="table-row">
    <div className="table-cell project-assignment" colSpan="3">
      {/* Project assignment section */}
      {/* ... Replace the Card component with the content */}
    </div>
  </div>
</div>

        </MyScreen>
        {/* <MyScreen screenIndex={index === 1} sx={{ padding: 3 }}>
          <h5 style={{ textDecoration: "underline" }}>All Documents</h5>
          <div
            className="form-control form-control-2 rounded-0 mb-1"
            style={{ position: "relative" }}
          >
            Education Document
            <button
              style={{ position: "absolute", right: "0", top: "0" }}
              className="btn btn-primary rounded-0"
              onClick={() => downloadPDF(filterData.complianceDoc)}
            >
              Download file
            </button>
          </div>

          <div
            className="form-control form-control-2 rounded-0 mb-1"
            style={{ position: "relative" }}
          >
            Valid ID
            <button
              style={{ position: "absolute", right: "0", top: "0" }}
              className="btn btn-primary rounded-0"
              onClick={() => downloadPDF(filterData.complianceDoc)}
            >
              Download file
            </button>
          </div>
          <div
            className="form-control form-control-2 rounded-0 mb-1"
            style={{ position: "relative" }}
          >
            Other
            <button
              style={{ position: "absolute", right: "0", top: "0" }}
              className="btn btn-primary rounded-0"
              onClick={() => downloadPDF(filterData.complianceDoc)}
            >
              Download file
            </button>
          </div>
        </MyScreen> */}

        <MyScreen screenIndex={index === 1} sx={{ padding: 3 }}>
          <EmployeeTimeSheet mainData={filterData.row} />
        </MyScreen>

        <MyScreen
          screenIndex={index === 2}
          sx={{ padding: 3 }}
          className="rounded-0"
        >
          <Snippet />
        </MyScreen>

        <MyScreen screenIndex={index === 3} sx={{ padding: "0" }}>
          <PDFViewer
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          >
            <EmployeePDF
              name={filterData.row.EMPLOYEE_NAME}
              email={filterData.row.EMPLOYEE_EMAIL}
              phone={filterData.row.EMPLOYEE_PHONE}
            />
          </PDFViewer>
        </MyScreen>
      </Box>
    </>
  );
};

export default EmployeeSrc;
