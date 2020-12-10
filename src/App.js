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
<<<<<<< HEAD
            <h1 className="Header-title">Unwrapped</h1>
            <nav>
              <NavLink to="/playlists">Playlists</NavLink>
              <NavLink to="/stats">Stats</NavLink>
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
=======
            <LoginStatus/>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/playlists">Playlists</NavLink>
            <br/>
            <Logout/>
          </header>
          <div className='App-body'>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/playlists" component={Playlists}/>
            <Route path="/stats" component={Stats}/>
>>>>>>> bd0c529e9e0668b0bf6445088f3c54ecc640e4a5
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
