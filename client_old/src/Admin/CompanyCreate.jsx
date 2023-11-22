import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Button, Container, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import country from "../Api/countriess.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleBackdrop from "../components/Backdrop";
import { auth } from "../firebase.mjs";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import companytype from "../jsonlist/typeOfCompany.json";
import {
  validateEmail,
  validatePhoneNumber,
} from "../components/Validation";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  borderRadius: 2,
  overflow: "hidden",
};

export default function CompanyCreate(props) {
  console.log(props, "cprops")
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errorMsg, setErrorMsg] = useState("");



  const [create_company, setCreate_company] = useState({
    COMPANY_NAME: "",
    COMPANY_USERNAME: "",
    COMPANY_PHONE: "",
    COMPANY_ROLE: "",
    COMPANY_ADD2: "",
    COMPANY_STATE: "",
    COMPANY_CITY: "",
    COMPANY_COUNTRY: "",
    COMPANY_SUBSCRIPTION: "",
    COMPANY_STATUS: "",
  });
  // const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [companyphoneError, setCompanyPhoneError] = useState("");
  const [companynameError, setCompanynameError] = useState("");
  // const [emailExists, setEmailExists] = useState("");





  const handleCreate = (e) => {
    setCreate_company({ ...create_company, [e.target.name]: e.target.value });
  };

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  // Finding the states and cities of the individaul country

  const availableState = country?.find(
    (c) => c.name === create_company.COMPANY_COUNTRY
  );

  const availableCities = availableState?.states?.find((s) => {
    return s.name === create_company.COMPANY_STATE;
  });

  const list = companytype;
  console.log("hbbbdf", create_company);




  // Assuming you have initialized 'auth' properly.

  const handleSubmit = (e) => {
    // Prevent form submission
    e.preventDefault();

    // Clear previous validation errors
    // setUsernameError("");
    setCompanynameError("");
    setCompanyPhoneError("");
    setEmailError("");
    setErrorMsg("");

    // Validate phone number, username, and email fields
    // const isValidUsername = create_company.COMPANY_USERNAME !== "";
    const isValidCompanyname = create_company.COMPANY_NAME !== "";
    const isValidPhone = validatePhoneNumber(create_company.COMPANY_PHONE);
    const isValidEmail = validateEmail(create_company.COMPANY_USERNAME);

    if (!isValidCompanyname) {
      setCompanynameError("Name should not be empty");
      return;
    }
    // if (!isValidUsername) {
    //     setUsernameError("Invalid username");
    //     return;
    // }

    if (!isValidPhone) {
      setCompanyPhoneError("Invalid phone number or field should not be empty");
      return;
    }

    if (!isValidEmail) {
      setEmailError("Invalid email address");
      return;
    }

    // Call the handleCheckEmail function and pass a callback function to handle the API response
    // handleCheckEmail(create_company.COMPANY_EMAIL, (emailExists) => {

    //   console.log(emailExists, "emailExists")
    //     if (!emailExists) {
    //         setEmailError("Email already exist");
    //         return;
    //     }

    // Perform API validation and request
    axios
      .post(`/api/create_company`, {
        COMPANY_PARENT_ID: props?.ADMIN_ID,
        COMPANY_PARENT_USERNAME: props?.ADMIN_USERNAME,
        ...create_company
      }, {
        headers,
      })
      .then((response) => {
        if (response.data.operation === "failed") {
          setErrorMsg(response.data.errorMsg );
          setEmailError(response.data.errorMsg ? "Email already exist" : "")
          // toast.error(response.data.errorMsg, {
          //   position: toast.POSITION.TOP_CENTER,
          //   autoClose: 2000,
          // });
        } else if (response.data.operation === "successfull") {
          toast.success("Company Created successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
          props.Update(() => response.data.result);
          setOpen(false);
        }
      })
      .catch((error) => {
        console.error(error, "ERR");
        toast.error("An error occurred. Please try again later.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
    // });
  };

  // const handleCheckEmail = (email, callback) => {
  //     fetchSignInMethodsForEmail(auth, email)
  //         .then((methods) => {
  //             if (methods.length > 0) {
  //                 // Email exists
  //                 callback(false);
  //             } else {
  //                 // Email does not exist
  //                 callback(true);
  //             }
  //         })
  //         .catch((error) => {
  //             // Handle any errors
  //             console.error('Error checking email:', error);
  //         });
  // };


  // console.log(emailExists,  "emailError")



  return (
    <>
      <button
        onClick={handleOpen}
        className="btn btn-primary btn-sm my-2"
        style={{ width: "fit-content" }}
      >
        <AddIcon /> Add Company
      </button>

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
            <form className="p-4 overflow-auto">
              <h5>Create company</h5>
              <div className="row">
                <div className="form-group py-2 col-xl-6">
                  <label>Company name</label>
                  <input
                    type="text"
                    className={`form-control form-control-2 rounded-0 ${companynameError ? "is-invalid" : ""
                      }`}
                    placeholder="Enter company name"
                    value={create_company.COMPANY_NAME}
                    name="COMPANY_NAME"
                    onChange={handleCreate}
                    label=""
                  />
                  {companynameError && (
                    <div className="invalid-feedback">{companynameError}</div>
                  )}
                </div>
                {/* Username */}
                <div className="form-group py-2 col-xl-6">
                  <label>Company Email</label>
                  <input
                    type="text"
                    className={`form-control form-control-2 rounded-0 ${emailError ? "is-invalid" : ""
                      }`}
                    placeholder="Email address"
                    value={create_company.COMPANY_USERNAME}
                    name="COMPANY_USERNAME"
                    onChange={handleCreate}
                    label="Company Email"
                  />
                  {/* {usernameError && (
                    <div className="invalid-feedback">{usernameError}</div>
                  )} */}
                  {emailError && (
                    <div className="invalid-feedback">{emailError}</div>
                  )}
                </div>
              </div>
              <div className="row">
                {/* Phone Number */}
                <div className="form-group py-2 col-xl-6">
                  <label>Phone Number</label>
                  <input
                    type="number"
                    className={`form-control form-control-2 rounded-0 ${companyphoneError ? "is-invalid" : ""
                      }`}
                    placeholder="Enter Number"
                    value={create_company.COMPANY_PHONE}
                    name="COMPANY_PHONE"
                    onChange={handleCreate}
                    label="Phone Number"
                  />
                  {companyphoneError && (
                    <div className="invalid-feedback">{companyphoneError}</div>
                  )}

                </div>

                {/* Email */}
                {/* <div className="form-group py-2 col-xl-6">
                  <label>Company Email</label>
                  <input
                    type="text"
                    className={`form-control form-control-2 rounded-0 ${emailError ? "is-invalid" : ""
                      }`}
                    placeholder="Enter company email"
                    name="COMPANY_EMAIL"
                    value={create_company.COMPANY_EMAIL}
                    onChange={handleCreate}
                    label="Company Email"
                  />
                  {emailError && (
                    <div className="invalid-feedback">{emailError}</div>
                  )}
                  {emailExists && (
                    <div className="invalid-feedback">{emailExists}</div>
                  )}
                </div> */}
              </div>
              <div className="row py-2">
                <div className="form-group col-xl-4">
                  <label>Company Type</label>
                  <select
                    className="form-control form-control-2 border  rounded-0"
                    name="COMPANY_ROLE"
                    value={create_company.COMPANY_ROLE}
                    onChange={handleCreate}
                  >
                    <option selected>Choose...</option>

                    {list.map((e, key) => {
                      return (
                        <option value={e} key={key}>
                          {e}
                        </option>
                      );
                    })}
                  </select>
                </div>


                <div className="form-group col-xl-4">
                  <label>Subscription Type</label>
                  <select
                    className="form-control form-control-2 border rounded-0"
                    name="COMPANY_SUBSCRIPTION"
                    value={create_company.COMPANY_SUBSCRIPTION}
                    onChange={handleCreate}
                  >
                    <option selected>--Select Subscription--</option>
                    <option selected>Monthly</option>
                    <option selected> Annual</option>
                  </select>
                </div>

                <div className="form-group col-xl-4">
                  <label>Company Status</label>
                  <select
                    className="form-control form-control-2 border rounded-0"
                    name="COMPANY_STATUS"
                    value={create_company.COMPANY_STATUS}
                    onChange={handleCreate}
                  >
                    <option selected>--Select Status--</option>
                    <option selected>Active</option>
                    <option selected> Inactive</option>
                  </select>
                </div>
              </div>


              <div className="row py-2">
                <div className="form-group col-xl-4">
                  <label>Country</label>
                  <select
                    className="form-control form-control-2 border  rounded-0"
                    name="COMPANY_COUNTRY"
                    value={create_company.COMPANY_COUNTRY}
                    onChange={handleCreate}
                  >
                    <option selected>--Choose Country--</option>

                    {country.map((e, key) => {
                      return (
                        <option value={e.name} key={key}>
                          {e.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group col-xl-4">
                  <label>State</label>
                  <select
                    className="form-control form-control-2 border  rounded-0"
                    name="COMPANY_STATE"
                    value={create_company.COMPANY_STATE}
                    onChange={handleCreate}
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
                    className="form-control form-control-2 border rounded-0"
                    name="COMPANY_CITY"
                    value={create_company.COMPANY_CITY}
                    onChange={handleCreate}
                  >
                    <option selected>--Choose City--</option>
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
              <div className="row py-2">
                <div className="form-group col-xl-12">
                  <label>Address</label>
                  <textarea
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Apartment, studio, or floor"
                    name="COMPANY_ADD2"
                    value={create_company.COMPANY_ADD2}
                    onChange={handleCreate}
                    rows="3"
                    cols="50"
                  />
                </div>
              </div>
              <Button
                type="submit"
                variant="contained"
                className="btn text-white rounded-2 mt-2"
                onClick={handleSubmit}
              >
                Submit
              </Button>{" "}
              <Button
                variant="contained"
                color="error"
                onClick={handleClose}
                className="btn text-white rounded-2 mt-2"
              >
                Cancel
              </Button>
              {/* <center>
              {errorMsg && (
                <p className=" text-danger fw-light mb-0 fs-6">{errorMsg}</p>
              )}
            </center> */}
            </form>
          </Box>
        </Container>
      </Modal>

      <SimpleBackdrop open={loader} />
    </>
  );
}