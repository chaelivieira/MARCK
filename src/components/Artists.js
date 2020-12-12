import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../firebase/Auth";
import ArtistCard from "./ArtistCard";
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
const axios = require("axios");
const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    height: 500,
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
function Artists() {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [term, setTerm] = useState("short_term");
  const [artistsLoaded, setArtistsLoaded] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleShort_term = () => {
    setTerm("short_term");
  };
  const handleMedium_term = () => {
    setTerm("medium_term");
  };
  const handleLong_term = () => {
    setTerm("long_term");
  };
  useEffect(() => {
    console.log("render");
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `http://localhost:9000/artists/${currentUser.uid}/${term}`
        );
        setData(data);
        setArtistsLoaded(true);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [term]);
  console.log(data);
  const items = data;
  if (artistsLoaded) {
    if (items === undefined || items.length == 0) {
      return (
        <div>
          <h2>Sorry.. You dont have any top artists within this time period</h2>
          <Button onClick={handleShort_term}>This Month</Button>
          <Button onClick={handleMedium_term}>This Year</Button>
          <Button onClick={handleLong_term}>All Time</Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button onClick={handleShort_term}>This Month</Button>
          <Button onClick={handleMedium_term}>This Year</Button>
          <Button onClick={handleLong_term}>All Time</Button>
          <br />
          <br></br>
          <div>
            <Grid container className={classes.grid} spacing={5}>
              {items.map((post) => {
                return (
                  <ArtistCard
                    id={post.id}
                    name={post.name}
                    url={post.images[0].url}
                    followers={post.followers.total}
                    genres={post.genres}
                  />
                );
              })}
            </Grid>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div>
        <Button onClick={handleShort_term}>This Month</Button>
        <Button onClick={handleMedium_term}>This Year</Button>
        <Button onClick={handleLong_term}>All Time</Button>
      </div>
    );
  }
}

export default Artists;
