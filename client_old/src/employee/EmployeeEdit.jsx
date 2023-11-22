import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ToastContainer, toast } from "react-toastify";
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

export default function EmployeeEdit(props) {
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const editdata = props?.edit.row
  // console.log("first", editdata)

  const [editEmployee, setEditEmployee] = useState({
    EMPLOYEE_NAME: editdata.EMPLOYEE_NAME,
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
    EMPLOYEE_PASSWORD: editdata.EMPLOYEE_PASSWORD,
    
  });

// console.log(editEmployee,"edit alll")

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
    setEditEmployee((prev) => {
     return { ...prev, [e.target.name]: e.target.value }
    })
     
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("/api/update_employee",  
      {EMPLOYEE_MEMBER_PARENT_USERNAME: editdata.EMPLOYEE_MEMBER_PARENT_USERNAME,
      EMPLOYEE_PARENT_ID: editdata.EMPLOYEE_PARENT_ID,
      EMPLOYEE_PARENT_USERNAME: editdata.EMPLOYEE_PARENT_USERNAME,
      EMPLOYEE_MEMBER_PARENT_ID: editdata.EMPLOYEE_MEMBER_PARENT_ID,
      EMPLOYEE_ID: editdata.EMPLOYEE_ID,
      EMPLOYEE_USERNAME: editdata.EMPLOYEE_USERNAME,
      EMPLOYEE_DETAILS_FOR_UPDATES: {...editEmployee} }
      , {
        headers,
      })
      .then((response) => {
        if (response.data.operation === "failed") {
          setErrorMsg(response.data.errorMsg);
        } else if (response.data.operation === "successfull") {
          setIsSubmitted(true); 
          props.refetch()
          setOpen(false);

          toast.success("Fields are updated successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose:1000
          });
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
        style={{ padding: "2px 2px" ,onFocus:"none"}}
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
          <Box className="modal-content">
            <form onSubmit={handleSubmit} className="overflow-auto">
            <h5>Edit Employee</h5>
              <div className="row py-1">
                <div className="form-group col-xl-6">
                  <label for="inputqual">Employee Username</label>
                  <input
                    type="text"
                    className="form-control form-control-2 rounded-0"
                    placeholder="Edit username"
                    id="inputZip"
                    value={editEmployee.EMPLOYEE_USERNAME}
                    name="EMPLOYEE_USERNAME"
                  
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
                    placeholder="Edit your Name"
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
                    className="form-control form-control-2 rounded-0"
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
                    className="form-control form-control-2 rounded-0"
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
                    className="form-control form-control-2 rounded-0"
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
                    className="form-control form-control-2 rounded-0"
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
                    className="form-control form-control-2 rounded-0"
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
                      className="form-control rounded-0 "
                      id="inputAddress"
                      placeholder="Enter Address"
                      value={editEmployee.EMPLOYEE_ADD}
                      name="EMPLOYEE_ADD"
                      onChange={handleCreate}
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
                    className="form-control form-control-2 rounded-0"
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
                    className="form-control form-control-2 rounded-0 border"
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
                    className="form-control form-control-2 rounded-0 border"
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
                    className="form-control form-control-2 rounded-0"
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
                </div>
                <div className="py-2">

                  <button
                    type="submit"
                    className="btn btn-info text-white "
                    onClick={handleSubmit}
                  >
                    Edit Employee
                  </button>{" "}
                  <button
                    onClick={handleClose}
                    className="btn btn-danger text-white "
                  >
                    Cancel
                  </button>
                </div>
             
            </form>
          </Box>
        </Container>
      </Modal>
    </>
  );
}