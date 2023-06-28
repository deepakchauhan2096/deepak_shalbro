import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import AddContract from "../modal/AddContract";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Container } from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

const ContractSrc = () => {
  const [data, setData] = useState({
    row: {
      _id: "649a71ca12c8d41898147a9d",
      CONTRACT_ID: 52,
      CONTRACT_PARENT_ID: 45,
      CONTRACT_PARENT_USERNAME: "company21",
      CONTRACT_MEMBER_PARENT_ID: 18,
      CONTRACT_MEMBER_PARENT_USERNAME: "deepanshu1",
      CONTRACT_ROLE: "",
      CONTRACT_NAME: "construction",
      CONTRACT_PHONE: 7988155813,
      CONTRACT_USERNAME: "contract01",
      CONTRACT_START_DATE: "2023-06-01",
      CONTRACT_END_DATE: "2023-06-26",
      CONTRACT_SUPERVISOR: "Jigyashuu",
      CONTRACT_PROGRESS: "40",
      __v: 0,
    },
  });

  const [ContractData, setContractData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // console.log("all contracts: =>>>",ContractData)

  useEffect(() => {
    fetchContracts();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const fetchContracts = async () => {
    try {
      const response = await axios.put(
        "http://54.89.160.62:5001/get_contracts",
        {
          CONTRACT_MEMBER_PARENT_ID: 18,
          CONTRACT_MEMBER_PARENT_USERNAME: "deepanshu1",
        },
        { headers }
      );
      setTimeout(() => {
        const data = response.data;
        setContractData(data.result);
        setIsLoading(false);
        console.log("contracts Data : =>", data);
      }, 1000);
    } catch (err) {
      console.log("Something Went Wrong: =>", err);
    }
  };

  const columns = [
    { field: "CONTRACT_ID", headerName: "ID", width: 90 },
    {
      field: "CONTRACT_USERNAME",
      headerName: "USername",
      width: 150,
      // editable: true,
    },
    {
      field: "CONTRACT_NAME",
      headerName: "Name",
      width: 150,
      // editable: true,
    },
    {
      field: "CONTRACT_PHONE",
      headerName: "Phone",
      width: 150,
      // editable: true,
    },
    {
      field: "CONTRACT_START_DATE",
      headerName: "Start Date",
      width: 150,
      // editable: true,
    },
    {
      field: "CONTRACT_END_DATE",
      headerName: "End Date",
      type: "number",
      width: 100,
      // editable: true,
    },

    {
      field: "CONTRACT_SUPERVISOR",
      headerName: "Supervisor",
      width: 200,
      // editable: true,
    },

    {
      field: "action",
      headerName: "Detail",
      width: 120,
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

  const rows = ContractData;

  const style = {
    position: "absolute",
    top: "0",
    right: "0",
    // transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "background.paper",
    height: "100vh",
    boxShadow: 24,
  };

  function downloadPDF(pdf) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "abc.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  const handleClick = (event) => {
    setData(event);
    handleOpen();
  };

  // console.log(filterData, "data-GGG");
  const filterData = data.row;
  console.log(filterData, "f-data");

  return (
    <>
      <Container
        id="content"
        sx={{ height: "100vh", position: "relative" }}
        maxWidth="xl"
        className="containers"
      >
        <Box className="box m-4">
          <div className="container-fluid d-flex pb-0 g-0 flex-column" >
            <div style={{ height: "20%" }}>
              <Button className="btn button btn-blue" variant="contained">
                Contract
              </Button>
              <AddContract />
            </div>

            {isLoading ? (
              <Box sx={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)"}}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: "88vh", padding: 20, paddingBottom: "0" }}>
                <DataGrid
                  sx={{ border: "none" }}
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row.CONTRACT_ID}
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
              variant={index === 1 ? "outlined" : "contained"}
              className="btn rounded-0 border-0"
            >
              Detail
            </Button>

            <Button
              onClick={(e) => setIndex(2)}
              variant={index === 2 ? "outlined" : "contained"}
              className="btn rounded-0 border-0"
            >
              Payment
            </Button>

            <Button
              onClick={(e) => setIndex(3)}
              variant={index === 3 ? "outlined" : "contained"}
              className="btn rounded-0 border-0"
            >
              Compliance
            </Button>

            <Button
              onClick={(e) => setIndex(4)}
              variant={index === 4 ? "outlined" : "contained"}
              className="btn rounded-0 border-0"
            >
              Documents
            </Button>
          </div>

          {index === 1 ? (
            <div className="box-tab">
              <div className="container-fluid p-4">
                <div className="row">
                  <div className="col">
                    <b>Contract Name</b>
                    <p className="bg-light text-dark px-2 rounded-4">
                      {filterData.CONTRACT_NAME}
                    </p>
                  </div>
                  <div className="col">
                    <b>Phone</b>
                    <p className="bg-light text-dark px-2 rounded-4">
                      {filterData.CONTRACT_PHONE}
                    </p>
                  </div>
                  <div className="col">
                    <b>Username</b>
                    <p className="bg-light text-dark px-2 rounded-4">
                      {filterData.CONTRACT_USERNAME}
                    </p>
                  </div>
                  <div className="col">
                    <b>Supervisor</b>
                    <p className="bg-light text-dark px-2 rounded-4">
                      {filterData.CONTRACT_SUPERVISOR}
                    </p>
                  </div>
                  <div className="col">
                    <b>Contract Type</b>
                    <p className="bg-light text-dark px-2 rounded-4">
                      {filterData.CONTRACT_ROLE}
                    </p>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col">
                    <b>Client</b>
                    <p className="bg-light text-dark px-2 rounded-4">L&T</p>
                  </div>
                  <div className="col">
                    <b>Project Status</b>
                    <p className="bg-success text-white px-2 rounded-4">
                      In Execution
                    </p>
                  </div>
                  <div className="col">
                    <b>Project Start</b>
                    <p className="bg-light text-dark px-2 rounded-4">
                      {filterData.CONTRACT_START_DATE}
                    </p>
                  </div>
                  <div className="col">
                    <b>Project End</b>
                    <p className="bg-light text-dark px-2 rounded-4">
                      {filterData.CONTRACT_END_DATE}
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <b>Project Progress</b>
                    <div className="p-2 rounded-3 bg-light">
                      <div
                        className="progress-bar"
                        style={{
                          background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),conic-gradient(hotpink ${filterData.CONTRACT_PROGRESS}, pink 0)`,
                        }}
                      >
                        <div className="counter">
                          {filterData.CONTRACT_PROGRESS}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                {/* <div className="row">
                  <div className="col-3">
                    <b>Cost Breakdown</b>
                    <div className="bg-light rounded-3 pb-2">
                      <div className="px-2 py-1 rounded-3 bg-light">
                        <div>
                          Material - <b>2365$</b>
                        </div>
                        <div
                          style={{
                            background: "grey",
                            content: "",
                            height: "12px",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              background: "aqua",
                              content: "",
                              height: "12px",
                              width: "50%",
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="px-2 py-1 rounded-3 bg-light">
                        <div>
                          Labour - <b>365$</b>
                        </div>
                        <div
                          style={{
                            background: "grey",
                            content: "",
                            height: "12px",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              background: "red",
                              content: "",
                              height: "12px",
                              width: "59%",
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="px-2  py-1 rounded-3 bg-light">
                        <div>
                          Equipments - <b>2365$</b>
                        </div>
                        <div
                          style={{
                            background: "grey",
                            content: "",
                            height: "12px",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              background: "green",
                              content: "",
                              height: "12px",
                              width: "90%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          ) : index === 2 ? (
            <div className="box-tab">
              <div className="p-4 container-fluid">
                <div className="row">
                  <div className="col-9">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Material</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Method</th>
                          <th scope="col">Transaction ID</th>
                          <th scope="col">Status</th>
                          <th scope="col">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Tiles</td>
                          <td>10</td>
                          <td>20 USD</td>
                          <td>Cash</td>
                          <td>RG384054859</td>
                          <td>
                            <b className="bg-success text-white px-2 rounded-2">
                              Paid
                            </b>
                          </td>
                          <td>12-10-2020</td>
                        </tr>
                        <tr>
                          <td>Cement</td>
                          <td>20</td>
                          <td>20 USD</td>
                          <td>UPI</td>
                          <td>TY485060</td>
                          <td>
                            <b className="bg-warning text-white px-2 rounded-2">
                              Panding
                            </b>
                          </td>
                          <td>12-10-2020</td>
                        </tr>
                        <tr>
                          <td>Concrete</td>
                          <td>60</td>
                          <td>20 USD</td>
                          <td>Stripe</td>
                          <td>PO6970845</td>
                          <td>
                            <b className="bg-success text-white px-2 rounded-2">
                              Paid
                            </b>
                          </td>
                          <td>12-10-2020</td>
                        </tr>
                        <tr>
                          <td>Bricks</td>
                          <td>120</td>
                          <td>the Bird</td>
                          <td>Visa</td>
                          <td>PO697084599</td>
                          <td>
                            <b className="bg-danger text-white px-2 rounded-2">
                              Failed
                            </b>
                          </td>
                          <td>12-10-2020</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-3 px-4">
                    <div className="mb-5 ">
                      <button className="btn btn-primary float-right rounded-0">
                        <i className="fa fa-print"></i> Print Invoice
                      </button>
                    </div>
                    <div className="search-container mb-5">
                      <input type="text" placeholder="Search.." name="search" />
                      <button type="submit">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>

                    <div>
                      <b>Time Period</b>
                    </div>
                    <div>
                      <div className="form-check py-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault1"
                        >
                          All time
                        </label>
                      </div>
                      <div className="form-check py-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault2"
                        >
                          Today
                        </label>
                      </div>

                      <div className="form-check py-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault2"
                        >
                          This Week
                        </label>
                      </div>

                      <div className="form-check py-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault2"
                        >
                          This month
                        </label>
                      </div>

                      <div className="form-check py-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault2"
                        >
                          Custom
                        </label>
                      </div>
                    </div>
                    <b>Status</b>
                    <div>
                      <div className="form-check py-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckIndeterminate"
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckIndeterminate"
                        >
                          Paid
                        </label>
                      </div>

                      <div className="form-check py-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckIndeterminate"
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckIndeterminate"
                        >
                          Panding
                        </label>
                      </div>

                      <div className="form-check py-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckIndeterminate"
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckIndeterminate"
                        >
                          Failed
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : index === 3 ? (
            <div className="box-tab">
              <div className="p-4 container-fluid">
                <div className="row">
                  <div className="col-9">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Material</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Method</th>
                          <th scope="col">Transaction ID</th>
                          <th scope="col">Status</th>
                          <th scope="col">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Tiles</td>
                          <td>10</td>
                          <td>20 USD</td>
                          <td>Cash</td>
                          <td>RG384054859</td>
                          <td>
                            <b className="bg-success text-white px-2 rounded-2">
                              Paid
                            </b>
                          </td>
                          <td>12-10-2020</td>
                        </tr>
                        <tr>
                          <td>Cement</td>
                          <td>20</td>
                          <td>20 USD</td>
                          <td>UPI</td>
                          <td>TY485060</td>
                          <td>
                            <b className="bg-warning text-white px-2 rounded-2">
                              Panding
                            </b>
                          </td>
                          <td>12-10-2020</td>
                        </tr>
                        <tr>
                          <td>Concrete</td>
                          <td>60</td>
                          <td>20 USD</td>
                          <td>Stripe</td>
                          <td>PO6970845</td>
                          <td>
                            <b className="bg-success text-white px-2 rounded-2">
                              Paid
                            </b>
                          </td>
                          <td>12-10-2020</td>
                        </tr>
                        <tr>
                          <td>Bricks</td>
                          <td>120</td>
                          <td>the Bird</td>
                          <td>Visa</td>
                          <td>PO697084599</td>
                          <td>
                            <b className="bg-danger text-white px-2 rounded-2">
                              Failed
                            </b>
                          </td>
                          <td>12-10-2020</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-3 px-4">
                    <div className="mb-5 ">
                      <button className="btn btn-primary float-right rounded-0">
                        <i className="fa fa-print"></i> Print Invoice
                      </button>
                    </div>
                    <div className="search-container mb-5">
                      <input type="text" placeholder="Search.." name="search" />
                      <button type="submit">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>

                    <div>
                      <b>Time Period</b>
                    </div>
                    <div>
                      <div className="form-check py-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault1"
                        >
                          All time
                        </label>
                      </div>
                      <div className="form-check py-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault2"
                        >
                          Today
                        </label>
                      </div>

                      <div className="form-check py-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault2"
                        >
                          This Week
                        </label>
                      </div>

                      <div className="form-check py-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault2"
                        >
                          This month
                        </label>
                      </div>

                      <div className="form-check py-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault2"
                        >
                          Custom
                        </label>
                      </div>
                    </div>
                    <b>Status</b>
                    <div>
                      <div className="form-check py-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckIndeterminate"
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckIndeterminate"
                        >
                          Paid
                        </label>
                      </div>

                      <div className="form-check py-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckIndeterminate"
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckIndeterminate"
                        >
                          Panding
                        </label>
                      </div>

                      <div className="form-check py-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckIndeterminate"
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckIndeterminate"
                        >
                          Failed
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="row">
                  

                  <div className="col">
                    <b>Contractor Name</b>
                    <p className="bg-light text-dark px-2 rounded-4">
                      {filterData.row.companyName}
                    </p>
                  </div>
                  <div className="col">
                    <b>Phone</b>
                    <p className="bg-light text-dark px-2 rounded-4">
                      {filterData.row.PhoneNumber}
                    </p>
                  </div>
                  <div className="col">
                    <b>State</b>
                    <p className="bg-light text-dark px-2 rounded-4">
                      {filterData.row.state}
                    </p>
                  </div>
                  <div className="col">
                    <b>City</b>
                    <p className="bg-light text-dark px-2 rounded-4">
                      {filterData.row.city}
                    </p>
                  </div>
                  <div className="col">
                    <b>Address</b>
                    <p className="bg-light text-dark px-2 rounded-4">
                      {filterData.row.address}
                    </p>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col">
                    <b>Project Name</b>
                    <select
                      className="border-none rounded-3 bg-light"
                      style={{
                        width: "100%",
                        height: "22px",
                        lineHeight: "0",
                        paddingTop: "0",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      <option value="sun Tower">sun Tower</option>
                      <option value="sun Tower">School</option>
                      <option value="sun Tower">temple</option>
                      <option value="sun Tower">star city</option>
                      <option value="sun Tower">bridge</option>
                    </select>
                  </div>
                  <div className="col">
                    <b>Client</b>
                    <p className="bg-light text-dark px-2 rounded-4">L&T</p>
                  </div>
                  <div className="col">
                    <b>Project Status</b>
                    <p className="bg-success text-white px-2 rounded-4">
                      In Execution
                    </p>
                  </div>
                  <div className="col">
                    <b>Project Start</b>
                    <p className="bg-light text-dark px-2 rounded-4">
                      20-05-2020
                    </p>
                  </div>
                  <div className="col">
                    <b>Project End</b>
                    <p className="bg-light text-dark px-2 rounded-4">
                      30-09-2023
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <b>Project Progress</b>
                    <div className="p-2 rounded-3 bg-light">
                      <div
                        className="progress-bar"
                        style={{
                          background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),conic-gradient(hotpink ${filterData.row.projectprogress}, pink 0)`,
                        }}
                      >
                        <div className="counter">
                          {filterData.row.projectprogress}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-3">
                    <b>Cost Breakdown</b>
                    <div className="bg-light rounded-3 pb-2">
                      <div className="px-2 py-1 rounded-3 bg-light">
                        <div>
                          Material - <b>2365$</b>
                        </div>
                        <div
                          style={{
                            background: "grey",
                            content: "",
                            height: "12px",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              background: "aqua",
                              content: "",
                              height: "12px",
                              width: "50%",
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="px-2 py-1 rounded-3 bg-light">
                        <div>
                          Labour - <b>365$</b>
                        </div>
                        <div
                          style={{
                            background: "grey",
                            content: "",
                            height: "12px",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              background: "red",
                              content: "",
                              height: "12px",
                              width: "59%",
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="px-2  py-1 rounded-3 bg-light">
                        <div>
                          Equipments - <b>2365$</b>
                        </div>
                        <div
                          style={{
                            background: "grey",
                            content: "",
                            height: "12px",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              background: "green",
                              content: "",
                              height: "12px",
                              width: "90%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
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

export default ContractSrc;
