import React, { useState, useEffect } from 'react'
import { auth } from "../firebase.mjs"
import { createUserWithEmailAndPassword, updateProfile, updatePassword, fetchSignInMethodsForEmail } from "firebase/auth";
import firebase from 'firebase/app';
import InputControl from "../components/InputControl";

const GenPassword = (data) => {

  

  const [edit, setEdit] = useState(true)
  const [values, setValues] = useState({
    name: `${data?.EMPLOYEE_ID}&&${data?.EMPLOYEE_USERNAME}&&${data?.ADMIN_ID}&&${data?.ADMIN_USERNAME}&&employee`,
    email: data?.EMPLOYEE_USERNAME,
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [userExist, setUserExist] = useState(false)

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        setErrorMsg("password generated successfully");
        // navigate("/dashboard");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  const updatePass = (e, newPassword) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      updatePassword(user, newPassword)
        .then(() => {
          // Password updated successfully
          // console.log('Password updated successfully');
          setErrorMsg('Password updated successfully');
        })
        .catch((error) => {
          // Handle error
          // console.error('Error updating password:', error);
          setErrorMsg('Error updating password:', error);

        });
    } else {
      console.error('No user is signed in');
    }
  };


  useEffect(() => {
    const checkUserExists = () => {
      fetchSignInMethodsForEmail(auth, values.email)
        .then((signInMethods) => {
          if (signInMethods.length > 0) {
            // User exists
            console.log('User exists');
            setUserExist(true)
          } else {
            // User does not exist
            console.log('User does not exist');
            setUserExist(false)
          }
        })
        .catch((error) => {
          // Handle error
          console.error('Error checking user existence:', error);
        });
    };
    checkUserExists()
  }, [values.email])




  console.log(values, "datainside")
  return (
    <>



      <tr>
        <td colSpan={2}>
          <b> {errorMsg && (
            <p className=" text-danger fw-light mb-0 fs-6">{errorMsg}</p>
          )}</b>
        </td>
      </tr>


      <tr>
        <td><b>Password :</b></td>
        {!userExist ? <td className="d-flex" style={{ gap: 4 }}>
          {!edit ? <><InputControl
            className="form-control-2"
            placeholder="Enter password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
          /><button className="btn btn-sm btn-primary" onClick={handleSubmission} disabled={submitButtonDisabled}>
              Generate Credential
            </button></> : <InputControl
            className="form-control-2"
            value={"*******"}

            disabled
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
          />}{edit ? <button className="btn btn-sm btn-secondary" onClick={() => setEdit(false)}>
            Edit
          </button> : <button className="btn btn-sm btn-success" onClick={() => setEdit(true)}>
            Save
          </button>}

        </td> :
          <td>
            <div style={{ display: "flex", gap: 3 }}>
              {!edit ?
                <>
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    className='form-control-2 form-control'
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button onClick={updatePass} type="submit" className='btn btn-sm btn-success text-nowrap'>Update Password</button>
                </>
                : <InputControl
                  className="form-control-2"
                  value={"*******"}

                  disabled
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, pass: event.target.value }))
                  }
                />}{edit ? <button className="btn btn-sm btn-secondary" onClick={() => setEdit(false)}>
                  Edit
                </button> : <button className="btn btn-sm btn-success" onClick={() => setEdit(true)}>
                  Save
                </button>}
            </div>
          </td>}
      </tr>
      <tr>
        <td><b>Subscription :</b></td>
        {edit ? <td>Basic</td> :
          <>
            <td className="d-flex" style={{ gap: 4 }}>
              <input type="radio" id="Basic" name="fav_language" value="Basic" />
              <label for="Basic">Basic</label><br />
              <input type="radio" id="Silver" name="fav_language" value="Silver" />
              <label for="Silver">Silver</label><br />
              <input type="radio" id="gold" name="fav_language" value="Gold" />
              <label for="gold">Gold</label>
            </td>
          </>

        }
      </tr>
    </>

  )
}
export default GenPassword