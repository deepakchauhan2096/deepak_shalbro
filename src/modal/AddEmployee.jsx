import * as React from "react";
import { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { Button, Container } from "@mui/material";

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

export default function AddEmployee() {
  const [createEmployee, setCreateEmployee] = useState({
    EMPLOYEE_ID:"",
    EMPLOYEE_NAME: "",
    EMPLOYEE_EMAIL: "",
    EMPLOYEE_STATE: "",
    EMPLOYEE_CITY: "",
    EMPLOYEE_PHONE: "",
    EMPLOYEE_HOURLY_WAGE: "",
    EMPLOYEE_ROLE: "",
    EMPLOYEE_EMPLMNTTYPE: "",
    EMPLOYEE_DOB: "",
    EMPLOYEE_HIRE_DATE: "",
    EMPLOYEE_ADD: "",
    EMPLOYEE_USERNAME: "",
    EMPLOYEE_MEMBER_PARENT_USERNAME: "deepanshu1",
    EMPLOYEE_PARENT_ID: 45,
    EMPLOYEE_PARENT_USERNAME: "company21",
    EMPLOYEE_MEMBER_PARENT_ID: 18,
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleCreate = (e) => {
    setCreateEmployee({ ...createEmployee, [e.target.name]: e.target.value });
    console.log("heello world", createEmployee);
  };

  const handleSubmit = (e) => {
    console.log("on btn submit");
    e.preventDefault();
    axios
      .post("http://54.89.160.62:5001/create_employee", createEmployee, {
        headers,
      })
      .then((response) => {
        console.log("response1 : ", response);
        // sendDataToParent(response.data);
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
        + Add Employee
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container
          id="content"
          style={{ height: "100vh", position: "relative" }}
          maxWidth="xl"
        >
          <Box sx={style}>
            <form>
              <div className="row py-2">

                <div className="form-group col-xl-3">

                  <label>Employee Name</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="empName"
                    placeholder="Name of the Employee"
                    value={createEmployee.EMPLOYEE_NAME}
                    name="EMPLOYEE_NAME"
                    onChange={handleCreate}
                  />
                </div>

                <div className="form-group col-xl-3">
                  <label>E-mail</label>
                  <input
                    type="email"
                    className="form-control rounded-0"
                    id="email"
                    placeholder="Enter Email add..."
                    value={createEmployee.EMPLOYEE_EMAIL}
                    name="EMPLOYEE_EMAIL"
                    onChange={handleCreate}
                  />
                </div>
                <div className="form-group col-xl-3">
                  <label>State</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="phone"
                    placeholder="Enter Your state.."
                    value={createEmployee.EMPLOYEE_STATE}
                    name="EMPLOYEE_STATE"
                    onChange={handleCreate}
                  />
                </div>{" "}
                <div className="form-group col-xl-3">
                  <label>City</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="city"
                    placeholder="Enter Your city.."
                    value={createEmployee.EMPLOYEE_CITY}
                    name="EMPLOYEE_CITY"

                    onChange={handleCreate}
                  />
                </div>
              </div>
              <div className="row py-2">

                <div className="form-group col-xl-4">
                  <label>Phone</label>
                  <input
                    type="number"
                    className="form-control rounded-0"
                    id="phone"
                    placeholder="Enter Your Number"
                    value={createEmployee.EMPLOYEE_PHONE}
                    name="EMPLOYEE_PHONE"
                    onChange={handleCreate}
                  />
                </div>
                <div className="form-group col-xl-4">
                  <label>Hourly wages</label>
                  <input
                    type="number"
                    className="form-control rounded-0"
                    id="hourlywage"
                    placeholder="Enter your Hourly wages"
                    value={createEmployee.EMPLOYEE_HOURLY_WAGE}
                    name="EMPLOYEE_HOURLY_WAGE"
                    onChange={handleCreate}
                  />
                </div>
                <div className="form-group col-xl-4">

                  <label for="inputPassword4">Employee Role</label>
                  <select
                    id="inputqual"
                    className="form-control rounded-0"
                    value={createEmployee.EMPLOYEE_ROLE}
                    name="EMPLOYEE_ROLE"
                    onChange={handleCreate}
                  >
                    <option selected>Choose role...</option>
                    <option selected>Employee</option>
                    <option>Trainee</option>
                    <option>Student</option>
                    <option>SuperWiser</option>
                    <option>Worker</option>
                    <option>other</option>
                  </select>
                </div>
              </div>

              <div className="row py-2">
                <div className="form-group col-xl-4">
                  <label for="inputqual">Employement Type</label>
                  <select
                    id="inputqual"
                    className="form-control rounded-0"
                    value={createEmployee.EMPLOYEE_EMPLMNTTYPE}
                    name="EMPLOYEE_EMPLMNTTYPE"
                    onChange={handleCreate}
                  >

                    <option selected>Choose type...</option>
                    <option>Permanent</option>
                    <option>Contract</option>
                    <option>Trainee</option>
                    <option>other</option>
                  </select>
                </div>
                <div className="form-group col-xl-4">
                  <label for="inputPassword4">Date Of Birth</label>
                  <input
                    type="date"
                    className="form-control rounded-0"
                    id="inputPassword4"
                    placeholder="Enter Date of birth"
                    value={createEmployee.EMPLOYEE_DOB}
                    name="EMPLOYEE_DOB"
                    onChange={handleCreate}
                  />
                </div>
                <div className="form-group col-xl-4">
                  <label for="inputPassword4">Hired Date</label>
                  <input
                    type="date"
                    className="form-control rounded-0"
                    id="inputPassword4"
                    placeholder="Enter hire date"
                    value={createEmployee.EMPLOYEE_HIRE_DATE}
                    name="EMPLOYEE_HIRE_DATE"
                    onChange={handleCreate}
                  />
                </div>
               
              </div>
              <div className="row">
              <div className="form-group py-2">
                <label for="inputAddress">Address</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputAddress"
                  placeholder="Enter Address"
                  value={createEmployee.EMPLOYEE_ADD}
                  name="EMPLOYEE_ADD"
                  onChange={handleCreate}
                />
              </div>

           
              </div>
              {/* <div className="row py-2">
              <div className="form-group col-md-6">
                <label for="inputCity">City</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputCity"
                  value={createEmployee.EMPLOYEE_CITY}
                  name="EMPLOYEE_CITY"
                  onChange={handleCreate}
                />
              </div>
              <div className="form-group col-md-4">
                <label for="inputState">State</label>
                <select id="inputState" className="form-control rounded-0">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label for="inputZip">Hourly Wages</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputZip"
                  value={createEmployee.EMPLOYEE_HOURLY_WAGES}
                  name="EMPLOYEE_HOURLY_WAGES"
                  onChange={handleCreate}
                />
              </div>
            </div> */}
              <div className="row py-2">
                <div className="form-group col-xl-6">
                  <label for="inputqual">Employee username</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputZip"
                    value={createEmployee.EMPLOYEE_USERNAME}
                    name="EMPLOYEE_USERNAME"
                    onChange={handleCreate}
                  />
                </div>
                <div className="form-group col-xl-6">
                  <label for="inputPassword4">
                    EMPLOYEE_MEMBER_PARENT_USERNAME
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputPassword4"
                    placeholder="Enter hire date"
                    value={createEmployee.EMPLOYEE_MEMBER_PARENT_USERNAME}
                    name="EMPLOYEE_MEMBER_PARENT_USERNAME"
                    onChange={handleCreate}
                  />
                </div>
                <div className="form-group col-xl-6">
                  <label for="inputPassword4">EMPLOYEE_MEMBER_PARENT_ID</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputPassword4"
                    placeholder="Enter hire date"
                    value={createEmployee.EMPLOYEE_MEMBER_PARENT_ID}
                    name="EMPLOYEE_MEMBER_PARENT_USERNAME_ID"
                    onChange={handleCreate}
                  />
                </div>
              </div>
              <div className="row py-2">
                <div className="form-group col-xl-6">
                  <label for="inputqual">EMPLOYEE_PARENT_ID</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputZip"
                    value={createEmployee.EMPLOYEE_PARENT_ID}
                    name="EMPLOYEE_PARENT_ID"
                    onChange={handleCreate}
                  />
                </div>
                <div className="form-group col-xl-6">
                  <label for="inputPassword4">EMPLOYEE_PARENT_USERNAME</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputPassword4"
                    placeholder="Enter hire date"
                    value={createEmployee.EMPLOYEE_PARENT_USERNAME}
                    name="EMPLOYEE_PARENT_USERNAME"
                    onChange={handleCreate}
                  />
                </div>
              </div>
              {/* <div className="row py-2">
            <div className="form-group py-2 col-md-4">
              <label for="file" >Education Doc</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div>

            <div className="form-group py-2 col-md-4">
              <label for="file" >Valid ID</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div>

            <div className="form-group py-2 col-md-4">
              <label for="file" >Other</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div>

            </div>

            <div className="form-group py-2">
              <div className="form-check">
                <input
                  className="form-check-input rounded-0"
                  type="checkbox"
                  id="gridCheck"
                />
                <label className="form-check-label" for="gridCheck">
                  Check me out
                </label>
              </div>
            </div> */}

              <Button type="submit" variant="contained" className="btn text-white rounded-0 mt-2" onClick={handleSubmit}>
              Submit
            </Button>{" "}
            <Button
            variant="contained"
              color="error"
              onClick={handleClose}
              className="btn text-white rounded-0 mt-2"
            >
              Discard
            </Button>
              

              <Button
                type="submit"
                variant="contained"
                className="btn text-white rounded-0 mt-2"
                onClick={handleSubmit}
              >
                Submit
              </Button>{" "}
              <Button
                variant="contained"
                color="error"
                onClick={handleClose}
                className="btn text-white rounded-0 mt-2"
              >
                Discard
              </Button>

            </form>
          </Box>
        </Container>
      </Modal>
    </>
  );
}
