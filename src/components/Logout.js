import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";

function Logout(props) {
  async function onSignout() {
    await firebase.auth().signOut();
    props.onLogOut(null);
  }

  return (
    <div>
      <p>Are you sure you want to log out?</p>
      <button type="button" onClick={onSignout}>
        <Link to="/">Log out</Link>
      </button>
    </div>
  );
}

export default Logout;
