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
      item.setAttribute("class", "remove");
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

  async function sendData() {
    var htmlContent = document.getElementById("foo").outerHTML;
    console.log(htmlContent);
    try {
      await axios({
        method: "post",
        url: `http://localhost:9000/pdf`,
        headers: { "Content-Type": "text/html" },
        data: htmlContent,
      });
      await axios
        .get(`http://localhost:9000/download`)
        .then((response) => {
          console.log(response.headers);
          console.log("File downloading successfully!");
        })
        .catch((error) => {
          console.error("File could not be downloaded:", error);
        });
      const removeElements = (elms) => elms.forEach((el) => el.remove());
      removeElements(document.querySelectorAll(".remove"));
    } catch (e) {
      console.log(e);
    }
  }

  const handle_pdf = async () => {
    const data = await getData();
    var item = document.createElement("h2");
    item.setAttribute("class", "remove");
    item.appendChild(document.createTextNode("Top Artists"));
    document.getElementById("foo").appendChild(item);
    document.getElementById("foo").appendChild(makeOL(data.data.artists));
    item = document.createElement("h2");
    item.setAttribute("class", "remove");
    item.appendChild(document.createTextNode("Top Songs"));
    document.getElementById("foo").appendChild(item);
    document.getElementById("foo").appendChild(makeOL(data.data.tracks));
    await sendData();
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
          <div id="foo"></div>
          <h1>Top Songs:</h1>
          <Songs />
          <br />
          <h1>Top Artists:</h1>
          <Artists />
        </div>
      )}
      ;
    </div>
  );
}

export default Stats;
