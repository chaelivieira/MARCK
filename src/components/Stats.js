import React, { useState, useEffect,  useContext }from 'react';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../firebase/Auth';
import Songs from './Songs';
import Artists from './Artists';
import '../App.css';
const axios = require('axios');

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