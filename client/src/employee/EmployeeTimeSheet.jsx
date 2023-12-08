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

// current day
let MyDateCurrent = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
const formattedMyDateCurrent = moment(MyDateCurrent).utcOffset(0).format('YYYY-MM-DD');

//Day before 30
let MyDateBefore = moment().subtract(30, 'days').format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
const formattedMyDateBefore = moment(MyDateBefore).utcOffset(0).format('YYYY-MM-DD');

const EmployeeTimeSheet = (props) => {

  const [workvalue, setWorkvalue] = useState([]);
  const [dateValue, setDate] = useState({
    ATTENDANCE_START_DATE: formattedMyDateBefore,
    ATTENDANCE_END_DATE: formattedMyDateCurrent,
  });


  console.log(dateValue, formattedMyDateCurrent, "dateValue")


  useEffect(() => {
    gettimesheet();
  }, [props.mainData?.EMPLOYEE_MEMBER_PARENT_USERNAME, dateValue.ATTENDANCE_START_DATE, dateValue.ATTENDANCE_END_DATE]);


  const gettimesheet = async (e) => {
    try {
      const response = await axios.put(
        "/api/get_employee_all_for_attendence",
        {
          ATTENDANCE_ADMIN_USERNAME: props.mainData?.EMPLOYEE_MEMBER_PARENT_USERNAME,
          ATTENDANCE_EMPLOYEE_USERNAME: props.mainData?.EMPLOYEE_USERNAME,
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

  // time calculation
  const timeValueHours = (x, y) => {
    return Math.abs(new Date(x).getUTCHours() - new Date(y).getUTCHours());
  };

  const timeValueMinutes = (x, y) => {
    return Math.abs(new Date(x).getUTCMinutes() - new Date(y).getUTCMinutes());
  };

  const allHours = workvalue.map((e) => {
    return (
      Math.abs(new Date(e.ATTENDANCE_OUT).getUTCHours() -
        new Date(e.ATTENDANCE_IN).getUTCHours()) +
      ":" +
      Math.abs(new Date(e.ATTENDANCE_OUT).getUTCMinutes() -
        new Date(e.ATTENDANCE_IN).getUTCMinutes())
    );
  });

  const sum = allHours.reduce(
    (time1, time2) => time1.add(moment.duration(time2)),
    moment.duration()
  );



  //gate cuurent and addition seven days

  // total Income
  const totalIncome = Math.floor(sum.hours()) * props.mainData.EMPLOYEE_HOURLY_WAGE;

  // total Hours
  const workingHours = Math.floor(sum.hours()) +
    "hours" +
    " " +
    sum.minutes() +
    "mins"


  console.log(workvalue, "workvalue")


  return (
    <>
      <div className="container-fluid border" style={{ height: "70vh" }}>
        <p>
          {" "}
          <b style={{ fontWeight: "600", color: "black" }}>Employee Name : </b>
          {props.mainData.EMPLOYEE_NAME}
        </p>
        <div style={{ display: "flex", gap: 10, padding: "5px 0" }}>
          {/* <div className="form-group col-xl-1">
            <label>Date From: </label>
            <input
              type="date"
              className="form-control form-control-2"
              value={dateValue.ATTENDANCE_START_DATE}
              onChange={(event) =>
                setDate((prev) => ({
                  ...prev, ATTENDANCE_START_DATE: event.target.value,
                }))
              }
            />
          </div> */}
          {/* <div className="form-group col-xl-1">
            <label>Date to: </label>
            <input
              type="date"
              className="form-control form-control-2"
              value={dateValue.ATTENDANCE_END_DATE}
              onChange={(event) =>
                setDate((prev) => ({
                  ...prev,
                  ATTENDANCE_END_DATE: event.target.value,
                }))
              }
            />
          </div>
          <div>
          </div> */}
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
                  {item.ATTENDANCE_OUT && timeValueHours(item.ATTENDANCE_OUT, item.ATTENDANCE_IN) + "hours"}{" "}
                  {/* hours{" "} */}
                  {item.ATTENDANCE_OUT && timeValueMinutes(item.ATTENDANCE_OUT, item.ATTENDANCE_IN) + "mins"}{" "}

                </td>
                <td>{(Math.abs(Math.floor(sum.hours()) +
                  " hours" +
                  " " +
                  sum.minutes() +
                  " mins"))}</td>
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
      <div className="container-fluid" style={{ position: "", bottom: "0" }}>
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
              <div className="col-4  m-2">
                <p className="bg-warning text-center fs-6 text-light">
                  {Math.floor(sum.hours()) +
                    " hours" +
                    " " +
                    sum.minutes() +
                    " mins"}
                </p>
                <p className="bg-primary text-center fs-6 text-light">
                  {" "}
                  {props.mainData.EMPLOYEE_HOURLY_WAGE}
                </p>
                <p className="bg-success text-center fs-6 text-light">
                  $ {totalIncome}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeTimeSheet;
