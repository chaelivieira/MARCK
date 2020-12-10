import { AuthProvider } from './firebase/Auth';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import LoginStatus from './components/LoginStatus';
import Login from './components/Login';
import Logout from './components/Logout';
import Playlists from './components/Playlists';
import './App.css';


function App() {
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
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/playlists" component={Playlists}/>
          </div>
        </div>

      </Router>
    </AuthProvider>


    
  );
}

export default App;
