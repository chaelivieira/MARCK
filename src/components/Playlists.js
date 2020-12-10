import React, { useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
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
import axios from "axios";

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

function Playlists() {
  const { currentUser } = useContext(AuthContext);
  const [playlists, setPlaylists] = useState(null);
  const classes = useStyles();

  function buildPlaylistElements(playlist) {
    if (playlists === null) {
      return <p>Loading....</p>;
    } else {
      return (
        <div>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={playlist.id}>
            <Card className={classes.card} variant="outlined">
              <CardActionArea>
                <div>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    title={playlist.name + " image"}
                  />

                  <CardContent>
                    <p>Playlist name: {playlist.name}</p>
                    <p>Type: {playlist.type}</p>
                    <p>
                      collaborative: {playlist.collaborative ? "true" : "false"}
                    </p>
                    <p>public: {playlist.public ? "true" : "false"}</p>
                    <p>href: {playlist.href}</p>
                    <p>id: {playlist.id}</p>
                    <p>
                      images:{" "}
                      {playlist.images.length > 0 ? playlist.images : "[]"}
                    </p>
                    <p>owner: {JSON.stringify(playlist.owner)}</p>
                    <p>tracks: {JSON.stringify(playlist.tracks)}</p>
                    <br />
                  </CardContent>
                </div>
              </CardActionArea>
            </Card>
          </Grid>
        </div>
      );
    }
  }

  if (playlists === null) {
    setPlaylists([
      {
        collaborative: false,
        external_urls: {
          spotify:
            "http://open.spotify.com/user/wizzler/playlists/53Y8wT46QIMz5H4WQ8O22c",
        },
        href:
          "https://api.spotify.com/v1/users/wizzler/playlists/53Y8wT46QIMz5H4WQ8O22c",
        id: "53Y8wT46QIMz5H4WQ8O22c",
        images: [],
        name: "Wizzlers Big Playlist",
        owner: {
          external_urls: { spotify: "http://open.spotify.com/user/wizzler" },
          href: "https://api.spotify.com/v1/users/wizzler",
          id: "wizzler",
          type: "user",
          uri: "spotify:user:wizzler",
        },
        public: true,
        snapshot_id:
          "bNLWdmhh+HDsbHzhckXeDC0uyKyg4FjPI/KEsKjAE526usnz2LxwgyBoMShVL+z+",
        tracks: {
          href:
            "https://api.spotify.com/v1/users/wizzler/playlists/53Y8wT46QIMz5H4WQ8O22c/tracks",
          total: 30,
        },
        type: "playlist",
        uri: "spotify:user:wizzler:playlist:53Y8wT46QIMz5H4WQ8O22c",
      },
      {
        collaborative: false,
        external_urls: {
          spotify:
            "http://open.spotify.com/user/wizzlersmate/playlists/1AVZz0mBuGbCEoNRQdYQju",
        },
        href:
          "https://api.spotify.com/v1/users/wizzlersmate/playlists/1AVZz0mBuGbCEoNRQdYQju",
        id: "1AVZz0mBuGbCEoNRQdYQju",
        images: [],
        name: "Another Playlist",
        owner: {
          external_urls: {
            spotify: "http://open.spotify.com/user/wizzlersmate",
          },
          href: "https://api.spotify.com/v1/users/wizzlersmate",
          id: "wizzlersmate",
          type: "user",
          uri: "spotify:user:wizzlersmate",
        },
        public: true,
        snapshot_id:
          "Y0qg/IT5T02DKpw4uQKc/9RUrqQJ07hbTKyEeDRPOo9LU0g0icBrIXwVkHfQZ/aD",
        tracks: {
          href:
            "https://api.spotify.com/v1/users/wizzlersmate/playlists/1AVZz0mBuGbCEoNRQdYQju/tracks",
          total: 58,
        },
        type: "playlist",
        uri: "spotify:user:wizzlersmate:playlist:1AVZz0mBuGbCEoNRQdYQju",
      },
    ]);
    console.log(playlists);
    return <p>{currentUser.displayName}'s Playlists</p>;
  } else {
    return (
      <div>
        {!currentUser ? (
          <Redirect to="/login" />
        ) : (
          <div>
            <p>
              {playlists === null ? (
                <p>Loading...</p>
              ) : (
                playlists.map((playlist) => {
                  return buildPlaylistElements(playlist);
                })
              )}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Playlists;
