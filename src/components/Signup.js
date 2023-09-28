import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from "axios";
import InputControl from "./InputControl";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";

import styles from "../assests/css/Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    pass: '',
    // Add your other fields here for the custom API request
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSubmission = async () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg('Fill all fields');
      return;
    }
    setErrorMsg('');

    setSubmitButtonDisabled(true);
    setLoader(true);

    try {
      // Firebase Signup
      const firebaseUser = await createUserWithEmailAndPassword(auth, values.email, values.pass);

      // Update Firebase user profile
      await updateProfile(firebaseUser.user, {
        displayName: values.name,
      });

      // Your custom API request
      const headers = {
        'Content-Type': 'application/json',
        authorization_key: 'qzOUsBmZFgMDlwGtrgYypxUz',
      };

      const customAPIResponse = await axios.post('/api/data/create_admin', values, {
        headers,
      });

      if (customAPIResponse.data.operation === 'successfull') {
        toast.success('Congratulations.. You Registered successfully!!!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1200,
        });
        console.log(customAPIResponse.data,"customAPIResponse.data")
        // navigate('/login');
      } else {
        setErrorMsg(customAPIResponse.data.errorMsg);
      }
    } catch (error) {
      setErrorMsg('Something went wrong');
    } finally {
      setSubmitButtonDisabled(false);
      setLoader(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
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

export default Signup;
