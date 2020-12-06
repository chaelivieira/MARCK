import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import firebase from 'firebase/app';



function Login(){


    const { currentUser } = useContext(AuthContext);

    window.addEventListener("message", async (event) =>{
        if(event.origin !== "http://localhost:9000") {console.log("bad origin"); return;}
        let login = await firebase.auth().signInWithCustomToken(event.data);
    });

    function onSignInButtonClick() {
        // Open the Auth flow in a popup.
        window.open('http://localhost:9000/login-redirect', 'firebaseAuth', 'height=315,width=400');
    };  

    
    if(currentUser){
        return <Redirect to="/"/>;
    }

    return(
        <div><button onClick={onSignInButtonClick}>Log in with Spotify</button></div>
    );
}

export default Login;