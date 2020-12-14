import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../firebase/Auth";
import SongCard from "./SongCard";
import "../App.css";
import { Grid, makeStyles } from "@material-ui/core";
const axios = require("axios");
const useStyles = makeStyles({
  grid: {
    flexGrow: 1,
    flexDirection: "row",
  },
});
function Songs() {
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
          `http://localhost:9000/tracks/${currentUser.uid}/${term}`
        );
        setData(data);
        setArtistsLoaded(true);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [term, currentUser.uid]);
  const items = data;
  if (artistsLoaded) {
    if (items === undefined || items.length === 0) {
      return (
        <div>
          <h2>Sorry.. You dont have any top songs within this time period</h2>
          <Button
            variant="secondary  mr-1"
            size="lg"
            onClick={handleShort_term}
          >
            This Month
          </Button>
          <Button
            variant="secondary  mr-1"
            size="lg"
            onClick={handleMedium_term}
          >
            This Year
          </Button>
          <Button variant="secondary  mr-1" size="lg" onClick={handleLong_term}>
            All Time
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button
            variant="secondary  mr-1"
            size="lg"
            onClick={handleShort_term}
          >
            This Month
          </Button>
          <Button
            variant="secondary  mr-1"
            size="lg"
            onClick={handleMedium_term}
          >
            This Year
          </Button>
          <Button variant="secondary  mr-1" size="lg" onClick={handleLong_term}>
            All Time
          </Button>
          <br />
          <br></br>
          <div>
            <Grid container className={classes.grid} spacing={5}>
              {items.map((post) => {
                return (
                  <SongCard
                    id={post.id}
                    name={post.name}
                    url={post.album.images[0].url}
                    artists={post.artists}
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
        <Button variant="secondary  mr-1" size="lg" onClick={handleShort_term}>
          This Month
        </Button>
        <Button variant="secondary  mr-1" size="lg" onClick={handleMedium_term}>
          This Year
        </Button>
        <Button variant="secondary  mr-1" size="lg" onClick={handleLong_term}>
          All Time
        </Button>
      </div>
    );
  }
}

export default Songs;
