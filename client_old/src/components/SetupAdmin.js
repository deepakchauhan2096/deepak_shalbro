import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InputControl from "./InputControl";
import { auth } from "../firebase.mjs";

import styles from "../assests/css/Signup.module.css";

function Signup() {
  const [userName, setUserName] = useState("");
  const [values, setValues] = useState({
    ADMIN_USERNAME: ''
  });


  // Your custom API request
  const headers = {
    'Content-Type': 'application/json',
    authorization_key: 'qzOUsBmZFgMDlwGtrgYypxUz',
  };


  const handleSubmission = async () => {

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: '/api/get_admin',
      headers: {
        'authorization_key': 'qzOUsBmZFgMDlwGtrgYypxUz',
        'Content-Type': 'application/json'
      },
      data: values
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleSubmission()
  }, [])



  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>

        {/* <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_USERNAME: event.target.value }))
          }
        /> */}

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

export default Signup;