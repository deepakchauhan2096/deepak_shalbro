import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputControl from "../components/InputControl";
import styles from "../assests/css/Signup.module.css";
import SimpleBackdrop from "../components/Backdrop"; // Replace "../components/Backdrop" with the correct path to the file containing the MUI backdrop component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  validateEmail,
  validatePassword
} from "../components/Validation";
import { Alert, Stack } from "@mui/material";


function AdminCreate() {
  const [values, setValues] = useState({
    ADMIN_PASSWORD: "",
    ADMIN_USERNAME: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [loader, setLoader] = useState(false); // Initialize to false
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [empty, setEmpty] = useState("");
  const [showpassword, setShowpassword] = useState(true)
  // const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();



    // Clear previous validation errors
    setSuccessMsg("")
    setErrorMsg("");
    setEmailError("");
    setPasswordError("");
    setErrorMsg("");
    setEmpty("")

    // Validate phone number, username, and email fields
    if (!values.ADMIN_USERNAME || !values.ADMIN_PASSWORD) {
      setEmpty("Fill all fields");
      return;
    }

    //validate
    const isValidEmail = validateEmail(values.ADMIN_USERNAME);
    const isValidPassword = validatePassword(values.ADMIN_PASSWORD);

    if (!isValidEmail) {
      setEmailError("Invalid Email");
      return;
    }

    if (!isValidPassword) {
      setPasswordError("Your password must be at least 8 characters including a lowercase letter, an uppercase letter, an spacial char. , and a number");
      return;
    }



    // setLoader(true); // Show the backdrop when the signup button is clicked

    axios
      .post("/api/create_admin", values)
      .then((response) => {
        if (response.data.operation === "successfull") {
          setSuccessMsg("Congratulations.. You Registered successfully!!!")
          setSubmitButtonDisabled(true)
          setLoader(false);


          // Hide the backdrop on successful signup

        } else {
          setErrorMsg("failed to registered");
        }
      })
      .catch((error) => {
        if (error.response.status == 400) {
          setErrorMsg(error.response.data?.error)
        } else (
          setErrorMsg("Network Error")
        )
        setLoader(false)
      });
  };

  // console.log(emailError, "emailerror")

  return (

    <div className={styles.container}>

      <div className={styles.innerBox}>

        <h1 className={styles.heading}> </h1>
        <h5 className={styles.heading}>Shalbro Constructions</h5>
        <h5 className="text-center">Create an account(root)</h5>
        {/* <form> */}
        <InputControl
          type="text"
          label="Email"
          className={`form-control rounded-0 ${emailError ? "is-invalid" : ""
            }`}
          placeholder="Enter Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_USERNAME: event.target.value }))
          }
        />
        <div style={{ position: "relative" }}>
          <InputControl
            label="Password"
            type={showpassword ? "password" : "text"}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, ADMIN_PASSWORD: event.target.value }))
            }
            placeholder="Enter Password"
          />
          <span style={{ position: "absolute", right: "10px", top: "50%" }}>
            <i className={showpassword ? "fa fa-eye-slash" : "fa fa-eye"} onClick={() => setShowpassword(e => !e)}></i></span>
        </div>
        {passwordError && (
          <>
            <Stack sx={{ width: '100%' }} spacing={2} pt={1}>
              <Alert severity="error">{passwordError}</Alert>
            </Stack>
          </>

        )}
        {successMsg && (
          <>
            <Stack sx={{ width: '100%' }} spacing={2} pt={1}>
              <Alert >{successMsg}</Alert>
            </Stack>
          </>
        )}
        {empty && (
          <>
            <Stack sx={{ width: '100%' }} spacing={2} pt={1}>
              <Alert severity="error">{empty}</Alert>
            </Stack>
          </>

        )}

        {emailError && (
          <>
            <Stack sx={{ width: '100%' }} spacing={2} pt={1}>
              <Alert severity="error">{emailError}</Alert>
            </Stack>
          </>

        )}
        {errorMsg && (
          <>
            <Stack sx={{ width: '100%' }} spacing={2} pt={1}>
              <Alert severity="error">{errorMsg}</Alert>
            </Stack>
          </>

        )}


        <div className={styles.footer} style={{ paddingTop: "7px" }}>
          <button onClick={handleSubmit} disabled={submitButtonDisabled}  >
            Sign up
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/root">Login</Link>
            </span>
          </p>
        </div>
        {/* </form> */}

      </div>


      {/* Add the backdrop component here */}
      <SimpleBackdrop open={loader} />
    </div>
  );
}

export default AdminCreate;

