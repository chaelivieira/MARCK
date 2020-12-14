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
  function makeOL(array) {
    var list = document.createElement("ol");
    for (var i = 0; i < array.length; i++) {
      var item = document.createElement("li");
      item.appendChild(document.createTextNode(array[i]));
      list.appendChild(item);
    }
    return list;
  }
  async function getData() {
    try {
      var data = await axios.get(
        `http://localhost:9000/stats/${currentUser.uid}`
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async function sendData(html) {
    try {
      await axios.post(`http://localhost:9000/pdf`, html);
    } catch (e) {
      console.log(e);
    }
  }

  const handle_pdf = async () => {
    const data = getData();
    var item = document.createElement("h2");
    item.appendChild(document.createTextNode("Top Artists"));
    document.getElementById("Stats").appendChild(item);
    document.getElementById("Stats").appendChild(makeOL(data.artists));
    item = document.createElement("h2");
    item.appendChild(document.createTextNode("Top Songs"));
    document.getElementById("Stats").appendChild(item);
    document.getElementById("Stats").appendChild(makeOL(data.tracks));
    sendData(document.getElementById("Stats"));
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
