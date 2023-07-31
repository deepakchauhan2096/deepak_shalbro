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

//current Date

let MyDateAfter = new Date();
let MyDateStringAfter;

MyDateAfter.setDate(MyDateAfter.getDate());

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

  for (let i = 0; i < 30; i++) {
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
  const [showPunch, setPunch] = useState(true);
  const [workvalue, setWorkvalue] = useState([]);
  const [keyword, setKeyword] = useState(MyDateStringCurrent)
  const [filterMethod, setFilterMethod] = useState('Date wise')
  const [foundUsers, setFoundUsers] = useState(employees);
  const [name, setName] = useState("All");
  const [startDateString, setstartDateString] = useState("--start--")
  const [endDateString, setendDateString] = useState("--end--")

  

  const [dateValue, setDate] = useState({
    ATTENDANCE_START_DATE: MyDateStringCurrent,
    ATTENDANCE_END_DATE: MyDateAfter,
  });

  useEffect(() => {
    gettimesheet();
  }, [props.mainData?.EMPLOYEE_MEMBER_PARENT_USERNAME]);

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
        // console.log("ALL WEB", response);
        setWorkvalue(response.data.result);
      }, 1000);
    } catch (err) {
      console.log("something Went wrong: =>", err);
    }
  };


  //gate cuurent and addition seven days

  const total = (event) => {
    const e = event.map((post) => {
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


  const MyScreen = styled(Paper)((props) => ({
    height: "calc(100vh - 32px)",
    padding: 0,
    paddingBottom: "0",
    overflow: "auto",
    borderRadius: 0,
    Border: 0,
    display: props.screenIndex ? "block" : "none",
  }));

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


//filter by different param

const filtered = (e,item) => {
  // topFunction()
  const word = e.target.value;

    if (word !== "" && word !== "All") {
    const results = employees.filter((post) => {
      return post[item].toLowerCase().includes(word.toLowerCase());
    });
    setFoundUsers(results);
  } else {
    setFoundUsers(employees);
  }

  setName(word);
};


 const arrayDate = []
 arrayDate.push(keyword)


 // date array function call

 
const startDate = new Date(startDateString);
const endDate = new Date(endDateString);

const dateArray = getDatesBetween(startDate, endDate);

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
                            <select 
                            className="form-control border"
                            onChange={(e) => setFilterMethod(e.target.value)}
                            value={filterMethod}
                            >
                              <option>Date wise</option>
                              <option>By Pay Period</option>
                            </select>
                          </TableCell>
                        </TableRow>
                        {filterMethod === "By Pay Period" && <TableRow>
                          <TableCell size="small">
                            <label>Period</label>
                          </TableCell>
                          <TableCell size="small">
                            <div style={{display:"flex",flexDirection:"row",gap:2}}>
                            <input type="date" className="form-control" value={startDateString} onChange={(e)=> setstartDateString(e.target.value)}/>
                            <input type="date" className="form-control" value={endDateString} onChange={(e)=> setendDateString(e.target.value)}/>
                            </div>
                            
                          </TableCell>
                        </TableRow>}
                       {filterMethod === "Date wise" && <>
                        <TableCell size="small">
                         <label> Date filter by </label>
                       </TableCell>
                       <TableCell size="small">
                         <select 
                         value={keyword}
                         className="form-control border"
                         onChange={(e) => setKeyword(e.target.value)}
                         >
                           <option  selected>{MyDateStringCurrent}</option>
                           {result.map((item)=><option>{item}</option>)}
                         </select>
                       </TableCell>
                       </>
                        }
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
                          <select className="form-control border" onChange={(e) => filtered(e, "EMPLOYEE_NAME")} value={name}>
                            <option selected>All</option>
                            {employees.map((e)=><option>{e.EMPLOYEE_NAME}</option>)}
                          </select>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell size="small">
                          <label> Department </label>
                        </TableCell>
                        <TableCell size="small">
                        <select className="form-control border" onChange={(e) => filtered(e, "EMPLOYEE_ROLE")} value={name}>
                            <option selected>All</option>
                            {employees.map((e)=><option>{e.EMPLOYEE_ROLE}</option>)}
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
                {foundUsers.map(post =>

                { 
                  console.log(post.EMPLOYEE_ATTENDANCE, "AAA")
                  let filterByDate;
                    // filterByDate = post.EMPLOYEE_ATTENDANCE.filter((post) => {
                    //   return post.ATTENDANCE_DATE_ID.toLowerCase().includes(keyword.toLowerCase())
                    // });

                    filterByDate = post.EMPLOYEE_ATTENDANCE.filter((item) => {
                      return (filterMethod === "By Pay Period" ? dateArray : arrayDate).includes(item.ATTENDANCE_DATE_ID);
                    });

                  console.log(filterByDate,arrayDate,"filter")
                
               return (
                  <tr className="table table-striped">
                    <td>{post.EMPLOYEE_NAME}</td>
                    <td><span className="bg-success rounded-2 px-1 text-light" style={{width:"content-fit"}}>{total([...filterByDate])} Total</span></td>
                    <td><span className="bg-success rounded-2 px-1 text-light" style={{width:"content-fit"}}>{total([...filterByDate])} Total</span></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      {" "}
                      <button className="btn btn-secondary btn-sm">
                        Punch Detail
                      </button>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </Box>
        </MyScreen>
      </Box>
    </>
  );
};

export default AttendanceReport;
