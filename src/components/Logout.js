import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import { AuthContext } from "../firebase/Auth";

function Logout() {
  const { currentUser } = useContext(AuthContext);

  async function onSignout() {
    await firebase.auth().signOut();
  }

  if (!currentUser) {
    return (
      <div>
        <Redirect to="login" />
      </div>
    );
  } else {
    return (
      <div>
        <p>Are you sure you want to log out?</p>
        <button type="button" onClick={onSignout}>
          <Link to="/home">Log out</Link>
        </button>
      </div>
    );
  }
}

export default Logout;
