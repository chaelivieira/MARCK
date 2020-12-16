import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
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
  content: {
    maxWidth: 250,
    height: 600,
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
function SongCard(props) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={4} md={3} lg={2} xl={2} key={uuidv4()}>
      <Card className={classes.card} variant="outlined" key={uuidv4()}>
        <CardMedia
          key={uuidv4()}
          className={classes.media}
          component="img"
          alt={props.name}
          image={props.url}
          title="show image"
        />
        <CardContent key={uuidv4()} className={classes.content}>
          <Typography
            key={uuidv4()}
            className={classes.titleHead}
            gutterBottom
            variant="h6"
            component="h3"
          >
            {props.name}
          </Typography>
          <div key={uuidv4()}>
            {" "}
            Artists:
            <br />
            {props.artists.map((x) => {
              return <div key={uuidv4()}>{x.name}</div>;
            })}
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default SongCard;
