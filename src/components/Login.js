import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../firebase/Auth";
import firebase from "firebase/app";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({ h1: { fontSize: 36 } });

function Login() {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  window.addEventListener("message", async (event) => {
    if (event.origin !== "http://localhost:9000") {
      console.log("bad origin");
      return;
    }
    await firebase.auth().signInWithCustomToken(event.data);
  });

  function onSignInButtonClick() {
    // Open the Auth flow in a popup.
    window.open(
      "http://localhost:9000/login-redirect",
      "firebaseAuth",
      "height=315,width=400"
    );
  }

  if (currentUser) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }

  return (
    <div>
      <h1 className={classes.h1}>Welcome to Unwrapped</h1>
      <Button onClick={onSignInButtonClick} size="lg">
        Log in with Spotify
      </Button>
    </div>
  );
}

export default Login;
