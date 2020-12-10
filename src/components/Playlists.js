import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import axios from "axios";

function Playlists() {
  const { currentUser } = useContext(AuthContext);
  const [playlists, setPlaylists] = useState(null);

  function buildPlaylistElements(playlist) {
    if (playlists === null) {
      return <p>Loading....</p>;
    } else {
      return (
        <div>
          <p>Playlist name: {playlist.name}</p>
          <p>Type: {playlist.type}</p>
          <p>collaborative: {playlist.collaborative ? "true" : "false"}</p>
          <p>public: {playlist.public ? "true" : "false"}</p>
          <p>href: {playlist.href}</p>
          <p>id: {playlist.id}</p>
          <p>images: {playlist.images.length > 0 ? playlist.images : "[]"}</p>
          <p>owner: {JSON.stringify(playlist.owner)}</p>
          <p>tracks: {JSON.stringify(playlist.tracks)}</p>
          <br />
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
