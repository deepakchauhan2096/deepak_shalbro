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

const Attendance = () => {

  // let data = ;



  const Time = new Date();
  const currentTime = Time.toString().split(" ")[4];

  const [inData, setInData] = useState({
    "ATTENDANCE_ADMIN_ID": 18,
    "ATTENDANCE_ADMIN_USERNAME": "deepanshu1",
    "ATTENDANCE_COMPANY_ID": 45,
    "ATTENDANCE_COMPANY_USERNAME": "company21",
    "ATTENDANCE_EMPLOYEE_ID": 47,
    "ATTENDANCE_EMPLOYEE_USERNAME": "EMP0123",
    "ATTENDANCE_DATE_ID": "02-7-2023",
  })
  
  
  const OutDataSuccess = {...inData, "ATTENDANCE_OUT": "anurag"}
  const inDataSuccess = {...inData, "ATTENDANCE_IN": "deepak"}


  const handleSubmitIn = (event) => {
    
    // console.log(event,"myevent")
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://54.89.160.62:5001/create_emp_attendence',
      headers: { 
        'authorization_key': 'qzOUsBmZFgMDlwGtrgYypxUz', 
        'Content-Type': 'application/json'
      },
      data : event === "in" ? inDataSuccess : event === "out" ? OutDataSuccess : ""
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  };


  // console.log(inData, "datanew")


  console.log(inDataSuccess, "data s")

  const MyScreen = styled(Paper)(({ props }) => ({
    height: "calc(100vh - 37px)",
    padding: 0,
    paddingBottom: "0",
    overflow: "auto",
  }));

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
                Employee Attendance
              </Button>
            </div>
            <MyScreen>
              <Grid container sx={{height:"100%",bgcolor:"#f9f9f9",position:"relative"}} xl={12}>
                 <Paper sx={{p:2,height:"300px",width:"500px",transform:"translate(-50%,-50%)",top:"50%",left:"50%",position:"absolute"}} >
                      <form>
                        <label htmlFor="employeeId">Employee ID:</label>
                        <input
                          type="text"
                          id="employeeId"
                          value={inData.ATTENDANCE_EMPLOYEE_ID}
                          required
                        />
                        <br />

                        <Button
                          onClick={(e) => handleSubmitIn("in")}
                          name="in_btn"
                          variant="contained"
                          color="success"
                        >
                          IN
                        </Button>

                        <br />
                        <Button
                          onClick={(e) => handleSubmitIn("out")}
                          name="in_btn"
                          variant="contained"
                          color="error"
                        >
                          OUT
                        </Button>
 
                        <br />
                        <br />
                      </form>
                    </Paper>
              </Grid>
                   
            </MyScreen>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default Attendance;
