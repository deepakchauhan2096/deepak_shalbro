import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import country from "../Api/countriess.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment-timezone";
import {
  Button, MenuItem,
  Select,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

export default function ProjectCreate(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedTimeZone, setSelectedTimeZone] = useState("");
  const [createProject, setCreateProject] = useState({
    PROJECT_PARENT_ID: "",
    PROJECT_PARENT_USERNAME: "",
    PROJECT_MEMBER_PARENT_ID: "",
    PROJECT_MEMBER_PARENT_USERNAME: "",
    PROJECT_NAME: "",
    PROJECT_USERNAME: "",
    PROJECT_ADD: "",
    PROJECT_CITY: "",
    PROJECT_START_DATE: "",
    PROJECT_END_DATE: "",
    PROJECT_SUPERVISOR: "",
    PROJECT_COUNTRY: "",
    PROJECT_TYPE: "",
    PROJECT_STATE: "",
    PROJECT_ACCOUNT: "",
    PROJECT_VALUE: "",
    PROJECT_CURRENCY: "",
  });
  console.log("project", createProject)

  useEffect(() => {
    setCreateProject((prevState) => ({ ...prevState, PROJECT_PARENT_ID: props.companyData?.COMPANY_ID }));
    setCreateProject((prevState) => ({ ...prevState, PROJECT_PARENT_USERNAME: props.companyData?.COMPANY_USERNAME }));
    setCreateProject((prevState) => ({ ...prevState, PROJECT_MEMBER_PARENT_ID: props.companyData?.COMPANY_PARENT_ID }));
    setCreateProject((prevState) => ({ ...prevState, PROJECT_MEMBER_PARENT_USERNAME: props.companyData?.COMPANY_PARENT_USERNAME }));
  }, [open])


  console.log(createProject, "check")

  const availableState = country?.find(
    (c) => c.name === createProject.PROJECT_COUNTRY
  );

  // console.log("all states : ===> ", availableState,"country=>",country);
  const availableCities = availableState?.states?.find(
    (s) => s.name === createProject.PROJECT_STATE
  );

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleCreate = (e) => {
    const { name, value } = e.target;
    setCreateProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "PROJECT_PARENT_ID",
      "PROJECT_PARENT_USERNAME",
      "PROJECT_MEMBER_PARENT_ID",
      "PROJECT_MEMBER_PARENT_USERNAME",
      "PROJECT_NAME",
      "PROJECT_USERNAME",
      "PROJECT_ADD",
      "PROJECT_CITY",
      "PROJECT_START_DATE",
      "PROJECT_END_DATE",
      "PROJECT_SUPERVISOR",
      "PROJECT_COUNTRY",
      "PROJECT_TYPE",
      "PROJECT_STATE",
      "PROJECT_ACCOUNT",
      "PROJECT_VALUE",
      "PROJECT_CURRENCY",

    ];


    const hasEmptyFields = requiredFields.some(
      (field) => !createProject[field]
    );

    if (hasEmptyFields) {
      setErrorMsg("Fill all fields");
      toast.error("Please fill in all fields", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }

    setErrorMsg("");

    axios
      .post("http://18.211.130.168:5001/create_project", createProject, {
        headers,
      })
      .then((response) => {
        if (response.data.operation === "failed") {
          setErrorMsg(response.data.errorMsg);
          toast.error(response.data.errorMsg, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else if (response.data.operation === "successfull") {
          toast.success("Project Created successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          props.refetch();

          setCreateProject({});
          setOpen(false);
        }
      })
      .catch((error) => {
        console.error(error, "ERR");
        toast.error("An error occurred. Please try again later.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
  };


  const timeZones = moment.tz.names(); // Get the array of time zone names

  const handleTimeZoneSelect = (e) => {
    setSelectedTimeZone(e.target.value);
  };

  return (
    <>
      <Button size="small" className="btn button border-bottom-0 bg-white" variant="outlined">
        Project
      </Button>
      <Button
        onClick={handleOpen}
        sx={{ color: "#277099" }}
        className="btn rounded-0 border-0  rounded-0 text-light"
        variant="contained"
        size="small"
      >
        + Add New Project
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <div className="row py-2">
              <div className="form-group col-xl-4">
                <label> Project Username</label>
                <input
                  type="text"
                  className="form-control form-control-2 rounded-0"
                  placeholder="Username"
                  value={createProject.PROJECT_USERNAME}
                  name="PROJECT_USERNAME"
                  onChange={handleCreate}
                />
              </div>
              <div className="form-group col-xl-4">
                <label>Project Name</label>
                <input
                  type="text"
                  className="form-control form-control-2 rounded-0"
                  id="inputname"
                  placeholder="Project Name"
                  value={createProject.PROJECT_NAME}
                  name="PROJECT_NAME"
                  onChange={handleCreate}
                  required
                />
              </div>
              <div className="form-group col-xl-4">
                <label>Account</label>
                <input
                  type="number"
                  className="form-control form-control-2 rounded-0"
                  id="inputPassword4"
                  placeholder="Enter Phone Number"
                  name="PROJECT_ACCOUNT"
                  value={createProject.PROJECT_ACCOUNT}
                  onChange={handleCreate}
                  required
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group col-xl-4">
                <label>Project start date</label>
                <input
                  type="date"
                  value={createProject.PROJECT_START_DATE}
                  name="PROJECT_START_DATE"
                  onChange={handleCreate}
                  className="form-control form-control-2 rounded-0"
                />
              </div>
              <div className="form-group col-xl-4">
                <label>Project End date</label>
                <input
                  type="date"
                  value={createProject.PROJECT_END_DATE}
                  name="PROJECT_END_DATE"
                  onChange={handleCreate}
                  className="form-control form-control-2 rounded-0"
                />
              </div>
              <div className="form-group col-xl-4">
                <label>Project Type</label>
                <select
                  id="inputEnroll"
                  className="form-control form-control-2 border rounded-0"
                  onChange={handleCreate}
                  name="PROJECT_TYPE"
                  value={createProject.PROJECT_TYPE}
                >
                  <option value="">--Choose Project Type--</option>
                  <option value="Architect">Architect</option>
                  <option value="Civil Engineer">Civil Engineer</option>
                  <option value="Structural Engineer">Structural Engineer</option>
                  <option value="Mechanical Engineer">Mechanical Engineer</option>
                  <option value="Electrical Engineer">Electrical Engineer</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Quantity Surveyor">Quantity Surveyor</option>
                  <option value="Interior Designer">Interior Designer</option>
                  <option value="Landscaper">Landscaper</option>
                  <option value="Contractor">Contractor</option>
                  <option value="Scheduler">Scheduler</option>
                </select>
              </div>
            </div>
            <div className="row py-2">


              <div className="form-group col-md-4">
                <label>Supervisor</label>
                <input
                  type="text"
                  className="form-control form-control-2 rounded-0 "
                  id="inputsupervisor"
                  name="PROJECT_SUPERVISOR"
                  value={createProject.PROJECT_SUPERVISOR}
                  onChange={handleCreate}
                />
              </div>


              <div className="form-group col-md-4">
                <label>Project Value</label>
                <input
                  type="number"
                  className="form-control form-control-2 rounded-0 "
                  id="inputsupervisor"
                  name="PROJECT_VALUE"
                  value={createProject.PROJECT_VALUE}
                  onChange={handleCreate}
                />
              </div>

              <div className="form-group col-md-4">
                <label ></label>
                <select
                  id="inputEnroll"
                  className="form-control form-control-2 border rounded-0"
                  onChange={handleCreate}
                  name="PROJECT_CURRENCY"
                  value={createProject.PROJECT_CURRENCY}
                >
                  <option value="">--Select Currency--</option>
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option> {/* Euro */}
                  <option value="GBP">GBP</option> {/* British Pound */}
                  <option value="JPY">JPY</option>
                  {/* <option>Plumber</option>
                  <option>Engineer</option> */}
                </select>
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group  col-md-12">
                <label>Address</label>
                <textarea
                  type="text"
                  className="form-control form-control-2 rounded-0"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                  name="PROJECT_ADD"
                  value={createProject.PROJECT_ADD}
                  onChange={handleCreate}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group col-xl-4">
                <label>Country</label>
                <select
                  className="form-control form-control-2 border rounded-0"
                  placeholder="Country"
                  name="PROJECT_COUNTRY"
                  value={createProject.PROJECT_COUNTRY}
                  onChange={handleCreate}
                >
                  <option value="">--Choose Country--</option>
                  {country?.map((value, key) => {
                    return (
                      <option value={value.name} key={key}>
                        {value.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group col-xl-4">
                <label>State</label>
                <select
                  className="form-control form-control-2 border rounded-0"
                  placeholder="State"
                  name="PROJECT_STATE"
                  value={createProject.PROJECT_STATE}
                  onChange={handleCreate}
                >
                  <option value="">--Choose State--</option>
                  {availableState?.states?.map((e, key) => {
                    return (
                      <option value={e.name} key={key}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group col-xl-4">
                <label>City</label>
                <select
                  className="form-control form-control-2 border rounded-0"
                  placeholder="City"
                  name="PROJECT_CITY"
                  value={createProject.PROJECT_CITY}
                  onChange={handleCreate}
                >
                  <option value="">--Choose City--</option>
                  {availableCities?.cities?.map((e, key) => {
                    return (
                      <option value={e.name} key={key}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          
            <div className="FormButtonAlign">
        
            <button
              type="submit"
              className="btn btn-info text-white"
              onClick={handleSubmit}
            >
              Create Project
            </button>{" "}
            <button
              onClick={handleClose}
              className="btn btn-danger text-white"
            >
              Cancel
            </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
