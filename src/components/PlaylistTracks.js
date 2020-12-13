import React, { useState, useContext, useEffect } from "react";
import noImage from "../img/download.jpeg";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import axios from "axios";
import "../App.css";
import { makeStyles, List, ListItem } from "@material-ui/core";

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

const PlaylistTracks = (props) => {
  let track = null;
  const { currentUser } = useContext(AuthContext);
  const [playlistData, setPlaylistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    console.log("playlist tracks UseEffect fired");
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `http://localhost:9000/playlists/${currentUser.uid}/${props.match.params.playlistId}`
        );
        setPlaylistData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [currentUser.uid]);

  const buildTrack = (track) => {
    let artistNames = track.track.artists.map((artist) => {
      return artist.name;
    });
    artistNames = artistNames.join(", ");
    return (
      <ListItem>
        {track.track.name} by {artistNames}
      </ListItem>
    );
  };
  //console.log(`tracks ${JSON.stringify(playlistData.tracks.items[0].track)}`);
  track =
    playlistData &&
    playlistData.tracks &&
    playlistData.tracks.items.map((track) => {
      return buildTrack(track);
    });

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  } else {
    return (
      <div>
        <div className="Playlist-tracks-header">
          <img
            className="Playlist-tracks-image"
            src={playlistData.images[0] ? playlistData.images[0].url : noImage}
          />
          <div className="Playlist-tracks-info">
            <h1>{playlistData.name}</h1>
            <h2>{playlistData.description}</h2>
            <p>by {playlistData.owner.id}</p>
          </div>
        </div>
        <div>
          <List>{track}</List>
        </div>
      </div>
    );
  }
};

export default PlaylistTracks;
