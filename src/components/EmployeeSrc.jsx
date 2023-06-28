import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import AddEmployee from "../modal/AddEmployee";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import teamImg1 from "../assests/images/team-1.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Backdrop, Button, CircularProgress, Container } from "@mui/material";

const EmployeeSrc = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [allempData, setAllempData] = useState({
    COMPANY_PARENT_ID: 18,
    COMPANY_PARENT_USERNAME: "deepanshu1",
  });

  // console.log("employeerowdata: =>", employeDatatable);
  console.log("All_employe_data: =>", allempData);

  useEffect(() => {
    // fetchEmployee();
    fetchAllEmployee();
  }, []);

  const [filterData, setFilteredData] = useState({
    row: {
      "EMPLOYEE_DOB": "",
      "EMPLOYEE_EMPLMNTTYPE": "",
      "EMPLOYEE_HIRE_DATE": "",
      "EMPLOYEE_HOURLY_WAGE": "",
      "EMPLOYEE_ADD": "",
      "_id": "649542d61de4d6ddb5243b83",
      "EMPLOYEE_ID": 26,
      "EMPLOYEE_PARENT_ID": 21,
      "EMPLOYEE_PARENT_USERNAME": "company123",
      "EMPLOYEE_MEMBER_PARENT_ID": 18,
      "EMPLOYEE_MEMBER_PARENT_USERNAME": "deepanshu1",
      "EMPLOYEE_ROLE": "NAUKARI",
      "EMPLOYEE_NAME": "NAUKAR",
      "EMPLOYEE_PHONE": 1234567890,
      "EMPLOYEE_EMAIL": "naukar@gmail.com",
      "EMPLOYEE_USERNAME": "bhaknaukar",
      "__v": 0
  },
  });
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const fetchAllEmployee = async () => {
    try {
      const response = await axios.put(
        "http://54.89.160.62:5001/get_employee_all",
        {
          EMPLOYEE_MEMBER_PARENT_ID: 18,
          EMPLOYEE_MEMBER_PARENT_USERNAME: "deepanshu1",
        },
        { headers }
      );
      setTimeout(() => {
        console.log("ALL EMPLOYEE data ", response);
        const data = response.data;
        // setAllempData(data.result[0].COMPANY_EMPLOYIES);
        setAllempData(data.result);
        console.log("all employee data", data.result[0].EMPLOYEE_NAME);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      console.log("something Went wrong: =>", err);
    }
  };

  const columns = [
    { field: "EMPLOYEE_ID", headerName: "ID", width: 60 },
    {
      field: "EMPLOYEE_USERNAME",
      headerName: "Username",
      width: 120,
      // editable: true,
    },
    {
      field: "EMPLOYEE_NAME",
      headerName: "Name",
      width: 120,
      // editable: true,
    },
    {
      field: "EMPLOYEE_EMAIL",
      headerName: "E-mail",
      width: 120,
      // editable: true,
    },
    {
      field: "EMPLOYEE_ROLE",
      headerName: "Employee Role",
      width: 120,
      // editable: true,
    },
    {
      field: "EMPLOYEE_PHONE",
      headerName: "Phone",
      width: 120,
      // editable: true,
    },
    {
      field: "in",
      headerName: "IN",
      width: 80,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            className="view-btn "
            style={{ padding: "2px 2px",background:"#00a152" ,color:"white" }}
            onClick={(event) => {
              handleClick(cellValues);
            }}
          >
            In
          </Button>
        );
      },
    },

    {
      field: "OUT",
      headerName: "OUT",
      width: 100,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            className="view-btn  btn btn-success btn-danger"
            style={{ padding: "2px 2px", background:"#ab003c" }}
            onClick={(event) => {
              handleClick(cellValues);
            }}
          >
            Out
          </Button>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            className="view-btn primary btn btn-success"
            style={{ padding: "2px 2px" }}
            onClick={(event) => {
              handleClick(cellValues);
            }}
          >
            view
          </Button>
        );
      },
    },
  ];

  // const rows = employeDatatable;allempData
  const rows = allempData;
  console.log("rows", rows);

  function downloadPDF(pdf) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "abc.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  const handleClick = (event) => {
    setFilteredData(event);
    handleOpen();
  };

  const tablerows = [
    {
      date: "12/06/23",
      day: "Monday",
      status: "Present",
      in: 10,
      out: 6,
      workinghrs: 8,
    },
    {
      date: "13/06/23",
      day: "Tuesday",
      status: "Present",
      in: 10,
      out: 6,
      workinghrs: 8,
    },
    {
      date: "14/06/23",
      day: "Wednesday",
      status: "Absend",
      in: 11,
      out: 6,
      workinghrs: 7,
    },
    {
      date: "14/06/23",
      day: "Thursday",
      status: "Present",
      in: 11,
      out: 6,
      workinghrs: 7,
    },
    {
      date: "14/06/23",
      day: "Friday",
      status: "Present",
      in: 11,
      out: 6,
      workinghrs: 7,
    },
    {
      date: "14/06/23",
      day: "Saturday",
      status: "Present",
      in: 11,
      out: 6,
      workinghrs: 7,
    },
  ];

  return (
    <>
      <Container
        id="content"
        sx={{ height: "100vh", position: "relative" }}
        maxWidth="xl"
        className="containers"
      >
        <Box className="p-4">
          <div className="container-fluid d-flex pb-0 g-0 flex-column">
            <div style={{ height: "20%" }}>
              <Button className="btn button btn-blue" variant="contained">
                Employee
              </Button>
              <AddEmployee />
            </div>

            {isLoading ? (
              <Backdrop open={isLoading}>
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : (
              <div style={{ height: "88vh", padding: 20, paddingBottom: "0" }}>
                <DataGrid
                  sx={{ border: "none" }}
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row.EMPLOYEE_ID}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 20,
                      },
                    },
                  }}
                  density="compact"
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </div>
            )}
          </div>
        </Box>

        <Box
          style={{
            display: open ? "block" : "none",
          }}
          className="box position-absolute overflow-auto m-4"
        >
          <div className="container-fluid pb-0 g-0">
            <Button
              onClick={handleClose}
              variant="contained"
              className="btn rounded-0"
            >
              <ArrowBackIcon style={{ fontSize: "25px" }} />
            </Button>
            <Button
              onClick={(e) => setIndex(1)}
              variant={index ===1 ? "outlined" : "contained"}
              className="btn rounded-0 border-0"
            >
              Employee Details
            </Button>

            <Button
              onClick={(e) => setIndex(2)}
              variant={index ===2 ? "outlined" : "contained"}
              className="btn rounded-0 border-0"
            >
              Documents
            </Button>

            <Button
              onClick={(e) => setIndex(3)}
              variant={index ===3 ? "outlined" : "contained"}
              className="btn rounded-0 border-0"
            >
              Timesheet
            </Button>
          </div>

          {index === 1 ? (
            <div className="box-tab">
            <div className="p-4 container-fluid">
              <h5 style={{ textDecoration: "underline" }}>Employee Detail</h5>

              <div className="row">
                <div className="col-3 border">
                  <div className="text-center py-2">
                    <img
                      src={teamImg1}
                      className="rounded"
                      alt="img1"
                      width="100%"
                      height="100%"
                    />
                  </div>
                </div>

                <div className="col-4 border mx-2">
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Employee Name :{" "}
                    <span style={{ color: "red" }}>
                      {filterData.row.EMPLOYEE_NAME}
                    </span>
                  </p>
                  {/* Date of Birth  */}
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Date Of Birth :{" "}
                    <span style={{ color: "grey" }}>
                   
                      {filterData.row.EMPLOYEE_EMAIL}
                    </span>
                  </p>

                  {/* Phone number               */}
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Phone Number :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.EMPLOYEE_PHONE}
                    </span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    State :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.state}
                    </span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    City :{" "}
                    <span style={{ color: "grey" }}>{filterData.row.city}</span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Employee Role :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.EMPLOYEE_EMPLMNTTYPE}
                    </span>
                  </p>
                </div>

                <div className="col-4 border ">
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Employeement Type :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.EMPLOYEE_EMPLMNTTYPE}
                    </span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Hire Date :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.EMPLOYEE_HIRE_DATE}
                    </span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Working On Contract :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.holdingContract}
                    </span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Hourly Wages :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.EMPLOYEE_HOURLY_WAGE}
                    </span>
                  </p>
                </div>
              </div>

              <div className="row">
                {/* <h5 style={{ textDecoration: "underline" }} className="pt-4">
                  Work Detail
                </h5> */}

                <div className="col-5 border m-4">
                  <h5 style={{ textDecoration: "underline" }} className="pt-4">
                    Work Detail
                  </h5>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Employee Role :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.Employeerole}
                    </span>
                  </p>

                  <p style={{ color: "black", fontWeight: "500" }}>
                    Employeement Type :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.EMPLOYEE_EMPLMNTTYPE}
                    </span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Hire Date :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.EMPLOYEE_HIRE_DATE}
                    </span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Working On Contract :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.holdingContract}
                    </span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Hourly Wages :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.hourlywages}
                    </span>
                  </p>
                </div>

                <div className="col-5 border m-4">
                  <h5 style={{ textDecoration: "underline" }} className="pt-4">
                    Salary Detail
                  </h5>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Employee Role :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.Employeerole}
                    </span>
                  </p>

                  <p style={{ color: "black", fontWeight: "500" }}>
                    Employeement Type :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.Employementtype}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            </div>
          ) : (
            ""
          )}
          {index ===2 ? (
            <div className=" container  border p-2">
              <h5 style={{ textDecoration: "underline" }}>All Documents</h5>
              <div
                className="form-control rounded-0 mb-1"
                style={{ position: "relative" }}
              >
                Education Document
                <button
                  style={{ position: "absolute", right: "0", top: "0" }}
                  className="btn btn-primary rounded-0"
                  onClick={() => downloadPDF(filterData.complianceDoc)}
                >
                  Download file
                </button>
              </div>

              <div
                className="form-control rounded-0 mb-1"
                style={{ position: "relative" }}
              >
                Valid ID
                <button
                  style={{ position: "absolute", right: "0", top: "0" }}
                  className="btn btn-primary rounded-0"
                  onClick={() => downloadPDF(filterData.complianceDoc)}
                >
                  Download file
                </button>
              </div>
              <div
                className="form-control rounded-0 mb-1"
                style={{ position: "relative" }}
              >
                Other
                <button
                  style={{ position: "absolute", right: "0", top: "0" }}
                  className="btn btn-primary rounded-0"
                  onClick={() => downloadPDF(filterData.complianceDoc)}
                >
                  Download file
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {index ===3 ? (
            <div className=" container  border p-2">
              <p>
                {" "}
                <b style={{ fontWeight: "600", color: "black" }}>
                  Employee Name :{" "}
                </b>
                Anurag Pal
              </p>
              <p>
                {" "}
                <b style={{ fontWeight: "600", color: "black" }}>
                  Manager Name :{" "}
                </b>
                Varun Kamboj
              </p>
              <p style={{ textAlign: "right" }}>
                {" "}
                <b style={{ fontWeight: "600", color: "black" }}>
                  Week Starting :{" "}
                </b>
                6/23/2022
              </p>
              <table className="table table-hover border">
                <thead style={{ border: "1px solid black" }}>
                  <tr className="table-dark">
                    <th scope="col">Date</th>
                    <th scope="col">Day</th>
                    <th scope="col">Status</th>
                    <th scope="col">In</th>
                    <th scope="col">Out</th>
                    <th scope="col">Working hours</th>
                  </tr>
                </thead>
                <tbody>
                  {tablerows?.map((item) => (
                    <tr className="table table-striped">
                      <td>{item.date}</td>
                      <td>{item.day}</td>
                      <td>
                        <span className=" bg-success text-light rounded-pill p-1">
                          {item.status}
                        </span>
                      </td>
                      <td>{item.in}</td>
                      <td>{item.out}</td>
                      <td>{item.workinghrs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="container">
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
                    <p className="fw-semibold text-dark  mt-2">
                      Manager Signature: <span></span>
                    </p>
                  </div>

                  <div className="col-5  border m-2">
                    <div className="row">
                      <div className="col-5  m-2">
                        <p className="text-dark fw-semibold">Total Hours</p>
                        <p className="text-dark fw-semibold">Rate Per Hour</p>
                        <p className="text-dark fw-semibold">Total Pay</p>
                      </div>
                      <div className="col-2  m-2">
                        <p className="bg-warning text-center fs-6 text-light">
                          48
                        </p>
                        <p className="bg-primary text-center fs-6 text-light">
                          100
                        </p>
                        <p className="bg-success text-center fs-6 text-light">
                          $4800
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row float-end  border border-danger">
                      <div className="col-6  ">
                        <button
                          className="btn btn-info text-white rounded-0 border-white"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Previous Week"
                        >
                          <ArrowBackIcon />
                        </button>
                      </div>
                      <div className="col-6 ">
                        <button
                          className="btn btn-info text-white rounded-0 border-white"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Tooltip on top"
                        >
                          <ArrowForwardIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </Box>
      </Container>
    </>
  );
};

export default EmployeeSrc;
