import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import InputControl from "../components/InputControl";
import styles from "../assests/css/Login.module.css";
import SimpleBackdrop from "../components/Backdrop";
import { useContext } from "react";
import { MyContext } from "../context/Mycontext";
import Cookies from "js-cookie";
import { Alert, Stack } from "@mui/material";
import { validateEmail, validatePassword } from "../components/Validation";
import Logincomp from "../components/Logincomp";
import EmployeeLogin from "../employee/EmployeeLogin"

function AdminLogin({ onDataFetched }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    ADMIN_USERNAME: "",
    ADMIN_PASSWORD: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showpassword, setShowpassword] = useState(true)
  const [emailError, setEmailError] = useState("");
  const [empty, setEmpty] = useState("");
  const { auth, setAuth } = useContext(MyContext);
  const [activeButton, setActiveButton] = useState('Left');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleSubmission = (e) => {
    e.preventDefault();

    // Clear previous validation errors
    setErrorMsg("");
    setEmpty("");
    setPasswordError("");
    setEmailError("")



    // Validate phone number, username, and email fields
    if (!values.ADMIN_USERNAME || !values.ADMIN_PASSWORD) {
      setEmpty("Fill all fields");
      return;
    }


    //validate
    // const isValidEmail = validateEmail(values.ADMIN_USERNAME);
    const isValidEmail = validateEmail(values.ADMIN_USERNAME);
    const isValidPassword = validatePassword(values.ADMIN_PASSWORD);


    if (!isValidEmail) {
      setEmailError("Invalid Email");
      return;
    }


    // if (!isValidPassword) {
    //   setPasswordError("Invalid Password");
    //   return;
    // }



    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/login",
      data: values,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(response.data, "mylogin");
        setIsSubmitting(false);
        // setLoginSuccess(true);
        const data = response.data;
        navigate("/admin", { state: data.user })
      })
      .catch((error) => {
        if (error.response.status == 403) {
          setErrorMsg(error.response.data.error);
        } else if (error.response.status == 404) {
          setErrorMsg(error.response.data.error);
        } else if (error.response.status == 401) {
          setErrorMsg(error.response.data.error);
        }
        else {
          setPasswordError("Network")
        }
        setIsSubmitting(false);
        console.log("Network")
      });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerBox}>
          <h5 className={styles.heading}>Shalbro Constructions</h5>
          <h5 className="text-center">Login(root)</h5>



          <InputControl
            label="Email"
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                ADMIN_USERNAME: event.target.value,
              }))
            }
            placeholder="Enter Username"
          />
          {emailError && (
            <>
              <Stack sx={{ width: '100%' }} spacing={2} pt={1}>
                <Alert severity="error">{emailError}</Alert>
              </Stack>
            </>

          )}

          <div style={{ position: "relative" }}>
            <InputControl
              label="Password"
              type={showpassword ? "password" : "text"}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  ADMIN_PASSWORD: event.target.value,
                }))
              }
              placeholder="Enter Password"

            />
            <span style={{ position: "absolute", right: "10px", top: "50%" }}><i className="fa fa-eye" onClick={() => setShowpassword(e => !e)}></i></span>
          </div>

          {errorMsg && (
            <>
              <Stack sx={{ width: '100%' }} spacing={2} pt={1}>
                <Alert severity="error">{errorMsg}</Alert>
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

          <div className={styles.footer}>
            <button className="b-0" disabled={isSubmitting} onClick={handleSubmission}>
              Login
            </button>
            <p>
              Already have an account?{" "}
              <span>
                <Link to="/signup">Sign up</Link>
              </span>
            </p>
          </div>


        </div>

        {/* Add the MUI backdrop component here */}
        <SimpleBackdrop open={isSubmitting} />
      </div>
    </>
  );
}

export default AdminLogin;
