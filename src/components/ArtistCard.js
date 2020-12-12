import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import '../App.css';
const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    border: "1px solid #1e8678",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
  },
  titleHead: {
    borderBottom: "1px solid #1e8678",
    fontWeight: "bold",
  },
  grid: {
    flexGrow: 1,
    flexDirection: "row",
  },
  media: {
    height: "100%",
    width: "100%",
  },
  button: {
    color: "#1e8678",
    fontWeight: "bold",
    fontSize: 12,
  },
});

function ArtistCard(props) {
  const classes = useStyles();
    return (
      <div>
    
            <Card className="classes.card m" key={props.id}>
              <CardActionArea>
              <CardContent className="card-body">
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
              </CardContent>
              </CardActionArea>
            </Card>
         
      </div>
    );
}

export default ArtistCard;