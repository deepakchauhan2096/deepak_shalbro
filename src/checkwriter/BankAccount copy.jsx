import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./bank.css"
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  Toolbar,
  Tooltip,
  styled,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { initProject_fun } from "../redux/action
const BankAccount = (props) => {
  const [screen, setScreen] = useState(1);
  const [screenIndex, setScreenIndex] = useState(1);

  const { id } = useParams();

  const param = id.split("&");
  const COMPANY_ID = param[0];
  const COMPANY_USERNAME = param[1];
  const COMPANY_PARENT_ID = param[2];
  const COMPANY_PARENT_USERNAME = param[3];
  const [selectedFile, setSelectedFile] = useState(null);

  const [data, setData] = useState({
    row: {
      PROJECT_ID: "",
      PROJECT_PARENT_ID: "",
      PROJECT_PARENT_USERNAME: "",
      PROJECT_MEMBER_PARENT_ID: "",
      PROJECT_MEMBER_PARENT_USERNAME: "",
      PROJECT_TYPE: "",
      PROJECT_NAME: "",
      PROJECT_ACCOUNT: "",
      PROJECT_USERNAME: "",
      PROJECT_START_DATE: "",
      PROJECT_END_DATE: "",
      PROJECT_SUPERVISOR: "",
      PROJECT_PROGRESS: "",
      PROJECT_ADD: "",
      PROJECT_VALUE: "",
      PROJECT_COUNTRY: "",
      PROJECT_STATE: "",
      PROJECT_CITY: "",
      PROJECT_CURRENCY: "",
    },
  });
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(1);
  const [ProjectData, setProjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Edit, setEdit] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [updatedata, setUpdateData] = useState(false);

  // modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filterallprojectData = props.recieveData;

  // console.log(filterallprojectData, "my project");

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const fetchAllEmployees = async () => {
    try {
      const response = await axios.put(
        "/get_employee",
        {
          EMPLOYEE_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
          EMPLOYEE_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME,
          EMPLOYEE_PARENT_USERNAME: COMPANY_USERNAME,
          EMPLOYEE_PARENT_ID: COMPANY_ID,
        },
        { headers }
      );

      const data = response.data;
      // setAllempData(data?.result);
      console.log("Employee Data: =>", data);
      return data;
    } catch (err) {
      console.log("Something Went Wrong: =>", err);
      throw err;
    }
  };

  const fetchData = async () => {
    try {
      const [employeeData, projectsData] = await Promise.all([
        fetchAllEmployees(),
        // fetchProject(),
      ]);

      // Both requests have completed here
      setIsLoading(false);
      console.log("Both requests completed", employeeData, projectsData);

      // Now you can access employeeData and projectsData for further processing if needed
    } catch (err) {
      console.log("An error occurred:", err);
    }
  };

  // Call the fetchData function to fetch both sets of data concurrently
  //update data

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(ProjectData, "projectdata");

  const columns = [
    { field: "PROJECT_ID", headerName: "ID", width: 150 },
    {
      field: "Name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "Nick Name",
      headerName: "Nick Name",
      width: 150,
    },
    {
      field: "Account No",
      headerName: "Account No",
      width: 160,
    },
    {
      field: "ACH Status",
      headerName: "ACH Status",
      width: 150,
    },
    {
      field: "Bank Name",
      headerName: "Bank Name",
      type: "number",
      width: 150,
    },

    {
      field: "Verified",
      headerName: "verified",
      width: 150,
    },

    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <span>
            {cellValues.row.PROJECT_VALUE} {cellValues.row.PROJECT_CURRENCY}
          </span>
        );
      },
    },
  ];

  const columnsMobile = [
    { field: "PROJECT_ID", headerName: "ID", width: 60 },
    {
      field: "PROJECT_NAME",
      headerName: "Name",
      width: 120,
    },
    {
      field: "action",
      headerName: "Detail",
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

  const rows = ProjectData;
  // console.log("Project Data : =>", ProjectData);

  const handleClick = (event) => {
    setData(event);
    // dispatch(initProject_fun(event))
    handleOpen();
  };

  const filterData = data?.row;

  const MyScreen = styled(Paper)((props) => ({
    height: "calc(100vh - 29px)",
    padding: 0,
    background: "#fff",
    paddingBottom: "0",
    overflow: "auto",
    borderRadius: 0,
    Border: 0,

  }));




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



  return (
    <>
      <Sidebar
        COMPANY_ID={COMPANY_ID}
        COMPANY_USERNAME={COMPANY_USERNAME}
        COMPANY_PARENT_ID={COMPANY_PARENT_ID}
        COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
        active={5}
        toggle={openNav}
      />

      <Box className="box" style={{ background: "#277099" }}>


        {screen == 1 ?
          <MyScreen sx={{ display: "block", padding: 3 }}>
            <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
              {isLoading ? (
                <Animations />
              ) : (
                <>
                  <div role="group" style={{ display: "flex", gap: 5, marginBottom: "20px" }} >
                    <button type="button" className="btn btn-primary btn-sm">Quick Pay</button>
                    <button type="button" className="btn btn-success btn-sm ">+ New</button>
                    <button type="button" className="btn btn-warning  btn-sm">Print-Check Paper</button>
                    <button type="button" className="btn btn-warning btn-sm">Print-Wh
                      ite Paper</button>
                    <button type="button" className="btn btn-info btn-sm">Mail</button>
                    <button type="button" className="btn btn-info btn-sm">Email</button>
                    <button type="button" className="btn btn-danger active  btn-sm">Delete</button>
                  </div>

                  <h6>Bank Accounts</h6>

                  <button type="button" className="btn btn-primary btn-sm " onClick={() => setScreen(2)}>New</button>



                  <DataGrid
                    sx={{ border: "none" }}
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.PROJECT_ID}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 20,
                        },
                      },
                    }}
                    density="compact"
                    pageSizeOptions={[5]}
                    checkboxSelection={false}
                    disableRowSelectionOnClick
                  />
                </>
              )}
            </Box>
          </MyScreen> : screen == 2 ?
            <MyScreen sx={{ display: "block", padding: 3 }}>
              <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
                {isLoading ? (
                  <Animations />
                ) : (
                  <>
                    <nav
                      class="navbar navbar-expand-lg navbar-light bg-light"
                      style={{ height: "40px" }}
                    >
                      <div className="container">
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                          <div class="navbar-nav">
                            <Link className=" text-dark nav-link " role="button" onClick={() => setScreen(1)}><ArrowBackIcon /></Link>

                          </div>
                        </div>
                      </div>
                    </nav>
                    <center>
                      <h4 className="pt-4">Choose a method to connect bank account</h4>
                      <p>Connect your existing bank account</p>
                    </center>

                    <div className="row  justify-content-center">
                      <div className="col-3 Card">
                        <div class="card text-center mb-3">
                          <div class="card-body p-4">
                            <AccountBalanceOutlinedIcon sx={{ fontSize: "45px" }} color="primary" />
                            <h5 class="card-title p-4">Connect Instantly</h5>
                            <p class="card-text p-4 fs-6">Add with your net banking username & password</p>

                          </div>
                        </div>
                      </div>
                      <div className="col-3 Card" onClick={() => setScreen(3)}>
                        <div class="card text-center mb-3">
                          <div class="card-body p-4" role="button"  >
                            <AccountBalanceOutlinedIcon sx={{ fontSize: "45px" }} color="primary" />
                            <h5 class="card-title p-4">Add Manually</h5>
                            <p class="card-text p-4 fs-6">Add by providing account details manually.</p>

                          </div>
                        </div>
                      </div>


                    </div>


                  </>
                )}
              </Box>
            </MyScreen> : screen === 3 ?
              <MyScreen sx={{ display: "block", padding: 3 }}>


                <div className="container g-0">

                  <div class=" row ">
                    <div className="col-1">
                      <Link className=" text-dark nav-link " role="button" onClick={() => setScreen(2)}><ArrowBackIcon /></Link>   </div>
                    <div className="col-3"> <center>
                      <h4>Add Your Banking Info</h4>
                      <p>Ensure that the information you provide is accurate.</p>
                    </center></div>
                  </div>

                  <div className="row">
                    <div className="col-6">

                      <div className="row">
                        <div className="col-6">
                          <p >Business Details</p>
                          <div class="p-1 text-primary-emphasis  border border-primary-subtle rounded-3">
                          </div>
                        </div>

                        <div className="col-6">
                          <p>Account Details</p>
                          <div class="p-1 text-primary-emphasis border border-primary-subtle rounded-3">

                          </div>
                        </div>
                        <br />



                        <div className="row justify-content-between  mt-5 mb-3 ">
                          <div className="col-5 btn btn-outline-primary " role="button">
                            USA
                          </div>
                          <div className="col-5 btn btn-outline-dark" role="button">
                            CANADA
                          </div>
                        </div>



                        <form class="row g-3 needs-validation" novalidate>
                          <div class="col-md-12 mb-3">
                            {/* <label for="validationCustom01" class="form-label">Company name / Your Name *</label> */}
                            <input type="text" class="form-control" id="validationCustom01" placeholder="Company name / Your Name *" required />
                            <div class="valid-feedback">
                              Looks good!
                            </div>
                          </div>

                          <div class="col-md-6 mb-3">
                            {/* <label for="validationCustom03" class="form-label">City</label> */}
                            <input type="text" class="form-control" id="validationCustom03" placeholder="Address 1*" required />
                            <div class="invalid-feedback">
                              Please provide a valid address
                            </div>
                          </div>
                          <div class="col-md-6">
                            {/* <label for="validationCustom03" class="form-label">City</label> */}
                            <input type="text" class="form-control" id="validationCustom03" placeholder="Address 2*" />
                            <div class="invalid-feedback">
                              Please provide Adress second line
                            </div>
                          </div>
                          <div class="col-md-4 mb-3">
                            {/* <label for="validationCustom04" class="form-label">City</label> */}
                            <select className="form-control form-control-2 border rounded" id="validationCustom04" required>
                              <option selected disabled value="">Choose city...</option>
                              <option>...</option>
                            </select>
                            <div class="invalid-feedback">
                              Please select a valid state.
                            </div>
                          </div>
                          <div class="col-md-4 ">
                            {/* <label for="validationCustom04" class="form-label">State</label> */}
                            <select id="validationCustom04" className="form-control form-control-2 border rounded p-5" required>
                              <option selected disabled value="">Choose state...</option>
                              <option>...</option>
                            </select>
                            <div class="invalid-feedback">
                              Please select a valid state.
                            </div>
                          </div>
                          <div class="col-md-4">
                            {/* <label for="validationCustom05" class="form-label">Zip</label> */}
                            <input type="text" class="form-control" id="validationCustom05" className="form-control form-control-2 border rounded" placeholder="Zip" required />
                            <div class="invalid-feedback">
                              Please provide a valid zip.
                            </div>
                          </div>
                          <div class="d-grid col-12 mt-5">
                            <button class="btn btn-primary" type="button" onClick={() => setScreen(4)}>Next</button>

                          </div>

                        </form>
                      </div>
                    </div>
                    <div className="col-6  ml-5 mr-5 p-5">
                      <h6>Instructions</h6>
                      <p1>For canadian bank accounts</p1>
                      <br />
                      <a href="#">Click here for instructions</a>
                      <h1 className="mt-5">FAQ</h1>
                      <h6 className="mt-3">Why do I need to put information?</h6>
                      <p className="mt-3">Everyone's pre-printed checks are different. We add all the information, and you delete or move match your paper stock in the next step.
                        Don't want to share my information</p>


                      <h6 className="mt-5">Don't want to share my information</h6>
                      <p className="mt-2">Enter dummy information if it's not needed for the check.</p>

                    </div>
                  </div>
                </div>
              </MyScreen> : screen === 4 ?
                <MyScreen sx={{ display: "block", padding: 3 }}>


                  <div className="container g-0">

                    <div class=" row ">
                      <div className="col-1">
                        <Link className=" text-dark nav-link " role="button" onClick={() => setScreen(3)}><ArrowBackIcon /></Link>   </div>
                      <div className="col-3"> <center>
                        <h4>Add Your Banking Info</h4>
                        <p>Ensure that the information you provide is accurate.</p>
                      </center></div>
                    </div>

                    <div className="row">
                      <div className="col-6">

                        <div className="row">
                          <div className="col-6">
                            <p >Business Details</p>
                            <div class="p-1 text-primary-emphasis bg-primary border border-primary-subtle rounded-3">
                            </div>
                          </div>

                          <div className="col-6">
                            <p>Account Details</p>
                            <div class="p-1 text-primary-emphasis  border bg-success rounded-3">

                            </div>
                          </div>
                          <br />
                          <div className="row justify-content-between  mt-5 mb-3 ">
                            <div className="col-5 btn btn-outline-primary " role="button">
                              USA
                            </div>
                            <div className="col-5 btn btn-outline-dark" role="button">
                              CANADA
                            </div>
                          </div>



                          <form class="row g-3 needs-validation" novalidate>
                            <div class="col-md-6 mb-3">
                              {/* <label for="validationCustom01" class="form-label">Company name / Your Name *</label> */}
                              <input type="text" class="form-control" id="validationCustom01" placeholder=" Routing Number*" required />
                              <div class="valid-feedback">
                                Looks good!
                              </div>
                            </div>

                            <div class="col-md-6 mb-3">
                              {/* <label for="validationCustom01" class="form-label">Company name / Your Name *</label> */}
                              <input type="text" class="form-control" id="validationCustom02" placeholder=" Account Number*" required />
                              <div class="valid-feedback">
                                Looks good!
                              </div>
                            </div>

                            <h6>Bank Detail</h6>


                            <div class="col-md-6 mb-3">
                              {/* <label for="validationCustom01" class="form-label">Company name / Your Name *</label> */}
                              <input type="text" class="form-control" id="validationCustom03" placeholder=" Nick Name*" required />
                              <div class="valid-feedback">
                                Looks good!
                              </div>
                            </div>

                            <div class="col-md-6 mb-3">
                              {/* <label for="validationCustom04" class="form-label">State</label> */}
                              <select id="validationCustom04" className="form-control border p-2" required>
                                <option selected disabled value="">Select Account Type</option>
                                <option>Personal Checking</option>
                                <option>Business Checking</option>
                                <option>Personal Savings</option>
                                <option>Business Savings</option>
                              </select>
                              <div class="invalid-feedback">
                                Please select a valid state.
                              </div>
                            </div>


                            <div class="col-md-6 mb-3">
                              {/* <label for="validationCustom01" class="form-label">Company name / Your Name *</label> */}
                              <input type="text" class="form-control" id="validationCustom05" placeholder=" Check Number*" required />
                              <div class="valid-feedback">
                                Looks good!
                              </div>
                            </div>

                            <div class="col-md-6 mb-3">
                              {/* <label for="validationCustom01" class="form-label">Company name / Your Name *</label> */}
                              <input type="text" class="form-control" id="validationCustom06" placeholder=" Fractional Number*" required />
                              <div class="valid-feedback">
                                Looks good!
                              </div>
                            </div>

                            <div class="row mt-2">
                              <div class="col-7"></div>
                              <div class="col-5">
                                <label for="fileInput" class="file-button">
                                  + Signature
                                  <input id="fileInput" class="input-file" type="file" />
                                </label>
                                {selectedFile && (
                                  <div className="selected-file">Selected File: {selectedFile}</div>
                                )}
                              </div>
                            </div>


                            <div class="d-grid col-12 mt-5">
                              <button class="btn btn-primary" type="button">Save Bank Account</button>

                            </div>

                          </form>
                        </div>
                      </div>
                      <div className="col-6  ml-5 mr-5 p-5">
                        <h6>Instructions</h6>
                        <p1>For canadian bank accounts</p1>
                        <br />
                        <Link href="#">Click here for instructions</Link>
                        <h1 className="mt-5">FAQ</h1>
                        <h6 className="mt-3">Why do I need to put information?</h6>
                        <p className="mt-3">Everyone's pre-printed checks are different. We add all the information, and you delete or move match your paper stock in the next step.
                          Don't want to share my information</p>


                        <h6 className="mt-5">Don't want to share my information</h6>
                        <p className="mt-2">Enter dummy information if it's not needed for the check.</p>

                      </div>
                    </div>
                  </div>
                </MyScreen> : ""


        }

      </Box>



      <Box
        style={{
          display: open ? "block" : "none",
          height: "100vh",
        }}
        className="box position-absolute"
      >

      </Box>
    </>
  );
};

export default BankAccount;
