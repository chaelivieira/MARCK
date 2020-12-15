import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../firebase/Auth";
import ArtistCard from "./ArtistCard";
import "../App.css";
import { Grid, makeStyles } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
const axios = require("axios");
const useStyles = makeStyles({
  grid: {
    flexGrow: 1,
    flexDirection: "row",
  },
});
function Artists() {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [term, setTerm] = useState("long_term");
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
  }, [term, currentUser.uid]);
  const items = data;
  if (artistsLoaded) {
    if (items === undefined || items.length === 0) {
      return (
        <div key={uuidv4()}>
          <h2 key={uuidv4()}>
            Sorry.. You dont have any top artists within this time period
          </h2>
          <Button
            key={uuidv4()}
            variant="secondary  mr-1"
            size="lg"
            onClick={handleShort_term}
          >
            This Month
          </Button>
          <Button
            key={uuidv4()}
            variant="secondary  mr-1"
            size="lg"
            onClick={handleMedium_term}
          >
            This Year
          </Button>
          <Button
            key={uuidv4()}
            variant="secondary  mr-1"
            size="lg"
            onClick={handleLong_term}
          >
            All Time
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button
            key={uuidv4()}
            variant="secondary  mr-1"
            size="lg"
            onClick={handleShort_term}
          >
            This Month
          </Button>
          <Button
            key={uuidv4()}
            variant="secondary  mr-1"
            size="lg"
            onClick={handleMedium_term}
          >
            This Year
          </Button>
          <Button
            key={uuidv4()}
            variant="secondary  mr-1"
            size="lg"
            onClick={handleLong_term}
          >
            All Time
          </Button>
          <br />
          <br></br>
          <div key={uuidv4()}>
            <Grid key={uuidv4()} container className={classes.grid} spacing={5}>
              {items.map((post) => {
                return (
                  <ArtistCard
                    key={uuidv4()}
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
        <Button
          key={uuidv4()}
          variant="secondary  mr-1"
          size="lg"
          onClick={handleShort_term}
        >
          This Month
        </Button>
        <Button
          key={uuidv4()}
          variant="secondary  mr-1"
          size="lg"
          onClick={handleMedium_term}
        >
          This Year
        </Button>
        <Button
          key={uuidv4()}
          variant="secondary  mr-1"
          size="lg"
          onClick={handleLong_term}
        >
          All Time
        </Button>
      </div>
    );
  }
}

export default Artists;
