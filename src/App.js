import React from "react";
import { AuthProvider } from "./firebase/Auth";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Playlists from "./components/Playlists";
import PlaylistTracks from "./components/PlaylistTracks";
import Stats from "./components/Stats";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="Header-title">Unwrapped</h1>
            <Nav />
          </header>
          <div className="App-body">
            <br />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/stats" component={Stats} />
            <Route exact path="/playlists">
              <Playlists />
            </Route>
            <Route
              exact
              path="/playlists/:playlistId"
              component={PlaylistTracks}
            />
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
