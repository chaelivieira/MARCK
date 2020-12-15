import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../firebase/Auth";
import {
  Card,
  CardActionArea,
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
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    border: "1px solid #1e8678",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
  },
  content: {
    maxWidth: 250,
    height: 600,
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
    height: 250,
    width: "100%",
  },
});

function ArtistCard(props) {
  const { currentUser } = useContext(AuthContext);
  const send_request = async () => {
    await axios({
      method: "post",
      url: `http://localhost:9000/playlists/${currentUser.uid}/${props.id}`,
    });
    console.log("hit button");
  };
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={4} md={3} lg={2} xl={2} key={uuidv4()}>
      <Card className={classes.card} variant="outlined" key={uuidv4()}>
        <CardActionArea key={uuidv4()}>
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
              {props.name}
            </Typography>
            <p key={uuidv4()}> Number of Followers: {props.followers}</p>
            <div key={uuidv4()}>
              {" "}
              Genres:
              <br />
              {props.genres.map((x) => {
                return <div key={uuidv4()}>{x}</div>;
              })}{" "}
            </div>
            <br></br>
            <br></br>
            <Button
              key={uuidv4()}
              variant="secondary  mr-1"
              size="lg"
              onClick={send_request}
            >
              Get Playlist
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default ArtistCard;
