import React, { useContext } from "react";
import Songs from "./Songs";
import Artists from "./Artists";
import "../App.css";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import Button from "react-bootstrap/Button";
const axios = require("axios");

function Stats() {
  const { currentUser } = useContext(AuthContext);
  const handle_pdf = async () => {
    try {
      await axios.get(`http://localhost:9000/stats/${currentUser.uid}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      {!currentUser ? (
        <Redirect to="/login" />
      ) : (
        <div>
          <Button variant="secondary" onClick={handle_pdf}>
            Download Stats From All Time PDF
          </Button>
          <br></br>
          <br></br>
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
