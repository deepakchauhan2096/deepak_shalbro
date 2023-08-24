import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";
import EmployeeNavbar from "./EmployeeNavbar";
import SimpleBackdrop from "../components/Backdrop";
import locationIcon from "../assests/images/location.png";
import placeholder from "../assests/images/placeholder.png";


const EmployeeAttendance = (props) => {
  const [indone, setIndone] = useState(false);
  const [outdone, setOutdone] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude2, setLatitude2] = useState(28.3903);
  const [longitude2, setLongitude2] = useState(77.05);
  const [circleCenter, setCircleCenter] = useState([null, null]);
  const [circleRadius, setCircleRadius] = useState(30000); // Default radius of the circle in meters
  const [isInsideCircle, setIsInsideCircle] = useState(false);
  const circleRef = useRef();

  // const location = useLocation();

  const employeeData = props.state.result;

  console.log(employeeData, "emp-data");

  const currentTime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();

  const MyDate = new Date();
  console.log(MyDate, "Mydate");

  const currentDates = new Date();
  currentDates.setDate(currentDates.getDate());
  const year = currentDates.getFullYear();
  const month = String(currentDates.getMonth() + 1).padStart(2, "0");
  const day = String(currentDates.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  console.log(formattedDate, "for");

  const handleSubmitIn = (event) => {
    event.preventDefault();
    const attendanceData = {
      ATTENDANCE_ADMIN_ID: employeeData?.EMPLOYEE_MEMBER_PARENT_ID,
      ATTENDANCE_ADMIN_USERNAME: employeeData?.EMPLOYEE_MEMBER_PARENT_USERNAME,
      ATTENDANCE_COMPANY_ID: employeeData?.EMPLOYEE_PARENT_ID,
      ATTENDANCE_COMPANY_USERNAME: employeeData?.EMPLOYEE_PARENT_USERNAME,
      ATTENDANCE_EMPLOYEE_ID: employeeData?.EMPLOYEE_ID,
      ATTENDANCE_EMPLOYEE_USERNAME: employeeData?.EMPLOYEE_USERNAME,
      ATTENDANCE_DATE_ID: formattedDate,
      ATTENDANCE_IN: new Date(),
    };

    setShowBackdrop(true);

    axios
      .post(
        "http://18.211.130.168:5001/create_emp_attendence",
        attendanceData,
        {
          headers: {
            authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setIndone(true);
        setShowBackdrop(false);
      })
      .catch((error) => {
        console.log(error);
        setShowBackdrop(false);
      });
  };

  const handleSubmitOut = (event) => {
    event.preventDefault();
    const attendanceData = {
      ATTENDANCE_ADMIN_ID: employeeData?.EMPLOYEE_MEMBER_PARENT_ID,
      ATTENDANCE_ADMIN_USERNAME: employeeData?.EMPLOYEE_MEMBER_PARENT_USERNAME,
      ATTENDANCE_COMPANY_ID: employeeData?.EMPLOYEE_PARENT_ID,
      ATTENDANCE_COMPANY_USERNAME: employeeData?.EMPLOYEE_PARENT_USERNAME,
      ATTENDANCE_EMPLOYEE_ID: employeeData?.EMPLOYEE_ID,
      ATTENDANCE_EMPLOYEE_USERNAME: employeeData?.EMPLOYEE_USERNAME,
      ATTENDANCE_DATE_ID: formattedDate,
      ATTENDANCE_OUT: new Date(),
    };

    setShowBackdrop(true);

    axios
      .post(
        "http://18.211.130.168:5001/create_emp_attendence",
        attendanceData,
        {
          headers: {
            authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setOutdone(true);
        setShowBackdrop(false);
      })
      .catch((error) => {
        console.log(error);
        setShowBackdrop(false);
      });
  };





  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setCircleCenter([latitude2, longitude2]);
          fetchLocationName(latitude2, longitude2);
          // Calculate distance from center coordinates
          const distance = calculateDistance(
            latitude2,
            latitude2,
            longitude2,
            longitude2
          );

          // Assuming a certain radius for your circle (in kilometers)
          const circleRadius = 500; // Adjust this radius as needed

          if (distance > circleRadius) {
            console.log("Location is outside the circle.");
            // Perform actions for outside location
          } else {
            console.log("Location is inside the circle.");
            // Perform actions for inside location
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth's radius in meters
    const phi1 = toRad(lat1);
    const phi2 = toRad(lat2);
    const deltaPhi = toRad(lat2 - lat1);
    const deltaLambda = toRad(lon2 - lon1);

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltaLambda / 2) *
        Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  useEffect(() => {
    getLocation();
  }, []);

  const fetchLocationName = async (lat, lon) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      const address = data.display_name;
      setLocationName(address);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    if (latitude && longitude && circleCenter[0] && circleCenter[1]) {
      const distanceFromCircleCenter = calculateDistance(
        latitude,
        longitude,
        circleCenter[0],
        circleCenter[1]
      );

      setIsInsideCircle(distanceFromCircleCenter <= circleRadius);
    }
  }, [latitude, longitude, circleCenter, circleRadius]);

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
                <div className="row h-100 w-100">
                  <div className="col-4 bg-white">
                    {/* <Paper> */}
                    <div className="col-12 bg-white">
                      {/* <Paper> */}
                      <table className="table" style={{ tableLayout: "fixed" }}>
                        <tbody>
                          <tr>
                            <td colSpan="2">
                              <Typography>
                                Date: {currentDate} Time: {currentTime}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <b>Employee ID :</b>
                            </td>
                            <td>{employeeData?.EMPLOYEE_ID}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Employee Username :</b>
                            </td>
                            <td>{employeeData?.EMPLOYEE_USERNAME}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Employee Name :</b>
                            </td>
                            <td>{employeeData?.EMPLOYEE_NAME}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Phone Number :</b>
                            </td>
                            <td>{employeeData?.EMPLOYEE_PHONE}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Latitude :</b>
                            </td>
                            <td>{latitude}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Longitude :</b>
                            </td>
                            <td>{longitude}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Your Location :</b>
                            </td>
                            <td>{locationName}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Location Status :</b>
                            </td>
                            <td>
                              Your location is{" "}
                              {isInsideCircle ? "inside" : "outside"} the area.
                            </td>
                          </tr>
                          {indone && outdone ? (
                            <tr>
                              <td colSpan="2" className="color-success">
                                Your attendance is submitted
                              </td>
                            </tr>
                          ) : null}

                          <tr>
                            {indone ? (
                              <td>
                                <Button
                                  disabled
                                  name="in_btn"
                                  variant="contained"
                                  className="btn btn-block"
                                  px={2}
                                >
                                  ATTENDANCE IN
                                </Button>
                              </td>
                            ) : (
                              <td>
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
                              </td>
                            )}

                            {outdone ? (
                              <td>
                                <Button
                                  disabled
                                  name="in_btn"
                                  variant="contained"
                                >
                                  ATTENDANCE OUT
                                </Button>
                              </td>
                            ) : (
                              <td>
                                <Button
                                  onClick={handleSubmitOut}
                                  name="in_btn"
                                  variant="contained"
                                  color="error"
                                >
                                  ATTENDANCE OUT
                                </Button>
                              </td>
                            )}
                          </tr>
                        </tbody>
                      </table>
                      {/* </Paper> */}
                    </div>

                    {/* </Paper> */}
                  </div>

                  <div className="col-8">
      
                  </div>
                </div>
              </div>
            </Grid>
          </div>
        </div>
        <SimpleBackdrop open={showBackdrop} />
      </Box>
    </>
  );
};

export default EmployeeAttendance;
