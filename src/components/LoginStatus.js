import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import "../App.css";

const LoginStatus = (props) => {
  const { currentUser } = useContext(AuthContext);
  props.updateUser(currentUser);
  // prettier-ignore
  return <div hidden={true}>{currentUser ? <p>User ID: {currentUser.uid} Name: {currentUser.displayName}</p> : <p>Welcome to Unwrapped!</p>}</div>;
};

export default LoginStatus;
