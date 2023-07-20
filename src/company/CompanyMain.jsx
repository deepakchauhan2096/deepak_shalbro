import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import AddProject from "../modal/AddProject";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Skeleton,
  Tooltip,
  styled,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ProjectCreate from "./ProjectCreate";
import ProjectUpload from "./ProjectUpload";
import EmployeeSrc from "../Employee/EmployeeSrc";
import EmployeeAttendance from "../Employee/EmployeeAttendance";
import { MyContext } from "./Mycontext";
import CompanyDashboard from "./CompanyDashboard";

const CompanyMain = () => {
  const [data, setData] = useState({
    row: {
      PROJECT_ID: "",
      PROJECT_PARENT_ID: "",
      PROJECT_PARENT_USERNAME: "",
      PROJECT_MEMBER_PARENT_ID: "",
      PROJECT_MEMBER_PARENT_USERNAME: "",
      PROJECT_ROLE: "",
      PROJECT_NAME: "",
      PROJECT_PHONE: "",
      PROJECT_USERNAME: "",
      PROJECT_START_DATE: "",
      PROJECT_END_DATE: "",
      PROJECT_SUPERVISOR: "",
      PROJECT_PROGRESS: "",
    },
  });

  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = useState(1);
  const [ProjectData, setProjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [navIndex, setNavIndex] = useState(0);
  const [Edit, setEdit] = useState(false);

  // modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { alldata, setText } = useContext(MyContext);
  const { projectcreatedata } = useContext(MyContext);

  // console.log("all contracts: =>>>",ProjectData)

  const location = useLocation();

  console.log("location of the Project cerattion", location.state);

  useEffect(() => {
    setText(location.state.props);
  }, [setText]);

  useEffect(() => {
    fetchProjects();
  }, [projectcreatedata]);

  console.log(projectcreatedata, "projectcreate");

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const fetchProjects = async (e) => {
    try {
      const response = await axios.put(
        "http://3.84.137.243:5001/get_projects",
        {
          PROJECT_PARENT_ID: location.state.props.COMPANY_ID,
          PROJECT_PARENT_USERNAME: location.state.props.COMPANY_USERNAME,
          PROJECT_MEMBER_PARENT_ID: location.state.props.COMPANY_PARENT_ID,
          PROJECT_MEMBER_PARENT_USERNAME:
            location.state.props.COMPANY_PARENT_USERNAME,
        },
        { headers }
      );
      setTimeout(() => {
        const data = response.data;
        setProjectData(data?.result);
        setIsLoading(false);
        console.log("contracts Data : =>", data);
      }, 1000);
    } catch (err) {
      console.log("Something Went Wrong: =>", err);
    }
  };

  console.log(ProjectData, "projectdata");

  const columns = [
    { field: "PROJECT_ID", headerName: "ID", width: 90 },
    {
      field: "PROJECT_USERNAME",
      headerName: "USername",
      width: 150,
      // editable: true,
    },
    {
      field: "PROJECT_NAME",
      headerName: "Name",
      width: 150,
      // editable: true,
    },
    {
      field: "PROJECT_PHONE",
      headerName: "Phone",
      width: 150,
      // editable: true,
    },
    {
      field: "PROJECT_START_DATE",
      headerName: "Start Date",
      width: 150,
      // editable: true,
    },
    {
      field: "PROJECT_END_DATE",
      headerName: "End Date",
      type: "number",
      width: 100,
      // editable: true,
    },

    {
      field: "PROJECT_SUPERVISOR",
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

  const rows = ProjectData;
  console.log("Project Data : =>", ProjectData);

  const handleClick = (event) => {
    setData(event);
    handleOpen();
  };


  const filterData = data?.row;
  console.log(filterData, "f-data ggvvg");

  const NavScreen = styled(Paper)((props) => ({
    height: "calc(100vh)",
    padding: 0,
    paddingBottom: "0",
    overflow: "auto",
    borderRadius: 0,
    Border: 0,
    background:"#277099",
    display: props.screenIndex ? "block" : "none",
  }));

  const MyScreen = styled(Paper)((props) => ({
    height: "calc(100vh)",
    padding: 0,
    paddingBottom: "0",
    overflow: "auto",
    borderRadius: 0,
    Border: 0,
    display: props.screenIndex ? "block" : "none",
    // background: "#f9f9f9",
  }));

  const MyScreenbox = styled(Paper)((props) => ({
    height: "calc(100vh - 50.5px)",
    paddingBottom: "0",
    borderRadius: 0,
    Border: 0,
    position: "relative",
    boxShadow: "none",
  }));

  const urls = [
    {
      listname: "Project",
    },
    {
      listname: "Dashboard",
    },
    {
      listname: "Document",
    },
    {
      listname: "Employees",
    },
    // {
    //   listname: "Attendance",
    // },
  ];

  console.log(navIndex, "navindex");

  const Lists = (props) => {
    return (
      <Box role="presentation" sx={{ width: 250 }}>
        <List sx={{ py: 0 }} onClick={() => setNavIndex(props.value)}>
          <ListItem
            sx={{
              background: props.value === navIndex ? "#3596d9" : "",
            }}
            disablePadding
          >
            <ListItemButton sx={{ color: "whitesmoke" }}>
              {props.listname}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    );
  };

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
      <Drawer
        anchor="left"
        variant="permanent"
        PaperProps={{
          className: "sidebar",
          sx: {
            overflow: "hidden",
          },
        }}
      >
        <div
          className="sidebar-header d-flex"
          style={{ justifyContent: "space-between" }}
        >
          <h4>{location.state.props.COMPANY_NAME}</h4>

          <Tooltip title={location.state.props.COMPANY_USERNAME}>
            <Avatar>
              {[location.state.props.COMPANY_NAME][0]?.charAt(0).toUpperCase()}
            </Avatar>
          </Tooltip>
        </div>

        <Divider />

        {urls.map((post, index) => (
          <Lists
            listname={post.listname}
            listlink={post.listlink}
            value={index}
          />
        ))}

        <div
          className="login sidebar_footer position-absolute"
          style={{ bottom: "0" }}
        >
          <div className="logout_icon">
            <LogoutIcon style={{ display: "inline" }} />{" "}
            <div className="logout_icon d-inline">
              <Link className="text-white" to="/admin">
                Exit
              </Link>
            </div>
          </div>
        </div>
      </Drawer>

      <NavScreen screenIndex={navIndex === 0} >
        <Box className="box">
          <div className="container-fluid d-flex pb-0 g-0 flex-column">
            <div style={{ height: "20%",background:"#277099" }}>
              <Button
                className="btn button btn-blue"
                variant="contained"
                size="small"
              >
                All Project
              </Button>
              <ProjectCreate />
            </div>

            {isLoading ? (
              <Box style={{ height: "100%", padding: 20, paddingBottom: "0" }}>
                <Animations />
              </Box>
            ) : (
              <div style={{ height: "89vh", padding: 20, paddingBottom: "0"}}>
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
          className="box position-absolute overflow-auto"
        >
          <div className="container-fluid pb-0 g-0" style={{background:"#277099" }}>
            <Button
              onClick={handleClose}
              variant="contained"
              className="btn rounded-0"
              size="small"
            >
              <ArrowBackIcon style={{ fontSize: "22px" }} />
            </Button>
            <Button
              onClick={(e) => setIndex(1)}
              variant={index === 1 ? "outlined" : "contained"}
              className="btn rounded-0 border-0  rounded-0 text-light"
              size="small"
            >
              Detail
            </Button>
            
            {!Edit ? <Button
              onClick={(e) => setEdit(true)}
              variant={"contained"}
              className="btn rounded-0 border-0"
              size="small"
              sx={{ position: "absolute", right: "0" }}
            >
              Edit
            </Button>:  <Button
              onClick={(e) => setEdit(false)}
              variant={"contained"}
              className="btn rounded-0 border-0"
              size="small"
              sx={{ position: "absolute", right: "0" }}
            >
              Save
            </Button>} 


            <Button
              onClick={(e) => setIndex(2)}
              variant={index === 2 ? "outlined" : "contained"}
              className="btn rounded-0 border-0  rounded-0 text-light"
              size="small"
            >
              Payment
            </Button>

            {/* <Button
              onClick={(e) => setIndex(3)}
              variant={index === 3 ? "outlined" : "contained"}
              className="btn rounded-0 border-0"
              size="small"
            >
              Compliance
            </Button> */}

            {/* <Button
              onClick={(e) => setIndex(4)}
              variant={index === 4 ? "outlined" : "contained"}
              className="btn rounded-0 border-0"
              size="small"
            >
              Documents
            </Button> */}

          </div>

          {index === 1 ? (
            <div className="box-tab">
              <div className="container-fluid p-4">
                <div className="row">
                  <div className="col-4">
                    <b>Project Name</b>
                    <p className="bg-light text-dark p-2 rounded-2">
                      {filterData.PROJECT_NAME}
                    </p>
                  </div>
                  <div className="col-4">
                    <b>Phone</b>
                    <p className="bg-light text-dark p-2 rounded-2">
                      {filterData.PROJECT_PHONE}
                    </p>
                  </div>
                  <div className="col-4">
                    <b>Username</b>
                    <p className="bg-light text-dark p-2 rounded-2">
                      {filterData.PROJECT_USERNAME}
                    </p>
                  </div>
                  <div className="col-4">
                    <b>Supervisor</b>
                    <p className="bg-light text-dark p-2 rounded-2">
                      {filterData.PROJECT_SUPERVISOR}
                    </p>
                  </div>
                  <div className="col-4">
                    <b>Employement Type</b>
                    <p className="bg-light text-dark p-2 rounded-2">
                      {filterData.PROJECT_EMROLMNT_TYPE}
                    </p>
                  </div>
                  <div className="col-4">
                    <b>Location</b>
                    <p className="bg-light text-dark p-2 rounded-2">
                      {filterData.PROJECT_ADD}
                    </p>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col">
                    <b>Project Role</b>
                    <p className="bg-light text-dark p-2 rounded-2">
                      {filterData.PROJECT_ROLE
                        ? filterData.PROJECT_ROLE
                        : "not mentioned !"}
                    </p>
                  </div>
                  <div className="col">
                    <b>Project Status</b>
                    <p className="bg-success text-dark p-2 rounded-2">
                      In Execution
                    </p>
                  </div>
                  <div className="col">
                    <b>Project Start</b>
                    <p className="bg-light text-dark p-2 rounded-2">
                      {filterData.PROJECT_START_DATE}
                    </p>
                  </div>
                  <div className="col">
                    <b>Project End</b>
                    {Edit ? (
                      <input
                        type="date"
                        value={filterData.PROJECT_END_DATE}
                        className="form-control"
                      />
                    ) : (
                      <p className="bg-light text-dark p-2 rounded-2">
                        {filterData.PROJECT_END_DATE}
                      </p>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <b>Project Progress</b>
                    <div className="p-2 rounded-3 bg-light">
                      <div
                        className="progress-bar"
                        style={{
                          background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),conic-gradient(hotpink ${filterData.PROJECT_PROGRESS}%, pink 0)`,
                        }}
                      >
                        <div className="counter">
                          {filterData.PROJECT_PROGRESS}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
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
              </div>
            </div>
          ) : (
            ""
          )}
        </Box>
      </NavScreen>

      <NavScreen screenIndex={navIndex === 1}>
        <CompanyDashboard />
      </NavScreen>

      <NavScreen screenIndex={navIndex === 2}>
        <Box className="box">
          <MyScreen screenIndex={true}>
            <MyScreenbox sx={{ m: 3 }}>
              <ProjectUpload empData={location.state.props}/>
            </MyScreenbox>
          </MyScreen>
        </Box>
      </NavScreen>

      <NavScreen screenIndex={navIndex === 3}>
        <EmployeeSrc empData={location.state.props} />
      </NavScreen>

      {/* <NavScreen screenIndex={navIndex === 4}>
        <EmployeeAttendance empData={location.state.props} />
      </NavScreen> */}
    </>
  );
};

export default CompanyMain;
