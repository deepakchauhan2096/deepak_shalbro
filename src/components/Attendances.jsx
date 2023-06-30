import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import AddEmployee from "../modal/AddEmployee";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import teamImg1 from "../assests/images/team-1.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import Snippet from "./Snippet";
import EmployeePDF from "../Invoices/EmployeePDF";
import { PDFViewer, ReactPDF, PDFDownloadLink } from "@react-pdf/renderer";
import CloseIcon from "@mui/icons-material/Close";

const Attendance = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [allempData, setAllempData] = useState({
    COMPANY_PARENT_ID: 18,
    COMPANY_PARENT_USERNAME: "deepanshu1",
  });

  // console.log("employeerowdata: =>", employeDatatable);
  console.log("All_employe_data: =>", allempData);

  useEffect(() => {
    // fetchEmployee();
    fetchAllEmployee();
  }, []);

  const [filterData, setFilteredData] = useState({
    row: {
      EMPLOYEE_DOB: "",
      EMPLOYEE_EMPLMNTTYPE: "",
      EMPLOYEE_HIRE_DATE: "",
      EMPLOYEE_HOURLY_WAGE: "",
      EMPLOYEE_ADD: "",
      EMPLOYEE_STATE: "",
      EMPLOYEE_CITY: "",
      _id: "6496d035a6835b787aa7b7b1",
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
      field: "in",
      headerName: "IN",
      width: 80,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            className="view-btn "
            style={{
              padding: "2px 2px",
              background: "#00a152",
              color: "white",
            }}
            onClick={(event) => {
              handleClick(cellValues);
            }}
          >
            In
          </Button>
        );
      },
    },

    {
      field: "OUT",
      headerName: "OUT",
      width: 100,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            className="view-btn  btn btn-success btn-danger"
            style={{ padding: "2px 2px", background: "#ab003c" }}
            onClick={(event) => {
              handleClick(cellValues);
            }}
          >
            Out
          </Button>
        );
      },
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

  return (
    <>
      <Container
        id="content"
        sx={{ height: "100vh", position: "relative" }}
        maxWidth="xl"
        className="containers"
      >
        <Box className="box">
          <div className="container-fluid d-flex pb-0 g-0 flex-column">
            <div style={{ height: "20%" }}>
              <Button className="btn button btn-blue" variant="contained">
                Employee
              </Button>
            </div>

            <div style={{ height:"calc(100vh - 37px)", padding: 20, paddingBottom: "0",background:"pink" }}>
              
            </div>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default Attendance;
