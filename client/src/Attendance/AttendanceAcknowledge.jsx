import React, { useEffect, useState } from "react";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import moment from "moment/moment";
import { RotatingLines } from 'react-loader-spinner'

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


//formet date in YYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// get date Array
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


// const getCurrent WeekDates Formatted Monday To Sunday
function getCurrentWeekDatesFormattedMondayToSunday() {
  const currentDate = moment().utcOffset(0);
  const currentDay = currentDate.day(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const startDate = moment(currentDate); // Clone the current date
  startDate.subtract(currentDay, 'days').add(currentDay === 0 ? -6 : 1, 'days');
  const currentWeekDatesFormatted = [];
  for (let i = 0; i < 7; i++) {
    const date = moment(startDate).add(i, 'days');
    const formattedDate = date.utcOffset(0).format('YYYY-MM-DD');
    currentWeekDatesFormatted.push(formattedDate);
  }
  return currentWeekDatesFormatted;
}


const AttendanceReport = (props) => {


  // Get the current week's dates in "YYYY-MM-DD" format (Monday to Sunday)
  const currentWeekDatesFormatted = getCurrentWeekDatesFormattedMondayToSunday();

  // console.log(currentWeekDatesFormatted, "currentWeekDatesFormatted[0]")





  // get Company data
  const { COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_ID, COMPANY_PARENT_USERNAME } = useParams();
  const [employees, getReport] = useState();
  const [foundUsers, setFoundUsers] = useState([]);
  const [filterMethod, setFilterMethod] = useState("By Pay Period");

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
  const [selectedWeek, setSelectedWeek] = useState("");

  const mainData = allempData;


  const result = DateArray(selectedWeek);




  const [startDateString, setstartDateString] = useState(currentWeekDatesFormatted[0]);
  console.log(startDateString, currentWeekDatesFormatted[0], "report")
  const [endDateString, setendDateString] = useState(currentWeekDatesFormatted[currentWeekDatesFormatted.length - 1]);


  const generateWeekOptions = () => {
    const options = [];
    const today = moment().utcOffset(0);
    // const currentWeek = getWeekNumber(today);

    for (let i = 0; i < 5; i++) {
      // Generate options for the current week and the four previous weeks
      const weekStartDate = moment(today).subtract(i * 7, 'days').startOf('isoWeek');
      const weekEndDate = moment(weekStartDate).endOf('isoWeek');
      const weekLabel = `${weekStartDate.format('YYYY-MM-DD')} - ${weekEndDate.format('YYYY-MM-DD')}`;
      const formattedDate = weekEndDate.format('YYYY-MM-DD');

      options.push(
        <option key={i} value={formattedDate} selected={i === 0 ? true : false}>
          {weekLabel}
        </option>
      );
    }

    return options;
  };





  
  // Handle the change event when the user selects a week
  const handleWeekSelect = (e) => {
    setSelectedWeek(e.target.value);
  };

  // date array
  function DateArray(eventDate) {
    let array = [];
    let MyDateAfter = moment.utc(eventDate); // Use moment with utcOffset(0)
    let MyDateStringAfter;

    for (let i = 0; i < 6; i++) {
      MyDateAfter.subtract(1, 'days');
      MyDateStringAfter = MyDateAfter.format('YYYY-MM-DD');
      array.push(MyDateStringAfter); // Add the date to the array
    }

    array.unshift(eventDate);
    return array; // Return the generated array of dates
  }



  // Example usage
  // const weekDates = getCurrentWeekDatesFormattedMondayToSunday();
  // console.log(weekDates);




  // Print the array of formatted dates
  // console.log(currentWeekDatesFormatted, "current week");


  // var arrayDate = [];
  // arrayDate.push(...result);

  // console.log(filterMethod, "filterMethod");



  // console.log(arrayDate,"arrayDate")





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
      setAllempData(employeeData.result);
      console.log("Both requests completed", employeeData);
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


  // useEffect(() => {

  const dateWiseArray = getDatesBetween(
    startDateString,
    endDateString
  );

  // console.log(startDateString, "startDateString")

  // Setarray(dateWiseArray)





  // console.log(dateWiseArray, "nnnnn")

  // console.log(currentWeekDatesFormatted, "my");

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


  // console.log(array[0], "result[0]")




  // process data
  const processingData = (data) => {
    let processedData = data?.map((employee) => {
      console.log(employee, "additional");
      let filterByDate;
      filterByDate = employee.AttendanceData.filter((item) => {
        switch (filterMethod) {
          case ("Date wise"): return dateWiseArray.includes(item.ATTENDANCE_DATE_ID)
          case ("By Pay Period"): return (result[0] == "" ? currentWeekDatesFormatted : result).includes(item.ATTENDANCE_DATE_ID)
          default:
        }
      });

      console.log(result, "filter");

      const totalDuration = filterByDate.reduce((acc, attendance) => {
        const attendanceIn = moment(attendance.ATTENDANCE_IN).utcOffset(0);
        const attendanceOut = moment(attendance.ATTENDANCE_OUT).utcOffset(0);

        // Check for null or undefined values before performing calculations
        if (attendanceIn.isValid() && attendanceOut.isValid()) {
          const duration = moment.duration(attendanceOut.diff(attendanceIn));
          acc.add(duration);
        }

        return acc;
      }, moment.duration());

      const totalHours = Math.floor(totalDuration.asHours());
      const totalMinutes = totalDuration.minutes();

      // Define a threshold for regular hours (e.g., 40 hours per week)
      const regularHoursThreshold = 8;
      let overtimeHours = 0;

      if (totalHours > regularHoursThreshold) {
        overtimeHours = totalHours - regularHoursThreshold;
      }

      const modifiedEmployee = {
        ...employee._doc,
        TOTAL_HOURS: `${totalHours} hours and ${totalMinutes} minutes`,
        OVERTIME_HOURS: overtimeHours.toFixed(2),
        PUNCH: employee,

        EMPLOYEE_ATTENDANCE: filterByDate?.map((attendance) => {
          const attendanceIn = moment(attendance.ATTENDANCE_IN).utcOffset(0);
          const attendanceOut = moment(attendance.ATTENDANCE_OUT).utcOffset(0);

          // Check for null or undefined values before performing calculations
          if (attendanceIn.isValid() && attendanceOut.isValid()) {
            const duration = moment.duration(attendanceOut.diff(attendanceIn));
            const hoursWorked = Math.floor(duration.asHours());
            const minutesWorked = duration.minutes();

            return {
              ...attendance,
              HOURS: `${hoursWorked} hours and ${minutesWorked} minutes`,
              REGULAR: `${hoursWorked} hours and ${minutesWorked} minutes`, // Assuming "REGULAR" represents the regular hours worked
            };
          } else {
            return null; // or handle the case as needed
          }
        }).filter(Boolean), // Remove null entries
      };

      return modifiedEmployee;
    });

    return processedData;

  }

  const processedData = processingData(foundUsers)
  console.log(processedData, "processedData")


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

  // console.log(processedData, "processedData");

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
                processedData <= 0 ? (
                  <div className="container" style={{postion:"position-relative"}}>
                    <div style={{position:"absolute", top:"50%",left:"50%", transform:"translate(-50%,-50%)"}}>
                      <RotatingLines
                        strokeColor="blue"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="50"
                        visible={true}
                      />
                    </div>
                  </div>
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
                                    <option>By Pay Period</option>
                                    <option>Date wise</option>
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
                                      {/* <option value="">Select a week</option> */}
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
                                // Extract hours and minutes from post.TOTAL_HOURS
                                const [hours, minutes] = post.TOTAL_HOURS.match(/\d+/g) || [0, 0];
                                const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);

                                // Check if totalMinutes is greater than zero before rendering the row
                                if (totalMinutes > 0) {
                                  return (
                                    <tr key={post.EMPLOYEE_ID} className="table table-striped">
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
                                          {post.TOTAL_HOURS}
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
                                          {post.TOTAL_HOURS}
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
                                                result[result.length - 1] !== "NaN-aN-aN"
                                                  ? result[result.length - 1]
                                                  : currentWeekDatesFormatted[0]
                                              }
                                              enddate={
                                                result[result.length - 1] !== "NaN-aN-aN"
                                                  ? result[0]
                                                  : currentWeekDatesFormatted[
                                                  currentWeekDatesFormatted.length - 1
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
                                } else {
                                  return null; // Don't render the row if totalMinutes is zero
                                }
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
