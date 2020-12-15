import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import { Redirect } from "react-router-dom";
import "../App.css";

function Home() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return (
      <div>
        <Redirect to="login" />
      </div>
    );
  } else {
    return <div> Home Page </div>;
  }
}

export default Home;
