import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import pluslogo from "../assests/images/plus.png";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddEmployee(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [index, setIndex] = React.useState(1);

  const [createEMPLOYEE, setCreateEMPLOYEE] = useState({
    EMPLOYEE_PARENT_ID: props.usernameId.COMPANY_ID,
    EMPLOYEE_PARENT_USERNAME: props.usernameId.COMPANY_USERNAME,
    EMPLOYEE_MEMBER_PARENT_ID: props.usernameId.COMPANY_PARENT_ID,
    EMPLOYEE_MEMBER_PARENT_USERNAME:  props.usernameId.COMPANY_PARENT_USERNAME,
    EMPLOYEE_NAME: "",
    EMPLOYEE_USERNAME: "",
    EMPLOYEE_PHONE: "",
    EMPLOYEE_ADD: "",
    EMPLOYEE_CITY: "",
    EMPLOYEE_START_DATE: "",
    EMPLOYEE_END_DATE: "",
    EMPLOYEE_SUPERVISOR: "",
    EMPLOYEE_EMROLMNT_TYPE: "",
  });

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleCreate = (e) => {
    setCreateEMPLOYEE({ ...createEMPLOYEE, [e.target.name]: e.target.value });
    console.log("heello world", createEMPLOYEE);
  };

  const handleSubmit = (e) => {
    console.log("on btn submit");
    e.preventDefault();
    axios
      .post("http://54.89.160.62:5001/create_employee", createEMPLOYEE, {
        headers,
      })
      .then((response) => {
        console.log("response1 : ", response);
        console.log("response", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ color: "#277099" }}
        className="rounded-0 border-0"
        variant="outlined"
      >
        + Add New EMPLOYEE
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <div className="row py-2">
              <div className="form-group col-xl-4">
                <label> EMPLOYEE Username</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputusername"
                  placeholder="Username"
                  value={createEMPLOYEE.EMPLOYEE_USERNAME}
                  name="EMPLOYEE_USERNAME"
                  onChange={handleCreate}
                />
              </div>
              <div className="form-group col-xl-4">
                <label>EMPLOYEE Name</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputname"
                  placeholder="EMPLOYEE Name"
                  value={createEMPLOYEE.EMPLOYEE_NAME}
                  name="EMPLOYEE_NAME"
                  onChange={handleCreate}
                />
              </div>
              <div className="form-group col-xl-4">
                <label>Contact</label>
                <input
                  type="number"
                  className="form-control rounded-0"
                  id="inputPassword4"
                  placeholder="Enter Phone Number"
                  name="EMPLOYEE_PHONE"
                  value={createEMPLOYEE.EMPLOYEE_PHONE}
                  onChange={handleCreate}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group col-xl-6">
                <label className="py-2 " >EMPLOYEE start date</label>
                <input
                  type="date"
                  value={createEMPLOYEE.EMPLOYEE_START_DATE}
                  name="EMPLOYEE_START_DATE"
                  onChange={handleCreate}
                  className="mx-2 py-2 border"
                />
              </div>
              <div className="form-group col-xl-6">
                <label className="py-2 ">EMPLOYEE End date</label>
                <input
                  type="date"
                  value={createEMPLOYEE.EMPLOYEE_END_DATE}
                  name="EMPLOYEE_END_DATE"
                  onChange={handleCreate}
                  className="mx-2 py-2 border outline-0"
                />
              </div>
            </div>

            <div className="row py-2">
            
                <div className="form-group col-xl-6">
                  <label>Enrollment</label>
                  <select
                    id="inputEnroll"
                    className="form-control rounded-0"
                    onChange={handleCreate}
                    name="EMPLOYEE_EMROLMNT_TYPE"
                    value={createEMPLOYEE.EMPLOYEE_EMROLMNT_TYPE}
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
                  className="form-control rounded-0"
                  id="inputsupervisor"
                  name="EMPLOYEE_SUPERVISOR"
                  value={createEMPLOYEE.EMPLOYEE_SUPERVISOR}
                  onChange={handleCreate}
                />
            
              </div>
            </div>
            <div className="form-group py-2">
              <label>Address</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                name="EMPLOYEE_ADD"
                value={createEMPLOYEE.EMPLOYEE_ADD}
                onChange={handleCreate}
              />
            </div>
            <div className="row py-2">
              <div className="form-group col-md-6">
                <label>City</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputCity"
                  name="EMPLOYEE_CITY"
                  value={createEMPLOYEE.EMPLOYEE_CITY}
                  onChange={handleCreate}
                />
              </div>
            </div>
            <div className="row py-2">
              {/* <div className="form-group py-2 col-md-4">
              <label for="file" >Compliance doc</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div> */}

              {/* <div className="form-group py-2 col-md-4">
              <label for="file" >Policies</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div> */}

              {/* <div className="form-group py-2 col-md-4">
              <label for="file" >Auto policies</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div> */}
              {/* 
            <div className="form-group py-2 col-md-4">
              <label for="file" >Law suits</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div> */}
            </div>
            <button type="submit" className="btn btn-info text-white rounded-0" onClick={handleSubmit}>
              Submit
            </button>{" "}
            <button
              onClick={handleClose}
              className="btn btn-danger text-white rounded-0"
            >
              Discard
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
