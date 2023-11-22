import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProjectCreate from "./ProjectCreate";
import { MyContext } from "../context/Mycontext";
import ProjectEdit from "./ProjectEdit";
import ProjectLoc from "./ProjectLoc";
import ProjectAssigned from "./ProjectAssigned";
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
// import { initProject_fun } from "../redux/action";

const Project = (props) => {
  const { id } = useParams();

  const param = id.split("&");
  const COMPANY_ID = param[0];
  const COMPANY_USERNAME = param[1];
  const COMPANY_PARENT_ID = param[2];
  const COMPANY_PARENT_USERNAME = param[3];

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
  console.log("hgsvdcv", ProjectData);

  // modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filterallprojectData = props.recieveData;

  // console.log(filterallprojectData, "my project");

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const fetchProjects = async (e) => {
    try {
      const response = await axios.put(
        "/api/get_projects",
        {
          PROJECT_PARENT_ID: COMPANY_ID,
          PROJECT_PARENT_USERNAME: COMPANY_USERNAME,
          PROJECT_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
          PROJECT_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME,
        },
        { headers }
      );
      // setTimeout(() => {
      const data = response.data;
      setProjectData(data?.result);
      // dispatch(initProject_fun(data?.result))

      setIsLoading(false);
      // console.log("contracts Data : =>", data);
      // }, 1000);
    } catch (err) {
      console.log("Something Went Wrong: =>", err);
    }
  };

  //update data

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProject = async () => {
    try {
      const response = await axios.put(
        "/api/get_projects",
        {
          PROJECT_PARENT_ID: COMPANY_ID,
          PROJECT_PARENT_USERNAME: COMPANY_USERNAME,
          PROJECT_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
          PROJECT_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME,
        },
        { headers }
      );

      const data = response.data;
      setProjectData(data?.result);
      console.log("Projects Data: =>", data);
      return data;
    } catch (err) {
      console.log("Something Went Wrong: =>", err);
      throw err;
    }
  };

  const fetchAllEmployees = async () => {
    try {
      const response = await axios.put(
        "/api/get_employee",
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
        fetchProject(),
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
    { field: "PROJECT_ID", headerName: "ID", width: 60 },
    {
      field: "PROJECT_USERNAME",
      headerName: "USername",
      width: 120,
    },
    {
      field: "PROJECT_NAME",
      headerName: "Name",
      width: 120,
    },
    {
      field: "PROJECT_ACCOUNT",
      headerName: "Account",
      width: 130,
    },
    {
      field: "PROJECT_START_DATE",
      headerName: "Start Date",
      width: 100,
    },
    {
      field: "PROJECT_END_DATE",
      headerName: "End Date",
      type: "number",
      width: 100,
    },

    {
      field: "PROJECT_SUPERVISOR",
      headerName: "Supervisor",
      width: 150,
    },

    {
      field: "PROJECT_VALUE",
      headerName: "Project Value",
      width: 120,
      renderCell: (cellValues) => {
        return (
          <span>
            {cellValues.row.PROJECT_VALUE} {cellValues.row.PROJECT_CURRENCY}
          </span>
        );
      },
    },

    {
      field: "PROJECT_TYPE",
      headerName: "Project Type",
      width: 140,
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
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (cellValues) => {
        return (
          <Button
          // onClick={(event) => {
          //   handleEdit(cellValues);
          // }}
          >
            <ProjectEdit edit={cellValues} 
            refetch={fetchProjects} 
            
            />
          </Button>
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
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (cellValues) => {
        return (
          <Button
          // onClick={(event) => {
          //   handleEdit(cellValues);
          // }}
          >
            <ProjectEdit edit={cellValues} refetch={fetchProjects} />
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
    display: props.screenIndex ? "block" : "none",
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

  const drawerWidth = 250;

  console.log(filterallprojectData, "filterallprojectData");

  return (
    <>
      <Sidebar
        COMPANY_ID={COMPANY_ID}
        COMPANY_USERNAME={COMPANY_USERNAME}
        COMPANY_PARENT_ID={COMPANY_PARENT_ID}
        COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
        active={1}
        toggle={openNav}
      />

      <Box className="box" style={{ background: "#277099" }}>
        <Navbar toggle={() => setOpenNav((e) => !e)} name={COMPANY_USERNAME} />
        <ProjectCreate
          COMPANY_ID={COMPANY_ID}
          COMPANY_USERNAME={COMPANY_USERNAME}
          COMPANY_PARENT_ID={COMPANY_PARENT_ID}
          COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
          Update={fetchProjects}
          name={"Project"}
        />
        <MyScreen sx={{ display: "block", padding: 3 }}>
          <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
            {isLoading ? (
              <Animations />
            ) : (
              <>
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
        </MyScreen>
      </Box>

      <Box
        style={{
          display: open ? "block" : "none",
          height: "100vh",
        }}
        className="box position-absolute"
      >
        <Navbar toggle={() => setOpenNav((e) => !e)} name={COMPANY_USERNAME} />

        <div
          className="container-fluid pb-0 g-0"
          style={{ background: "#277099" }}
        >
          <Button
            onClick={handleClose}
            variant="contained"
            className="btn rounded-0"
            size="small"
          >
            <ArrowBackIcon style={{ fontSize: "20px" }} />
          </Button>
          <Button
            onClick={(e) => setIndex(1)}
            variant={index === 1 ? "outlined" : "outlined"}
            className={
              index === 1
                ? "btn button border-bottom-0 bg-white"
                : "btn rounded-0 border-bottom-0  rounded-0 text-light"
            }
            size="small"
          >
            Detail
          </Button>

          <Button
            onClick={(e) => setIndex(2)}
            variant={index === 2 ? "outlined" : "outlined"}
            className={
              index === 2
                ? "btn button border-bottom-0 bg-white"
                : "btn rounded-0 border-0  rounded-0 text-light"
            }
            size="small"
          >
            Allocate Employees
          </Button>
          <Button
            onClick={(e) => setIndex(3)}
            variant={index === 3 ? "outlined" : "outlined"}
            className={
              index === 3
                ? "btn button border-bottom-0 bg-white"
                : "btn rounded-0 border-0  rounded-0 text-light"
            }
            size="small"
          >
            Track
          </Button>
        </div>

        <MyScreen screenIndex={index === 1} sx={{ padding: 3 }}>
          <div className="container-fluid g-0">
            <div className="row">
              <div className="col-md-2">
                <b>Project Name</b>
                <p className="bg-light text-dark p-2 rounded-2">
                  {filterData.PROJECT_NAME}
                </p>
              </div>
              <div className="col-md-2">
                <b>Account</b>
                <p className="bg-light text-dark p-2 rounded-2">
                  {filterData.PROJECT_ACCOUNT}
                </p>
              </div>
              <div className="col-md-2">
                <b>Username</b>
                <p className="bg-light text-dark p-2 rounded-2">
                  {filterData.PROJECT_USERNAME}
                </p>
              </div>
              <div className="col-md-2">
                <b>Supervisor</b>
                <p className="bg-light text-dark p-2 rounded-2">
                  {filterData.PROJECT_SUPERVISOR}
                </p>
              </div>
              <div className="col-2">
                <b>Project Value</b>
                <p className="bg-light text-dark p-2 rounded-2">
                  {`${filterData.PROJECT_VALUE} ${filterData.PROJECT_CURRENCY}`}
                </p>
              </div>
              <div className="col-2">
                <b>Employement Type</b>
                <p className="bg-light text-dark p-2 rounded-2">
                  {filterData.PROJECT_TYPE}
                </p>
              </div>
              <div className="col-2">
                <b>Country</b>
                <p className="bg-light text-dark p-2 rounded-2">
                  {filterData.PROJECT_COUNTRY}
                </p>
              </div>
              <div className="col-2">
                <b>State</b>
                <p className="bg-light text-dark p-2 rounded-2">
                  {filterData.PROJECT_STATE}
                </p>
              </div>
              <div className="col-2">
                <b>City</b>
                <p className="bg-light text-dark p-2 rounded-2">
                  {filterData.PROJECT_CITY}
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
          </div>
        </MyScreen>

        <MyScreen screenIndex={index === 2} sx={{ padding: 3 }}>
          <ProjectAssigned projectData={filterData} />
        </MyScreen>

        <MyScreen screenIndex={index === 3} sx={{ padding: 3 }}>
          <ProjectLoc projectData={filterData} />
        </MyScreen>
      </Box>
    </>
  );
};

export default Project;