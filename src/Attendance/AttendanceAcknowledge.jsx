import React, { useEffect, useState } from "react";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import moment from "moment/moment";
// import employees from "./dummy.json";
import {
  Backdrop,
  Box,
  Button,
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { CSVLink } from "react-csv";
import { TableRows } from "@mui/icons-material";
import env from "react-dotenv";
import AttendancePunch from "./AttendancePunch";
import SimpleBackdrop from "../components/Backdrop";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SalaryPDF from "../Invoices/SalaryPDF";

let MyDateCurrent = new Date();
let MyDateStringCurrent;
MyDateCurrent.setDate(MyDateCurrent.getDate());
MyDateStringCurrent =
  MyDateCurrent.getFullYear() +
  "-" +
  ("0" + (MyDateCurrent.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + MyDateCurrent.getDate()).slice(-2);

//current Date

const MyDateAfter = new Date();
let MyDateStringAfter;

MyDateAfter.setDate(MyDateAfter.getDate() - 7);

MyDateStringAfter =
  MyDateAfter.getFullYear() +
  "-" +
  ("0" + (MyDateAfter.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + MyDateAfter.getDate()).slice(-2);

//date array previous 30

function DateArray() {
  let array = [];
  let MyDateAfter = new Date();
  let MyDateStringAfter;

  for (let i = 0; i < 8; i++) {
    MyDateAfter.setDate(MyDateAfter.getDate() - 1);
    MyDateStringAfter =
      MyDateAfter.getFullYear() +
      "-" +
      ("0" + (MyDateAfter.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + MyDateAfter.getDate()).slice(-2);
    array.push(MyDateStringAfter); // Add the date to the array
  }

  return array; // Return the generated array of dates
}

const result = DateArray();
//////////////////

// date range array

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDatesBetween(startDate, endDate) {
  const dates = [];
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    dates.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

const AttendanceReport = (props) => {
  const [employees, getReport] = useState();
  const [foundUsers, setFoundUsers] = useState([]);
  const [filterMethod, setFilterMethod] = useState("Date wise");
  const [startDateString, setstartDateString] = useState(MyDateStringAfter);
  const [endDateString, setendDateString] = useState(MyDateStringCurrent);
  const [keyword, setKeyword] = useState(MyDateStringCurrent);
  const [name, setName] = useState("All");
  const [showDetail, setShowDetail] = useState(true);
  const [show, setshow] = useState(true);
  const [employeeName, setEmployeeName] = useState([]);
  const { mainData } = props;

  console.log(mainData, "mainData");

  // loader
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

  // get data
  const Reports = (ADMIN_USERNAME, EMPLOYEE_PARENT_USERNAME) => {
    let data = JSON.stringify({
      ADMIN_USERNAME,
      EMPLOYEE_PARENT_USERNAME,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "http://18.211.130.168:5001/get_employee_details_for_attendence",
      headers: {
        authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data.result, "dut");
        setTimeout(() => {
          setFoundUsers(response.data.result);
          getReport(response.data.result);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //fatch data
  useEffect(() => {
    Reports(
      mainData[0]?.EMPLOYEE_MEMBER_PARENT_USERNAME,
      mainData[0]?.EMPLOYEE_PARENT_USERNAME
    );
  }, []);

  console.log(employees, "report");

  // date array function call

  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const dateArray = getDatesBetween(startDate, endDate);

  //filter by different param

  const filtered = (e, item) => {
    // topFunction()
    const word = e.target.value;

    if (word !== "" && word !== "All") {
      const results = employees?.filter((post) => {
        return post._doc[item].toLowerCase().includes(word.toLowerCase());
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(employees);
    }

    setName(word);
  };

  var arrayDate = [];
  arrayDate.push(keyword);

  //modify data
  let processedData = foundUsers?.map((employee) => {
    console.log(employee, "aditional");
    let filterByDate;
    filterByDate = employee.AttendanceData.filter((item) => {
      return (filterMethod === "By Pay Period"
        ? dateArray
        : [keyword]
      ).includes(item.ATTENDANCE_DATE_ID);
    });

    console.log(filterByDate, arrayDate, "filter");

    const totalHours = filterByDate.reduce((acc, attendance) => {
      const attendanceIn = new Date(attendance.ATTENDANCE_IN);
      const attendanceOut = new Date(attendance.ATTENDANCE_OUT);
      const hoursWorked =
        Math.abs(attendanceOut - attendanceIn) / (1000 * 60 * 60); // Convert milliseconds to hours
      return acc + hoursWorked;
    }, 0);

    const modifiedEmployee = {
      ...employee._doc,
      TOTAL_HOURS: totalHours.toFixed(2),
      PUNCH: employee,
      EMPLOYEE_ATTENDANCE: filterByDate?.map((attendance) => {
        const attendanceIn = new Date(attendance.ATTENDANCE_IN);
        const attendanceOut = new Date(attendance.ATTENDANCE_OUT);
        const hoursWorked =
          Math.abs(attendanceOut - attendanceIn) / (1000 * 60 * 60); // Convert milliseconds to hours

        return {
          ...attendance,
          HOURS: hoursWorked.toFixed(2),
          REGULAR: hoursWorked.toFixed(2), // Assuming "REGULAR" represents the regular hours worked
        };
      }),
    };

    return modifiedEmployee;
  });

  const MyScreen = styled(Paper)((props) => ({
    height: "calc(100vh - 32px)",
    padding: 0,
    paddingBottom: "0",
    overflow: "auto",
    borderRadius: 0,
    Border: 0,
    display: props.screenIndex ? "block" : "none",
  }));

  const PunchReport = (e) => {
    console.log(e, "e");
    setshow(false);
    setEmployeeName(e);
    return setShowDetail(<AttendancePunch data={e} />);
  };

  const csvReport = {
    data: processedData,
    filename: "Doc.csv",
  };

  return (
    <>
      <Box className="box" style={{ background: "#277099" }}>
        <Button
          size="small"
          variant={show ? "outlined" : "outlined"}
          className={
            show
              ? "btn button border-bottom-0 bg-white"
              : "btn rounded-0 border-bottom-0  rounded-0 text-light"
          }
          onClick={() => setshow(true)}
        >
          Pay Acknowledgement
        </Button>
        {!show && (
          <Button
            size="small"
            className="btn button border-bottom-0 bg-white"
            variant="outlined"
          >
            Punch Detail - {employeeName._doc.EMPLOYEE_NAME}{" "}
            <Typography size="small" px={1} onClick={() => setshow(true)}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </Typography>
          </Button>
        )}
        {employees ? (
          <MyScreen sx={{ display: "block", padding: 3, border: "" }}>
            <Box
              style={{
                height: "100%",
                padding: 0,
                paddingBottom: "0",
                border: "",
                overflowY: "scroll",
              }}
            >
              <Grid
                container
                sx={{ position: "sticky", top: "0", bgcolor: "#fff" }}
              >
                <Grid xl={6}>
                  <Grid
                    item
                    container
                    xl={12}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <TableContainer>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell size="small">
                              <label> Date filter by </label>
                            </TableCell>
                            <TableCell size="small">
                              <select
                                className="form-control border"
                                onChange={(e) =>
                                  setFilterMethod(e.target.value)
                                }
                                value={filterMethod}
                              >
                                <option>Date wise</option>
                                <option>By Pay Period</option>
                              </select>
                            </TableCell>
                          </TableRow>
                          {filterMethod === "By Pay Period" && (
                            <TableRow>
                              <TableCell size="small">
                                <label>Period</label>
                              </TableCell>
                              <TableCell size="small">
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 2,
                                  }}
                                >
                                  <input
                                    type="date"
                                    className="form-control"
                                    value={startDateString}
                                    onChange={(e) =>
                                      setstartDateString(e.target.value)
                                    }
                                  />
                                  <input
                                    type="date"
                                    className="form-control"
                                    value={endDateString}
                                    onChange={(e) =>
                                      setendDateString(e.target.value)
                                    }
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                          {filterMethod === "Date wise" && (
                            <>
                              <TableCell size="small">
                                <label> Date filter by </label>
                              </TableCell>
                              <TableCell size="small">
                                <select
                                  value={keyword}
                                  className="form-control border"
                                  onChange={(e) => setKeyword(e.target.value)}
                                >
                                  <option selected>
                                    {MyDateStringCurrent}
                                  </option>
                                  {result?.map((item) => (
                                    <option>{item}</option>
                                  ))}
                                </select>
                              </TableCell>
                            </>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                <Grid item container xl={6}>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell size="small">
                            <label> Employee </label>
                          </TableCell>
                          <TableCell size="small">
                            <select
                              className="form-control border"
                              onChange={(e) => filtered(e, "EMPLOYEE_NAME")}
                              value={name}
                            >
                              <option selected>All</option>
                              {employees?.map((e) => (
                                <option>{e._doc.EMPLOYEE_NAME}</option>
                              ))}
                            </select>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell size="small">
                            <label> Department </label>
                          </TableCell>
                          <TableCell size="small">
                            <select
                              className="form-control border"
                              onChange={(e) => filtered(e, "EMPLOYEE_ROLE")}
                              value={name}
                            >
                              <option selected>All</option>
                              {employees?.map((e) => (
                                <option>{e._doc.EMPLOYEE_ROLE}</option>
                              ))}
                            </select>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>

              <table className="table table-hover table-sm table-fixed">
                {show ? (
                  <>
                    <thead
                      style={{
                        position: "sticky",
                        top: "85px",
                      }}
                    >
                      <tr className="table-light">
                        <th scope="col" colSpan={7} style={{ gap: 2 }}>
                          {/* <button className="btn btn-primary btn-sm" onClick={window.print()}>
                      Print Preview
                    </button>{" "} */}
                          {/* <button className="btn btn-secondary btn-sm">
                      Export(PDF)
                    </button>{" "} */}
                          <button className="btn btn-secondary btn-sm">
                            <CSVLink className="sub-nav-text" {...csvReport}>
                              ↓ Export(CSV)
                            </CSVLink>
                            {/* Export(CSV) */}
                          </button>{" "}
                          <button className="btn btn-sm" disabled>
                            No of Employee: {processedData?.length}
                          </button>{" "}
                        </th>
                      </tr>
                      <tr className="table-light">
                        <th scope="col">Employee</th>
                        <th scope="col">Total</th>
                        <th scope="col">Regular</th>
                        <th scope="col">Overtime</th>
                        <th scope="col">PTO</th>
                        <th scope="col">Acknowledge</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {processedData?.map((post) => {
                        return (
                          <tr className="table table-striped">
                            <td>{post.EMPLOYEE_NAME}</td>
                            <td>
                              <span
                                className="bg-success rounded-2 px-1 text-light"
                                style={{ width: "content-fit" }}
                              >
                                {post.TOTAL_HOURS} Total
                              </span>
                            </td>
                            <td>
                              <span
                                className="bg-success rounded-2 px-1 text-light"
                                style={{ width: "content-fit" }}
                              >
                                {post.TOTAL_HOURS} Total
                              </span>
                            </td>
                            <td></td>
                            <td></td>
                            <td>
                                <PDFDownloadLink
                                  className="btn btn-dark btn-sm"
                                  document={
                                    <SalaryPDF
                                      name={post.EMPLOYEE_NAME}
                                      email={post.EMPLOYEE_EMAIL}
                                      phone={post.EMPLOYEE_PHONE}
                                      address={post.EMPLOYEE_ADD}
                                      wages={post.EMPLOYEE_HOURLY_WAGE}
                                      totalIncome={post.TOTAL_HOURS}
                                      workingHours={post.TOTAL_HOURS}
                                      mapvalue={post.PUNCH.AttendanceData}
                                    />
                                  }
                                  fileName={`${post.EMPLOYEE_NAME}.pdf`}
                                >
                                  Download
                                </PDFDownloadLink>
                            </td>
                            <td>
                              {" "}
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={(e) => PunchReport(post.PUNCH)}
                              >
                                Punch Detail
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </>
                ) : (
                  showDetail
                )}
              </table>
            </Box>
          </MyScreen>
        ) : (
          <MyScreen sx={{ display: "block", padding: 3 }}>
            <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
              <Animations />
            </Box>
          </MyScreen>
        )}
      </Box>
    </>
  );
};

export default AttendanceReport;
