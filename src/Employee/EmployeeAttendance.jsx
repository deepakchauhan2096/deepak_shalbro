import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import moment from "moment/moment";
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
import { right } from "@popperjs/core";

const EmployeeAttendance = (props) => {
  const [indone, setIndone] = useState("");
  const [outdone, setOutdone] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [allempData, setAllempData] = useState({});
  const [foundUsers, setFoundUsers] = useState(allempData);

  const filterallempData = props.empData;

  const Time = new Date();
  const currentTime = Time.toString().split(" ")[4];

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  console.log(year, month, day);
  var MyDate = new Date();
  var MyDateString;

  MyDate.setDate(MyDate.getDate()-1);

  MyDateString =
    MyDate.getFullYear() +
    "-" +
    ("0" + (MyDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + MyDate.getDate()).slice(-2);

  

  const [inData, setInData] = useState({
    ATTENDANCE_ADMIN_ID: "",
    ATTENDANCE_ADMIN_USERNAME: "",
    ATTENDANCE_COMPANY_ID: "",
    ATTENDANCE_COMPANY_USERNAME: "",
    ATTENDANCE_EMPLOYEE_ID: "",
    ATTENDANCE_EMPLOYEE_USERNAME: "",
    ATTENDANCE_DATE_ID: MyDateString,
  });

  const OutDataSuccess = { ...inData, ATTENDANCE_OUT: new Date() };
  const inDataSuccess = { ...inData, ATTENDANCE_IN: new Date() };

  console.log(inDataSuccess, "GGGG");

  const handleSubmitIn = (event) => {
    console.log(event, "in");
    event.preventDefault()
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
        setIndone(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitOut = (event) => {
    console.log(event, "out");
    event.preventDefault()
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
        setOutdone(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          console.log("ALL EMPLOYEE ATTEN", response);
          const data = response.data;
          setAllempData(data.result);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        console.log("something Went wrong: =>", err);
      }

  };

  useEffect(() => {
    fetchAllEmployee();
  }, []);

  console.log(currentTime, "datanew");

  console.log(inDataSuccess, "data s");

  // const MyScreen = styled(Paper)(() => ({
  //   height: "calc(100vh - 37px)",
  //   padding: 0,
  //   paddingBottom: "0",
  //   overflow: "auto",
  // }));

  const screen = {
    height: "calc(100vh - 37px)",
    padding: 0,
    paddingBottom: "0",
    overflow: "auto",
    position: "relative",
    background: "blue",
  };

  const finalData = allempData;

  // const Data = ;
  console.log(finalData, "kumar");

  const filtered = (e) => {
    // topFunction()
    const keyword = e.target.value;

    // console.log(keyword.toString(""), "keyword")

    if (keyword !== "") {
      const results = finalData.filter((post) => {
        return post.EMPLOYEE_ID == parseInt(keyword);
      });
      console.log(results, "result");
      setFoundUsers(results);
      setInData((prev) => ({
        ...prev,
        ATTENDANCE_ADMIN_ID: results[0]?.EMPLOYEE_MEMBER_PARENT_ID,
      }));
      setInData((prev) => ({
        ...prev,
        ATTENDANCE_ADMIN_USERNAME: results[0]?.EMPLOYEE_MEMBER_PARENT_USERNAME,
      }));
      setInData((prev) => ({
        ...prev,
        ATTENDANCE_COMPANY_ID: results[0]?.EMPLOYEE_PARENT_ID,
      }));
      setInData((prev) => ({
        ...prev,
        ATTENDANCE_COMPANY_USERNAME: results[0]?.EMPLOYEE_PARENT_USERNAME,
      }));
      setInData((prev) => ({
        ...prev,
        ATTENDANCE_EMPLOYEE_ID: results[0]?.EMPLOYEE_ID,
      }));
      setInData((prev) => ({
        ...prev,
        ATTENDANCE_EMPLOYEE_USERNAME: results[0]?.EMPLOYEE_USERNAME,
      }));
    } else {
      // setFoundUsers(finalData);
    }

    setName(keyword);
  };

  console.log(foundUsers, "found");

  return (
    <>
      <Box className="box">
        <div className="container-fluid d-flex pb-0 g-0 flex-column">
          <div style={{ height: "20%" }}>
            <Button
              size="small"
              className="btn button btn-blue"
              variant="contained"
            >
              Employee Attendance
            </Button>
          </div>

          <div style={screen}>
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
                <input
                  className="form-control rounded-0"
                  value={name}
                  onChange={filtered}
                  type="number"
                  placeholder="Search Detail By ID"
                  aria-label="Search"
                />
                <Typography>
                  Date : {day}-{month}-{year} Time : {currentTime}
                </Typography>
                <form>
                  <div className="form-group py-2 col-xl-12">
                    <input
                      type="hidden"
                      className="form-control rounded-0"
                      placeholder="Company Name"
                      value={foundUsers[0]?.EMPLOYEE_ID}
                    />

                    {foundUsers[0]?.EMPLOYEE_USERNAME ? (
                      <><div>
                      <b>Employee ID : </b>&nbsp;
                      {foundUsers[0]?.EMPLOYEE_ID}
                    </div>
                        <div>
                          <b>Employee Username : </b>&nbsp;
                          {foundUsers[0]?.EMPLOYEE_USERNAME}
                        </div>
                        <div>
                          <b>Employee Name : </b>&nbsp;
                          {foundUsers[0]?.EMPLOYEE_NAME}
                        </div>
                        <div>
                          <b>Phone Number : </b>&nbsp;
                          {foundUsers[0]?.EMPLOYEE_PHONE}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group py-2 col-xl-12" style={{position:"absolute", right:"-10px",bottom:0}}>
                    {indone ? (
                      <Button
                        disabled
                        name="in_btn"
                        variant="contained"
                        color="success"
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
                        px={2}
                      >
                        ATTENDANCE IN
                      </Button>
                    )}{" "}
                    {outdone ? (
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
          </div>
        </div>
      </Box>
    </>
  );
};

export default EmployeeAttendance;
