import React from 'react';
import firebase from 'firebase/app';



function Logout(){

    async function onSignout(){
        await firebase.auth().signOut();
    }

    return (
        <button type="button" onClick={onSignout}>
          Sign Out
        </button>
      );
}

export default Logout;