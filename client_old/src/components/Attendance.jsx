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
import Snippet from "../Employee/Snippet";
import EmployeePDF from "../Invoices/EmployeePDF";
import { PDFViewer, ReactPDF, PDFDownloadLink } from "@react-pdf/renderer";
import CloseIcon from "@mui/icons-material/Close";

const Attendance = () => {
  const [indone, setIndone] = useState("");
  const [outdone, setOutdone] = useState("");
  // let data = ;

  const Time = new Date();
  const currentTime = Time.toString().split(" ")[4];

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const [inData, setInData] = useState({
    ATTENDANCE_ADMIN_ID: 18,
    ATTENDANCE_ADMIN_USERNAME: "deepanshu1",
    ATTENDANCE_COMPANY_ID: 45,
    ATTENDANCE_COMPANY_USERNAME: "company21",
    ATTENDANCE_EMPLOYEE_ID: 47,
    ATTENDANCE_EMPLOYEE_USERNAME: "EMP0123",
    ATTENDANCE_DATE_ID: new Date(),
  });

  const OutDataSuccess = { ...inData, ATTENDANCE_OUT: new Date() };
  const inDataSuccess = { ...inData, ATTENDANCE_IN: new Date() };

  const handleSubmitIn = (event) => {
    console.log(event, "in");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://3.84.137.243:5001/create_emp_attendence",
      headers: {
        authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
        "Content-Type": "application/json",
      },
      data: inDataSuccess,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setOutdone(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitOut = (event) => {
    console.log(event, "out");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://3.84.137.243:5001/create_emp_attendence",
      headers: {
        authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
        "Content-Type": "application/json",
      },
      data: OutDataSuccess,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setOutdone(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(currentTime, "datanew");

  console.log(inDataSuccess, "data s");

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
              <Grid
                container
                sx={{
                  height: "100%",
                  bgcolor: "#f9f9f9",
                  position: "relative",
                }}
                xl={12}
              >
                <Paper
                  sx={{
                    p: 2,
                    height: "300px",
                    width: "500px",
                    transform: "translate(-50%,-50%)",
                    top: "50%",
                    left: "50%",
                    position: "absolute",
                  }}
                >
                  <Typography>
                    Date : {day}-{month}-{year}{" "}Time : {currentTime}
                  </Typography>
                  <form>
                    <div className="form-group py-2 col-xl-12">
                      <label>Enter Your Employee ID</label>
                      <input
                        type="text"
                        className="form-control rounded-0"
                        placeholder="Company Name"
                        value={inData.ATTENDANCE_EMPLOYEE_ID}
                      />
                    </div>
                    <div className="form-group py-2 col-xl-12">
                      {outdone  ? (
                        <Button
                          disabled
                          name="in_btn"
                          variant="contained"
                          color="success"
                          px={2}
                        >
                        ATTENDANCE  IN
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmitIn}
                          name="in_btn"
                          variant="contained"
                          color="success"
                          px={2}
                        >
                        ATTENDANCE  IN
                        </Button>
                      )}
                      {" "}
                      {indone ? (
                        <Button
                          disabled
                          name="in_btn"
                          variant="contained"
                          color="error"
                        >
                         ATTENDANCE OUT
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmitOut}
                          name="in_btn"
                          variant="contained"
                          color="error"
                        >
                         ATTENDANCE OUT
                        </Button>
                      )}
                    </div>
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