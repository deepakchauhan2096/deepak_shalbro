import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ToastContainer, toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Button, Container } from "@mui/material";
import env from "react-dotenv";

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

export default function AddEmployee(props) {
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createEmployee, setCreateEmployee] = useState({
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
    EMPLOYEE_PASSWORD: "",
    EMPLOYEE_MEMBER_PARENT_USERNAME: props.mainData.COMPANY_PARENT_USERNAME,
    EMPLOYEE_PARENT_ID: props.mainData.COMPANY_ID,
    EMPLOYEE_PARENT_USERNAME: props.mainData.COMPANY_USERNAME,
    EMPLOYEE_MEMBER_PARENT_ID: props.mainData.COMPANY_PARENT_ID,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const [newdata, setNewdata] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const headers = {
  //   "Content-Type": "application/json",
  //   authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  // };

   

  const handleCreate = (e) => {
    setCreateEmployee({ ...createEmployee, [e.target.name]: e.target.value });
    // console.log("heello world", createEmployee);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !createEmployee.EMPLOYEE_MEMBER_PARENT_USERNAME ||
      !createEmployee.EMPLOYEE_EMAIL ||
      !createEmployee.EMPLOYEE_PASSWORD ||
      !createEmployee.EMPLOYEE_NAME ||
      !createEmployee.EMPLOYEE_STATE ||
      !createEmployee.EMPLOYEE_CITY ||
      !createEmployee.EMPLOYEE_PHONE ||
      !createEmployee.EMPLOYEE_HOURLY_WAGE ||
      !createEmployee.EMPLOYEE_ROLE ||
      !createEmployee.EMPLOYEE_EMPLMNTTYPE ||
      !createEmployee.EMPLOYEE_DOB ||
      !createEmployee.EMPLOYEE_HIRE_DATE ||
      !createEmployee.EMPLOYEE_ADD ||
      !createEmployee.EMPLOYEE_USERNAME
    ) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

      axios
        .post("/api/create_employee", createEmployee)
        .then((response) => {
          if (response.data.operation === "failed") {
            setErrorMsg(response.data.errorMsg);
          } else if (response.data.operation === "successfull") {
            setIsSubmitted(true); // Set the submission status to true after successful submission
            toast.success("Form submitted successfully!", {
              position: toast.POSITION.TOP_CENTER, autoClose:1000
            });
            props.update(true);
            setOpen(false);
            setCreateEmployee('')
          }
        })
        .catch((error) => {
          console.error(error);
        });
  };


  return (
    < >
      <Button
          size="small"
          className="btn button border-bottom-0 bg-white" 
          variant="outlined"
      >
        Employee
      </Button>
      <Button
        onClick={handleOpen}
        sx={{ color: "#277099" }}
        className="btn rounded-0 border-0  rounded-0 text-light"
        variant="contained"
        size="small"
      >
        + Add New Employee
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
            <form onSubmit={handleSubmit}>
              <div className="row py-1">
                <div className="form-group col-xl-6">
                  <label for="inputqual">Employee Username</label>
                  <input
                    type="text"
                    className="form-control form-control-2 rounded-0"
                    placeholder="Enter Employee Username"
                    id="inputZip"
                    value={createEmployee.EMPLOYEE_USERNAME}
                    name="EMPLOYEE_USERNAME"
                    onChange={handleCreate}
                    required
                  />
                  {errors.EMPLOYEE_USERNAME && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_USERNAME}
                  </p>
                  )}
                </div>
                <div className="form-group col-xl-6">
                  <label>Employee Name</label>
                  <input
                    type="text"
                    className="form-control form-control-2 rounded-0"
                    id="empName"
                    placeholder="Enter Employee name"
                    value={createEmployee.EMPLOYEE_NAME}
                    name="EMPLOYEE_NAME"
                    onChange={handleCreate}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-xl-6 py-1">
                  <label>E-mail</label>
                  <input
                    type="email"
                    className="form-control form-control-2 rounded-0"
                    id="email"
                    placeholder="Enter Email add..."
                    value={createEmployee.EMPLOYEE_EMAIL}
                    name="EMPLOYEE_EMAIL"
                    onChange={handleCreate}
                    required
                  />
                </div>
                <div className="form-group col-xl-6 py-1">
                  <label>State</label>
                  <input
                    type="text"
                    className="form-control form-control-2 rounded-0"
                    id="phone"
                    placeholder="Enter Your state.."
                    value={createEmployee.EMPLOYEE_STATE}
                    name="EMPLOYEE_STATE"
                    onChange={handleCreate}
                    required
                  />
                </div>{" "}
                <div className="form-group col-xl-6 py-1">
                  <label>Phone</label>
                  <input
                    type="number"
                    className="form-control form-control-2 rounded-0"
                    id="phone"
                    placeholder="Enter Your Number"
                    value={createEmployee.EMPLOYEE_PHONE}
                    name="EMPLOYEE_PHONE"
                    onChange={handleCreate}
                    required
                  />
                </div>
                <div className="form-group col-xl-6 py-1">
                  <label>Employee Password</label>
                  <input
                    type="text"
                    className="form-control form-control-2 rounded-0"
                    placeholder="Enter Employee password"
                    value={createEmployee.EMPLOYEE_PASSWORD}
                    name="EMPLOYEE_PASSWORD"
                    onChange={handleCreate}
                    required
                  />
                </div>
                <div className="form-group col-xl-6 py-1">
                  <label for="inputPassword4">Date Of Birth</label>
                  <input
                    type="date"
                    className="form-control form-control-2 rounded-0"
                    id="inputPassword4"
                    placeholder="Enter Date of birth"
                    value={createEmployee.EMPLOYEE_DOB}
                    name="EMPLOYEE_DOB"
                    onChange={handleCreate}
                    required
                  />

                </div>
              </div>
              <div className="row">
                <div className="row">
                  <div className="form-group col-xl-12 py-1">
                    <label for="inputAddress">Address</label>
                    <textarea
                      type="text"
                      className="form-control form-control-2 rounded-0"
                      id="inputAddress"
                      placeholder="Enter Address"
                      value={createEmployee.EMPLOYEE_ADD}
                      name="EMPLOYEE_ADD"
                      onChange={handleCreate}
                      required
                    />
                  </div>
                </div>
                <div className="form-group col-xl-4 py-1">
                  <label>City</label>
                  <input
                    type="text"
                    className="form-control form-control-2 rounded-0"
                    id="city"
                    placeholder="Enter Your city.."
                    value={createEmployee.EMPLOYEE_CITY}
                    name="EMPLOYEE_CITY"
                    onChange={handleCreate}
                    required
                  />
                </div>
                <div className="form-group col-xl-4 py-1">
                  <label>Hourly wages</label>
                  <input
                    type="number"
                    className="form-control form-control-2 rounded-0"
                    id="hourlywage"
                    placeholder="Enter your Hourly wages"
                    value={createEmployee.EMPLOYEE_HOURLY_WAGE}
                    name="EMPLOYEE_HOURLY_WAGE"
                    onChange={handleCreate}
                    required
                  />
                </div>
                <div className="form-group col-xl-4 py-1">
                  <label for="inputPassword4">Employee Role</label>
                  <select
                    id="inputqual"
                    className="form-control form-control-2 rounded-0 border"
                    value={createEmployee.EMPLOYEE_ROLE}
                    name="EMPLOYEE_ROLE"
                    onChange={handleCreate}
                    required
                  >
                    <option selected>Choose role...</option>
                    <option>Employee</option>
                    <option>Trainee</option>
                    <option>Student</option>
                    <option>SuperWiser</option>
                    <option>Worker</option>
                    <option>other</option>
                  </select>

                </div>
              </div>
              <div className="row">
                <div className="form-group col-xl-4 py-1 ">
                  <label for="inputqual">Employement Type</label>
                  <select
                    id="inputqual"
                    className="form-control form-control-2 rounded-0 border"
                    value={createEmployee.EMPLOYEE_EMPLMNTTYPE}
                    name="EMPLOYEE_EMPLMNTTYPE"
                    onChange={handleCreate}
                    required
                  >
                    <option selected>Choose type...</option>
                    <option>Permanent</option>
                    <option>Contract</option>
                    <option>Trainee</option>
                    <option>other</option>
                  </select>
                </div>

                <div className="form-group col-xl-4 py-1">
                  <label for="inputPassword4">Hired Date</label>
                  <input
                    type="date"
                    className="form-control form-control-2 rounded-0"
                    id="inputPassword4"
                    placeholder="Enter hire date"
                    value={createEmployee.EMPLOYEE_HIRE_DATE}
                    name="EMPLOYEE_HIRE_DATE"
                    onChange={handleCreate}
                    required
                  />
                </div>
              </div>
              <div className="row pt-2">
              <center>
              {errorMsg && (
                <p className=" text-danger fw-light mb-0">{errorMsg}</p>
              )}
               </center>
                <div className="col-12">
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
                </div>
              </div>
            </form>
          </Box>
        </Container>
      </Modal>
    </>
  );
}
