import React, { useState } from "react";
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

function ArtistCard(props) {
  const classes = useStyles();
  return (
    <Grid item xs={15} sm={15} md={15} lg={15} xl={15} key={props.id}>
      <Card className={classes.card} variant="outlined">
        <CardActionArea>
          <CardMedia
            className={classes.media}
            component="img"
            alt={props.name}
            image={props.url}
            title="show image"
          />
          <CardContent>
            <Typography
              className={classes.titleHead}
              gutterBottom
              variant="h6"
              component="h3"
            >
              {props.name}
            </Typography>
            <p> Number of Followers: {props.followers}</p>
            <p>
              {" "}
              Genres:
              <br />
              {props.genres.map((x) => {
                return <div>{x}</div>;
              })}{" "}
            </p>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default ArtistCard;
