import React, { useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import axios from "axios";

function Playlists() {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <div>{currentUser.displayName}'s Playlists</div>;
  } else {
    return (
      <div>
        <Redirect to="/login" />
      </div>
    );
  }
}

export default Playlists;
