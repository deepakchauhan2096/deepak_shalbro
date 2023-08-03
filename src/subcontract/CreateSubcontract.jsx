import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import country from "../Api/countriess.json";
// import states from "../Api/states.json"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import env from "react-dotenv";

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

export default function CreateSubcontract(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [index, setIndex] = React.useState([]);


  const [createSubcontract, SetSubcontract] = useState({
    SUBCONTRACT_PARENT_ID: props.companyData?.COMPANY_ID,
    SUBCONTRACT_PARENT_USERNAME: props.companyData?.COMPANY_USERNAME,
    SUBCONTRACT_MEMBER_PARENT_ID: props.companyData?.COMPANY_PARENT_ID,
    SUBCONTRACT_MEMBER_PARENT_USERNAME: props.companyData?.COMPANY_PARENT_USERNAME,
    SUBCONTRACT_NAME: "",
    SUBCONTRACT_USERNAME: "",
    SUBCONTRACT_ADD: "",
    SUBCONTRACT_CITY: "",
    SUBCONTRACT_START_DATE: "",
    SUBCONTRACT_END_DATE: "",
    SUBCONTRACT_SUPERVISOR: "",
    SUBCONTRACT_COUNTRY: "",
    SUBCONTRACT_STATE: "",
    SUBCONTRACT_PHONE: "",
  });
  const [errorMsg, setErrorMsg] = useState("");


 // city-country-logic

  const availableState = country?.find(
    (c) => c.name === createSubcontract.SUBCONTRACT_COUNTRY
  );

  const availableCities = availableState?.states?.find(
    (s) => s.name === createSubcontract.SUBCONTRACT_STATE
  );

  //api header


  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleCreate = (e) => {
    SetSubcontract({ ...createSubcontract, [e.target.name]: e.target.value });
    // console.log("heello world", createSubcontract);
  };


  //api create project
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !createSubcontract.SUBCONTRACT_USERNAME ||
      !createSubcontract.SUBCONTRACT_NAME ||
      !createSubcontract.SUBCONTRACT_PHONE ||
      !createSubcontract.SUBCONTRACT_PARENT_ID ||
      !createSubcontract.SUBCONTRACT_PARENT_USERNAME ||
      !createSubcontract.SUBCONTRACT_MEMBER_PARENT_ID ||
      !createSubcontract.SUBCONTRACT_MEMBER_PARENT_USERNAME ||
      !createSubcontract.SUBCONTRACT_ADD ||
      !createSubcontract.SUBCONTRACT_START_DATE ||
      !createSubcontract.SUBCONTRACT_END_DATE ||
      !createSubcontract.SUBCONTRACT_SUPERVISOR ||
      !createSubcontract.SUBCONTRACT_COUNTRY ||
      !createSubcontract.SUBCONTRACT_CITY ||
      !createSubcontract.SUBCONTRACT_STATE
    ) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    axios
      .post(`http://18.211.130.168:5001/create_subcontract`, createSubcontract, {
        headers,
      })
      .then((response) => {
        if (response.data.operation == "failed") {
          setErrorMsg(response.data.errorMsg);
        } else if (response.data.operation == "successfull") {
          toast.success("Form submitted successfully!", {
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
       Sub Contractor
      </Button>
      <Button
        onClick={handleOpen}
        sx={{ color: "#277099" }}
        className="btn rounded-0 border-0  rounded-0 text-light"
        variant="contained"
        size="small"
      >
       + Add Sub Contract
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
                <label> Subcontract Username</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  placeholder="Username"
                  value={createSubcontract.SUBCONTRACT_USERNAME}
                  name="SUBCONTRACT_USERNAME"
                  onChange={handleCreate}
                  //required
                />
                {/* {errors.SUBCONTRACT_USERNAME && (
                  <p className="error text-danger fw-light">
                    {errors.SUBCONTRACT_USERNAME}
                  </p>
                )} */}
              </div>
              <div className="form-group col-xl-4">
                <label>Sub Contract Name</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputname"
                  placeholder="Project Name"
                  value={createSubcontract.SUBCONTRACT_NAME}
                  name="SUBCONTRACT_NAME"
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
                  name="SUBCONTRACT_PHONE"
                  value={createSubcontract.SUBCONTRACT_PHONE}
                  onChange={handleCreate}
                  required
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group col-xl-6">
                <label> start date</label>
                <input
                  type="date"
                  value={createSubcontract.SUBCONTRACT_START_DATE}
                  name="SUBCONTRACT_START_DATE"
                  onChange={handleCreate}
                  className="form-control rounded-0"
                //required
                />
              </div>
              <div className="form-group col-xl-6">
                <label>Project End date</label>
                <input
                  type="date"
                  value={createSubcontract.SUBCONTRACT_END_DATE}
                  name="SUBCONTRACT_END_DATE"
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
                  name="SUBCONTRACT_EMROLMNT_TYPE"
                  value={createSubcontract.SUBCONTRACT_EMROLMNT_TYPE}
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
                  name="SUBCONTRACT_SUPERVISOR"
                  value={createSubcontract.SUBCONTRACT_SUPERVISOR}
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
                  name="SUBCONTRACT_ADD"
                  value={createSubcontract.SUBCONTRACT_ADD}
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
                  name="SUBCONTRACT_COUNTRY"
                  value={createSubcontract.SUBCONTRACT_COUNTRY}
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
                  name="SUBCONTRACT_STATE"
                  value={createSubcontract.SUBCONTRACT_STATE}
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
                  name="SUBCONTRACT_CITY"
                  value={createSubcontract.SUBCONTRACT_CITY}
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
