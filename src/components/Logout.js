import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import firebase from "firebase/app";
import { AuthContext } from "../firebase/Auth";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#0B86F4",
    border: "none",
    "&:hover": {
      border: "none",
      backgroundColor: "#096bc3",
    },
  },
  link: {
    color: "white",
    "&:hover": {
      color: "white",
      textDecoration: "none",
    },
  },
});
function Logout() {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
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
        <Button type="button" onClick={onSignout} className={classes.button}>
          <Link to="/" className={classes.link}>
            Log out
          </Link>
        </Button>
      </div>
    );
  }
}

export default Logout;
