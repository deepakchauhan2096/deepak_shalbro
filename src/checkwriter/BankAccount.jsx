import React, { useState, useEffect, useContext } from "react";
import "./bank.css"
import Box from "@mui/material/Box";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import { Button, Paper, Skeleton, styled } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import { useDispatch, useSelector } from "react-redux";
// import { initProject_fun } from "../redux/action
import country from "../countryCityState.json";

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

  const [formValues, setFormValues] = useState({
    selectedOption: 'USA',
    companyName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
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
  const [selectedOption, setSelectedOption] = useState("USA"); // Initial selected option

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };



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
    setFormValues(event);
    // dispatch(initProject_fun(event))
    handleOpen();
  };

  const filterData = formValues?.row;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'selectedOption') {
      // Handle radio button change
      setFormValues({ ...formValues, selectedOption: value });
    } else {
      // Handle input field change
      setFormValues({ ...formValues, [name]: value });
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = formValues;
    console.log(formData);
  };


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


  // fetching cities state and country 

  const availableState = country?.find((c) => c.name === formValues.country === "canada"
  );

  const availableCities = availableState?.states?.find((s) => {
    return s.name === formValues.state;
  });

  console.log("availableState", availableState);
  console.log("availableCities", availableCities);

  return (
    <>
      <Sidebar
        COMPANY_ID={COMPANY_ID}
        COMPANY_USERNAME={COMPANY_USERNAME}
        COMPANY_PARENT_ID={COMPANY_PARENT_ID}
        COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
        active={6}
        toggle={openNav}
      />

      <Box className="box" style={{ background: "#277099" }}>


        {screen === 1 ?
          <MyScreen sx={{ display: "block", padding: 3 }}>
            <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
              {isLoading ? (
                <Animations />
              ) : (
                <>
                  <div role="group" style={{ display: "flex", gap: 5, marginBottom: "20px" }} >
                    <button type="button" className="btn btn-primary btn-sm">Quick Pay</button>
                    <button type="button" className="btn btn-success btn-sm " onClick={() => setScreen(2)}>+ New</button>
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
          </MyScreen> : screen === 2 ?

            <MyScreen sx={{ display: "block", padding: 3 }}>
              <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
                {isLoading ? (
                  <Animations />
                ) : (
                  <>
                    <nav
                      className="navbar navbar-expand-lg navbar-light bg-light"
                      style={{ height: "40px" }}
                    >
                      <div className="container">
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                          <div className="navbar-nav">
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
                        <div className="card text-center mb-3">
                          <div className="card-body p-4">
                            <AccountBalanceOutlinedIcon sx={{ fontSize: "45px" }} color="primary" />
                            <h5 className="card-title p-4">Connect Instantly</h5>
                            <p className="card-text p-4 fs-6">Add with your net banking username & password</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 Card" onClick={() => setScreen(3)}>
                        <div className="card text-center mb-3">
                          <div className="card-body p-4" role="button"  >
                            <AccountBalanceOutlinedIcon sx={{ fontSize: "45px" }} color="primary" />
                            <h5 className="card-title p-4">Add Manually</h5>
                            <p className="card-text p-4 fs-6">Add by providing account details manually.</p>
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
                  <div className=" row ">
                    <div className="col-1">
                      <Link className=" text-dark nav-link " role="button" onClick={() => setScreen(2)}><ArrowBackIcon /></Link>   </div>
                    <div className="col-3">
                      <center>
                        <h4>Add Your Banking Info</h4>
                        <p>Ensure that the information you provide is accurate.</p>
                      </center>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">

                      <div className="row">
                        <div className="col-6">
                          <p >Business Details</p>
                          <div className="p-1 text-primary-emphasis  border border-primary-subtle rounded-3">
                          </div>
                        </div>

                        <div className="col-6">
                          <p>Account Details</p>
                          <div className="p-1 text-primary-emphasis border border-primary-subtle rounded-3">

                          </div>
                        </div>
                        <br />


                        {/* form -------------------------- */}

                        <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                          <div className="row justify-content-between mt-5 mb-3">
                            <label
                              htmlFor="usaRadio"
                              className={`col-5 radio-button ${formValues.selectedOption === 'USA' ? 'selected' : ''}`}
                              style={{ backgroundColor: formValues.selectedOption === 'USA' ? 'blue' : '' }}
                            >
                              <input
                                type="radio"
                                id="usaRadio"
                                name="selectedOption"
                                value="USA"
                                checked={formValues.selectedOption === 'USA'}
                                onChange={handleInputChange}
                              />
                              USA
                            </label>
                            <label
                              htmlFor="canadaRadio"
                              className={`col-5 radio-button ${formValues.selectedOption === 'CANADA' ? 'selected' : ''}`}
                              style={{ backgroundColor: formValues.selectedOption === 'CANADA' ? 'black' : '' }}
                            >
                              <input
                                type="radio"
                                id="canadaRadio"
                                name="selectedOption"
                                value="CANADA"
                                checked={formValues.selectedOption === 'CANADA'}
                                onChange={handleInputChange}
                              />
                              CANADA
                            </label>
                          </div>

                          {/* Input fields */}
                          <div className="col-md-12 mb-3">
                            <input
                              type="text"
                              name="companyName"
                              className="form-control"
                              value={formValues.companyName}
                              onChange={handleInputChange}
                              placeholder="Company name / Your Name *"
                              required
                            />
                          </div>

                          <div className="col-md-6 mb-3">
                            <input
                              type="text"
                              name="address1"
                              className="form-control"
                              value={formValues.address1}
                              onChange={handleInputChange}
                              placeholder="Address 1*"
                            />
                          </div>

                          <div className="col-md-6">
                            <input
                              type="text"
                              name="address2"
                              className="form-control"
                              value={formValues.address2}
                              onChange={handleInputChange}
                              placeholder="Address 2*"
                            />
                          </div>

                          <div className="col-md-4 mb-3">
                            <input
                              type="text"
                              name="city"
                              className="form-control"
                              value={formValues.city}
                              onChange={handleInputChange}
                              placeholder="City"
                            />
                          </div>

                          <div className="col-md-4">
                            <input
                              type="text"
                              name="state"
                              className="form-control"
                              value={formValues.state}
                              onChange={handleInputChange}
                              placeholder="State"
                            />
                          </div>

                          <div className="col-md-4">
                            <input
                              type="text"
                              name="zip"
                              className="form-control"
                              value={formValues.zip}
                              onChange={handleInputChange}
                              placeholder="Zip"
                            />
                          </div>

                          <div className="d-grid col-12 mt-5">
                            <button className="btn btn-primary" type="submit">Next</button>
                          </div>
                        </form>

                      </div>
                    </div>
                    {/* side screen for instruction  */}
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
              </MyScreen> : screen === 4 ?
                <MyScreen sx={{ display: "block", padding: 3 }}>


                  <div className="container g-0">

                    <div className=" row ">
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
                            <div className="p-1 text-primary-emphasis bg-primary border border-primary-subtle rounded-3">
                            </div>
                          </div>

                          <div className="col-6">
                            <p>Account Details</p>
                            <div className="p-1 text-primary-emphasis  border bg-success rounded-3">

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
                          <form className="row g-3 needs-validation" novalidate>
                            <div className="col-md-6 mb-3">
                              <input type="text" className="form-control" id="validationCustom01" placeholder=" Routing Number*" required />
                            </div>

                            <div className="col-md-6 mb-3">
                              <input type="text" className="form-control" id="validationCustom02" placeholder=" Account Number*" required />
                            </div>

                            <h6>Bank Detail</h6>

                            <div className="col-md-6 mb-3">
                              <input type="text" className="form-control" id="validationCustom03" placeholder=" Nick Name*" required />
                            </div>

                            <div className="col-md-6 mb-3">
                              <select id="validationCustom04" className="form-control border p-2" required>
                                <option selected disabled value="">Select Account Type</option>
                                <option>Personal Checking</option>
                                <option>Business Checking</option>
                                <option>Personal Savings</option>
                                <option>Business Savings</option>
                              </select>

                            </div>


                            <div className="col-md-6 mb-3">
                              <input type="text" className="form-control" id="validationCustom05" placeholder=" Check Number*" required />

                            </div>

                            <div className="col-md-6 mb-3">
                              <input type="text" className="form-control" id="validationCustom06" placeholder=" Fractional Number*" required />
                            </div>

                            <div className="row mt-2">
                              <div className="col-7"></div>
                              <div className="col-5">
                                <label for="fileInput" className="file-button">
                                  + Signature
                                  <input id="fileInput" className="input-file" type="file" />
                                </label>
                                {selectedFile && (
                                  <div className="selected-file">Selected File: {selectedFile}</div>
                                )}
                              </div>
                            </div>
                            <div className="d-grid col-12 mt-5">
                              <button className="btn btn-primary" type="button" onClick={handleSubmit}>Save Bank Account</button>
                            </div>

                          </form>
                        </div>
                      </div>
                      {/*------------------------ side screen for instruction --------------- */}
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
