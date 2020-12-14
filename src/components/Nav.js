import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import "../App.css";

function Nav() {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return (
      <nav>
        <NavLink to="/playlists">Playlists</NavLink>
        <NavLink to="/stats">Stats</NavLink>
        <NavLink to="/logout">Log out</NavLink>
      </nav>
    );
  } else {
    return (
      <nav>
        <NavLink to="/login">Playlists</NavLink>
        <NavLink to="/login">Stats</NavLink>
        <NavLink to="/login">Log in</NavLink>
      </nav>
    );
  }
}

export default Nav;
