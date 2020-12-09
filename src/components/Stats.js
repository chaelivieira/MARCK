import React, { useContext } from "react";
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
          <p>{currentUser.displayName}'s Stats</p>
        </div>
      )}
    </div>
  );
}

export default Stats;
