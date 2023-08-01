import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from "axios";
import InputControl from "../components/InputControl";
import { auth } from "../firebase";
import styles from "../assests/css/Signup.module.css";
import env from "react-dotenv";

function AdminCreate() {
  const [values, setValues] = useState({
    ADMIN_PASSWORD: "",
    ADMIN_NAME: "",
    ADMIN_PHONE: "",
    ADMIN_EMAIL: "",
    ADMIN_USERNAME: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const navigate = useNavigate();

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleSubmit = (e) => {
    if (
      !values.ADMIN_NAME ||
      !values.ADMIN_EMAIL ||
      !values.ADMIN_PASSWORD ||
      !values.ADMIN_PHONE ||
      !values.ADMIN_USERNAME
    ) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    axios
      .post(`${env.API_URL}/create_admin`, values, {
        headers,
      })
      .then((response) => {
        setErrorMsg(response.errorMsg);

        if (response.data.operation == "failed") {
          setErrorMsg(response.data.errorMsg);
        } else if (response.data.operation == "successfull") {
          alert("successfully sign up");
          navigate("/login");
        }
      })
      .catch((error) => {
        setErrorMsg("something want wrong");
      });
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
          className="form-control"
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              ADMIN_USERNAME: event.target.value,
            }))
          }
        />
        <InputControl
          label="Name"
          className="form-control"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_NAME: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          className="form-control"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_EMAIL: event.target.value }))
          }
        />
        <InputControl
          label="Phone"
          // type="number"
          className="form-control"
          placeholder="Enter phone"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_PHONE: event.target.value }))
          }
        />
        <InputControl
          type="password"
          label="Password"
          placeholder="Enter password"
          className="form-control"
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              ADMIN_PASSWORD: event.target.value,
            }))
          }
        />

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
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminCreate;
