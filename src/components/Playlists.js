import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";

function Playlists() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      {!currentUser ? (
        <Redirect to="/login" />
      ) : (
        <div>
          <p>{currentUser.displayName}'s Playlists</p>
        </div>
      )}
    </div>
  );
}

export default Playlists;
