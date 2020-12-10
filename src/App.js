import React, { useState } from "react";
import { AuthProvider } from "./firebase/Auth";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Playlists from "./components/Playlists";
import Stats from "./components/Stats";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const receiveUserData = (data) => {
    setCurrentUser(data);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="Header-title">Unwrapped</h1>
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
            <br />
            <Route exact path="/">
              <Redirect to="/stats" />
            </Route>
            <Route path="/stats" component={Stats} />
            <Route path="/playlists">
              <Playlists />
            </Route>
            <Route path="/login">
              <Login onLogIn={receiveUserData} />
            </Route>
            <Route path="/logout">
              <Logout onLogOut={receiveUserData} />
            </Route>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
