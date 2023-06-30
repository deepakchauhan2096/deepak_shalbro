import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import AddEmployee from "../modal/AddEmployee";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import teamImg1 from "../assests/images/team-1.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { styled } from "@mui/material/styles";
import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Snippet from "./Snippet";
import EmployeePDF from "../Invoices/EmployeePDF";
import { PDFViewer, ReactPDF, PDFDownloadLink } from "@react-pdf/renderer";
import CloseIcon from "@mui/icons-material/Close";
import Mymenu  from "../components/Menus"





const EmployeeSrc = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [allempData, setAllempData] = useState({
    COMPANY_PARENT_ID: 18,
    COMPANY_PARENT_USERNAME: "deepanshu1",
  });

  const [updatedata, setUpdateData] = useState([])
  

  // console.log("employeerowdata: =>", employeDatatable);
  console.log("All_employe_data: =>", allempData);

  useEffect(() => {
    // fetchEmployee();
    fetchAllEmployee();
  }, [updatedata]);

  const [filterData, setFilteredData] = useState({
    row: {
      _id: "6496d035a6835b787aa7b7b1",
      EMPLOYEE_DOB: "",
      EMPLOYEE_EMPLMNTTYPE: "",
      EMPLOYEE_HIRE_DATE: "",
      EMPLOYEE_HOURLY_WAGE: "",
      EMPLOYEE_ADD: "",
      EMPLOYEE_STATE: "",
      EMPLOYEE_CITY: "",
      EMPLOYEE_ID: 51,
      EMPLOYEE_PARENT_ID: 45,
      EMPLOYEE_PARENT_USERNAME: "company21",
      EMPLOYEE_MEMBER_PARENT_ID: 18,
      EMPLOYEE_MEMBER_PARENT_USERNAME: "deepanshu1",
      EMPLOYEE_ROLE: "",
      EMPLOYEE_NAME: "",
      EMPLOYEE_PHONE: null,
      EMPLOYEE_EMAIL: "",
      EMPLOYEE_USERNAME: "",
      __v: 0,
    },
  });
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const fetchAllEmployee = async () => {
    try {
      const response = await axios.put(
        "http://54.89.160.62:5001/get_employee_all",
        {
          EMPLOYEE_MEMBER_PARENT_ID: 18,
          EMPLOYEE_MEMBER_PARENT_USERNAME: "deepanshu1",
        },
        { headers }
      );
      setTimeout(() => {
        console.log("ALL EMPLOYEE data ", response);
        const data = response.data;
        // setAllempData(data.result[0].COMPANY_EMPLOYIES);
        setAllempData(data.result);
        console.log("all employee data", data.result[0].EMPLOYEE_NAME);
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
  ];

  // const rows = employeDatatable;allempData
  const rows = allempData;
  console.log("rows", rows);

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

  const tablerows = [
    {
      date: "12/06/23",
      day: "Monday",
      status: "Present",
      in: 10,
      out: 6,
      workinghrs: 8,
    },
    {
      date: "13/06/23",
      day: "Tuesday",
      status: "Present",
      in: 10,
      out: 6,
      workinghrs: 8,
    },
    {
      date: "14/06/23",
      day: "Wednesday",
      status: "Absend",
      in: 11,
      out: 6,
      workinghrs: 7,
    },
    {
      date: "14/06/23",
      day: "Thursday",
      status: "Present",
      in: 11,
      out: 6,
      workinghrs: 7,
    },
    {
      date: "14/06/23",
      day: "Friday",
      status: "Present",
      in: 11,
      out: 6,
      workinghrs: 7,
    },
    {
      date: "14/06/23",
      day: "Saturday",
      status: "Present",
      in: 11,
      out: 6,
      workinghrs: 7,
    },
  ];

  const MyScreen = styled(Paper)(({ props }) => ({
    height: "calc(100vh - 37px)",
    padding: 0,
    paddingBottom: "0",
    overflow: "auto",
  }));


  
 const updateData = (event) => {
 setUpdateData(event)
 console.log(event,"event")
 }

  


  return (
    <>
      <Container
        id="content"
        sx={{ height: "100vh", position: "relative" }}
        maxWidth="xl"
        className="containers"
      >
        <Box className="box">
          <div>
            <Button className="btn button btn-blue" variant="contained">
              Employee
            </Button>
            <AddEmployee update={(event) => updateData(event)} />
          </div>
          <MyScreen>
            <div style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
              {isLoading ? (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                >
                  <CircularProgress />
                </Box>
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
            </div>
          </MyScreen>
        </Box>

        <Box
          style={{
            display: open ? "block" : "none",
          }}
          className="box position-absolute overflow-auto"
        >
          <div className="container-fluid pb-0 g-0 position-sticky top-0">
            <Button
              onClick={handleClose}
              variant="contained"
              className="btn rounded-0"
            >
              <ArrowBackIcon style={{ fontSize: "25px" }} />
            </Button>
            {[
              "Employee Details",
              "Documents",
              "Timesheet",
              "Worksheet",
              "Acknowledge",
            ].map((item, value) => (
              <Button
                onClick={(e, index) => setIndex(value + 1)}
                variant={index == value + 1 ? "outlined" : "contained"}
                className="btn rounded-0 border-0"
              >
                {item}
              </Button>
            ))}
            
             
            <Mymenu />
            <Button
              onClick={handleClose}
              variant={"contained"}
              className="btn rounded-0 border border-top-0 border-bottom-0"
              color="error"
              style={{ position: "absolute", right: "0" }}
            >
              {<CloseIcon />}
            </Button>
          </div>

          {index === 1 ? (
            <MyScreen>
              <Grid container xl={12} sx={{ bgcolor: "" }}>
                <Grid item xl={6} p={4} pr={2}>
                  <Card sx={{ display: "flex", height: "250px" }}>
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
                          Address : {filterData.row.EMPLOYEE_STATE}
                          {""}
                          {filterData.row.EMPLOYEE_CITY}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xl={6} p={4} pl={2}>
                  <Card sx={{ display: "flex", height: "250px" }}>
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
                <Grid item xl={6} p={4} pr={2}>
                  <Card sx={{ display: "flex", height: "250px" }}>
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
                </Grid>
              </Grid>
            </MyScreen>
          ) : (
            ""
          )}
          {index === 2 ? (
            <div className=" container p-2">
              <h5 style={{ textDecoration: "underline" }}>All Documents</h5>
              <div
                className="form-control rounded-0 mb-1"
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
                className="form-control rounded-0 mb-1"
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
                className="form-control rounded-0 mb-1"
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
            </div>
          ) : (
            ""
          )}

          {index === 3 ? (
            <div className=" container p-2">
              <p>
                {" "}
                <b style={{ fontWeight: "600", color: "black" }}>
                  Employee Name :{" "}
                </b>
                {filterData.row.EMPLOYEE_NAME}
              </p>
              <p>
                {" "}
                <b style={{ fontWeight: "600", color: "black" }}>
                  Manager Name :{" "}
                </b>
                Varun Kamboj
              </p>
              <p style={{ textAlign: "right" }}>
                {" "}
                <b style={{ fontWeight: "600", color: "black" }}>
                  Week Starting :{" "}
                </b>
                6/23/2022
              </p>
              <table className="table table-hover border">
                <thead style={{ border: "1px solid black" }}>
                  <tr className="table-dark">
                    <th scope="col">Date</th>
                    <th scope="col">Day</th>
                    <th scope="col">Status</th>
                    <th scope="col">In</th>
                    <th scope="col">Out</th>
                    <th scope="col">Working hours</th>
                  </tr>
                </thead>
                <tbody>
                  {tablerows?.map((item) => (
                    <tr className="table table-striped">
                      <td>{item.date}</td>
                      <td>{item.day}</td>
                      <td>
                        <span className=" bg-success text-light rounded-pill p-1">
                          {item.status}
                        </span>
                      </td>
                      <td>{item.in}</td>
                      <td>{item.out}</td>
                      <td>{item.workinghrs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="container">
                <div className="row border">
                  <div className="col-6  pt-5 ">
                    <p className="fw-semibold text-dark">
                      Employee Signature:{" "}
                      <span
                        style={{
                          borderBottom: "2px solid black",
                          width: "200px",
                        }}
                      ></span>
                    </p>
                    <p className="fw-semibold text-dark  mt-2">
                      Manager Signature: <span></span>
                    </p>
                  </div>

                  <div className="col-5  border m-2">
                    <div className="row">
                      <div className="col-5  m-2">
                        <p className="text-dark fw-semibold">Total Hours</p>
                        <p className="text-dark fw-semibold">Rate Per Hour</p>
                        <p className="text-dark fw-semibold">Total Pay</p>
                      </div>
                      <div className="col-2  m-2">
                        <p className="bg-warning text-center fs-6 text-light">
                          48
                        </p>
                        <p className="bg-primary text-center fs-6 text-light">
                          100
                        </p>
                        <p className="bg-success text-center fs-6 text-light">
                          $4800
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row float-end  border border-danger">
                      <div className="col-6  ">
                        <button
                          className="btn btn-info text-white rounded-0 border-white"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Previous Week"
                        >
                          <ArrowBackIcon />
                        </button>
                      </div>
                      <div className="col-6 ">
                        <button
                          className="btn btn-info text-white rounded-0 border-white"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Tooltip on top"
                        >
                          <ArrowForwardIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {index === 4 ? (
            <>
              <div
                className="container p-2"
                style={{ height: "calc(100vh - 37px)", background: "#696969" }}
              >
                <Snippet />
              </div>
            </>
          ) : (
            ""
          )}

          {index === 5 ? (
            <>
              <MyScreen sx={{ padding: "0" }}>
                <PDFViewer
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "pink",
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
            </>
          ) : (
            ""
          )}
        </Box>
      </Container>
    </>
  );
};

export default EmployeeSrc;
