import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from "axios";
import InputControl from "../components/InputControl";
import { auth } from "../firebase";
import styles from "../assests/css/Signup.module.css";
import env from "react-dotenv";

function AdminCreate() {
  const navigate = useNavigate();
  
  const [values, setValues] = useState({
    ADMIN_PASSWORD: "",
    ADMIN_NAME: "",
    ADMIN_PHONE: "",
    ADMIN_EMAIL: "",
    ADMIN_USERNAME: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleSubmission = () => {
    if (!values.ADMIN_NAME || !values.ADMIN_EMAIL || !values.ADMIN_PASSWORD) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.ADMIN_EMAIL, values.ADMIN_PASSWORD)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.ADMIN_USERNAME,
        });
        handleSubmit();
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    axios
      .post("/api/create_admin", values, {
        headers,
      })
      .then((response) => {
        // navigate("/dashboard");
        alert("successfully sign up")
      })
      .catch((error) => {
        console.error(error);
      });
    // handleClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>
          Signup<sup style={{ fontSize: "20px", color: "tomato" }}>Admin</sup>
        </h1>

        <InputControl
          label="User Name"
          placeholder="Enter your username"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_USERNAME: event.target.value }))
          }
        />
        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_NAME: event.target.value }))
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
          label="Phone"
          type="number"
          placeholder="Enter phone"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_PHONE: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_PASSWORD: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
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

export default AdminCreate;