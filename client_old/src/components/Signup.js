import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputControl from "./InputControl";
import styles from "../assests/css/Signup.module.css";
import SimpleBackdrop from "./Backdrop"; // Replace "../components/Backdrop" with the correct path to the file containing the MUI backdrop component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  validateEmail,
  validatePassword
} from "./Validation";


function AdminCreate() {
  const [values, setValues] = useState({
    ADMIN_PASSWORD: "",
    ADMIN_EMAIL: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [loader, setLoader] = useState(false); // Initialize to false
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear previous validation errors
    setEmailError("");
    setPasswordError("");
    setErrorMsg("");

    // Validate phone number, username, and email fields
    const isValidEmail = validateEmail(values.ADMIN_USERNAME);
    const isValidPassword = validatePassword(values.ADMIN_PASSWORD);

    if (!isValidEmail) {
      setEmailError("Invalid email address");
      return;
    }

    if (!isValidPassword) {
      setPasswordError("Your password must be at least 8 characters including a lowercase letter, an uppercase letter, and a number");
      return;
    }



    setLoader(true); // Show the backdrop when the signup button is clicked

    axios
      .post("/api/create_admin", values, {
        headers,
      })
      .then((response) => {
        setErrorMsg(response.errorMsg);

        if (response.data.operation === "failed") {
          setErrorMsg(response.data.errorMsg);
          setLoader(false); // Hide the backdrop on signup failure
        } else if (response.data.operation === "successfull") {
          toast.success("Congratulations.. You Ragistered successfully!!!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1200,
          });
          navigate("/root");
          setLoader(false); // Hide the backdrop on successful signup
        }
      })
      .catch((error) => {
        setErrorMsg("something went wrong");
        setLoader(false); // Hide the backdrop on signup failure
      });
  };

  console.log(emailError,"emailerror")

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}> </h1>
        <h5 className={styles.heading}>Shalbro Constructions</h5>
        <h5 className="text-center">Create an account(root)</h5>


        {/* <InputControl
          label="User Name"
          placeholder="Enter your username"
          className="form-control form-control-2"
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              ADMIN_USERNAME: event.target.value,
            }))
          }
        /> */}
        <InputControl
          type="Email"
          label="Email"
          className={`form-control form-control-2 rounded-0 ${emailError ? "is-invalid" : ""
            }`}
          placeholder="Enter root Email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_EMAIL: event.target.value }))
          }
        />
        {emailError && (
          <p className="text-danger">{emailError}</p>
        )}

        <InputControl
          type="password"
          label="Password"
          placeholder="Enter root password"
          className={`form-control form-control-2 rounded-0 ${passwordError ? "is-invalid" : ""
            }`}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              ADMIN_PASSWORD: event.target.value,
            }))
          }
        />
        {passwordError && (
          <small className="text-danger">{passwordError}</small>
        )}

        <div className={styles.footer}>
          <center>
            <p className=" text-danger fw-light mb-0">{errorMsg}</p>
          </center>
          <button onClick={handleSubmit} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/root">Login</Link>
            </span>
          </p>
        </div>
      </div>

      {/* Add the backdrop component here */}
      <SimpleBackdrop open={loader} />
    </div>
  );
}

export default AdminCreate;