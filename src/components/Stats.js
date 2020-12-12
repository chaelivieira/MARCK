import React, { useState, useEffect,  useContext }from 'react';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../firebase/Auth';
import Songs from './Songs';
import Artists from './Artists';
import '../App.css';
/*
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";

function Stats() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      {!currentUser ? (
        <Redirect to="/login" />
      ) : (
        <div>
          <p>{currentUser.displayName}'s Stats</p>
        </div>
      )}
    </div>
  );
}

export default Stats;
*/
function Stats() {
 
 
    return(
        <div>
       <h1>Top Songs:</h1>
        <Songs></Songs>
        <br/>
        <h1>Top Artists:</h1>
        <Artists></Artists>
        </div>
        );
    
  
 
}

export default Stats;