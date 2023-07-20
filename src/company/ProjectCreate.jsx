import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import pluslogo from "../assests/images/plus.png";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MyContext } from "./Mycontext";
import country from "../Api/countriess.json"
// import states from "../Api/states.json"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
  const [resError, setResError] = useState();
  const [errors, setErrors] = useState({});
  const { text } = React.useContext(MyContext);
  const { setProject } = React.useContext(MyContext);
  const [flag,setFlag] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  console.log(text, "allcontext");

  const [createProject, setCreateProject] = useState({
    PROJECT_PARENT_ID: text?.COMPANY_ID,
    PROJECT_PARENT_USERNAME: text?.COMPANY_USERNAME,
    PROJECT_MEMBER_PARENT_ID: text?.COMPANY_PARENT_ID,
    PROJECT_MEMBER_PARENT_USERNAME: text?.COMPANY_PARENT_USERNAME,
    PROJECT_NAME: "",
    PROJECT_USERNAME: "",
    PROJECT_PHONE: "",
    PROJECT_ADD: "",
    PROJECT_CITY: "",
    PROJECT_START_DATE: "",
    PROJECT_END_DATE: "",
    PROJECT_SUPERVISOR: "",
    PROJECT_EMROLMNT_TYPE: "",
    PROJECT_COUNTRY: "",
    PROJECT_STATE: ""
  });
  const [errorMsg, setErrorMsg] = useState("");


  const availableState = country?.find((c) => c.name === createProject.PROJECT_COUNTRY);
  const availableCities = availableState?.states?.find(
    (s) => s.name === createProject.PROJECT_STATE
  );

  // console.log(availableCities, "cities")

  // Function to validate the form data
  const validateForm = () => {
    const errors = {};
    let hasErrors = false;

    // Check if the required fields are empty and set errors accordingly
    if (!createProject.PROJECT_USERNAME) {
      errors.PROJECT_USERNAME = "Project Username is required";
      hasErrors = true;
    }
    if (!createProject.PROJECT_NAME) {
      errors.PROJECT_NAME = "Project Name is required";
      hasErrors = true;
    }
    if (!createProject.PROJECT_PHONE) {
      errors.PROJECT_PHONE = "Contact is required";
      hasErrors = true;
    }
    if (!createProject.PROJECT_START_DATE) {
      errors.PROJECT_START_DATE = "Project Start Date is required";
      hasErrors = true;
    }
    if (!createProject.PROJECT_END_DATE) {
      errors.PROJECT_END_DATE = "Project End Date is required";
      hasErrors = true;
    }
    if (!createProject.PROJECT_EMROLMNT_TYPE) {
      errors.PROJECT_EMROLMNT_TYPE = "Enrollment is required";
      hasErrors = true;
    }
    if (!createProject.PROJECT_SUPERVISOR) {
      errors.PROJECT_SUPERVISOR = "Supervisor is required";
      hasErrors = true;
    }
    if (!createProject.PROJECT_ADD) {
      errors.PROJECT_ADD = "Address is required";
      hasErrors = true;
    }
    if (!createProject.PROJECT_COUNTRY) {
      errors.PROJECT_COUNTRY = "Country is required";
      hasErrors = true;
    }
    if (!createProject.PROJECT_STATE) {
      errors.PROJECT_STATE = "State is required";
      hasErrors = true;
    }
    if (!createProject.PROJECT_CITY) {
      errors.PROJECT_CITY = "City is required";
      hasErrors = true;
    }

    setErrors(errors); // Save the validation errors to the state
    return !hasErrors; // Return true if there are no errors, else false
  };


  
  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleCreate = (e) => {
    setCreateProject({ ...createProject, [e.target.name]: e.target.value });
    console.log("heello world", createProject);
  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Validate the form data before submission
  //   if (validateForm()) {
  //     axios
  //       .post("http://3.84.137.243:5001/create_project", createProject, {
  //         headers,
  //       })
  //       .then((response) => {
  //         console.log("response of create project", response.data);
  //         setProject(response.data.result);
  //         setOpen(false);
  //       })
  //       .catch((error) => {
  //         console.error(error, "ERR");
  //       });
  //   } else {
  //     // If there are validation errors, set an error message
  //     setErrorMsg("Please fill in all required fields.");
  //   }
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate the form data before submission
    if (validateForm()) {
      axios
        .post("http://3.84.137.243:5001/create_project", createProject, {
          headers,
        })
        .then((response) => {
          console.log("response of create project", response.data);
          setProject(response.data.result);
          setOpen(false);
          setIsSubmitted(true); // Set the submission status to true after successful submission
          toast.success("Form submitted successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((error) => {
          console.error(error, "ERR");
        });
    } else {
      // If there are validation errors, set an error message
      setErrorMsg("Please fill in all required fields.");
    }
  };
  
  




  

  //api create project
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // if (Object.keys(errors).length === 0) {
  //   axios
  //     .post("http://3.84.137.243:5001/create_project", createProject, {
  //       headers,
  //     })
  //     .then((response) => {
  //       console.log("response of create project", response.data);
  //       setProject(response.data.result);
  //       setOpen(false);


  //       // if (response.data.operation === "failed") {
  //       //   setOpen(true);
  //       // } else if (response.data.operation === "successfull") {
  //       //   setOpen(false);
  //       //   setProject(response.data.result);
          

  //       // }
  //     })
  //     .catch((error) => {
  //       console.error(error, "ERR");
  //     });

  //   // }
  // };

  console.log("ind", index);

  //state city api

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ color: "#277099" }}
        className="btn rounded-0 border-0  rounded-0 text-light"
        // variant="outlined"
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
                  className="form-control "
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
                  className="form-control "
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
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
                //required
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group col-xl-6">
                <label>Enrollment</label>
                <select
                  id="inputEnroll"
                  className="form-control "
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
                  className="form-control "
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
                  className="form-control "
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
                  className="form-control"
                  placeholder="Country"
                  name="PROJECT_COUNTRY"
                  value={createProject.PROJECT_COUNTRY}
                  onChange={handleCreate}
                //required
                >
                  <option>--Choose Country--</option>

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
                  className="form-control"
                  placeholder="State"
                  name="PROJECT_STATE"
                  value={createProject.PROJECT_STATE}
                  onChange={handleCreate}
                //required
                >
                  <option>--Choose State--</option>
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
                  className="form-control"
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
            <center>{errorMsg && <p className=" text-danger fw-light mb-0">
              {errorMsg}
            </p>
            }</center>
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
