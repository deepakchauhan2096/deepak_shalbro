import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import pluslogo from "../assests/images/plus.png";
import { useState, useEffect } from "react";
import axios from "axios";

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



export default function EmployeeCreate(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [index, setIndex] = React.useState(1);

  // const [inputFields, setInputFields] = useState({
  //   email: "",
  //   password: "",
  //   age: null
  // });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  console.log(props.empData, "date kkkk")

  const [createEmployee, setCreateEmployee] = useState({
    EMPLOYEE_PARENT_ID: props.empData.COMPANY_ID,
    EMPLOYEE_PARENT_USERNAME: props.empData.COMPANY_USERNAME,
    EMPLOYEE_MEMBER_PARENT_ID: props.empData.COMPANY_PARENT_ID,
    EMPLOYEE_MEMBER_PARENT_USERNAME: props.empData.COMPANY_PARENT_USERNAME,
    EMPLOYEE_NAME: "",
    EMPLOYEE_USERNAME: "",
    EMPLOYEE_PHONE: "",
    EMPLOYEE_ADD: "",
    EMPLOYEE_CITY: "",
    EMPLOYEE_SUPERVISOR: "",
    EMPLOYEE_EMROLMNT_TYPE: "",
    EMPLOYEE_STATE:"",
    EMPLOYEE_DOB:"",
    EMPLOYEE_HIRE_DATE:"",
  });

 

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleCreate = (e) => {
    setCreateEmployee({ ...createEmployee, [e.target.name]: e.target.value });
    console.log("heello world", createEmployee);
  };


  // const validateValues = (inputValues) => {
  //   let errors = {};

  //   if (inputValues.EMPLOYEE_USERNAME.trim() === "") {
  //     errors.EMPLOYEE_USERNAME = "Username is required";
  //   } else if (
  //     inputValues.EMPLOYEE_USERNAME.length < 6 ||
  //     inputValues.EMPLOYEE_USERNAME.length > 10
  //   ) 
  //   {
  //     errors.EMPLOYEE_USERNAME = "Username length must be between 6 and 10";
  //   } else if (!/^[a-zA-Z0-9]+$/.test(inputValues.EMPLOYEE_USERNAME)) {
  //     errors.EMPLOYEE_USERNAME = "Username should not contain symbols";
  //   }

  // }






  const handleSubmit = (e) => {
    console.log("on btn submit");
    e.preventDefault();
    // setErrors(validateValues(createEmployee));
    setSubmitting(true);

    axios
      .post("http://54.89.160.62:5001/create_employee", createEmployee, {
        headers,
      })
      .then((response) => {
        console.log("response emp : ", response);
        console.log("response emp2", response.data);
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
      <Button
        onClick={handleOpen}
        sx={{ color: "#277099" }}
        className=" border-0"
        variant="outlined"
      >
        + Add New Employee
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <center>
            {" "}
            {Object.keys(errors).length === 0 && submitting ? (
              <span className="text-success fs-5">
                Successfully submitted ✓
              </span>
            ) : (
              ""
            )}
          </center> */}
          <form onSubmit={handleSubmit}>
            <div className="row py-2">
              <div className="form-group col-xl-4">
                <label> Employee Username</label>
                <input
                  type="text"
                  className="form-control "
                  id="inputusername"
                  placeholder="Username"
                  value={createEmployee.EMPLOYEE_USERNAME}
                  name="EMPLOYEE_USERNAME"
                  onChange={handleCreate}
                />
                {/* {errors.EMPLOYEE_USERNAME && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_USERNAME}
                  </p>
                )} */}
              </div>
              <div className="form-group col-xl-4">
                <label>Employee Name</label>
                <input
                  type="text"
                  className="form-control "
                  id="inputname"
                  placeholder="Employee Name"
                  value={createEmployee.EMPLOYEE_NAME}
                  name="EMPLOYEE_NAME"
                  onChange={handleCreate}
                />
                {/* {errors.EMPLOYEE_NAME && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_NAME}
                  </p>
                )} */}
              </div>
              <div className="form-group col-xl-4">
                <label>Contact</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Enter Phone Number"
                  name="EMPLOYEE_PHONE"
                  value={createEmployee.EMPLOYEE_PHONE}
                  onChange={handleCreate}
                />
                {/* {errors.EMPLOYEE_PHONE && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_PHONE}
                  </p>
                )} */}
              </div>
            </div>
            {/* <div className="row py-2">
              <div className="form-group col-xl-6">
                <label>Employee start date</label>
                <input
                  type="date"
                  value={createEmployee.EMPLOYEE_START_DATE}
                  name="EMPLOYEE_START_DATE"
                  onChange={handleCreate}
                  className="form-control"
                />
                {errors.EMPLOYEE_START_DATE && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_START_DATE}
                  </p>
                )}
              </div>
              <div className="form-group col-xl-6">
                <label>Employee End date</label>
                <input
                  type="date"
                  value={createEmployee.EMPLOYEE_END_DATE}
                  name="EMPLOYEE_END_DATE"
                  onChange={handleCreate}
                  className="form-control"
                />
                {errors.EMPLOYEE_END_DATE && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_END_DATE}
                  </p>
                )}
              </div>
            </div> */}
            <div className="row py-2">
              <div className="form-group col-xl-6">
                <label>Enrollment</label>
                <select
                  id="inputEnroll"
                  className="form-control "
                  onChange={handleCreate}
                  name="EMPLOYEE_EMROLMNTTYPE"
                  value={createEmployee.EMPLOYEE_EMROLMNTTYPE}
                >
                  <option selected>Choose...</option>
                  <option>Painter</option>
                  <option>Fitter</option>
                  <option>Plumber</option>
                  <option>Engineer</option>
                </select>
                {/* {errors.EMPLOYEE_EMROLMNTTYPE && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_EMROLMNTTYPE}
                  </p>
                )} */}
              </div>

              <div className="form-group col-md-6">
                <label>HOURLY WAGES</label>
                <input
                  type="text"
                  className="form-control "
                  id="inputsupervisor"
                  name="EMPLOYEE_HOURLY_WAGE"
                  value={createEmployee.EMPLOYEE_HOURLY_WAGE}
                  onChange={handleCreate}
                />
                {/* {errors.EMPLOYEE_HOURLY_WAGE && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_HOURLY_WAGE}
                  </p>
                )} */}
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group  col-md-8">
                <label>Address</label>
                <textarea
                  type="text"
                  className="form-control "
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                  name="EMPLOYEE_ADD"
                  value={createEmployee.EMPLOYEE_ADD}
                  onChange={handleCreate}
                />

                {/* {errors.EMPLOYEE_ADD && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_ADD}
                  </p>
                )} */}
              </div>
              <div className="form-group col-md-4">
                <label>STATE</label>
                <input
                  type="text"
                  className="form-control "
                  id="inputCity"
                  name="EMPLOYEE_STATE"
                  value={createEmployee.EMPLOYEE_STATE}
                  onChange={handleCreate}
                />
                {/* {errors.EMPLOYEE_STATE && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_STATE}
                  </p>
                )} */}
              </div>
              <div className="form-group col-md-4">
                <label>City</label>
                <input
                  type="text"
                  className="form-control "
                  id="inputCity"
                  name="EMPLOYEE_CITY"
                  value={createEmployee.EMPLOYEE_CITY}
                  onChange={handleCreate}
                />
                {/* {errors.EMPLOYEE_CITY && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_CITY}
                  </p>
                )} */}
              </div>
              <div className="form-group col-md-4">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control "
                  id="inputCity"
                  name="EMPLOYEE_EMAIL"
                  value={createEmployee.EMPLOYEE_EMAIL}
                  onChange={handleCreate}
                />
                {/* {errors.EMPLOYEE_EMAIL && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_EMAIL}
                  </p>
                )} */}
              </div>
              <div className="form-group col-md-4">
                <label>DOB</label>
                <input
                  type="date"
                  className="form-control "
                  id="inputCity"
                  name="EMPLOYEE_DOB"
                  value={createEmployee.EMPLOYEE_DOB}
                  onChange={handleCreate}
                />
                {/* {errors.EMPLOYEE_DOB && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_DOB}
                  </p>
                )} */}
              </div>
              <div className="form-group col-md-4">
                <label>HIRE DATE</label>
                <input
                  type="date"
                  className="form-control "
                  id="inputCity"
                  name="EMPLOYEE_HIRE_DATE"
                  value={createEmployee.EMPLOYEE_HIRE_DATE}
                  onChange={handleCreate}
                />
                {/* {errors.EMPLOYEE_HIRE_DATE && (
                  <p className="error text-danger fw-light">
                    {errors.EMPLOYEE_HIRE_DATE}
                  </p>
                )} */}
              </div>
            </div>



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
