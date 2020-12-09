import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import axios from 'axios';
import "../App.css";

const Playlists = (props) => {
    const [ playlistData, setPlaylistData ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser);
    useEffect(
        () => {
            console.log("UseEffect fired");
            async function fetchData() {
                try {
                    const {data: playlists} = await axios.get(`https://api.spotify.com/v1/users/${props.match.params.id}/playlists`)
                    setPlaylistData(playlists);
                    setLoading(false);
                } catch(e) {
                    console.log(e);
                }
            }
            fetchData();
        },
        [props.match.params.id]

    );

    const buildCard = (comic) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={comic.id}>
				<Card className={classes.card} variant='outlined'>
					<CardActionArea>
						<Link to={`/comics/${comic.id}`}>
							<CardMedia
								className={classes.media}
								component='img'
                                image={comic && comic.thumbnail.path ? comic.thumbnail.path + '.jpg' : noImage}
								title='show image'
							/>

							<CardContent>
								<Typography className={classes.titleHead} gutterBottom variant='h6' component='h3'>
									{comic.title}
								</Typography>
							</CardContent>
						</Link>
					</CardActionArea>
				</Card>
			</Grid>
		);
    };

    if (loading) {
        return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
    }

    else {
        return (
            
        )
    }


};

export default Playlists;
