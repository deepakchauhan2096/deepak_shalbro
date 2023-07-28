import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ToastContainer, toast } from "react-toastify";
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

export default function EmployeeEdit(props) {
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const editdata = props?.edit.row
  console.log("first", editdata)

  const [editEmployee, setEditEmployee] = useState({
    EMPLOYEE_NAME: "",
    EMPLOYEE_EMAIL: editdata.EMPLOYEE_EMAIL,
    EMPLOYEE_STATE: editdata.EMPLOYEE_STATE,
    EMPLOYEE_CITY: editdata.EMPLOYEE_CITY,
    EMPLOYEE_PHONE: editdata.EMPLOYEE_PHONE,
    EMPLOYEE_HOURLY_WAGE: editdata.EMPLOYEE_HOURLY_WAGE,
    EMPLOYEE_ROLE: editdata.EMPLOYEE_ROLE,
    EMPLOYEE_EMPLMNTTYPE: editdata.EMPLOYEE_EMPLMNTTYPE,
    EMPLOYEE_DOB: editdata.EMPLOYEE_DOB,
    EMPLOYEE_HIRE_DATE: editdata.EMPLOYEE_HIRE_DATE,
    EMPLOYEE_ADD: editdata.EMPLOYEE_ADD,
    EMPLOYEE_USERNAME: editdata.EMPLOYEE_USERNAME,
    EMPLOYEE_PASSWORD: editdata.EMPLOYEE_PASSWORD,
    EMPLOYEE_MEMBER_PARENT_USERNAME: editdata.EMPLOYEE_MEMBER_PARENT_USERNAME,
    EMPLOYEE_PARENT_ID: editdata.EMPLOYEE_PARENT_ID,
    EMPLOYEE_PARENT_USERNAME: editdata.EMPLOYEE_PARENT_USERNAME,
    EMPLOYEE_MEMBER_PARENT_ID: editdata.EMPLOYEE_MEMBER_PARENT_ID,
    EMPLOYEE_ID: editdata.EMPLOYEE_ID,
  });

  useEffect(()=>{
    setEmployees((prev) => ({
      ...prev,
      EMPLOYEE_DETAILS_FOR_UPDATES: editEmployee,
    }))
    },[editEmployee])
 
  
    // setEmployees((prev) => {...prev,EMPLOYEE_DETAILS_FOR_UPDATES:editEmployee}))


  const [employees, setEmployees] = useState({
    EMPLOYEE_ID: 1889,
    EMPLOYEE_PARENT_ID: 499,
    EMPLOYEE_PARENT_USERNAME: "vervebot12345",
    EMPLOYEE_MEMBER_PARENT_ID: 493,
    EMPLOYEE_MEMBER_PARENT_USERNAME: "deepak2096",
    EMPLOYEE_DETAILS_FOR_UPDATES: {...editEmployee} 
});

console.log(employees,"alll")
console.log(editEmployee,"edit alll")

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const [newdata, setNewdata] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };



  const handleCreate = (e) => {
    setEditEmployee({ ...editEmployee, [e.target.name]: e.target.value });
    console.log("heello world", editEmployee);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://3.84.137.243:5001/update_employee", { employees }, {
        headers,
      })
      .then((response) => {
        console.log("responses:",response)
        if (response.data.operation === "failed") {
          setErrorMsg(response.data.errorMsg);
        } else if (response.data.operation === "successfull") {
          setIsSubmitted(true); // Set the submission status to true after successful submission
          toast.success("Form submitted successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });
          props.update(true);
          setOpen(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    < >
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
                    className="form-control rounded-0"
                    placeholder={editdata.EMPLOYEE_USERNAME}
                    id="inputZip"
                    value={editEmployee.EMPLOYEE_USERNAME}
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
                    className="form-control rounded-0"
                    id="empName"
                    placeholder={editdata.EMPLOYEE_NAME}
                    value={editEmployee.EMPLOYEE_NAME}
                    name="EMPLOYEE_NAME"
                    // onChange={handleCreate}
                    onChange={(event) =>
                      setEditEmployee((prev) => ({
                        ...prev,
                        EMPLOYEE_NAME: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-xl-6 py-1">
                  <label>E-mail</label>
                  <input
                    type="email"
                    className="form-control rounded-0"
                    id="email"
                    placeholder="Enter Email add..."
                    value={editEmployee.EMPLOYEE_EMAIL}
                    name="EMPLOYEE_EMAIL"
                    onChange={handleCreate}
                    required
                  />
                </div>
                <div className="form-group col-xl-6 py-1">
                  <label>State</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="phone"
                    placeholder="Enter Your state.."
                    value={editEmployee.EMPLOYEE_STATE}
                    name="EMPLOYEE_STATE"
                    onChange={handleCreate}
                    required
                  />
                </div>{" "}
                <div className="form-group col-xl-6 py-1">
                  <label>Phone</label>
                  <input
                    type="number"
                    className="form-control rounded-0"
                    id="phone"
                    placeholder="Enter Your Number"
                    value={editEmployee.EMPLOYEE_PHONE}
                    name="EMPLOYEE_PHONE"
                    onChange={handleCreate}
                    required
                  />
                </div>
                <div className="form-group col-xl-6 py-1">
                  <label>Employee Password</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Enter Employee password"
                    value={editEmployee.EMPLOYEE_PASSWORD}
                    name="EMPLOYEE_PASSWORD"
                    onChange={handleCreate}
                    required
                  />
                </div>
                <div className="form-group col-xl-6 py-1">
                  <label for="inputPassword4">Date Of Birth</label>
                  <input
                    type="date"
                    className="form-control rounded-0"
                    id="inputPassword4"
                    placeholder="Enter Date of birth"
                    value={editEmployee.EMPLOYEE_DOB}
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
                      className="form-control rounded-0"
                      id="inputAddress"
                      placeholder="Enter Address"
                      value={editEmployee.EMPLOYEE_ADD}
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
                    className="form-control rounded-0"
                    id="city"
                    placeholder="Enter Your city.."
                    value={editEmployee.EMPLOYEE_CITY}
                    name="EMPLOYEE_CITY"
                    onChange={handleCreate}
                    required
                  />
                </div>
                <div className="form-group col-xl-4 py-1">
                  <label>Hourly wages</label>
                  <input
                    type="number"
                    className="form-control rounded-0"
                    id="hourlywage"
                    placeholder="Enter your Hourly wages"
                    value={editEmployee.EMPLOYEE_HOURLY_WAGE}
                    name="EMPLOYEE_HOURLY_WAGE"
                    onChange={handleCreate}
                    required
                  />
                </div>
                <div className="form-group col-xl-4 py-1">
                  <label for="inputPassword4">Employee Role</label>
                  <select
                    id="inputqual"
                    className="form-control rounded-0 border"
                    value={editEmployee.EMPLOYEE_ROLE}
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
                    className="form-control rounded-0 border"
                    value={editEmployee.EMPLOYEE_EMPLMNTTYPE}
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
                    className="form-control rounded-0"
                    id="inputPassword4"
                    placeholder="Enter hire date"
                    value={editEmployee.EMPLOYEE_HIRE_DATE}
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
                    Update
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
