import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
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
  borderRadius: 4,
};

export default function AddEmployee(props) {
  
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
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
    EMPLOYEE_MEMBER_PARENT_USERNAME: props.mainData.COMPANY_PARENT_USERNAME,
    EMPLOYEE_PARENT_ID: props.mainData.COMPANY_ID,
    EMPLOYEE_PARENT_USERNAME:props.mainData.COMPANY_USERNAME,
    EMPLOYEE_MEMBER_PARENT_ID: props.mainData.COMPANY_PARENT_ID,
  });
  // const [values, setValues] = useState({
  //   name: createEmployee.EMPLOYEE_MEMBER_PARENT_USERNAME,
  //   email: createEmployee.EMPLOYEE_EMAIL,
  //   pass: createEmployee.EMPLOYEE_USERNAME,
  // });
  
  const validateValues = (inputValues) => {
    let errors = {};
    // Employee Name 
    if (inputValues.EMPLOYEE_NAME.trim() === "") {
      errors.EMPLOYEE_NAME = "Employee Name is required";
    } else if (
      inputValues.EMPLOYEE_NAME.length < 6 ||
      inputValues.EMPLOYEE_NAME.length > 20
    ) {
      errors.EMPLOYEE_NAME = "Employee Name length must be between 6 and 20";
    } else if (!/^[a-zA-Z0-9]+$/.test(inputValues.EMPLOYEE_NAME)) {
      errors.EMPLOYEE_NAME = "Employee Name should not contain symbols";
    } else if (/\d/.test(inputValues.EMPLOYEE_NAME)) {
      errors.EMPLOYEE_NAME = "Employee Name should not contain numbers";
    }

    // Employee Username
    if (inputValues.EMPLOYEE_USERNAME.trim() === "") {
      errors.EMPLOYEE_USERNAME = "Username is required";
    } else if (
      inputValues.EMPLOYEE_USERNAME.length < 6 ||
      inputValues.EMPLOYEE_USERNAME.length > 10
    ) {
      errors.EMPLOYEE_USERNAME = "Username length must be between 6 and 10";
    } else if (!/^[a-zA-Z0-9]+$/.test(inputValues.EMPLOYEE_USERNAME)) {
      errors.EMPLOYEE_USERNAME = "Username should not contain symbols";
    }
//Employee Mail
if (inputValues.EMPLOYEE_EMAIL.trim() === "") {
  errors.EMPLOYEE_EMAIL = "Email is required";
} else if (inputValues.EMPLOYEE_EMAIL.length > 25) {
  errors.EMPLOYEE_EMAIL = "Email should not exceed 25 characters";
} else if (!/@/.test(inputValues.EMPLOYEE_EMAIL)) {
  errors.EMPLOYEE_EMAIL = "Email is invalid";
} else if (/\d/.test(inputValues.EMPLOYEE_EMAIL)) {
  errors.EMPLOYEE_EMAIL = "Email should not contain numbers";
} else if (!/^[a-zA-Z0-9@]+$/.test(inputValues.EMPLOYEE_USERNAME)) {
  errors.EMPLOYEE_USERNAME = "Username should not contain symbols";
}
//Employee Phone

    if (inputValues.EMPLOYEE_PHONE.trim() === "") {
      errors.EMPLOYEE_PHONE = "Phone Number is required";
    }
    //Employement Type
    if (inputValues.EMPLOYEE_EMPLMNTTYPE.trim() === "") {
      errors.EMPLOYEE_EMPLMNTTYPE = "Please select Employement Type";
    }
    //Hire Date 
    if (inputValues.EMPLOYEE_HIRE_DATE.trim() === "") {
      errors.EMPLOYEE_HIRE_DATE = "Start Date is required";
    } else {
      const currentDate = new Date().toISOString().split("T")[0];
      if (inputValues.EMPLOYEE_HIRE_DATE < currentDate) {
        errors.EMPLOYEE_HIRE_DATE = "Start Date cannot be in the past";
      }
    }

   
    // Wages
    if (inputValues.EMPLOYEE_HOURLY_WAGE.trim() === "") {
      errors.EMPLOYEE_HOURLY_WAGE = "Please Provide the Your Hourly Wages";
    }
    // Adress 
    if (inputValues.EMPLOYEE_ADD.trim() === "") {
      errors.EMPLOYEE_ADD = "Address is Required";
    }
    //Role
    if (inputValues.EMPLOYEE_ROLE.trim() === "") {
      errors.EMPLOYEE_ROLE = "Choose your Role";
    }
    // City 
    if (inputValues.EMPLOYEE_CITY.trim() === "") {
      errors.EMPLOYEE_CITY = "City is Required";
    }
   
    if (inputValues.EMPLOYEE_STATE.trim() === "") {
      errors.EMPLOYEE_STATE = "State is Required";
    }

    return errors;
  };

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);


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
    setErrors(validateValues(createEmployee));
    setSubmitting(true);

    axios
    .post("http://54.89.160.62:5001/create_employee", createEmployee, {
      headers,
    })
    .then((response) => {
      console.log("response1 : ", response);
      // props.update(response.data);
      console.log("response", response.data);
      
    })
    .catch((error) => {
      console.error(error);
    });
  };
  const finishSubmit = () => {
    console.log(createEmployee);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);


  

  return (
    <>
      <Button size="small" className="btn button btn-blue" variant="contained">
              {/* {props.name ? props.name : "Enter Name"} */} Employee
      </Button>
      <Button
        onClick={handleOpen}
        sx={{ color: "#277099" }}
        className="rounded-0 border-0"
        variant="outlined"
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
          <center>
            {" "}
            {Object.keys(errors).length === 0 && submitting ? (
              <span className="text-success fs-5">
                Successfully submitted ✓
              </span>
            ) : (
              ""
            )}
          </center>
            <form onSubmit={handleSubmit}>
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
                   {errors.EMPLOYEE_NAME && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_NAME}
                  </p>
                )}
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
                   {errors.EMPLOYEE_EMAIL && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_EMAIL}
                  </p>
                )}
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
                   {errors.EMPLOYEE_STATE && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_STATE}
                  </p>
                )}
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
                   {errors.EMPLOYEE_CITY && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_CITY}
                  </p>
                )}
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
                   {errors.EMPLOYEE_PHONE && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_PHONE}
                  </p>
                )}
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
                   {errors.EMPLOYEE_HOURLY_WAGE && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_HOURLY_WAGE}
                  </p>
                )}
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
                    <option >Employee</option>
                    <option>Trainee</option>
                    <option>Student</option>
                    <option>SuperWiser</option>
                    <option>Worker</option>
                    <option>other</option>
                  </select>
                  {errors.EMPLOYEE_ROLE && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_ROLE}
                  </p>
                )}



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
                  {errors.EMPLOYEE_EMPLMNTTYPE && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_EMPLMNTTYPE}
                  </p>
                )}
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
                   {errors.EMPLOYEE_DOB && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_DOB}
                  </p>
                )}
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
                   {errors.EMPLOYEE_HIRE_DATE && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_HIRE_DATE}
                  </p>
                )}
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
                   {errors.EMPLOYEE_ADD && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_ADD}
                  </p>
                )}
                </div>
              </div>
             
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
                   {errors.EMPLOYEE_USERNAME && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_USERNAME}
                  </p>
                )}
                </div>
                
                {/* <div className="form-group col-xl-6">
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
                </div> */}
              </div>
              {/* <div className="row py-2">
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
              </div> */}
         
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
        </Container>
      </Modal>
    </>
  );
}
