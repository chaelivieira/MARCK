import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import "../App.css";

const LoginStatus = (props) => {
  const { currentUser } = useContext(AuthContext);
  props.updateUser(currentUser);
  // prettier-ignore
  return <div>{currentUser ? <p>User ID: {currentUser.uid} Name: {currentUser.displayName}</p> : <p>Not Logged In</p>}</div>;
};

export default LoginStatus;
