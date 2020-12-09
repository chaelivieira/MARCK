import React, { useContext, useEffect, useState } from "react";
import { AuthProvider, AuthContext } from "./firebase/Auth";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import LoginStatus from "./components/LoginStatus";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import "./App.css";
import userEvent from "@testing-library/user-event";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Unwrapped</h1>
            <nav>
              <NavLink to="/playlists">Playlists</NavLink>
              <NavLink to="/stats">Stats</NavLink>
              {/** I'd like this to say log in/out based on loginstatus, how to get this to rerender */}
              {currentUser === null ? (
                <NavLink to="/login">Log in</NavLink>
              ) : (
                <NavLink to="/logout">Log out</NavLink>
              )}
            </nav>
          </header>
          <div className="App-body">
            <LoginStatus updateUser={setCurrentUser} />
            <br />
            <Logout />
            <Route exact path="/">
              <Redirect to="/stats" />
            </Route>
            {/** change component when Stats exists  */}
            <Route path="/stats" component={Home} />
            {/** change component when Playlists exists  */}
            <Route path="/playlists" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
