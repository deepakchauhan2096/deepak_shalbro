import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import InputControl from "../components/InputControl";
import styles from "../assests/css/Login.module.css";
import env from "react-dotenv";

function EmployeeLogin() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    ADMIN_USERNAME: "",
    EMPLOYEE_PASSWORD: "",
    EMPLOYEE_ID: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    console.log("enter", values)
    if (!values.ADMIN_USERNAME || !values.EMPLOYEE_PASSWORD || !values.EMPLOYEE_ID) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    // setSubmitButtonDisabled(true);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://18.211.130.168:5001/emplogin",
      headers: {
        authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
        "Content-Type": "application/json",
      },
      data: values,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data, "mylogin ll");
        // setSubmitButtonDisabled(false);
        const data = response.data
        if(data.operation === "successfull"){
        navigate("/employee",  { state: { data } });
        }
      })
      .catch((error) => {
        console.log(error, "errors");
        setErrorMsg(error.response.data.error);
        // setSubmitButtonDisabled(true);
      });
  };



  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login<sup style={{ fontSize: "20px", color: "tomato" }}>Employee</sup></h1>

        <InputControl
          label="Admin Username"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_USERNAME: event.target.value }))
          }
          placeholder="Enter Admin Username"
        />
        <InputControl
          label="Employee ID"
          type="number"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, EMPLOYEE_ID: event.target.value }))
          }
          placeholder="Enter Employee ID"
        />
        <InputControl
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, EMPLOYEE_PASSWORD: event.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
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
    </div>
  );
}

export default EmployeeLogin;
