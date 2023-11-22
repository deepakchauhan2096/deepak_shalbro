import React, { useState } from 'react';
import { firestore, auth} from '../firebase.mjs';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Firecreate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await firestore.collection('employees').doc(user.uid).set({
        email: user.email,
        company_username: username,
        
        // add other user data here
      });
      console.log('User registered successfully!');
    } catch (error) {
      console.error('Error registering user: ', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default Firecreate;