import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import firebase from "firebase/app";

function Playlists() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>{!currentUser ? <Redirect to="/login" /> : <p>playlists</p>}</div>
  );
}

export default Playlists;
