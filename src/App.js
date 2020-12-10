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
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
