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
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import WeekSelect from "../components/WeekSelect";

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
  // Generate an array of week options for the select element
  const generateWeekOptions = () => {
    const options = [];
    const today = new Date();
    const currentWeek = getWeekNumber(today);

    for (let i = 0; i < 5; i++) {
      // Generate options for the current week and the four previous weeks
      const weekStartDate = new Date(today);
      weekStartDate.setDate(today.getDate() - today.getDay() - i * 7);
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6);

      // Find the start of the week (Monday) and end of the week (Sunday)
      weekStartDate.setDate(
        weekStartDate.getDate() - weekStartDate.getDay() + 1
      );
      weekEndDate.setDate(weekEndDate.getDate() - weekEndDate.getDay() + 7);

      const weekLabel = `${formatDates(weekStartDate)} - ${formatDates(
        weekEndDate
      )}`;

      const originalDate = new Date(weekEndDate);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1 and pad with 0 if needed
      const day = String(originalDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      // console.log(formattedDate);

      options.push(
        <option key={i} value={formattedDate}>
          {weekLabel}
        </option>
      );
    }

    return options;
  };

  const [selectedWeek, setSelectedWeek] = useState(""); // State to store the selected week

  // Helper function to get the week number of a date
  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNumber;
  };

  // Helper function to format a date as "YYYY-MM-DD"
  const formatDates = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle the change event when the user selects a week
  const handleWeekSelect = (e) => {
    setSelectedWeek(e.target.value);
  };

  // date array
  function DateArray(eventDate) {
    let array = [];
    let date = eventDate;
    let MyDateAfter = new Date(date);
    let MyDateStringAfter;

    for (let i = 0; i < 6; i++) {
      MyDateAfter.setDate(MyDateAfter.getDate() - 1);
      MyDateStringAfter =
        MyDateAfter.getFullYear() +
        "-" +
        ("0" + (MyDateAfter.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + MyDateAfter.getDate()).slice(-2);
      array.push(MyDateStringAfter); // Add the date to the array
    }
    array.unshift(date);
    return array; // Return the generated array of dates
  }

  console.log(selectedWeek, "selectedWeek");

  const result = DateArray(selectedWeek);

  console.log(result, " currentWeekDatesFormatted");

  // current week
  function getCurrentWeekDatesFormattedMondayToSunday() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const startDate = new Date(currentDate); // Clone the current date

    // Calculate the start of the week (Monday) by subtracting the appropriate number of days
    startDate.setDate(
      currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
    );

    // Create an array to store the formatted dates of the current week (Monday to Sunday)
    const currentWeekDatesFormatted = [];

    // Populate the array with formatted dates for the current week (Monday to Sunday)
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      // Manually construct the "YYYY-MM-DD" formatted date string
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

      currentWeekDatesFormatted.push(formattedDate);
    }

    return currentWeekDatesFormatted;
  }

  // Get the current week's dates in "YYYY-MM-DD" format (Monday to Sunday)
  const currentWeekDatesFormatted = getCurrentWeekDatesFormattedMondayToSunday();

  // Print the array of formatted dates
  console.log(currentWeekDatesFormatted, "current week");

  //current week

  // date range array

  const { id } = useParams();

  const param = id.split("&");
  const COMPANY_ID = param[0];
  const COMPANY_USERNAME = param[1];
  const COMPANY_PARENT_ID = param[2];
  const COMPANY_PARENT_USERNAME = param[3];

  const [employees, getReport] = useState();
  const [foundUsers, setFoundUsers] = useState([]);
  const [filterMethod, setFilterMethod] = useState("Date wise");
  const [startDateString, setstartDateString] = useState(
    result[result.length - 1] != "NaN-aN-aN"
      ? result[result.length - 1]
      : currentWeekDatesFormatted[0]
  );
  const [endDateString, setendDateString] = useState(result[result.length - 1] != "NaN-aN-aN"
  ? result[0]
  : currentWeekDatesFormatted[currentWeekDatesFormatted.length - 1]);
  const [keyword, setKeyword] = useState();
  const [name, setName] = useState("All");
  const [showDetail, setShowDetail] = useState(true);
  const [show, setshow] = useState(true);
  const [employeeName, setEmployeeName] = useState([]);
  const [allempData, setAllempData] = useState({
    COMPANY_PARENT_ID: "",
    COMPANY_PARENT_USERNAME: "",
  });
  const [openNav, setOpenNav] = useState(false);
  const mainData = allempData;
  console.log(mainData, "mainData");

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const fetchAllEmployees = async () => {
    try {
      const response = await axios.put(
        "/api/get_employee",
        {
          EMPLOYEE_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
          EMPLOYEE_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME,
          EMPLOYEE_PARENT_USERNAME: COMPANY_USERNAME,
          EMPLOYEE_PARENT_ID: COMPANY_ID,
        },
        { headers }
      );

      const data = response.data;

      console.log("Employee Data: =>", data);
      return data;
    } catch (err) {
      console.log("Something Went Wrong: =>", err);
      throw err;
    }
  };

  const fetchData = async () => {
    try {
      const [employeeData] = await Promise.all([fetchAllEmployees()]);

      // Both requests have completed here
      // setIsLoading(false);
      setAllempData(employeeData.result);
      console.log("Both requests completed", employeeData);

      // Now you can access employeeData and projectsData for further processing if needed
    } catch (err) {
      console.log("An error occurred:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      url: "/api/get_employee_details_for_attendence",
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
  }, [allempData]);

  console.log(mainData, "report");

  // date array function call

  // const startDate = new Date(startDateString);
  // const endDate = new Date(endDateString);
  const dateArray = getDatesBetween(
    currentWeekDatesFormatted[0],
    currentWeekDatesFormatted[currentWeekDatesFormatted.length - 1]
  );

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
  arrayDate.push(...result);

  console.log(selectedWeek, "selectedWeek");

  //modify data
  let processedData = foundUsers?.map((employee) => {
    console.log(employee, "additional");
    let filterByDate;
    filterByDate = employee.AttendanceData.filter((item) => {
      return (filterMethod === "Date Wise" ? dateArray : arrayDate).includes(
        item.ATTENDANCE_DATE_ID
      );
    });

    console.log(filterByDate, arrayDate, "filter");

    const totalHours = filterByDate.reduce((acc, attendance) => {
      const attendanceIn = new Date(attendance.ATTENDANCE_IN);
      const attendanceOut = new Date(attendance.ATTENDANCE_OUT);
      const hoursWorked =
        Math.abs(attendanceOut - attendanceIn) / (1000 * 60 * 60); // Convert milliseconds to hours
      return acc + hoursWorked;
    }, 0);

    // Define a threshold for regular hours (e.g., 40 hours per week)
    const regularHoursThreshold = 8;
    let overtimeHours = 0;

    if (totalHours > regularHoursThreshold) {
      overtimeHours = totalHours - regularHoursThreshold;
    }

    const modifiedEmployee = {
      ...employee._doc,
      TOTAL_HOURS: totalHours.toFixed(2),
      OVERTIME_HOURS: overtimeHours.toFixed(2), // Add overtime hours here
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
    console.log(e, "easy");
    setshow(false);
    setEmployeeName(e.a);
    return setShowDetail(<AttendancePunch data={e.a} attendance={e.b} />);
  };

  const csvReport = {
    data: processedData,
    filename: "Doc.csv",
  };

  console.log(processedData, "processedData");

  return (
    <>
      <Sidebar
        COMPANY_ID={COMPANY_ID}
        COMPANY_USERNAME={COMPANY_USERNAME}
        COMPANY_PARENT_ID={COMPANY_PARENT_ID}
        COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
        active={3}
        toggle={openNav}
      />
      <Box className="box" style={{ background: "#277099" }}>
        <Navbar toggle={() => setOpenNav((e) => !e)} />
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
              {show ? (
                processedData.length == 0 ? (
                  "Loading..."
                ) : (
                  <>
                    <div className="container">
                      {/* <WeekSelect /> */}
                      <div className="row sticky-top bg-white">
                        <div className="col-xl-6">
                          <div className="row justify-content-between">
                            <div className="col-xl-12">
                              <div className="row py-1">
                                <div className="col">
                                  <label>Date filter by</label>
                                </div>
                                <div className="col">
                                  <select
                                    className="form-control form-control-2 border"
                                    onChange={(e) =>
                                      setFilterMethod(e.target.value)
                                    }
                                    value={filterMethod}
                                  >
                                    <option>Date wise</option>
                                    <option>By Pay Period</option>
                                  </select>
                                </div>
                              </div>
                              {filterMethod === "By Pay Period" && (
                                <div className="row py-1">
                                  <div className="col">
                                    <label>Date filter by</label>
                                  </div>
                                  <div className="col">
                                    <select
                                      className="form-control form-control-2 border"
                                      value={selectedWeek}
                                      onChange={handleWeekSelect}
                                    >
                                      <option value="">Select a week</option>
                                      {generateWeekOptions()}
                                    </select>
                                  </div>
                                </div>
                              )}
                              {filterMethod === "Date wise" && (
                                <div className="row py-1">
                                  <div className="col">
                                    <label>Period</label>
                                  </div>
                                  <div className="col">
                                    <div className="row">
                                      <div className="col">
                                        <form>
                                          <input
                                            type="date"
                                            className="form-control form-control-2 border"
                                            // value={
                                            //   result[result.length - 1] !=
                                            //   "NaN-aN-aN"
                                            //     ? result[result.length - 1]
                                            //     : currentWeekDatesFormatted[0]
                                            // }

                                            value={startDateString}
                                            onChange={(e) =>
                                              setstartDateString(e.target.value)
                                            }
                                          />
                                        </form>
                                      </div>
                                      <div className="col">
                                        <form>
                                          <input
                                            type="date"
                                            className="form-control form-control-2 border"
                                            // value={
                                            //   result[result.length - 1] !=
                                            //   "NaN-aN-aN"
                                            //     ? result[0]
                                            //     : currentWeekDatesFormatted[
                                            //         currentWeekDatesFormatted.length -
                                            //           1
                                            //       ]
                                            // }

                                            value={endDateString}
                                            onChange={(e) =>
                                              setendDateString(e.target.value)
                                            }
                                          />
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="row py-1">
                            <div className="col">
                              <label>Employee</label>
                            </div>
                            <div className="col">
                              <select
                                className="form-control form-control-2 border"
                                onChange={(e) => filtered(e, "EMPLOYEE_NAME")}
                                value={name}
                              >
                                <option selected>All</option>
                                {employees?.map((e) => (
                                  <option>{e._doc.EMPLOYEE_NAME}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="row py-1">
                            <div className="col">
                              <label>Department</label>
                            </div>
                            <div className="col">
                              <select
                                className="form-control form-control-2 border"
                                onChange={(e) => filtered(e, "EMPLOYEE_ROLE")}
                                value={name}
                              >
                                <option selected>All</option>
                                {employees?.map((e) => (
                                  <option>{e._doc.EMPLOYEE_ROLE}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container">
                      <div className="row">
                        <div className="col-xl-12 col-lg-6 overflow-auto">
                          <table className="table table-hover table-sm table-fixed table-responsive">
                            <thead>
                              <tr className="table-light">
                                <th scope="col" colSpan={7} style={{ gap: 2 }}>
                                  <button className="btn btn-sm" disabled>
                                    No of Employee: {processedData?.length}
                                  </button>{" "}
                                </th>
                              </tr>
                              <tr className="table-light">
                                <th scope="col">Employee Id</th>
                                <th scope="col">Employee</th>
                                <th scope="col">Total</th>
                                <th scope="col">Regular</th>
                                <th scope="col">Overtime</th>
                                <th scope="col">Acknowledge</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {processedData?.map((post) => {
                                return (
                                  <tr className="table table-striped">
                                    <td>{post.EMPLOYEE_ID}</td>
                                    <td>{post.EMPLOYEE_NAME}</td>
                                    <td>
                                      <span
                                        className="rounded-2 px-1 text-light"
                                        style={{
                                          width: "content-fit",
                                          backgroundColor: "#12AD2B",
                                        }}
                                      >
                                        {post.TOTAL_HOURS} hours
                                      </span>
                                    </td>
                                    <td>
                                      <span
                                        className="rounded-2 px-1 text-light"
                                        style={{
                                          width: "content-fit",
                                          backgroundColor: "#12AD2B",
                                        }}
                                      >
                                        {post.TOTAL_HOURS} hours
                                      </span>
                                    </td>
                                    <td>{post.OVERTIME_HOURS}</td>
                                    <td>
                                      <PDFDownloadLink
                                        className="btn btn-info btn-sm"
                                        document={
                                          <SalaryPDF
                                            name={post.EMPLOYEE_NAME}
                                            date={MyDateStringCurrent}
                                            startdate={
                                              result[result.length - 1] !=
                                              "NaN-aN-aN"
                                                ? result[result.length - 1]
                                                : currentWeekDatesFormatted[0]
                                            }
                                            enddate={
                                              result[result.length - 1] !=
                                              "NaN-aN-aN"
                                                ? result[0]
                                                : currentWeekDatesFormatted[
                                                    currentWeekDatesFormatted.length -
                                                      1
                                                  ]
                                            }
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
                                        onClick={(e) =>
                                          PunchReport({
                                            a: post.PUNCH,
                                            b: post.EMPLOYEE_ATTENDANCE,
                                          })
                                        }
                                      >
                                        Punch Detail
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </>
                )
              ) : (
                showDetail
              )}
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