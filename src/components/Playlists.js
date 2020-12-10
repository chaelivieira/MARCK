import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import axios from 'axios';
import "../App.css";
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
const bluebird = require('bluebird');
const redis = require('redis');
var SpotifyWebApi = require('spotify-web-api-node');
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const useStyles = makeStyles({
	card: {
		maxWidth: 250,
		height: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 5,
		border: '1px solid #1e8678',
		boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
	},
	titleHead: {
		borderBottom: '1px solid #1e8678',
		fontWeight: 'bold'
	},
	grid: {
		flexGrow: 1,
		flexDirection: 'row'
	},
	media: {
		height: '100%',
		width: '100%'
	},
	button: {
		color: '#1e8678',
		fontWeight: 'bold',
		fontSize: 12
	}
});

const Playlists = (props) => {
    const regex = /(<([^>]+)>)/gi;
	const classes = useStyles();
    const [ playlistData, setPlaylistData ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser.uid);
    var spotifyApi = new SpotifyWebApi();

    useEffect(
        () => {
            console.log("UseEffect fired");
            async function fetchData() {
                try {
                    const accessToken = await client.hgetAsync(currentUser.uid, "accesstoken");
                    console.log(accessToken);
                    spotifyApi.setAccessToken(accessToken);
                    spotifyApi.getUserPlaylists(currentUser.uid).then(function(data) {
                        console.log(data.body)
                        setPlaylistData(data.body);
                    });
                    //const {data: playlists} = await axios.get(`https://api.spotify.com/v1/users/${currentUser.uid}/playlists`);
                    //setPlaylistData(playlists);
                    setLoading(false);
                } catch(e) {
                    console.log(e);
                }
            }
            fetchData();
        },
        [props.match.params.id]

    );

    // const buildCard = (playlist) => {
	// 	return (
	// 		<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={playlist.id}>
	// 			<Card className={classes.card} variant='outlined'>
	// 				<CardActionArea>
	// 					<Link to={`/playlists/${playlist.id}`}>
	// 						<CardMedia
	// 							className={classes.media}
	// 							component='img'
    //                             image={playlist && playlist.images[0] ? playlist.images[0] + '.jpg' : noImage}
	// 							title='show image'
	// 						/>

	// 						<CardContent>
	// 							<Typography className={classes.titleHead} gutterBottom variant='h6' component='h3'>
	// 								{playlist.title}
	// 							</Typography>
	// 						</CardContent>
	// 					</Link>
	// 				</CardActionArea>
	// 			</Card>
	// 		</Grid>
	// 	);
    // };
    // card = playlistData && playlistData.data.results.map((playlist) => {
    //     return buildCard(playlist);
    // });

    // if (loading) {
    //     return (
	// 		<div>
	// 			<h2>Loading....</h2>
	// 		</div>
	// 	);
    // }

    // else {
    //     return (
            
    //     )
    // }


};

export default Playlists;
