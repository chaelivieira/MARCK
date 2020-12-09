import { AuthProvider } from './firebase/Auth';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import LoginStatus from './components/LoginStatus';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import Stats from './components/Stats';
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
            <br/>
            <Logout/>
          </header>
          <div className='App-body'>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/stats" component={Stats}/>
            <Route path="/playlist" component={Playlists}/>
          </div>
        </div>

      </Router>
    </AuthProvider>


    
  );
}

export default App;
