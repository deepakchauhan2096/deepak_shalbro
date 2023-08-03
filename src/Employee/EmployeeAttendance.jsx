import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Button, Grid, Paper, Typography } from "@mui/material";
import EmployeeNavbar from "./EmployeeNavbar";
import { useLocation } from "react-router";
import env from "react-dotenv";

const EmployeeAttendance = () => {
  const [indone, setIndone] = useState("");
  const [outdone, setOutdone] = useState("");
  const [allempData, setAllempData] = useState({});

  //employe data using route
  const location = useLocation();
  const employeeData = location.state.data.result;

  // current date and time
  const Time = new Date();
  const currentTime = Time.toString().split(" ")[4];
  const date = new Date();

  // day year month
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // console.log(year, month, day);

  // current date in 2023-07-23 formet
  var MyDate = new Date();
  var MyDateString;
  MyDate.setDate(MyDate.getDate());
  MyDateString =
    MyDate.getFullYear() +
    "-" +
    ("0" + (MyDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + MyDate.getDate()).slice(-2);

  

  // post attendance IN
  const handleSubmitIn = (event) => {
    // console.log(event, "in");
    event.preventDefault();
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://18.211.130.168:5001/create_emp_attendence`,
      headers: {
        authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
        "Content-Type": "application/json",
      },
      data: {
        ATTENDANCE_ADMIN_ID: employeeData?.EMPLOYEE_MEMBER_PARENT_ID,
        ATTENDANCE_ADMIN_USERNAME: employeeData?.EMPLOYEE_MEMBER_PARENT_USERNAME,
        ATTENDANCE_COMPANY_ID: employeeData?.EMPLOYEE_PARENT_ID,
        ATTENDANCE_COMPANY_USERNAME: employeeData?.EMPLOYEE_PARENT_USERNAME,
        ATTENDANCE_EMPLOYEE_ID: employeeData?.EMPLOYEE_ID,
        ATTENDANCE_EMPLOYEE_USERNAME: employeeData?.EMPLOYEE_USERNAME,
        ATTENDANCE_DATE_ID: MyDateString,
        ATTENDANCE_IN: new Date(),
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data), "IN ATTENDANCE");
        setIndone(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // post attendance OUT
  const handleSubmitOut = (event) => {
    // console.log(event, "out");
    event.preventDefault();
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://18.211.130.168:5001/create_emp_attendence`,
      headers: {
        authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
        "Content-Type": "application/json",
      },
      data: {
        ATTENDANCE_ADMIN_ID: employeeData?.EMPLOYEE_MEMBER_PARENT_ID,
        ATTENDANCE_ADMIN_USERNAME: employeeData?.EMPLOYEE_MEMBER_PARENT_USERNAME,
        ATTENDANCE_COMPANY_ID: employeeData?.EMPLOYEE_PARENT_ID,
        ATTENDANCE_COMPANY_USERNAME: employeeData?.EMPLOYEE_PARENT_USERNAME,
        ATTENDANCE_EMPLOYEE_ID: employeeData?.EMPLOYEE_ID,
        ATTENDANCE_EMPLOYEE_USERNAME: employeeData?.EMPLOYEE_USERNAME,
        ATTENDANCE_DATE_ID: MyDateString,
        ATTENDANCE_OUT: new Date(),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data), "OUT ATTENDANCE");
        setOutdone(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const screen = {
    height: "calc(100vh - 37px)",
    padding: 0,
    paddingBottom: "0",
    overflow: "auto",
    position: "relative",
    background: "blue",
  };

  return (
    <>
      <EmployeeNavbar data={employeeData} />
      <Box className="box">
        <div
          className="container-fluid d-flex pb-0 g-0 flex-column"
          style={{ background: "#277099" }}
        >
          <div style={{ height: "20%" }}>
            <Button
              size="small"
              className="btn button btn-blue bg-white border-0"
              variant="outlined"
            >
              Employee Attendance
            </Button>
          </div>

          <div style={screen}>
            <Grid
              container
              sx={{
                height: "100%",
                bgcolor: "#fff",
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
                  Date : {day}-{month}-{year} Time : {currentTime}
                </Typography>
                <form>
                  <div className="form-group py-2 col-xl-12">
                    <input
                      type="hidden"
                      className="form-control rounded-0"
                      placeholder="Company Name"
                      value={employeeData?.EMPLOYEE_ID}
                    />

                    <>
                      <div>
                        <b>Employee ID : </b>&nbsp;
                        {employeeData?.EMPLOYEE_ID}
                      </div>
                      <div>
                        <b>Employee Username : </b>&nbsp;
                        {employeeData?.EMPLOYEE_USERNAME}
                      </div>
                      <div>
                        <b>Employee Name : </b>&nbsp;
                        {employeeData?.EMPLOYEE_NAME}
                      </div>
                      <div>
                        <b>Phone Number : </b>&nbsp;
                        {employeeData?.EMPLOYEE_PHONE}
                      </div>
                    </>
                  </div>
                  {indone && outdone ? (
                    <p className="color-success">
                      your attendance is submitted{" "}
                    </p>
                  ) : (
                    ""
                  )}

                  <div
                    className="form-group py-2 col-xl-12"
                    style={{ position: "absolute", right: "-10px", bottom: 0 }}
                  >
                    {indone ? (
                      <Button
                        disabled
                        name="in_btn"
                        variant="contained"
                        className="btn btn-block"
                        px={2}
                      >
                        ATTENDANCE IN
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmitIn}
                        name="in_btn"
                        variant="contained"
                        color="success"
                        className="btn btn-block"
                        px={2}
                      >
                        ATTENDANCE IN
                      </Button>
                    )}{" "}
                    {outdone ? (
                      <Button disabled name="in_btn" variant="contained">
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
          </div>
        </div>
      </Box>
    </>
  );
};

export default EmployeeAttendance;
