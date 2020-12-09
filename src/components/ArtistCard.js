import React, { useState } from 'react';
import '../App.css';


function ArtistCard(props) {
    console.log(props.genres);
    return (
      <div>
            <div className="card" key={props.id}>
              <div className="card-body">
                <h1 className="card-title">
                  {props.name}
                </h1>
                <img className= "cardImage" alt={props.name} src={props.url} />
                <br />
                <p>
                    Number of Followers: {props.followers}
                    <br/>
                    <br/>
                    Genres:
                    <br/>
                    {props.genres.map((x) => {return <div>{x}</div>})}
                </p>
              </div>
            </div>
      </div>
    );
}

export default ArtistCard;