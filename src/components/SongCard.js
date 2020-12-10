import React, { useState } from 'react';
import '../App.css';


function SongCard(props) {
    return (
      <div>
          
            <div className="card" key={props.id}>
              <div className="card-body">
                <h3 className="card-title">
                  {props.name}
                </h3>
                <img className= "cardImage"alt={props.name} src={props.url} />
                <br />
                <div>
                    Artists:
                    <br/>
                    {props.artists.map((x) => {return <div>{x.name}</div>})}
                </div>
              </div>
            </div>
      </div>
    );
}

export default SongCard;