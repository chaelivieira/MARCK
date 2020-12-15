import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import { Redirect } from "react-router-dom";
import "../App.css";

function Home() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return (
      <div>
        <Redirect to="login" />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Welcome to Unwrapped</h1>
        <h5>
          Coded by: Matt Gorman, Kirsten Meidlinger, Amanda Gomes, Ryan Qin, and
          Chaeli Vieira
        </h5>
        <br></br>
        <br></br>
        <p>
          This site uses the Spotify Api to create a better version of Spotify
          Wrapped! Unlike spotify wrapped, this site can be used at any time of
          the year to get your top artists and songs.
        </p>
        <br></br>
        <h4>Some things you can do of this site:</h4>
        <br></br>
        <ul>
          <li>
            See your top artists and songs from the past month, the past year
            and of all time!
          </li>
          <li>
            Create a playlist based on one of your top artists that is save
            directly to your spotify page!
          </li>
          <li>View all public playlists that you already have saved!</li>
          <li>Listen to your public playlists!</li>
          <li>Save a PDF of your top 20 artists and tracks of all time!</li>
        </ul>
        <h4>Technologies Used</h4>
        <p>
          This site uses firebase to log into your spotify account in order to
          collect you data using the Spotify Api. The site is coded in React
          with an Express Server. Important information is saved into a Redis
          Cache. We use Wkhtmltopdf to create a pdf of your top stats and
          ImageMagick to upload images for your playlists.{" "}
        </p>
      </div>
    );
  }
}

export default Home;
