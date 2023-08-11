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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [index, setIndex] = React.useState([]);
  const [errorMsg, setErrorMsg] = useState("");

const editProjectData = props?.edit.row


// console.log("editProjectData",editProjectData)

const [EditProject, setEditProject] = useState({
  PROJECT_NAME: editProjectData.PROJECT_NAME,
  PROJECT_USERNAME: editProjectData.PROJECT_USERNAME,
  PROJECT_ADD: editProjectData.PROJECT_ADD,
    PROJECT_CITY: editProjectData.PROJECT_CITY,
    PROJECT_START_DATE:editProjectData.PROJECT_START_DATE,
    PROJECT_END_DATE:editProjectData.PROJECT_END_DATE,
    PROJECT_SUPERVISOR:editProjectData.PROJECT_SUPERVISOR,
    PROJECT_COUNTRY: editProjectData.PROJECT_COUNTRY,
    PROJECT_STATE:editProjectData.PROJECT_STATE,
    PROJECT_PHONE:editProjectData.PROJECT_PHONE,
    PROJECT_ID: editProjectData.PROJECT_ID,
    PROJECT_PARENT_ID: editProjectData.PROJECT_PARENT_ID,
    PROJECT_PARENT_USERNAME:editProjectData.PROJECT_PARENT_USERNAME,
    PROJECT_MEMBER_PARENT_ID: editProjectData.PROJECT_MEMBER_PARENT_ID,
    PROJECT_MEMBER_PARENT_USERNAME: editProjectData.PROJECT_MEMBER_PARENT_USERNAME,

  });
  
  console.log("EditProject",EditProject)
  // city-country-logic
  
  const availableState = country?.find(
    (c) => c.name === EditProject.PROJECT_COUNTRY
    );
    
    // console.log("all states : ===> ", availableState,"country=>",country);
    const availableCities = availableState?.states?.find(
      (s) => s.name === EditProject.PROJECT_STATE
      );
      
      //api header
      const handleEdit = (e) => {
        setEditProject({ ...EditProject, [e.target.name]: e.target.value });
        console.log("heello world", EditProject);
      };
      
      

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    if (
         !EditProject.PROJECT_USERNAME ||
         !EditProject.PROJECT_NAME ||
         !EditProject.PROJECT_PHONE ||
         !EditProject.PROJECT_PARENT_ID ||
         !EditProject.PROJECT_PARENT_USERNAME ||
         !EditProject.PROJECT_MEMBER_PARENT_ID ||
         !EditProject.PROJECT_MEMBER_PARENT_USERNAME ||
         !EditProject.PROJECT_ADD ||
         !EditProject.PROJECT_START_DATE ||
         !EditProject.PROJECT_END_DATE ||
         !EditProject.PROJECT_SUPERVISOR ||
         !EditProject.PROJECT_COUNTRY ||
         !EditProject.PROJECT_CITY ||
         !EditProject.PROJECT_STATE
       ) {
      setErrorMsg("Fill all fields");
      toast.error("Please fill in all fields", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    setErrorMsg("");
  
    axios
      .put("http://18.211.130.168:5001/update_projects", {
        PROJECT_ID: editProjectData.PROJECT_ID,
         PROJECT_PARENT_ID: editProjectData.PROJECT_PARENT_ID,
         PROJECT_PARENT_USERNAME:editProjectData.PROJECT_PARENT_USERNAME,
         PROJECT_MEMBER_PARENT_ID: editProjectData.PROJECT_MEMBER_PARENT_ID,
         PROJECT_MEMBER_PARENT_USERNAME: editProjectData.PROJECT_MEMBER_PARENT_USERNAME,
         PROJECT_DETAILS_FOR_UPDATES:{...EditProject}
      }, {
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
          props.refetch();
          console.log("anu", response)
          toast.success("Project Updated successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
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
                  className="form-control form-control-2 rounded-0"
                  placeholder="Username"
                  value={EditProject.PROJECT_USERNAME}
                  name="PROJECT_USERNAME"
                  onChange={handleEdit}
                  // disabled
                />
              </div>
              <div className="form-group col-xl-4">
                <label>Project Name</label>
                <input
                  type="text"
                  className="form-control form-control-2 rounded-0"
                  id="inputname"
                  placeholder="Project Name"
                  value={EditProject.PROJECT_NAME}
                  name="PROJECT_NAME"
                  onChange={handleEdit}
                  required
                />
              </div>
              <div className="form-group col-xl-4">
                <label>Contact</label>
                <input
                  type="number"
                  className="form-control form-control-2 rounded-0"
                  id="inputPassword4"
                  placeholder="Enter Phone Number"
                  name="PROJECT_PHONE"
                  value={EditProject.PROJECT_PHONE}
                  onChange={handleEdit}
                  required
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group col-xl-6">
                <label>Project start date</label>
                <input
                  type="date"
                  value={EditProject.PROJECT_START_DATE}
                  name="PROJECT_START_DATE"
                  onChange={handleEdit}
                  className="form-control form-control-2 rounded-0"
                //required
                />
              </div>
              <div className="form-group col-xl-6">
                <label>Project End date</label>
                <input
                  type="date"
                  value={EditProject.PROJECT_END_DATE}
                  name="PROJECT_END_DATE"
                  onChange={handleEdit}
                  className="form-control form-control-2 rounded-0"
                //required
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group col-xl-6">
                <label>Enrollment</label>
                <select
                  id="inputEnroll"
                  className="form-control form-control-2 border rounded-0"
                  onChange={handleEdit}
                  name="PROJECT_EMROLMNT_TYPE"
                  value={EditProject.PROJECT_EMROLMNT_TYPE}
                  //required
                >
                  <option selected>Choose...</option>
                  <option>Painter</option>
                  <option>Fitter</option>
                  <option>Plumber</option>
                  <option>Engineer</option>
                </select>
              </div>

              <div className="form-group col-md-6">
                <label>Supervisor</label>
                <input
                  type="text"
                  className="form-control form-control-2 rounded-0 "
                  id="inputsupervisor"
                  name="PROJECT_SUPERVISOR"
                  value={EditProject.PROJECT_SUPERVISOR}
                  onChange={handleEdit}
                  //required
                />
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
                  //required
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
                  //required
                >
                  <option >--Choose Country--</option>

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
                  //required
                  
                >
                  <option selected>--Choose State--</option>
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
                  //required
                >
                  <option>--Choose City--</option>
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
            {/* <center>
              {errorMsg && (
                <p className=" text-danger fw-light mb-0">{errorMsg}</p>
              )}
            </center> */}
            <button
              type="submit"
              className="btn btn-info text-white "
              onClick={handleSubmit}
            >
              Submit
            </button>{" "}
            <button
              onClick={handleClose}
              className="btn btn-danger text-white "
            >
              Discard
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
                }
