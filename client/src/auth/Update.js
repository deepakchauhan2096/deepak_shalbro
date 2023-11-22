import { useState } from 'react';
import { getAuth,fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../firebase"; // Ensure that the auth instance is correctly imported

const Updates = () => {
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [success, successMsg] = useState("");
    const handlePasswordUpdate = () => {
        if (!email) {
            setErrorMsg("Fill all fields");
            return;
          }
        setErrorMsg("")
        successMsg("")
        
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
                successMsg('Password reset email sent successfully')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                setErrorMsg(error.message)
            });
    };

    //   import { getAuth, sendPasswordResetEmail } from "firebase/auth";



    return (
        <div>
            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handlePasswordUpdate}>Send Password Reset Email</button>
            {errorMsg && <p>{errorMsg}</p>}
            {success && <p>{success}</p>}
        </div>
    );
};

export default Updates;
