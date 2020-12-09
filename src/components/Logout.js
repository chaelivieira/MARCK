import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";

function Logout() {
  async function onSignout() {
    await firebase.auth().signOut();
  }

  return (
    <button type="button" onClick={onSignout}>
      <Link to="/">Sign out</Link>
    </button>
  );
}

export default Logout;
