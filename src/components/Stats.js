import React, { useState, useEffect,  useContext }from 'react';
import { AuthContext } from '../firebase/Auth';
import ArtistCard from './ArtistCard';
import '../App.css';
const axios = require('axios');

function createCard(post){
  return <ArtistCard id = {post.id} name={post.name} url={post.images[0].url} followers={post.followers.total} genres={post.genres}/>
}

function Stats() {
    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState(false);
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        console.log('render');
        async function fetchData() {
         try {
            const { data } = await axios.get(`http://localhost:9000/artists/${currentUser.uid}`);
            console.log(data);
            setData(data);
            setLoaded(true);
            console.log(loaded);
          } catch (e) {
            console.log(e);
            console.log(loaded);
          }
        }
        fetchData();
      },[]);
    console.log(data);
    const items = data;
    if(loaded){
        console.log(items[0].name);
        return (<div>{items.map((post)=> {
          return createCard(post)})} </div>);
    } else{
      return <div>Loading</div>;
    }
  
 
}

export default Stats;