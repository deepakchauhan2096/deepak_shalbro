import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import country from "../Api/countriess.json";
// import states from "../Api/states.json"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import env from "react-dotenv";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Skeleton,
  Typography,
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

export default function ProjectEdit(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [index, setIndex] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const editProjectData = props?.edit.row;

 
  const [EditProject, setEditProject] = useState({
    PROJECT_NAME: editProjectData.PROJECT_NAME,
    PROJECT_USERNAME: editProjectData.PROJECT_USERNAME,
    PROJECT_ADD: editProjectData.PROJECT_ADD,
    PROJECT_CITY: editProjectData.PROJECT_CITY,
    PROJECT_START_DATE: editProjectData.PROJECT_START_DATE,
    PROJECT_END_DATE: editProjectData.PROJECT_END_DATE,
    PROJECT_SUPERVISOR: editProjectData.PROJECT_SUPERVISOR,
    PROJECT_COUNTRY: editProjectData.PROJECT_COUNTRY,
    PROJECT_STATE: editProjectData.PROJECT_STATE,
    PROJECT_ACCOUNT: editProjectData.PROJECT_PHONE,
    PROJECT_CURRENCY: editProjectData.PROJECT_CURRENCY,
    PROJECT_VALUE: editProjectData.PROJECT_VALUE,
    PROJECT_TYPE: editProjectData.PROJECT_TYPE,
    PROJECT_ID: editProjectData.PROJECT_ID,
    PROJECT_PARENT_ID: editProjectData.PROJECT_PARENT_ID,
    PROJECT_PARENT_USERNAME: editProjectData.PROJECT_PARENT_USERNAME,
    PROJECT_MEMBER_PARENT_ID: editProjectData.PROJECT_MEMBER_PARENT_ID,
    PROJECT_MEMBER_PARENT_USERNAME:
      editProjectData.PROJECT_MEMBER_PARENT_USERNAME,
  });

  const [usernameError, setUsernameError] = useState("");
  const [projectNameError, setProjectNameError] = useState("");
  const [companyAccountError, setCompanyAccountError] = useState("");



  const [formErrors, setFormErrors] = useState({
    COMPANY_NAME: "",
    COMPANY_USERNAME: "",
    COMPANY_PHONE: "",
    COMPANY_EMAIL: "",
    COMPANY_COUNTRY: "",
    COMPANY_STATE: "",
    COMPANY_CITY: "",
    COMPANY_ADD2: "",

  });


  const availableState = country?.find(
    (c) => c.name === EditProject.PROJECT_COUNTRY
  );

  // console.log("all states : ===> ", availableState,"country=>",country);
  const availableCities = availableState?.states?.find(
    (s) => s.name === EditProject.PROJECT_STATE
  );

  //api header
  // const handleEdit = (e) => {
  //   setEditProject({ ...EditProject, [e.target.name]: e.target.value });
  //   console.log("heello world", EditProject);
  // };


  
  const handleEdit = (e) => {
    const { name, value } = e.target;

    setEditProject((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: value ? "" : "This field is required",
    }));
  };

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
 // Clear previous validation errors
 setUsernameError("");
 setProjectNameError("");
 setCompanyAccountError("")
 
 setErrorMsg("");

 // Validate phone number, username, and email fields
 const isValidUsername = setEditProject.PROJECT_USERNAME !== "";
 const isValidProjectname = setEditProject.PROJECT_NAME !== "";
 const isValidAccount = setEditProject.COMPANY_EMAIL !== "";


 if (!isValidUsername) {
  setUsernameError("Name should not be empty");
   return;
 }
 if (!isValidProjectname) {
  setProjectNameError("Invalid username");
   return;
 }

 if (!isValidAccount) {
  setCompanyAccountError("Invalid phone number or feild should not be empty");
   return;
 }




    axios
      .put(
        "/api/update_projects",
        {
          PROJECT_ID: editProjectData.PROJECT_ID,
          PROJECT_PARENT_ID: editProjectData.PROJECT_PARENT_ID,
          PROJECT_PARENT_USERNAME: editProjectData.PROJECT_PARENT_USERNAME,
          PROJECT_MEMBER_PARENT_ID: editProjectData.PROJECT_MEMBER_PARENT_ID,
          PROJECT_MEMBER_PARENT_USERNAME:
            editProjectData.PROJECT_MEMBER_PARENT_USERNAME,
          PROJECT_DETAILS_FOR_UPDATES: { ...EditProject },
        },
        {
          headers,
        }
      )
      .then((response) => {
        if (response.data.operation === "failed") {
          setErrorMsg(response.data.errorMsg);
          toast.error(response.data.errorMsg, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          
        } else if (response.data.operation === "successfull") {
          handleClose();
          console.log("anu", response);
          toast.success("Project Updated successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
         
         
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

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="rounded"
        className="view-btn border border-info text-success "
        style={{ padding: "2px 2px" }}
      >
        Edit
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
                  className={`form-control form-control-2 rounded-0 ${usernameError ? "is-invalid" : ""
                }`}
                  placeholder="Username"
                  value={EditProject.PROJECT_USERNAME}
                  name="PROJECT_USERNAME"
                  onChange={handleEdit}
                />
                 {usernameError && (
                  <div className="invalid-feedback">{usernameError}</div>
                )}
              </div>
              <div className="form-group col-xl-4">
                <label>Project Name</label>
                <input
                  type="text"
                  className={`form-control form-control-2 rounded-0 ${projectNameError ? "is-invalid" : ""
                }`}
                  id="inputname"
                  placeholder="Project Name"
                  value={EditProject.PROJECT_NAME}
                  name="PROJECT_NAME"
                  onChange={handleEdit}
                  
                />
                  {projectNameError && (
                  <div className="invalid-feedback">{projectNameError}</div>
                )}
              </div>
              <div className="form-group col-xl-4">
                <label>Account</label>
                <input
                  type="number"
                  className={`form-control form-control-2 rounded-0 ${companyAccountError ? "is-invalid" : ""
                }`}
                  id="inputPassword4"
                  placeholder="Enter Phone Number"
                  name="PROJECT_ACCOUNT"
                  value={EditProject.PROJECT_ACCOUNT}
                  onChange={handleEdit}
                  
                />
                   {companyAccountError && (
                  <div className="invalid-feedback">{companyAccountError}</div>
                )}
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group col-xl-4">
                <label>Project start date</label>
                <input
                  type="date"
                  value={EditProject.PROJECT_START_DATE}
                  name="PROJECT_START_DATE"
                  onChange={handleEdit}
                  className="form-control form-control-2 rounded-0"
                />
              </div>
              <div className="form-group col-xl-4">
                <label>Project End date</label>
                <input
                  type="date"
                  value={EditProject.PROJECT_END_DATE}
                  name="PROJECT_END_DATE"
                  onChange={handleEdit}
                  className="form-control form-control-2 rounded-0"
                />
              </div>
              <div className="form-group col-xl-4">
                <label>Project Type</label>
                <select
                  id="inputEnroll"
                  className="form-control form-control-2 border rounded-0"
                  onChange={handleEdit}
                  name="PROJECT_TYPE"
                  value={EditProject.PROJECT_TYPE}
                >
                  <option value="">--Choose Project Type--</option>
                  <option value="Architect">Architect</option>
                  <option value="Civil Engineer">Civil Engineer</option>
                  <option value="Structural Engineer">
                    Structural Engineer
                  </option>
                  <option value="Mechanical Engineer">
                    Mechanical Engineer
                  </option>
                  <option value="Electrical Engineer">
                    Electrical Engineer
                  </option>
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
                  value={EditProject.PROJECT_SUPERVISOR}
                  onChange={handleEdit}
                />
              </div>

              <div className="form-group col-md-4">
                <label>Project Value</label>
                <input
                  type="number"
                  className="form-control form-control-2 rounded-0 "
                  id="inputsupervisor"
                  name="PROJECT_VALUE"
                  value={EditProject.PROJECT_VALUE}
                  onChange={handleEdit}
                />
              </div>

              <div className="form-group col-md-4">
                <label></label>
                <select
                  id="inputEnroll"
                  className="form-control form-control-2 border rounded-0"
                  onChange={handleEdit}
                  name="PROJECT_CURRENCY"
                  value={EditProject.PROJECT_CURRENCY}
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
                  value={EditProject.PROJECT_ADD}
                  onChange={handleEdit}
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
                  value={EditProject.PROJECT_COUNTRY}
                  onChange={handleEdit}
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
                  value={EditProject.PROJECT_STATE}
                  onChange={handleEdit}
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
                  value={EditProject.PROJECT_CITY}
                  onChange={handleEdit}
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
            <div className="py-2">
              <button
                type="submit"
                className="btn btn-info text-white"
                onClick={handleSubmit}
              >
                Edit Project
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
