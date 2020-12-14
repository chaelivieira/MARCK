import React, { useState, useContext, useEffect } from "react";
import noImage from "../img/download.jpeg";
import { Link } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import axios from "axios";
import "../App.css";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";

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

const Playlists = (props) => {
  let card = null;
  //const regex = /(<([^>]+)>)/gi;
  const classes = useStyles();
  const [playlistData, setPlaylistData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `http://localhost:9000/playlists/${currentUser.uid}`
        );
        console.log(data);
        setPlaylistData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [currentUser.uid]);

  const buildCard = (playlist) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={playlist.id}>
        <Card className={classes.card} variant="outlined">
          <CardActionArea>
            <Link to={`/playlists/${playlist.id}`}>
              <CardMedia
                className={classes.media}
                component="img"
                image={
                  playlist && playlist.images[0]
                    ? playlist.images[0].url
                    : noImage
                }
                title="show image"
              />

              <CardContent>
                <Typography
                  className={classes.titleHead}
                  gutterBottom
                  variant="h6"
                  component="h3"
                >
                  {playlist.name}
                </Typography>
                <p>Tracks: {playlist.tracks.total}</p>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };
  card =
    playlistData &&
    playlistData.map((playlist) => {
      return buildCard(playlist);
    });

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <div>
        <br />
        <br />
        <Grid container className={classes.grid} spacing={5}>
          {card}
        </Grid>
      </div>
    );
  }
};

export default Playlists;
