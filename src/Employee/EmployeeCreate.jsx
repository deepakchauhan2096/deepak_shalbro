import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from "axios";
import InputControl from "../components/InputControl";
import { auth } from "../firebase";

import styles from "../assests/css/Signup.module.css";

function EmployeeCreate(props) {

  const alldata = props?.empData;
  console.log(alldata,"allData")
  const navigate = useNavigate();

  const [values, setValues] = useState({
    EMPLOYEE_PASSWORD: "",
    EMPLOYEE_NAME: "",
    EMPLOYEE_PHONE: "",
    EMPLOYEE_EMAIL: "",
    EMPLOYEE_USERNAME: "",
    EMPLOYEE_EMPLMNTTYPE:"",
    EMPLOYEE_HOURLY_WAGE:"",
    EMPLOYEE_PASSWORD:"",
    EMPLOYEE_HIRE_DATE:"",
    EMPLOYEE_ADD:"",
    EMPLOYEE_DOB:"",
    EMPLOYEE_MEMBER_PARENT_USERNAME: "deepanshu1",
    EMPLOYEE_PARENT_ID: 45,
    EMPLOYEE_PARENT_USERNAME: "company21",
    EMPLOYEE_MEMBER_PARENT_ID: 18,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleSubmission = () => {
    if (
      !values.EMPLOYEE_NAME ||
      !values.EMPLOYEE_EMAIL ||
      !values.EMPLOYEE_PASSWORD
    ) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(
      auth,
      values.EMPLOYEE_EMAIL,
      values.EMPLOYEE_PASSWORD
    )
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.EMPLOYEE_USERNAME,
        });
        handleSubmit();
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  const handleSubmit = (e) => {
    console.log("on btn submit");
    // e.preventDefault();
    axios
      .post("http://54.89.160.62:5001/create_employee", values, {
        headers,
      })
      .then((response) => {
        // navigate("/dashboard");
        alert("successfully sign up");
        console.log("response1 : ", response);
        // props.update(response.data);
        console.log("response", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // handleClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox} style={{width:"60%"}}>
        <form>
          <div className="row">
            <h1 className={styles.heading}>
              Create
              <sup style={{ fontSize: "20px", color: "tomato" }}>EMPLOYEE</sup>
            </h1>
            <div className="form-group col-xl-6">
              <InputControl
                label="User Name"
                placeholder="Enter your username"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    EMPLOYEE_USERNAME: event.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group col-xl-6">
              <InputControl
                label="Name"
                placeholder="Enter your name"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    EMPLOYEE_NAME: event.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group col-xl-6">
              <InputControl
                label="Email"
                placeholder="Enter email address"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    EMPLOYEE_EMAIL: event.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group col-xl-6">
              <InputControl
                label="Phone"
                type="number"
                placeholder="Enter phone"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    EMPLOYEE_PHONE: event.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group col-xl-6">
              <InputControl
                label="Role"
                type="text"
                placeholder="Enter Role"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    EMPLOYEE_ROLE: event.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group col-xl-6">
              <InputControl
                label="Empolyement Type"
                type="text"
                placeholder="Enter Empolyement Type"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    EMPLOYEE_EMPLMNTTYPE: event.target.value,
                  }))
                }
              />
            </div>

            <div className="form-group col-xl-6">
              <InputControl
                label="Hourly Wages"
                type="text"
                placeholder="Enter Wages"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    EMPLOYEE_HOURLY_WAGE: event.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group col-xl-6">
              <InputControl
                label="Date of birth"
                type="date"
                placeholder="Enter date of birth"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    EMPLOYEE_DOB: event.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group col-xl-6">
              <InputControl
                label="Password"
                placeholder="Enter password"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    EMPLOYEE_PASSWORD: event.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group col-xl-6">
              <InputControl
                label="Hire Date"
                placeholder="Enter Hire Date"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    EMPLOYEE_HIRE_DATE: event.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group col-xl-6">
              <InputControl
                label="Address"
                placeholder="Enter Address"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    EMPLOYEE_ADD: event.target.value,
                  }))
                }
              />
            </div>

            <div className={styles.footer}>
              <b className={styles.error}>{errorMsg}</b>
              <button
                onClick={handleSubmission}
                disabled={submitButtonDisabled}
              >
                Create Employee
              </button>
              <p>
                Already have an account?{" "}
                <span>
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeCreate;
