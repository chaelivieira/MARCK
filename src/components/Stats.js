import React, { useContext } from "react";
import Songs from "./Songs";
import Artists from "./Artists";
import "../App.css";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";

function Stats() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      {!currentUser ? (
        <Redirect to="/login" />
      ) : (
        <div>
          <h1>Top Songs:</h1>
          <Songs></Songs>
          <br />
          <h1>Top Artists:</h1>
          <Artists></Artists>
        </div>
      )}
      ;
    </div>
  );
}

export default Stats;
