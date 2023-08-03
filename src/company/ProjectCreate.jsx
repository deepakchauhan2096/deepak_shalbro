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

export default function ProjectCreate(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [index, setIndex] = React.useState([]);
  const [errorMsg, setErrorMsg] = useState("");


  const [createProject, setCreateProject] = useState({
    PROJECT_PARENT_ID: props.companyData?.COMPANY_ID,
    PROJECT_PARENT_USERNAME: props.companyData?.COMPANY_USERNAME,
    PROJECT_MEMBER_PARENT_ID: props.companyData?.COMPANY_PARENT_ID,
    PROJECT_MEMBER_PARENT_USERNAME: props.companyData?.COMPANY_PARENT_USERNAME,
    PROJECT_NAME: "",
    PROJECT_USERNAME: "",
    PROJECT_ADD: "",
    PROJECT_CITY: "",
    PROJECT_START_DATE: "",
    PROJECT_END_DATE: "",
    PROJECT_SUPERVISOR: "",
    PROJECT_COUNTRY: "",
    PROJECT_STATE: "",
    PROJECT_PHONE: "",
  });


 // city-country-logic

  const availableState = country?.find(
    (c) => c.name === createProject.PROJECT_COUNTRY
  );

  // console.log("all states : ===> ", availableState,"country=>",country);
  const availableCities = availableState?.states?.find(
    (s) => s.name === createProject.PROJECT_STATE
  );

  //api header


  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleCreate = (e) => {
    setCreateProject({ ...createProject, [e.target.name]: e.target.value });
    console.log("heello world", createProject);
  };


  //api create project
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !createProject.PROJECT_USERNAME ||
      !createProject.PROJECT_NAME ||
      !createProject.PROJECT_PHONE ||
      !createProject.PROJECT_PARENT_ID ||
      !createProject.PROJECT_PARENT_USERNAME ||
      !createProject.PROJECT_MEMBER_PARENT_ID ||
      !createProject.PROJECT_MEMBER_PARENT_USERNAME ||
      !createProject.PROJECT_ADD ||
      !createProject.PROJECT_START_DATE ||
      !createProject.PROJECT_END_DATE ||
      !createProject.PROJECT_SUPERVISOR ||
      !createProject.PROJECT_COUNTRY ||
      !createProject.PROJECT_CITY ||
      !createProject.PROJECT_STATE
    ) {
      setErrorMsg("Fill all fields");
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
        } else if (response.data.operation === "successfull") {
          toast.success("Project Created successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });
          setOpen(false);
        }
      })
      .catch((error) => {
        console.error(error, "ERR");
      });
  };


  //state city api

  return (
    <>
      <Button size="small" className="btn button border-bottom-0 bg-white"  variant="outlined">
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
                  className="form-control rounded-0"
                  placeholder="Username"
                  value={createProject.PROJECT_USERNAME}
                  name="PROJECT_USERNAME"
                  onChange={handleCreate}
                  //required
                />
                {/* {errors.PROJECT_USERNAME && (
                  <p className="error text-danger fw-light">
                    {errors.PROJECT_USERNAME}
                  </p>
                )} */}
              </div>
              <div className="form-group col-xl-4">
                <label>Project Name</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputname"
                  placeholder="Project Name"
                  value={createProject.PROJECT_NAME}
                  name="PROJECT_NAME"
                  onChange={handleCreate}
                  required
                />
              </div>
              <div className="form-group col-xl-4">
                <label>Contact</label>
                <input
                  type="number"
                  className="form-control rounded-0"
                  id="inputPassword4"
                  placeholder="Enter Phone Number"
                  name="PROJECT_PHONE"
                  value={createProject.PROJECT_PHONE}
                  onChange={handleCreate}
                  required
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group col-xl-6">
                <label>Project start date</label>
                <input
                  type="date"
                  value={createProject.PROJECT_START_DATE}
                  name="PROJECT_START_DATE"
                  onChange={handleCreate}
                  className="form-control rounded-0"
                //required
                />
              </div>
              <div className="form-group col-xl-6">
                <label>Project End date</label>
                <input
                  type="date"
                  value={createProject.PROJECT_END_DATE}
                  name="PROJECT_END_DATE"
                  onChange={handleCreate}
                  className="form-control rounded-0"
                //required
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group col-xl-6">
                <label>Enrollment</label>
                <select
                  id="inputEnroll"
                  className="form-control border rounded-0"
                  onChange={handleCreate}
                  name="PROJECT_EMROLMNT_TYPE"
                  value={createProject.PROJECT_EMROLMNT_TYPE}
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
                  className="form-control rounded-0 "
                  id="inputsupervisor"
                  name="PROJECT_SUPERVISOR"
                  value={createProject.PROJECT_SUPERVISOR}
                  onChange={handleCreate}
                  //required
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group  col-md-12">
                <label>Address</label>
                <textarea
                  type="text"
                  className="form-control rounded-0"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                  name="PROJECT_ADD"
                  value={createProject.PROJECT_ADD}
                  onChange={handleCreate}
                  //required
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group col-xl-4">
                <label>Country</label>
                <select
                  className="form-control border rounded-0"
                  placeholder="Country"
                  name="PROJECT_COUNTRY"
                  value={createProject.PROJECT_COUNTRY}
                  onChange={handleCreate}
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
                  className="form-control border rounded-0"
                  placeholder="State"
                  name="PROJECT_STATE"
                  value={createProject.PROJECT_STATE}
                  onChange={handleCreate}
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
                  className="form-control border rounded-0"
                  placeholder="City"
                  name="PROJECT_CITY"
                  value={createProject.PROJECT_CITY}
                  onChange={handleCreate}
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
            <center>
              {errorMsg && (
                <p className=" text-danger fw-light mb-0">{errorMsg}</p>
              )}
            </center>
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
