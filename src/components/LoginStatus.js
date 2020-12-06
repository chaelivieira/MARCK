import React, { useContext } from 'react';
import { AuthContext } from '../firebase/Auth';
import '../App.css';


const LoginStatus = () => {
    const { currentUser } = useContext(AuthContext);
    return <div>{currentUser ? <p>User ID: {currentUser.uid} Name: {currentUser.displayName}</p> : <p>Not Logged In</p>}</div>;
  };

export default LoginStatus;