import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from "axios";
import InputControl from "../components/InputControl";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import styles from "../assests/css/Signup.module.css";
import {
  validateUsername,
} from "../components/Validation";

function Signup() {


  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Initialize to false
  const [values, setValues] = useState({
    ADMIN_USERNAME: "",
    ADMIN_EMAIL: "",
    ADMIN_PASSWORD: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);


  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleSubmission = () => {
    if (!values.ADMIN_USERNAME || !values.ADMIN_EMAIL || !values.ADMIN_PASSWORD) {
      setErrorMsg("Please fill all fields");
      return;
    }
    setErrorMsg("");
    setLoading(true)
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.ADMIN_EMAIL, values.ADMIN_PASSWORD)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.ADMIN_USERNAME
        })
        setLoading(false)
        navigate("/login");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
        setLoading(false)
      });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidUsername = validateUsername(values.ADMIN_USERNAME);

    if (
      !values.ADMIN_USERNAME
    ) {
      setErrorMsg("Please fill all fields");
      return;
    }
   

    if (!isValidUsername) {
      setErrorMsg("Invalid username");
      return;
    }



    setErrorMsg("");

    axios
      .post("/check_user", values, {
        headers,
      })
      .then((response) => {


        if (response.data.operation === "failed") {
          setErrorMsg(response.data.errorMsg);
          // console.log(response,"response")
        }

        else {
          setErrorMsg("valid username");
          handleSubmission()
        }

      })
      .catch((error) => {
        setErrorMsg("something went wrong");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h5 className={styles.heading}>Shalbro Constructions</h5>
        <h5 className="text-center">Create an account(Admin)</h5>

        <InputControl
          label="Username"
          placeholder="Enter your Username"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_USERNAME: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_EMAIL: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          type="password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_PASSWORD: event.target.value }))
          }
        />

        <div className={styles.footer}>
          {/* <b className={styles.error}>{errorMsg}</b> */}
          {errorMsg === "valid username" ? <small className={styles.success}>{errorMsg}</small> : <b className={styles.error}>{errorMsg}</b>}
          <button onClick={handleSubmit} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;