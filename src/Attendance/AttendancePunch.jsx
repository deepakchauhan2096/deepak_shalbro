import React, { useEffect, useState } from "react";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import moment from "moment/moment";
// import employees from "./dummy.json";
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
import env from "react-dotenv";

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


const AttendancePunch = (props) => {


    const data = props.data

    const newdata = {
      ...data,
      EMPLOYEE_ATTENDANCE: data.EMPLOYEE_ATTENDANCE.map((attendance) => {
        const attendanceIn = moment(attendance.ATTENDANCE_IN);
        const attendanceOut = moment(attendance.ATTENDANCE_OUT);
        const totalHours = moment.utc(attendanceOut.diff(attendanceIn)).format("HH:mm");
        const overtime = moment("08:00", "HH:mm").subtract(moment.duration(totalHours)).format("HH:mm");
    
        return {
          ...attendance,
          TOTAL_HOURS: totalHours,
          OVERTIME: overtime,
          LOCATION: data.EMPLOYEE_CITY
        };
      }),
    };
    
    console.log(newdata,"modi");














    const employees = [props.data]

    console.log(employees, "punch detail")
    const [showPunch, setPunch] = useState(true);
    const [workvalue, setWorkvalue] = useState([]);
    const [keyword, setKeyword] = useState(MyDateStringCurrent)
    const [filterMethod, setFilterMethod] = useState('Date wise')
    const [foundUsers, setFoundUsers] = useState(newdata.EMPLOYEE_ATTENDANCE);
    const [name, setName] = useState("All");
    const [startDateString, setstartDateString] = useState("--start--")
    const [endDateString, setendDateString] = useState("--end--")



  









    const MyScreen = styled(Paper)((props) => ({
        height: "calc(100vh - 32px)",
        padding: 0,
        paddingBottom: "0",
        overflow: "auto",
        borderRadius: 0,
        Border: 0,
        display: props.screenIndex ? "block" : "none",
    }));





    const arrayDate = []
    arrayDate.push(keyword)


    // date array function call
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    const dateArray = getDatesBetween(startDate, endDate);



   console.log(dateArray,"dateArray")

      
    //filter by different param

    const filtered = (e, item) => {
        
        const word = e.target.value;

        if (word !== "" && word !== "All") {
            const results = newdata.EMPLOYEE_ATTENDANCE.filter((post) => {
                return (filterMethod === "By Pay Period" ? dateArray : [word]).includes(post[item]) ;
            });
            setFoundUsers(results);
        } else {
            setFoundUsers(newdata.EMPLOYEE_ATTENDANCE);
        }

        setName(word);
    };


    

    

    return (
        <>
            {/* <Box className="box" style={{ background: "#277099" }}>
        <Button
          size="small"
          className="btn button border-bottom-0 bg-white"
          variant="outlined"
        >
          Punch Detail - {employees.map((e) => e.EMPLOYEE_NAME)}
        </Button> */}
            <MyScreen sx={{ display: "block", padding: 3, border: "", position: "absolute", left: 0, width: "100%" }}>
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
                                                    <label> Date </label>
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
                                                    <div style={{ display: "flex", flexDirection: "row", gap: 2 }}>
                                                        <input type="date" className="form-control" value={startDateString} onChange={(e) => setstartDateString(e.target.value)} />
                                                        <input type="date" className="form-control" value={endDateString} onChange={(e) => setendDateString(e.target.value)} />
                                                    </div>
                                                    <input type="button" value="submit" onClick={(e) => filtered(e, "ATTENDANCE_DATE_ID")} />
                                                    

                                                </TableCell>

                                            </TableRow>}
                                            {filterMethod === "Date wise" && <>
                                                <TableCell size="small">
                                                    <label> Date wise</label>
                                                </TableCell>
                                                <TableCell size="small">
                                                    {/* <select
                                                        value={keyword}
                                                        className="form-control border"
                                                        onChange={(e) => setKeyword(e.target.value)}
                                                    >
                                                        <option selected>{MyDateStringCurrent}</option>
                                                        {result.map((item) => <option>{item}</option>)}
                                                        
                                                    </select> */}
                                                    <select className="form-control border" onChange={(e) => filtered(e, "ATTENDANCE_DATE_ID")} value={name}>
                                                    <option selected>All</option>
                                                    {newdata.EMPLOYEE_ATTENDANCE.map((e) => <option>{e.ATTENDANCE_DATE_ID}</option>)}
                                                    </select>
                                                </TableCell>
                                            </>
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                        {/* <Grid item container xl={4}>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell size="small">
                                                <label> Employee </label>
                                            </TableCell>
                                            <TableCell size="small">
                                                <select className="form-control border" onChange={(e) => filtered(e, "ATTENDANCE_DATE_ID")} value={name}>
                                                    <option selected>All</option>
                                                    {newdata.EMPLOYEE_ATTENDANCE.map((e) => <option>{e.ATTENDANCE_DATE_ID}</option>)}
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
                                                    {employees.map((e) => <option>{e.EMPLOYEE_ROLE}</option>)}
                                                </select>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid> */}
                        {/* <Grid item container xl={4}>
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
                        </Grid> */}
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
                                <th scope="col">Day</th>
                                <th scope="col">In</th>
                                <th scope="col">Out</th>
                                <th scope="col">Hours</th>
                                <th scope="col">shift</th>
                                <th scope="col">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foundUsers.map(post => (
                                    <tr className="table table-striped">
                                        <td>{props.data.EMPLOYEE_NAME}</td>
                                        <td>{post.ATTENDANCE_DATE_ID}</td>
                                        <td>{moment(post.ATTENDANCE_IN).format("LT")}</td>
                                        <td>{moment(post.ATTENDANCE_OUT).format("LT")}</td>
                                        <td>{post.TOTAL_HOURS}</td>
                                        <td>-</td>
                                        <td>{post.LOCATION}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </Box>
            </MyScreen>
            {/* </Box> */}
        </>
    );
};

export default AttendancePunch;
