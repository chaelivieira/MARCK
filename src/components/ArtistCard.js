import React, { useState } from 'react';
import '../App.css';


function ArtistCard(props) {
    return (
      <div>
            <div className="card" key={props.id}>
              <div className="card-body">
                <h3 className="card-title">
                  {props.name}
                </h3>
                <img className= "cardImage" alt={props.name} src={props.url} />
                <br />
                <div>
                    Number of Followers: {props.followers}
                    <br/>
                    <br/>
                    Genres:
                    <br/>
                    {props.genres.map((x) => {return <div>{x}</div>})}
                </div>
              </div>
            </div>
      </div>
    );
}

export default ArtistCard;