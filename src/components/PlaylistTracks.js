import React, { useState, useContext, useEffect } from "react";
import noImage from "../img/download.jpeg";
import { AuthContext } from "../firebase/Auth";
import axios from "axios";
import "../App.css";
import { makeStyles } from "@material-ui/core";

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
  playlistHeader: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  playlistImage: {
    height: "250px",
    width: "250px",
  },
  playbackContainer: {
    padding: "20px",
  },
});

const PlaylistTracks = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [playlistData, setPlaylistData] = useState(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
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
  }, [currentUser.uid, props.match.params.playlistId]);

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  } else {
    return (
      <div>
        <div className={classes.playlistHeader}>
          <div className="Playlist-tracks-info">
            <h1>{playlistData.name}</h1>
            <h2>{playlistData.description}</h2>
            <p>A playlist by {playlistData.owner.id}</p>
            <button>Upload New Playlist Image (not functional yet)</button>
          </div>
          <img
            className={classes.playlistImage}
            src={playlistData.images[0] ? playlistData.images[0].url : noImage}
            alt={playlistData.name + " playlist art"}
          />
        </div>
        <div className={classes.playbackContainer}>
          <iframe
            src={`https://open.spotify.com/embed/playlist/${playlistData.id}`}
            title={`spotify player for playlist ${playlistData.name}`}
            width="100%"
            height="800"
            frameborder="4"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </div>
      </div>
    );
  }
};

export default PlaylistTracks;
