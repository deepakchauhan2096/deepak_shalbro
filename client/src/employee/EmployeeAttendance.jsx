import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  GoogleMap,
  MarkerF,
  LoadScript,
  CircleF,
} from "@react-google-maps/api";

import {
  GOOGLE_MAPS_API_KEY,
  GOOGLE_MAPS_LIBRARIES,
} from "../components/Constants"; // Adjust the path accordingly


import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router";
import EmployeeNavbar from "./EmployeeNavbar";
import SimpleBackdrop from "../components/Backdrop";
import locationIcon from "../assests/images/location.png";
import placeholder from "../assests/images/placeholder.png";
import { styled } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import EmployeeReport from "./EmployeeReportOut";
import EmployeeReportIn from "./EmployeeReportIn";
import EmployeeReportOut from "./EmployeeReportOut";
import moment from "moment/moment";
import Modal from "@mui/material/Modal";

const containerStyle = {
  width: "100%",
  height: "63vh",
};

window.google = window.google || {};

const EmployeeAttendance = ({ state }) => {
  const navigate = useNavigate();
  const { latt, lngi, areas, loca, employees, projects, projectids } = useParams();
  const Lat = parseFloat(latt);
  const Long = parseFloat(lngi);
  const Area = parseInt(areas);
  const LocName = loca;
  const Name = employees;
  const ProjectName = projects;
  const Project_Id = projectids;



  console.table(latt, "_", lngi, "_", areas, "_", loca, "_", employees, "_", projects, "_", projectids, "Lat");
  const center = {
    lat: Lat,
    lng: Long,
  };

  const [indone, setIndone] = useState(false);
  const [outdone, setOutdone] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [markerPosition2, setMarkerPosition2] = useState({ lat: 28.4125751, lng: 77.0440402 });
  const [locationName, setLocationName] = useState("");
  const [latitude, setLatitude] = useState(Lat);
  const [longitude, setLongitude] = useState(Long);
  const [latitude2, setLatitude2] = useState(Lat);
  const [longitude2, setLongitude2] = useState(Long);
  const [circleCenter, setCircleCenter] = useState([null, null]);
  const [circleRadius, setCircleRadius] = useState(Area); // Default radius of the circle in meters
  const [isInsideCircle, setIsInsideCircle] = useState(true);
  const [locErrorin, setLocErrorIn] = useState(false);
  const [locErrorout, setLocErrorOut] = useState(false);
  const [empdata, setData] = useState([]);
  const [map, setMap] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [reportMsg , setReportMsg] = useState("")
 


  // const location = useLocation();



  useEffect(() => {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "/api/emp_data_one",

      data: {
        ADMIN_USERNAME: state[3],
        EMPLOYEE_ID: state[0]
      }
    };

    axios
      .request(config)
      .then((response) => {

        const data = response.data;
        if (data.result) {
          setTimeout(() => (setData(data.result)), 0)

          console.log(data.result, "mylogin r");
        }
      })
      .catch((error) => {
        console.log(error, "errors");
      });
  }, [state[2]]);


  let employeeData = empdata;

  console.log(markerPosition, state, "emp-data");


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

  // console.log(formattedDate, "for");




  const logout = async () => {
    try {
      await auth.signOut();
      // Add any additional logout-related actions here
      navigate('/')
    } catch (error) {
      // Handle any errors here
      console.error('Error logging out: ', error);
    }
  };

  const time = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
  console.log(time, "my time")


  // attendance in

  const handleSubmitIn = (event, typeValue) => {
    event.preventDefault();
    setLocErrorIn("")
    setLocErrorOut("")

    if (isInsideCircle) {
      const attendanceData = {
        ATTENDANCE_ADMIN_ID: employeeData?.EMPLOYEE_MEMBER_PARENT_ID,
        ATTENDANCE_ADMIN_USERNAME:
          employeeData?.EMPLOYEE_MEMBER_PARENT_USERNAME,
        ATTENDANCE_COMPANY_ID: employeeData?.EMPLOYEE_PARENT_ID,
        ATTENDANCE_COMPANY_USERNAME: employeeData?.EMPLOYEE_PARENT_USERNAME,
        ATTENDANCE_EMPLOYEE_ID: employeeData?.EMPLOYEE_ID,
        ATTENDANCE_EMPLOYEE_USERNAME: employeeData?.EMPLOYEE_USERNAME,
        ATTENDANCE_DATE_ID: formattedDate,
        ATTENDANCE_IN: time,
        ATTENDANCE_PROJECT_ID: parseInt(Project_Id),
        ATTENDANCE_TYPE: typeValue,
        ATTENDENCE_LOCATION_IN: locationName,
        ATTENDENCE_LOC_STATUS_IN: `Your location is ${isInsideCircle ? "inside" : "outside"}`,
        ATTENDANCE_REPORT_IN: "",
      };

      setShowBackdrop(true);

      axios
        .post(
          "/api/create_emp_attendance",
          attendanceData,

        )
        .then(() => {
          setIndone(true);
          setShowBackdrop(false);
        })
        .catch((error) => {
          console.log(error);
          setShowBackdrop(false);
        });
    } else {
      setLocErrorIn("You are outside the project location");
    }
  };

  // attendance out

  const handleSubmitOut = (event) => {
    event.preventDefault();
    setLocErrorIn("")
    setLocErrorOut("")
    if (isInsideCircle) {
      const attendanceData = {
        ATTENDANCE_ADMIN_ID: employeeData?.EMPLOYEE_MEMBER_PARENT_ID,
        ATTENDANCE_ADMIN_USERNAME:
          employeeData?.EMPLOYEE_MEMBER_PARENT_USERNAME,
        ATTENDANCE_COMPANY_ID: employeeData?.EMPLOYEE_PARENT_ID,
        ATTENDANCE_COMPANY_USERNAME: employeeData?.EMPLOYEE_PARENT_USERNAME,
        ATTENDANCE_EMPLOYEE_ID: employeeData?.EMPLOYEE_ID,
        ATTENDANCE_EMPLOYEE_USERNAME: employeeData?.EMPLOYEE_USERNAME,
        ATTENDANCE_DATE_ID: formattedDate,
        ATTENDANCE_OUT: time,
        ATTENDANCE_PROJECT_ID: parseInt(Project_Id),
        ATTENDANCE_TYPE: "automatic",
        ATTENDENCE_LOCATION_OUT: locationName,
        ATTENDENCE_LOC_STATUS_OUT: `Your location is ${isInsideCircle ? "inside" : "outside"}`,
        ATTENDANCE_REPORT_OUT: ""
      };

      setShowBackdrop(true);

      axios
        .post(
          "/api/create_emp_attendance",
          attendanceData,

        )
        .then(() => {
          setOutdone(true);
          setShowBackdrop(false);
        })

        .catch((error) => {
          console.log(error);
          setShowBackdrop(false);
        });
    } else {
      setLocErrorOut("You are outside the project location");

    }
  };

  const getLocation = (e) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMarkerPosition2({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          fetchLocationName(
            position.coords.latitude,
            position.coords.longitude
          );
          setCircleCenter([
            position.coords.latitude,
            position.coords.longitude,
          ]);
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

  const fetchLocationName = async (lat, lon) => {
    // fatch locatin name
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${"AIzaSyCLpjHrEXsS2HVPdlB8lZihxg8YBreB9Yk&amp;callback=init"}`;
      const response = await fetch(url);
      const data = await response.json();
      const address = data?.results[0]?.formatted_address;
      setLocationName(address);
      console.log(address, "fetchLocationName(Lat, Long)");
    } catch (error) {

      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, [latt, lngi, areas, loca, employees, projects, projectids, refresh]);



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


  const onLoad = (map) => {
    setMap(map);
  };

  useEffect(() => {
    onLoad();
  }, [markerPosition.lat, markerPosition.lng]);


  console.log(employeeData, "employeeData")


  const Modalsin = () => {

    const [open, setOpen] = useState(false);
    const [report, setReport] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const HandleSubmitInReport = (event, typeValue) => {
      event.preventDefault();
      setLocErrorIn("")
      setLocErrorOut("")
      setReportMsg("")
  
        const attendanceData = {
          ATTENDANCE_ADMIN_ID: employeeData?.EMPLOYEE_MEMBER_PARENT_ID,
          ATTENDANCE_ADMIN_USERNAME:
            employeeData?.EMPLOYEE_MEMBER_PARENT_USERNAME,
          ATTENDANCE_COMPANY_ID: employeeData?.EMPLOYEE_PARENT_ID,
          ATTENDANCE_COMPANY_USERNAME: employeeData?.EMPLOYEE_PARENT_USERNAME,
          ATTENDANCE_EMPLOYEE_ID: employeeData?.EMPLOYEE_ID,
          ATTENDANCE_EMPLOYEE_USERNAME: employeeData?.EMPLOYEE_USERNAME,
          ATTENDANCE_DATE_ID: formattedDate,
          ATTENDANCE_IN: time,
          ATTENDANCE_PROJECT_ID: parseInt(Project_Id),
          ATTENDANCE_TYPE_IN: typeValue,
          ATTENDENCE_LOCATION_IN: locationName,
          ATTENDENCE_LOC_STATUS_IN: `Your location is ${isInsideCircle ? "inside" : "outside"}`,
          ATTENDANCE_REPORT_IN: report,
        };
  
        setShowBackdrop(true);
  
        axios
          .post(
            "/api/create_emp_attendance",
            attendanceData,
  
          )
          .then(() => {
            setReportMsg("Punch in report submitted successfully!");
            setShowBackdrop(false);
          })
          .catch((error) => {
            console.log(error);
            setShowBackdrop(false);
          });

    };


    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: 4,
      outline: "none"
    };

    return (
      < >
        <span
          role="button"
          onClick={handleOpen}
        >
          Punch In Report
        </span>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <form className="overflow-auto overflow-x-hidden"> */}
              <h5>Send Punch In Report</h5>
              <div className="row py-1">
                <div className="form-group">
                  <table className="table" style={{ tableLayout: "fixed" }}>
                    <tbody>
                      <tr>
                        <td>
                          <Typography>
                            Date: {currentDate} Time: {currentTime}
                          </Typography>
                        </td>
                        <td>
                          <Typography>
                            Location Status :  {isInsideCircle ? "inside" : "outside"}{" "}
                            the area.
                          </Typography>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <textarea
                    // disabled
                    type="text"
                    ceholder="Enter hire date"
                    className={`rounded-1 border`}
                    name="COMMENT"
                    rows={"5"}
                    style={{ outline: "none", width: "100%" }}
                    placeholder={"Write your problem here..."}
                    onChange={(e) => setReport(e.target.value)}
                  />

                </div>
                <div className="py-2">

                  <Button
                    onClick={(event) => HandleSubmitInReport(event, "manual")}
                    name="in_btn"
                    variant="contained"
                    color="success"
                    size="small"
                    className="btn btn-block"
                    px={2}
                    type="submit"
                  >
                    Submit Report
                  </Button>{" "}
                  <button
                    onClick={() => handleClose()}
                    className="btn btn-danger text-white btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            {/* </form> */}
          </Box>
        </Modal >
      </>
    );
  }


  const Modalsout = () => {

    const [open, setOpen] = useState(false);
    const [report, setReport] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const HandleSubmitOutReport = (event, typeValue) => {
      event.preventDefault();
      setLocErrorIn("")
      setLocErrorOut("")
      setReportMsg("");
  
        const attendanceData = {
          ATTENDANCE_ADMIN_ID: employeeData?.EMPLOYEE_MEMBER_PARENT_ID,
          ATTENDANCE_ADMIN_USERNAME:
            employeeData?.EMPLOYEE_MEMBER_PARENT_USERNAME,
          ATTENDANCE_COMPANY_ID: employeeData?.EMPLOYEE_PARENT_ID,
          ATTENDANCE_COMPANY_USERNAME: employeeData?.EMPLOYEE_PARENT_USERNAME,
          ATTENDANCE_EMPLOYEE_ID: employeeData?.EMPLOYEE_ID,
          ATTENDANCE_EMPLOYEE_USERNAME: employeeData?.EMPLOYEE_USERNAME,
          ATTENDANCE_DATE_ID: formattedDate,
          ATTENDANCE_OUT: time,
          ATTENDANCE_PROJECT_ID: parseInt(Project_Id),
          ATTENDANCE_TYPE_OUT: typeValue,
          ATTENDENCE_LOCATION_OUT: locationName,
          ATTENDENCE_LOC_STATUS_OUT: `Your location is ${isInsideCircle ? "inside" : "outside"}`,
          ATTENDANCE_REPORT_OUT: report,
        };
  
        setShowBackdrop(true);
  
        axios
          .post(
            "/api/create_emp_attendance",
            attendanceData,
  
          )
          .then(() => {
            setReportMsg("Punch out report submitted successfully!");
            setShowBackdrop(false);
          })
          .catch((error) => {
            console.log(error);
            setShowBackdrop(false);
          });

    };


    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: 4,
      outline: "none"
    };

    return (
      < >
        <span
          role="button"
          onClick={handleOpen}
        >
          Punch Out Report
        </span>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <form className="overflow-auto overflow-x-hidden"> */}
              <h5>Send Punch In Report</h5>
              <div className="row py-1">
                <div className="form-group">
                  <table className="table" style={{ tableLayout: "fixed" }}>
                    <tbody>
                      <tr>
                        <td>
                          <Typography>
                            Date: {currentDate} Time: {currentTime}
                          </Typography>
                        </td>
                        <td>
                          <Typography>
                            Location Status :  {isInsideCircle ? "inside" : "outside"}{" "}
                            the area.
                          </Typography>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <textarea
                    // disabled
                    type="text"
                    ceholder="Enter hire date"
                    className={`rounded-1 border`}
                    name="COMMENT"
                    rows={"5"}
                    style={{ outline: "none", width: "100%" }}
                    placeholder={"Write your problem here..."}
                    onChange={(e) => setReport(e.target.value)}
                  />

                </div>
                <div className="py-2">

                  <Button
                    onClick={(event) => HandleSubmitOutReport(event, "manual")}
                    name="in_btn"
                    variant="contained"
                    color="success"
                    size="small"
                    className="btn btn-block"
                    px={2}
                    type="submit"
                  >
                    Submit Report
                  </Button>{" "}
                  <button
                    onClick={() => handleClose()}
                    className="btn btn-danger text-white btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            {/* </form> */}
          </Box>
        </Modal >
      </>
    );
  }






  return (
    <>
      <div className="container-fluid g-0">
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark"
          style={{ marginBottom: 0 }}
        >
          <div className="container justify-content-between">
            <a className="text-white text-decoration-none navbar-brand" href="#">
              {Name} (Employee)
            </a>
            <button
              className="btn btn-outline-primary my-2 my-sm-0 btn-sm"
              type="submit"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </nav>

        <nav
          className="navbar navbar-expand-lg navbar-light bg-light"
          style={{ height: "40px" }}
        >
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link to={`/employee/${state[0]}/${state[1]}/${state[2]}/${state[3]}}`} className="nav-link">My Projects</Link>
                <a className="bg-white text-dark nav-link">Attendance - {ProjectName}</a>
              </div>
            </div>
          </div>
        </nav>
        <div className="container py-4">
          <div className="row ">
            <div className="col-lg-6 col-md-12 col-xl-6 bg-white">
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
                      <b>Project ID :</b>
                    </td>
                    <td>{projectids}</td>
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
                      <b>Project Location :</b>
                    </td>
                    <td>{LocName}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Your Location : <Button
                        onClick={() => getLocation()}
                        name="in_btn"
                        variant="contained"
                        color="primary"
                        size="small"
                        className="btn btn-block btn-sm"
                      >
                        <i className="fa fa-refresh" style={{ fontSize: "14px", padding: "4px 0" }}></i>
                      </Button></b>
                    </td>
                    <td>{locationName?.length >= 20 ? locationName.substring(0, 50) + "..." : locationName}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Location Status :</b>
                    </td>
                    <td>
                      Your location is {isInsideCircle ? "inside" : "outside"}{" "}
                      the area.
                    </td>
                  </tr>

                  <tr>
                    {indone ? (
                      <td>
                        <Button
                          disabled
                          name="in_btn"
                          variant="contained"
                          className="btn btn-block"
                          size="small"
                          px={2}
                        >
                          PUNCH IN
                        </Button>
                      </td>
                    ) : (
                      <td>
                        <Button
                          onClick={(event) => handleSubmitIn(event, "automatic")}
                          name="in_btn"
                          variant="contained"
                          color="success"
                          size="small"
                          className="btn btn-block"
                          px={2}
                        >
                          PUNCH IN
                        </Button>
                      </td>
                    )}

                    {outdone ? (
                      <td>
                        <Button disabled name="in_btn" variant="contained" size="small" className="btn btn-block">
                          PUNCH OUT
                        </Button>
                      </td>
                    ) : (
                      <td>
                        <Button
                          onClick={handleSubmitOut}
                          name="in_btn"
                          variant="contained"
                          color="error"
                          size="small"
                          className="btn btn-block"
                        >
                          PUNCH OUT
                        </Button>

                      </td>

                    )}
                  </tr>
                  {indone && outdone ? (
                    <p colSpan="2" className="text-success">
                      Your attendance is submitted
                    </p>
                  ) : null}

                  {indone && (
                    <p colSpan="2" className="text-success">
                      Your Punch In submitted successfully!
                    </p>
                  )}

                  {outdone && (
                    <p colSpan="2" className="text-success">
                      Your Punch Out submitted successfully!
                    </p>
                  )}


                  {reportMsg && <p colSpan="2" className="text-success">
                      {reportMsg}
                    </p>}


                  {locErrorin && (
                    <>
                      <p className="text-danger">Error : {locErrorin}
                        <strong className="text-primary"><Modalsin /> ? </strong>
                      </p>

                    </>
                  )}
                  {locErrorout && (
                    <>
                      <p className="text-danger">Error : {locErrorout}
                        <strong className="text-primary"><Modalsout /> ? </strong>
                      </p>

                    </>
                  )}
                </tbody>
              </table>
            </div>



            <div className="col-lg-12 col-md-12 col-xl-6">
              {markerPosition.lat && markerPosition.lng && (
                <LoadScript
                  googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                  libraries={GOOGLE_MAPS_LIBRARIES}
                >
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={markerPosition || center} // Use markerPosition if available, else use center
                    zoom={markerPosition ? 13 : 10} // Zoom in when markerPosition is available
                  >
                    {markerPosition.lat && markerPosition.lng && <MarkerF position={markerPosition} />}
                    {markerPosition.lat && markerPosition.lng && <MarkerF position={markerPosition2} />}

                    <CircleF
                      center={markerPosition}
                      radius={circleRadius}
                      options={{
                        fillColor: "#FF0000",
                        fillOpacity: 0.2,
                        strokeColor: "#FF0000",
                        strokeOpacity: 1,
                        strokeWeight: 1,
                      }}
                    />
                  </GoogleMap>
                </LoadScript>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeAttendance;
