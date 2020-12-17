import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import { Textfit } from "react-textfit";
import { AuthContext } from "../firebase/Auth";
import { Redirect } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import "../App.css";
const axios = require("axios");
const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    width: 200,
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    border: "1px solid #1e8678",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
  },
  content: {
    maxWidth: 250,
    height: 320,
  },
  titleHead: {
    borderBottom: "1px solid #1e8678",
    fontWeight: "bold",
    minHeight: 34,
  },
  grid: {
    flexGrow: 1,
    flexDirection: "row",
  },
  media: {
    height: 250,
    width: "100%",
  },
});

function ArtistCard(props) {
  const { currentUser } = useContext(AuthContext);
  const [clicked, setclicked] = useState(false);
  const [id, setId] = useState("");
  const send_request = async () => {
    await axios({
      method: "post",
      url: `http://localhost:9000/playlists/${currentUser.uid}/${props.id}`,
    }).then((response) => {
      setId(response.data);
      setclicked(true);
    });
  };
  const classes = useStyles();
  if (clicked) {
    return <Redirect to={`/playlists/${id}`} />;
  } else {
    return (
      <Grid item xs={12} sm={4} md={3} lg={2} xl={2} key={uuidv4()}>
        <Card className={classes.card} variant="outlined" key={uuidv4()}>
          <CardMedia
            key={uuidv4()}
            className={classes.media}
            component="img"
            alt={props.name}
            image={props.url}
            title="show image"
          />
          <CardContent key={uuidv4()} className={classes.content}>
            <Typography
              key={uuidv4()}
              className={classes.titleHead}
              gutterBottom
              variant="h6"
              component="h3"
            >
              {props.name.length >= 15 ? (
                <Textfit mode="single">{props.name}</Textfit>
              ) : (
                props.name
              )}
            </Typography>
            <Button
              key={uuidv4()}
              variant="secondary  mr-1"
              size="md"
              onClick={send_request}
            >
              Get Top Songs
            </Button>
            <p key={uuidv4()}> Followers: {props.followers}</p>
            <div key={uuidv4()}>
              Genres:
              <br />
              {props.genres.slice(0, 5).map((x) => {
                return <div key={uuidv4()}>{x}</div>;
              })}
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default ArtistCard;
