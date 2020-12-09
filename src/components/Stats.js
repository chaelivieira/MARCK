import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import firebase from "firebase/app";

function Stats() {
  const { currentUser } = useContext(AuthContext);
  return <div>{!currentUser ? <Redirect to="/login" /> : <p>Stats</p>}</div>;
}

export default Stats;
