import React, { useState } from "react";
import { AuthProvider } from "./firebase/Auth";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Playlists from "./components/Playlists";
import Stats from "./components/Stats";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="Header-title">Unwrapped</h1>
              <Nav/>
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
              <Login/>
            </Route>
            <Route path="/logout">
              <Logout/>
            </Route>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
