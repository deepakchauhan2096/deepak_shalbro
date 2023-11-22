import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

import SimpleBackdrop from "../components/Backdrop";
import locationIcon from "../assests/images/location.png";
import placeholder from "../assests/images/placeholder.png";
import EmployeeNavbar from "./EmployeeNavbar";



const EmployeeHistory = (props) => {
  const employeeData = props.state.result;
  const [historyData, setHistory] = useState([]);

  //today date
  const DateToday = new Date().toISOString().split("T")[0];
  console.log(DateToday); // Outputs: "2023-08-18" (assuming the current date is August 18, 2023)

  const currentDates = new Date();
  currentDates.setDate(currentDates.getDate());
  const year = currentDates.getFullYear();
  const month = String(currentDates.getMonth() + 1).padStart(2, "0");
  const day = String(currentDates.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  console.log(formattedDate, "for");

  //previous dats

  const DatePrevious = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  console.log(DatePrevious); // Outputs a date 30 days before the current date in "2023-07-27" format

  // get employee report

  // const headers = {
  //   "Content-Type": "application/json",
  //   authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  // };

  const gettimesheet = async (e) => {
    try {
      const response = await axios.put(
        "/api/get_employee_all_for_attendence",
        {
          ATTENDANCE_ADMIN_USERNAME:
            employeeData.EMPLOYEE_MEMBER_PARENT_USERNAME,
          ATTENDANCE_EMPLOYEE_USERNAME: employeeData.EMPLOYEE_USERNAME,
          ATTENDANCE_START_DATE: DatePrevious,
          ATTENDANCE_END_DATE: formattedDate,
        },

      );
      setTimeout(() => {
        console.log(response.data.result, "history");
        setHistory(response.data.result);
      }, 1000);
    } catch (err) {
      console.log("something Went wrong: =>", err);
    }
  };

  useEffect(() => {
    gettimesheet();
  }, []);





  const Newdata = historyData.map((e) => {
    
    const STANDARD_WORKING_HOURS = 8; // Standard working hours
    
    function calculateDuration(inTime, outTime) {
        const inDatetime = new Date(inTime);
        const outDatetime = new Date(outTime);
        const durationMillis = outDatetime - inDatetime;
    
        const hours = Math.abs(Math.floor(durationMillis / 3600000)); // 1 hour = 3600000 milliseconds
        const minutes = Math.abs(Math.floor((durationMillis % 3600000) / 60000)); // 1 minute = 60000 milliseconds
    
        return { hours, minutes };
    }
    
    function calculateOvertime(duration) {
        const totalMinutes = duration.hours * 60 + duration.minutes;
        const overtimeMinutes = Math.max(totalMinutes - STANDARD_WORKING_HOURS * 60, 0);
        
        const overtimeHours = Math.floor(overtimeMinutes / 60);
        const remainingOvertimeMinutes = overtimeMinutes % 60;
    
        return { hours: overtimeHours, minutes: remainingOvertimeMinutes };
    }
    
    const duration = calculateDuration(e.ATTENDANCE_OUT, e.ATTENDANCE_IN);
    const overtime = calculateOvertime(duration);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };


    
        return {...e, 
        ATTENDANCE_TOTAL_HOUR : calculateDuration(e.ATTENDANCE_OUT, e.ATTENDANCE_IN),
        ATTENDANCE_OVERTIME: overtime,
        ATTENDANCE_IN: new Date(e.ATTENDANCE_IN).toLocaleTimeString('en-US', options),
        ATTENDANCE_OUT: new Date(e.ATTENDANCE_OUT).toLocaleTimeString('en-US', options)
      }
        
    } )

    console.log(Newdata,"dddh")

  return (
    <>
      <EmployeeNavbar state={employeeData} />

      <Box className="box">
        <div
          className="container-fluid d-flex pb-0 g-0 flex-column"
          style={{ background: "#277099" }}
        >
          <div style={{ height: "20%" }}>
            <Button
              size="small"
              className="btn button btn-blue bg-white border-bottom-1"
              variant="outlined"
            >
              Employee Attendance
            </Button>
          </div>

          <div
            style={{
              height: "calc(100vh - 30px)",
              padding: 0,
              paddingBottom: "0",
              overflow: "auto",
              position: "relative",
              background: "blue",
            }}
          >
            <Grid
              container
              sx={{
                height: "100%",
                bgcolor: "#fff",
                position: "relative",
              }}
              xl={12}
            >
              <div className="container p-4">
                {historyData.length > 0 ? <table className="table table-sm">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Name</th>
                      <th scope="col">In</th>
                      <th scope="col">Out</th>
                      <th scope="col">Hours</th>
                      <th scope="col">Over Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Newdata.map((item) => 
                      <tr>
                        <td scope="row">{item.ATTENDANCE_DATE_ID}</td>
                        <td>{item.ATTENDANCE_EMPLOYEE_USERNAME}</td>
                        <td>{item.ATTENDANCE_IN ? item.ATTENDANCE_IN : "pending"}</td>
                        <td>{item.ATTENDANCE_OUT == "Invalid Date" ? "pending" : item.ATTENDANCE_OUT}</td>
                        <td>{item.ATTENDANCE_TOTAL_HOUR.hours} hours</td>
                        <td>{item.ATTENDANCE_OVERTIME.hours} hours: {item.ATTENDANCE_OVERTIME.hours} min </td>
                      </tr>
                    )}
                  </tbody>
                </table> : <SimpleBackdrop open={true} />}
              </div>
            </Grid>
          </div>
        </div>
        
      </Box>
    </>
  );
};

export default EmployeeHistory;
