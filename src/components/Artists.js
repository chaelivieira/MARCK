import React, { useState, useEffect,  useContext }from 'react';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../firebase/Auth';
import ArtistCard from './ArtistCard';
import '../App.css';
const axios = require('axios');

function Artists() {
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
            const { data } = await axios.get(`http://localhost:9000/artists/${currentUser.uid}/${term}`);
            setData(data);
            setArtistsLoaded(true);
          } catch (e) {
            console.log(e);
          }
        }
        fetchData();
      },[term]);
    console.log(data);
    const items = data;
    if(artistsLoaded){
        console.log(items[0].name);
        return(
          <div>
        <Button onClick={handleShort_term}>This Month</Button>
        <Button onClick={handleMedium_term}>This Year</Button> 
        <Button onClick={handleLong_term}>All Time</Button> 
        <div>{items.map((post)=>{return <ArtistCard id = {post.id} name={post.name} url={post.images[0].url} followers={post.followers.total} genres={post.genres}/>})}</div>
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

export default Artists;