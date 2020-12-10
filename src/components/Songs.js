import React, { useState, useEffect,  useContext }from 'react';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../firebase/Auth';
import SongCard from './SongCard';
import '../App.css';
const axios = require('axios');

function Songs() {
    const [data, setData] = useState({});
    const [term, setTerm] = useState("short_term");
    const [artistsLoaded, setArtistsLoaded] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const handleShort_term = () => {
      setTerm("short_term");
    };
    const handleMedium_term = () => {
      setTerm("medium_term");
    };
    const handleLong_term = () => {
      setTerm("long_term");
    };
    useEffect(() => {
        console.log('render');
        async function fetchData() {
          try {
            const { data } = await axios.get(`http://localhost:9000/tracks/${currentUser.uid}/${term}`);
            setData(data);
            setArtistsLoaded(true);
          } catch (e) {
            console.log(e);
          }
        }
        fetchData();
      },[term]);
    const items = data;
    if(artistsLoaded){
        return(
          <div>
        <Button onClick={handleShort_term}>This Month</Button>
        <Button onClick={handleMedium_term}>This Year</Button> 
        <Button onClick={handleLong_term}>All Time</Button> 
        <div>{items.map((post)=>{return <SongCard id = {post.id} name={post.name} url={post.album.images[0].url} artists={post.artists}/>})}</div>
        </div>
        );
    } else{
      return <div>
        <Button onClick={handleShort_term}>This Month</Button>
        <Button onClick={handleMedium_term}>This Year</Button> 
        <Button onClick={handleLong_term}>All Time</Button> 
      </div>;
    }
  
 
}

export default Songs;