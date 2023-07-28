import React, { useEffect, useState } from "react";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import moment from "moment/moment";
import employees from "./dummy.json";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  styled,
} from "@mui/material";
import { TableRows } from "@mui/icons-material";

let MyDateCurrent = new Date();
let MyDateStringCurrent;
MyDateCurrent.setDate(MyDateCurrent.getDate());
MyDateStringCurrent =
  MyDateCurrent.getFullYear() +
  "-" +
  ("0" + (MyDateCurrent.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + MyDateCurrent.getDate()).slice(-2);

console.log(MyDateStringCurrent, "Mydate");

//Day after seven

let MyDateAfter = new Date();
let MyDateStringAfter;

MyDateAfter.setDate(MyDateAfter.getDate());

MyDateStringAfter =
  MyDateAfter.getFullYear() +
  "-" +
  ("0" + (MyDateAfter.getMonth() + 7)).slice(-2) +
  "-" +
  ("0" + MyDateAfter.getDate()).slice(-2);

console.log(MyDateStringAfter, "Mydate");

const AttendanceReport = (props) => {
  // console.log(props, "props data in timesheet");
  const [showPunch, setPunch] = useState(true);
  const [workvalue, setWorkvalue] = useState([]);
  // const [timeResultIN, settimeResultIN] = useState([]);
  // const [timeResultOUT, settimeResultOUT] = useState([]);
  const [dateValue, setDate] = useState({
    ATTENDANCE_START_DATE: MyDateStringCurrent,
    ATTENDANCE_END_DATE: MyDateAfter,
  });

  useEffect(() => {
    gettimesheet();
  }, [props.mainData?.EMPLOYEE_MEMBER_PARENT_USERNAME]);

  // console.log(dateValue, "datevalue");

  // get employee report

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const gettimesheet = async (e) => {
    try {
      const response = await axios.put(
        "http://3.84.137.243:5001/get_employee_all_for_attendence",
        {
          ATTENDANCE_ADMIN_USERNAME:
            props.mainData?.EMPLOYEE_MEMBER_PARENT_USERNAME,
          ATTENDANCE_EMPLOYEE_USERNAME: props.mainData?.EMPLOYEE_USERNAME,
          ATTENDANCE_START_DATE: dateValue.ATTENDANCE_START_DATE,
          ATTENDANCE_END_DATE: dateValue.ATTENDANCE_END_DATE,
        },
        { headers }
      );
      setTimeout(() => {
        console.log("ALL WEB", response);
        setWorkvalue(response.data.result);
      }, 1000);
    } catch (err) {
      console.log("something Went wrong: =>", err);
    }
  };

  // time calculation

  // const timeValueHours = (x, y) => {
  //   return new Date(x).getUTCHours() - new Date(y).getUTCHours();
  // };

  // const timeValueMinutes = (x, y) => {
  //   return new Date(x).getUTCMinutes() - new Date(y).getUTCMinutes();
  // };

  // const allHours = workvalue.map((e) => {
  //   return (
  //     new Date(e.ATTENDANCE_OUT).getUTCHours() -
  //     new Date(e.ATTENDANCE_IN).getUTCHours() +
  //     ":" +
  //     (new Date(e.ATTENDANCE_OUT).getUTCMinutes() -
  //       new Date(e.ATTENDANCE_IN).getUTCMinutes())
  //   );
  // });

  // const sum = allHours.reduce(
  //   (time1, time2) => time1.add(moment.duration(time2)),
  //   moment.duration()
  // );

  // var startTime = moment("12:16:59 am", "hh:mm:ss a");
  // var endTime = moment("06:12:07 pm", "hh:mm:ss a");

  // var result =
  //   endTime.diff(startTime, "hours") +
  //   " Hrs and " +
  //   endTime.diff(startTime, "minutes") +
  //   " Mns";

  // console.log(result, "hhh");

  //gate cuurent and addition seven days

 




  const total = (event) => {
    const e = event.EMPLOYEE_ATTENDANCE.map((post) => {
      return (
        Math.abs(new Date(post.ATTENDANCE_OUT).getUTCHours() -
        new Date(post.ATTENDANCE_IN).getUTCHours()) +
        ":" +
        Math.abs((new Date(post.ATTENDANCE_OUT).getUTCMinutes() -
          new Date(post.ATTENDANCE_IN).getUTCMinutes())
      ));
    });

    const sum = e.reduce(
      (time1, time2) => time1.add(moment.duration(time2)),
      moment.duration()
    );
    return (sum._data.hours)+":"+(sum._data.minutes);
  };

//  const result = total(
//   {EMPLOYEE_ATTENDANCE:
//         [
//             {               
//               "ATTENDANCE_DATE_ID":"2023-07-25",
//               "ATTENDANCE_IN":"2023-07-25T09:34:36.717Z",
//               "ATTENDANCE_OUT":"2023-07-25T13:34:36.717Z"
//             },
//             {               
//               "ATTENDANCE_DATE_ID":"2023-08-25",
//               "ATTENDANCE_IN":"2023-08-25T09:34:36.717Z",
//               "ATTENDANCE_OUT":"2023-08-25T14:34:36.717Z"
//             },
//             {               
//               "ATTENDANCE_DATE_ID":"2023-09-25",
//               "ATTENDANCE_IN":"2023-09-25T09:34:36.717Z",
//               "ATTENDANCE_OUT":"2023-09-25T12:34:36.717Z"
//             },
//             {               
//               "ATTENDANCE_DATE_ID":"2023-10-25",
//               "ATTENDANCE_IN":"2023-10-25T09:34:36.717Z",
//               "ATTENDANCE_OUT":"2023-10-25T14:34:36.717Z"
//             },
//             {               
//               "ATTENDANCE_DATE_ID":"2023-11-25",
//               "ATTENDANCE_IN":"2023-11-25T09:34:36.717Z",
//               "ATTENDANCE_OUT":"2023-11-25T14:14:36.717Z"
//             }
//     ]
//   }
//  )

//  const timelist = result

//  const sum = timelist.reduce(
//   (time1, time2) => time1.add(moment.duration(time2)),
//   moment.duration()
// );


//  console.log(sum,"results")







  const MyScreen = styled(Paper)((props) => ({
    height: "calc(100vh - 32px)",
    padding: 0,
    paddingBottom: "0",
    overflow: "auto",
    borderRadius: 0,
    Border: 0,
    display: props.screenIndex ? "block" : "none",
  }));

  console.table(employees, "all employee");

  const PunchReport = () => {
    return (
      <Box className="box" style={{ background: "#277099" }}>
        <Button
          size="small"
          className="btn button border-bottom-0 bg-white"
          variant="outlined"
        >
          Pay Acknowledgement
        </Button>
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
              <Grid xl={4}>
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
                            <select className="form-control border">
                              <option>By Pay Period</option>
                            </select>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell size="small">
                            <label> Date </label>
                          </TableCell>
                          <TableCell size="small">
                            <select className="form-control border">
                              <option>By Pay Period</option>
                            </select>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Grid item container xl={4}>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell size="small">
                          <label> Employee </label>
                        </TableCell>
                        <TableCell size="small">
                          <select className="form-control border">
                            <option>All</option>
                          </select>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell size="small">
                          <label> Department </label>
                        </TableCell>
                        <TableCell size="small">
                          <select className="form-control border">
                            <option>All</option>
                          </select>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item container xl={4}>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell size="small">
                          <label> Shift </label>
                        </TableCell>
                        <TableCell size="small">
                          <select className="form-control border">
                            <option>All</option>
                          </select>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell size="small">
                          <label> Work Type </label>
                        </TableCell>
                        <TableCell size="small">
                          <select className="form-control border">
                            <option>All</option>
                          </select>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>

            <table className="table table-hover table-sm table-fixed">
              <thead
                style={{
                  position: "sticky",
                  top: "85px",
                }}
              >
                <tr className="table-light">
                  <th scope="col" colSpan={7} style={{ gap: 2 }}>
                    <button className="btn btn-primary btn-sm">
                      Print Preview
                    </button>{" "}
                    <button className="btn btn-secondary btn-sm">
                      Export(PDF)
                    </button>{" "}
                    <button className="btn btn-secondary btn-sm">
                      Export(CSV)
                    </button>
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                  (item) => (
                    <tr className="table table-striped">
                      <td>null</td>
                      <td>null</td>
                      <td>null</td>
                      <td>null</td>
                      <td>null</td>
                      <td>null</td>
                      <td>
                        {" "}
                        <button className="btn btn-secondary btn-sm">
                          punch
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Box>
        </MyScreen>
      </Box>
    );
  };

  return (
    <>
      <Box className="box" style={{ background: "#277099" }}>
        <Button
          size="small"
          className="btn button border-bottom-0 bg-white"
          variant="outlined"
        >
          Pay Acknowledgement
        </Button>
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
              <Grid xl={4}>
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
                            <select className="form-control border">
                              <option>By Pay Period</option>
                            </select>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell size="small">
                            <label> Date </label>
                          </TableCell>
                          <TableCell size="small">
                            <select className="form-control border">
                              <option>By Pay Period</option>
                            </select>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Grid item container xl={4}>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell size="small">
                          <label> Employee </label>
                        </TableCell>
                        <TableCell size="small">
                          <select className="form-control border">
                            <option>All</option>
                          </select>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell size="small">
                          <label> Department </label>
                        </TableCell>
                        <TableCell size="small">
                          <select className="form-control border">
                            <option>All</option>
                          </select>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item container xl={4}>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell size="small">
                          <label> Shift </label>
                        </TableCell>
                        <TableCell size="small">
                          <select className="form-control border">
                            <option>All</option>
                          </select>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell size="small">
                          <label> Work Type </label>
                        </TableCell>
                        <TableCell size="small">
                          <select className="form-control border">
                            <option>All</option>
                          </select>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>

            <table className="table table-hover table-sm table-fixed">
              <thead
                style={{
                  position: "sticky",
                  top: "85px",
                }}
              >
                <tr className="table-light">
                  <th scope="col" colSpan={7} style={{ gap: 2 }}>
                    <button className="btn btn-primary btn-sm">
                      Print Preview
                    </button>{" "}
                    <button className="btn btn-secondary btn-sm">
                      Export(PDF)
                    </button>{" "}
                    <button className="btn btn-secondary btn-sm">
                      Export(CSV)
                    </button>
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
                {employees.map((post) => (
                  <tr className="table table-striped">
                    <td>{post.EMPLOYEE_NAME}</td>
                    <td><span className="bg-success rounded-2 px-1 text-light" style={{width:"content-fit"}}>{total(post)}</span></td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>
                      {" "}
                      <button className="btn btn-secondary btn-sm">
                        Punch Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </MyScreen>
      </Box>
    </>
  );
};

export default AttendanceReport;
