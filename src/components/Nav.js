import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import "../App.css";

function Nav() {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav>
      <NavLink to="/playlists">Playlists</NavLink>
      <NavLink to="/stats">Stats</NavLink>
      {currentUser === null ? (
        <NavLink to="/login">Log in</NavLink>
      ) : (
        <NavLink to="/logout">Log out</NavLink>
      )}
    </nav>
  );
}

export default Nav;
