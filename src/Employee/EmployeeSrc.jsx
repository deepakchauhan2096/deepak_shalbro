import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EmployeeCreate from "../Employee/EmployeeCreate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import teamImg1 from "../assests/images/team-1.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { styled } from "@mui/material/styles";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import Snippet from "./Snippet";
import EmployeePDF from "../Invoices/EmployeePDF";
import { PDFViewer, ReactPDF, PDFDownloadLink } from "@react-pdf/renderer";
import CloseIcon from "@mui/icons-material/Close";
import Mymenu from "../components/Menus";
import EmployeeTimeSheet from "./EmployeeTimeSheet";


const EmployeeSrc = (props) => {

 console.log(props, "empdtat")
  const [isLoading, setIsLoading] = useState(true);

  const [allempData, setAllempData] = useState({
    COMPANY_PARENT_ID: 18,
    COMPANY_PARENT_USERNAME: "deepanshu1",
  });

  const [updatedata, setUpdateData] = useState(false);

  // console.log("employeerowdata: =>", employeDatatable);
  console.log("All_employe_data: =>", allempData);

  const filterallempData =  props.empData;
  console.log(filterallempData,"single data")

  useEffect(() => {
    fetchAllEmployee();
  },[updatedata]);

  console.log(updatedata, "updateddata")

  const [filterData, setFilteredData] = useState({
    row: {
      EMPLOYEE_DOB: "",
      EMPLOYEE_EMPLMNTTYPE: "",
      EMPLOYEE_HIRE_DATE: "",
      EMPLOYEE_HOURLY_WAGE: "",
      EMPLOYEE_ADD: "",
      EMPLOYEE_STATE: "",
      EMPLOYEE_CITY: "",
      EMPLOYEE_PARENT_ID: 45,
      EMPLOYEE_PARENT_USERNAME: "company21",
      EMPLOYEE_MEMBER_PARENT_ID: 18,
      EMPLOYEE_MEMBER_PARENT_USERNAME: "deepanshu1",
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const fetchAllEmployee = async () => {
    try {
      const response = await axios.put(
        "http://3.84.137.243:5001/get_employee",
        {
          EMPLOYEE_MEMBER_PARENT_ID: filterallempData.COMPANY_PARENT_ID,
          EMPLOYEE_MEMBER_PARENT_USERNAME: filterallempData.COMPANY_PARENT_USERNAME,
          EMPLOYEE_PARENT_USERNAME: filterallempData.COMPANY_USERNAME,
          EMPLOYEE_PARENT_ID: filterallempData.COMPANY_ID,
        },
        { headers }
      );
      setTimeout(() => {
        console.log("ALL EMPLOYEE data ", response);
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
      width: 120,
      // editable: true,
    },
    // {
    //   field: "EMPLOYEE_ADD",
    //   headerName: "Address",
    //   width: 120,
    //   // editable: true,
    // },
    // {
    //   field: "EMPLOYEE_CITY",
    //   headerName: "City",
    //   width: 80,
    //   // editable: true,
    // },
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

  const MyScreen = styled(Paper)((props) => ({
    height: "calc(100vh - 32px)",
    padding: 0,
    paddingBottom: "0",
    overflow: "auto",
    borderRadius: 0,
    Border: 0,
    display: props.screenIndex ? "block" : "none",
  }));

  // const updateData = (event) => {
  //   setUpdateData(event);
  // };

  console.log(index, "index");

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
      <Box className="box">
        <EmployeeCreate  mainData={filterallempData} update={(event) => setUpdateData(event)} name={"Employee"} />
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
        <div className="container-fluid pb-0 g-0 position-sticky top-0">
          <Button
            onClick={handleClose}
            variant="contained"
            className="btn rounded-0 border-0"
            size="small"
          >
            <ArrowBackIcon style={{ fontSize: "22.5px" }} />
          </Button>
          {[
            "Employee Details",
            // "Documents",
            "Timesheet",
            "Worksheet",
            "Acknowledge",
          ].map((item, value) => (
            <Button
              onClick={(e, index) => setIndex(value)}
              variant={index === value ? "outlined" : "contained"}
              className="btn rounded-0 border-0"
              size="small"
            >
              {item}
            </Button>
          ))}
        </div>

        <MyScreen screenIndex={index === 0} sx={{ padding: 3 }}>
          <Grid container xl={12}>
            <Grid item xl={6} pr={2}>
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
            <Grid item xl={6} pl={2} screenIndex={index === 1}>
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
            <Grid item xl={6} pr={2} pt={2}>
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
        {/* <MyScreen screenIndex={index === 1} sx={{ padding: 3 }}>
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
        </MyScreen> */}

        <MyScreen screenIndex={index === 1} sx={{ padding: 3 }}>
          <EmployeeTimeSheet mainData={filterData.row}/>
        </MyScreen>

        <MyScreen
          screenIndex={index === 2}
          sx={{ background: "#696969", padding: 3 }}
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
