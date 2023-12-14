import React, { useEffect, useState, version } from "react";
import axios from "axios";
import moment from "moment/moment";
import { RotatingLines } from 'react-loader-spinner'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { PDFDownloadLink, PDFViewer, ReactPDF } from "@react-pdf/renderer";
import SalaryPDF from "../Invoices/SalaryPDF";
import env from "react-dotenv";
import { Link } from "react-router-dom";

// current day
let MyDateCurrent = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
const formattedMyDateCurrent = moment(MyDateCurrent).utcOffset(0).format('YYYY-MM-DD');

//Day before 30
let MyDateBefore = moment().subtract(30, 'days').format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
const formattedMyDateBefore = moment(MyDateBefore).utcOffset(0).format('YYYY-MM-DD');

const EmployeeTimeSheetUser = (props) => {

  const [workvalue, setWorkvalue] = useState([]);
  const [ids, setIds] = useState({id: "", Eid: ""});
  const [dateValue, setDate] = useState({
    ATTENDANCE_START_DATE: formattedMyDateBefore,
    ATTENDANCE_END_DATE: formattedMyDateCurrent,
  });

  useEffect(() => {
    // Get the current URL
    const currentURL = window.location.search;
    let params = new URLSearchParams(currentURL);
    const Id = params.get('Id');
    const eid = params.get('eid');
    setIds((prev) => ({...prev, id : Id , Eid : eid} ));
    console.log("Current", Id, eid);
  }, []);


  console.log(workvalue, "dateValue")




  const gettimesheet = async (e) => {
    try {
      const response = await axios.put(
        "/api/get_employee_all_for_attendence",
        {
          ATTENDANCE_ADMIN_USERNAME: ids?.Eid,
          ATTENDANCE_EMPLOYEE_USERNAME: ids?.id,
          ATTENDANCE_START_DATE: dateValue.ATTENDANCE_START_DATE,
          ATTENDANCE_END_DATE: dateValue.ATTENDANCE_END_DATE,
        },

      );
      setTimeout(() => {
        setWorkvalue(response.data.result);
      }, 1000);
    } catch (err) {
      console.log("something Went wrong: =>", err);
    }
  };

  useEffect(() => {
    gettimesheet();
  }, [ids?.id, ids?.Eid, dateValue.ATTENDANCE_START_DATE, dateValue.ATTENDANCE_END_DATE]);


  
 

  // time calculation
  const timeValueHours = (x, y) => {

    // console.log(x,"xxxxxx")
    const attendanceIn = moment(y, 'hh:mm A').utcOffset(0);
    const attendanceOut = moment(x, 'hh:mm A').utcOffset(0);
    const duration = moment.duration(attendanceOut.diff(attendanceIn));
    const totalHours = Math.floor(duration.asHours());
    const totalMinutes = duration.minutes();
    return `${totalHours} hours and ${totalMinutes} minutes`;
  };


  // overtime calculation
  const Overtime = (x, y) => {

    // console.log(x,"xxxxxx")
    const attendanceIn = moment(y, 'hh:mm A').utcOffset(0);
    const attendanceOut = moment(x, 'hh:mm A').utcOffset(0);
    const duration = moment.duration(attendanceOut.diff(attendanceIn));
    const totalHours = Math.floor(duration.asHours());

    // Define a threshold for regular hours (e.g., 40 hours per week)
    const regularHoursThreshold = 8;
    let overtimeHours = 0;

    if (totalHours > regularHoursThreshold) {
      overtimeHours = totalHours - regularHoursThreshold;
    }

    return `${overtimeHours} hours`
  };
  



  const attendanceIn = moment('11:50 AM', 'hh:mm A');
  const attendanceOut = moment('5:00 PM', 'hh:mm A');
  const duration = moment.duration(attendanceOut.diff(attendanceIn));
  const totalHours = Math.floor(duration.asHours());
  const totalMinutes = duration.minutes().toString().padStart(2, '0');

  console.log(`${totalHours} hours and ${totalMinutes} minutes`);




  const allHours = workvalue?.map((e) => {
    return (
      timeValueHours(moment(e.ATTENDANCE_OUT).utcOffset(0).format("LT"), moment(e.ATTENDANCE_IN).utcOffset(0).format("LT"))
    );
  });




  const convertToDuration = (timeString) => {
    const [hours, minutes] = timeString.match(/\d+/g)?.map(Number) || [0, 0];
    return moment.duration({ hours, minutes });
  };





  // read duration
  const ReadDuration = (event) => {
    const totalDuration = event.reduce((acc, timeString) => {
      const duration = convertToDuration(timeString);
      return acc.add(duration);
    }, moment.duration());
    return totalDuration
  }


  //overall time
  const overallTime = (event) => {
    // Add up all durations in the array
    const totalDuration = ReadDuration(event)

    // Get total hours and minutes from the total duration
    const totalHourss = Math.floor(totalDuration.asHours());
    const totalMinutess = totalDuration.minutes();
    return `${totalHourss} hours and ${totalMinutess} minutes`;
  }



  // calculations
  const ResultantTime = overallTime(allHours);
  const ExtractHours = convertToDuration(ResultantTime)?._data.hours;
  // const totalIncome = ExtractHours * props.mainData.EMPLOYEE_HOURLY_WAGE;

  


  return (
    <>
    <div className="container-fluid g-0">
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark"
          style={{ marginBottom: 0 }}
        >
          <div className="container">
            <a className="navbar-brand" href="#">
              {/* {state.EMPLOYEE_NAME} (Employee) */}
            </a>
            <button
              className="btn btn-outline-primary my-2 my-sm-0 btn-sm"
              type="submit"
              // onClick={logout}
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
                <a className="bg-dark text-white nav-link">My Projects</a>
                <Link className="bg-white text-dark nav-link" to="">My attendance history</Link>
              </div>
            </div>
          </div>
        </nav>
      <div className="container" style={{ height: "70vh" }}>
        {/* <p>
          {" "}
          <b style={{ fontWeight: "600", color: "black" }}>Employee Name : </b>
          {props.mainData.EMPLOYEE_NAME}
        </p> */}
        <div style={{ display: "flex", gap: 10, padding: "5px 0" }}>
        </div>
        <div className="col-3">
          <table className="table p-0 m-0">
            <tr>
              <th><LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    label="Date from"
                    // onChange={(newValue) => setstartDateString(newValue)}
                    onChange={(event) =>
                      setDate((prev) => ({
                        ...prev, ATTENDANCE_START_DATE: event,
                      }))
                    }
                    defaultValue={dayjs(dateValue.ATTENDANCE_START_DATE)}
                    sx={{}}
                    formatDensity="spacious"
                  />
                </DemoContainer>
              </LocalizationProvider>
              </th>
              <th>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      label="Date to"
                      // onChange={(newValue) => setstartDateString(newValue)}
                      onChange={(event) =>
                        setDate((prev) => ({
                          ...prev,
                          ATTENDANCE_END_DATE: event,
                        }))
                      }
                      defaultValue={dayjs(dateValue.ATTENDANCE_END_DATE)}
                      sx={{ height: "10" }}
                      formatDensity="spacious"
                    />
                  </DemoContainer>
                </LocalizationProvider></th>
            </tr>
          </table>
        </div>
        <table className="table table-hover border">
          <thead style={{ border: "1px solid black" }}>
            <tr className="table-dark">
              <th scope="col">Date</th>
              <th scope="col">In</th>
              <th scope="col">Out</th>
              <th scope="col">Working hours</th>
              <th scope="col">Overtime</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {workvalue?.map((item) => (
              <tr className="table table-striped">
                <td>{item.ATTENDANCE_DATE_ID}</td>
                <td>{item.ATTENDANCE_IN && moment(item.ATTENDANCE_IN).utcOffset(0).format("LT")}</td>
                <td>{item.ATTENDANCE_OUT && moment(item.ATTENDANCE_OUT).utcOffset(0).format("LT")}</td>
                <td>
                  {item.ATTENDANCE_OUT && timeValueHours(moment(item.ATTENDANCE_OUT).utcOffset(0).format("LT"), moment(item.ATTENDANCE_IN).utcOffset(0).format("LT"))}
                </td>
                <td>
                  {item.ATTENDANCE_OUT && Overtime(moment(item.ATTENDANCE_OUT).utcOffset(0).format("LT"), moment(item.ATTENDANCE_IN).utcOffset(0).format("LT"))}
                </td>
                <td>
                  {item.ATTENDANCE_IN && item.ATTENDANCE_OUT
                    ? "present"
                    : item.ATTENDANCE_IN && item.ATTENDANCE_OUT && "absent"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container" style={{ position: "", bottom: "0" }}>
        <div className="row border">
          <div className="col-6  pt-5 ">
            <p className="fw-semibold text-dark">
              Employee Signature:{" "}
              <span
                style={{
                  borderBottom: "2px solid black",
                  width: "200px",
                }}
              ></span>
            </p>
          </div>

          <div className="col-5">
            <div className="row">
              <div className="col-5  m-2">
                <p className="text-dark fw-semibold">Total Hours</p>
                <p className="text-dark fw-semibold">Rate Per Hour</p>
                <p className="text-dark fw-semibold">Total Pay</p>
              </div>
              <div className="col-6  m-2">
                <p className="bg-warning text-center fs-6 text-dark">
                  {ResultantTime}
                </p>
                {/* <p className="bg-primary text-center fs-6 text-light">
                  {props?.mainData.EMPLOYEE_HOURLY_WAGE}
                </p> */}
                {/* <p className="bg-success text-center fs-6 text-light">
                  $ {totalIncome}
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default EmployeeTimeSheetUser;
