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

export default function ProjectCreate(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [index, setIndex] = React.useState(1);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [createProject, setCreateProject] = useState({
    PROJECT_PARENT_ID: props.usernameId.COMPANY_ID,
    PROJECT_PARENT_USERNAME: props.usernameId.COMPANY_USERNAME,
    PROJECT_MEMBER_PARENT_ID: props.usernameId.COMPANY_PARENT_ID,
    PROJECT_MEMBER_PARENT_USERNAME: props.usernameId.COMPANY_PARENT_USERNAME,
    PROJECT_NAME: "",
    PROJECT_USERNAME: "",
    PROJECT_PHONE: "",
    PROJECT_ADD: "",
    PROJECT_CITY: "",
    PROJECT_START_DATE: "",
    PROJECT_END_DATE: "",
    PROJECT_SUPERVISOR: "",
    PROJECT_EMROLMNT_TYPE: "",
  });

  const validationRules = {
    PROJECT_USERNAME: [
      {
        rule: (value) => value.trim() !== "",
        message: "Username is required",
      },
      {
        rule: (value) => value.length >= 6 && value.length <= 10,
        message: "Username length must be between 6 and 10",
      },
      {
        rule: (value) => /^[a-zA-Z0-9]+$/.test(value),
        message: "Username should not contain symbols",
      },
    ],
    PROJECT_NAME: [
      {
        rule: (value) => value.trim() !== "",
        message: "Project Name is required",
      },
      {
        rule: (value) => value.length >= 6 && value.length <= 10,
        message: "Project Name length must be between 6 and 10",
      },
      {
        rule: (value) => /^[a-zA-Z0-9]+$/.test(value),
        message: "Project Name should not contain symbols",
      },
    ],
    PROJECT_PHONE: [
      {
        rule: (value) => value.trim() !== "",
        message: "Phone Number is required",
      },
      {
        rule: (value) => value.length >= 6 && value.length <= 10,
        message: "Phone Number length must be between 6 and 10",
      },
      {
        rule: (value) => /^[a-zA-Z0-9]+$/.test(value),
        message: "Phone Number should not contain symbols",
      },
    ],
    PROJECT_ADD: [
      {
        rule: (value) => value.trim() !== "",
        message: "Address is required",
      },
      {
        rule: (value) => value.length >= 6 && value.length <= 10,
        message: "Address length must be between 6 and 10",
      },
      {
        rule: (value) => /^[a-zA-Z0-9]+$/.test(value),
        message: "Address should not contain symbols",
      },
    ],
  };
  
  // Rest of the code...
  
  const validateField = (fieldName, value) => {
    const rules = validationRules[fieldName];
    const errorMessages = [];
  
    if (rules) {
      rules.forEach((rule) => {
        if (!rule.rule(value)) {
          errorMessages.push(rule.message);
        }
      });
    }
  
    return errorMessages;
  };
  
  const validateValues = (inputValues) => {
    let errors = {};
  
    for (const fieldName in inputValues) {
      const value = inputValues[fieldName];
      const errorMessages = validateField(fieldName, value);
      if (errorMessages.length > 0) {
        errors[fieldName] = errorMessages;
      }
    }
  
    return errors;
  };
  
  // Rest of the code...
  

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleCreate = (e) => {
    setCreateProject({ ...createProject, [e.target.name]: e.target.value });
    console.log("heello world", createProject);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateValues(createProject));
    setSubmitting(true);

    axios
      .post("http://54.89.160.62:5001/create_project", createProject, {
        headers,
      })
      .then((response) => {
        console.log("response1 : ", response);
        console.log("response", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const finishSubmit = () => {
    console.log(createProject);
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
        + Add New Project
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <center>
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
              <div className="form-group col-xl-4">
                <label>Project Username</label>
                <input
                  type="text"
                  className="form-control "
                  id="inputusername"
                  placeholder="Username"
                  value={createProject.PROJECT_USERNAME}
                  name="PROJECT_USERNAME"
                  onChange={handleCreate}
                />
                {errors.PROJECT_USERNAME && (
                  <ul className="error text-danger fw-light">
                    {errors.PROJECT_USERNAME.map((errorMessage) => (
                      <li key={errorMessage}>{errorMessage}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="form-group col-xl-4">
                <label>Project Name</label>
                <input
                  type="text"
                  className="form-control "
                  id="inputname"
                  placeholder="Project Name"
                  value={createProject.PROJECT_NAME}
                  name="PROJECT_NAME"
                  onChange={handleCreate}
                />
                {errors.PROJECT_NAME && (
                  <ul className="error text-danger fw-light">
                    {errors.PROJECT_NAME.map((errorMessage) => (
                      <li key={errorMessage}>{errorMessage}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="form-group col-xl-4">
                <label>Contact</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Enter Phone Number"
                  name="PROJECT_PHONE"
                  value={createProject.PROJECT_PHONE}
                  onChange={handleCreate}
                />
                {errors.PROJECT_PHONE && (
                  <ul className="error text-danger fw-light">
                    {errors.PROJECT_PHONE.map((errorMessage) => (
                      <li key={errorMessage}>{errorMessage}</li>
                    ))}
                  </ul>
                )}
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
                  className="form-control"
                />
                {errors.PROJECT_START_DATE && (
                  <ul className="error text-danger fw-light">
                    {errors.PROJECT_START_DATE.map((errorMessage) => (
                      <li key={errorMessage}>{errorMessage}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="form-group col-xl-6">
                <label>Project End date</label>
                <input
                  type="date"
                  value={createProject.PROJECT_END_DATE}
                  name="PROJECT_END_DATE"
                  onChange={handleCreate}
                  className="form-control"
                />
                {errors.PROJECT_END_DATE && (
                  <ul className="error text-danger fw-light">
                    {errors.PROJECT_END_DATE.map((errorMessage) => (
                      <li key={errorMessage}>{errorMessage}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group col-xl-6">
                <label>Enrollment</label>
                <select
                  id="inputEnroll"
                  className="form-control"
                  onChange={handleCreate}
                  name="PROJECT_EMROLMNT_TYPE"
                  value={createProject.PROJECT_EMROLMNT_TYPE}
                >
                  <option defaultValue>Choose...</option>
                  <option>Painter</option>
                  <option>Fitter</option>
                  <option>Plumber</option>
                  <option>Engineer</option>
                </select>
                {errors.PROJECT_EMROLMNT_TYPE && (
                  <ul className="error text-danger fw-light">
                    {errors.PROJECT_EMROLMNT_TYPE.map((errorMessage) => (
                      <li key={errorMessage}>{errorMessage}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="form-group col-md-6">
                <label>Supervisor</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputsupervisor"
                  name="PROJECT_SUPERVISOR"
                  value={createProject.PROJECT_SUPERVISOR}
                  onChange={handleCreate}
                />
                {errors.PROJECT_SUPERVISOR && (
                  <ul className="error text-danger fw-light">
                    {errors.PROJECT_SUPERVISOR.map((errorMessage) => (
                      <li key={errorMessage}>{errorMessage}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="form-group py-2">
              <label>Address</label>
              <textarea
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                name="PROJECT_ADD"
                value={createProject.PROJECT_ADD}
                onChange={handleCreate}
              />
              {errors.PROJECT_ADD && (
                <ul className="error text-danger fw-light">
                  {errors.PROJECT_ADD.map((errorMessage) => (
                    <li key={errorMessage}>{errorMessage}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="row py-2">
              <div className="form-group col-md-6">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  name="PROJECT_CITY"
                  value={createProject.PROJECT_CITY}
                  onChange={handleCreate}
                />
                {errors.PROJECT_CITY && (
                  <ul className="error text-danger fw-light">
                    {errors.PROJECT_CITY.map((errorMessage) => (
                      <li key={errorMessage}>{errorMessage}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="row py-2">{/* Additional file input fields */}</div>
            <button
              type="submit"
              className="btn btn-info text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>{" "}
            <button onClick={handleClose} className="btn btn-danger text-white">
              Discard
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
