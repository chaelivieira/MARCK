const express = require('express');
const path = require('path');
const app = express();
const crypto = require('crypto');
const admin = require('firebase-admin');
const axios = require("axios");
const serviceAccount = require('./private/service-account.json');
const redis = require('redis');
const cors = require('cors');
const redisClient = redis.createClient();
const bluebird = require('bluebird');
var cookieParser = require('cookie-parser')
require('dotenv').config();


//Promisify Redis
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
bluebird.promisifyAll(redis);


// Help from here for custom OAuth2 for Spotify login
// https://firebase.googleblog.com/2016/10/authenticate-your-firebase-users-with.html

//Admin access to create token
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//Function to create custom Firebase token based on Spotify ID
async function createFirebaseAccount(spotifyID, displayName, photoURL) {
  // The UID we'll assign to the user.
  const uid = `spotify:${spotifyID}`;
  // Create or update the user account.
  const userCreationTask = admin.auth().updateUser(uid, {
    displayName: displayName,
    photoURL: photoURL
  }).catch(error => {
    // If user does not exists we create it.
    if (error.code === 'auth/user-not-found') {
      return admin.auth().createUser({
        uid: uid,
        displayName: displayName,
        photoURL: photoURL,
      });
    }
    throw error;
  });
  // Wait for all async task to complete then generate and return a custom auth token.
  return Promise.all([userCreationTask]).then(async () => {
    // Create a Firebase custom auth token.
    const token = await admin.auth().createCustomToken(uid);
    //console.log('Created Custom token for UID "', uid, '" Token:', token);
    return token;
  });
}
//Sign in and close window
function signInFirebaseTemplate(token, spotifyAccessToken) {
    return `
    <script src="https://www.gstatic.com/firebasejs/3.6.0/firebase.js"></script>
    <script>
      var token = '${token}';
      window.opener.postMessage(token, '*');
      window.close();
    </script>`;
   }
   


//Creds for login page & Auth code setup
const credentials = {
    client: {
        id: 'd8da61601d4d4dc88adf729228b3cf02',
        secret: process.env.SPOTIFY_SECRET
    },
    auth: {
      tokenHost: 'https://accounts.spotify.com',
      authorizePath: '/authorize',
      tokenPath: '/api/token'
    }
}
const { AuthorizationCode } = require('simple-oauth2');
const client = new AuthorizationCode(credentials);

//Make cookies visible
app.use(cookieParser())

//Deliver Production react
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Implemneted from blog post
app.get('/login-redirect', (req, res) => {
    // Generate a random state verification cookie.
    const state = (req.cookies && req.cookies.state ? req.cookies.state : crypto.randomBytes(20).toString('hex'));
    // Allow unsecure cookies on localhost.
    const secureCookie = req.get('host').indexOf('localhost:') !== 0;
    res.cookie('state', state.toString(), {maxAge: 3600000, secure: secureCookie, httpOnly: true});
    const redirectUri = client.authorizeURL({
      redirect_uri: `http://localhost:9000/spotify-callback`,
      scope: 'user-read-private user-top-read',
      state: state
    });
    res.redirect(redirectUri);
  });

  app.get('/spotify-callback',async (req, res) => {
    // Check that we received a State Cookie.
    if (!req.cookies || !req.cookies.state) {
      res.status(400).send('State cookie not set or expired. Maybe you took too long to authorize. Please try again.');
      return;
    // Check the State Cookie is equal to the state parameter.
    } else if (req.cookies.state !== req.query.state) {
      res.status(400).send('State validation failed');
      return;
    }

    try{
    // Exchange the auth code for an access token.
    await client.getToken({
      code: req.query.code,
      redirect_uri: `http://localhost:9000/spotify-callback`
    }).then(async results => {
      
        // We have an Spotify access token and the user identity now.
        const accessToken = results.token.access_token;
        const refreshToken = results.token.refresh_token;
        const expiresAt = results.token.expires_at;

        try{  
          var {data} = await axios.get('https://api.spotify.com/v1/me',{headers: {Authorization: `Bearer ${accessToken}`}});
        } catch(e){
          res.send(e);
          return;
        }
        const id = data.id;
        const displayname = data.display_name;
   
        const image = (data.images[0].url ? data.images[0].url : null);
      
        try{          
          var firebaseToken = await createFirebaseAccount(id, displayname, image);
          let uid = `spotify:${id}`
          
          await redisClient.hsetAsync(`${uid}`,"accesstoken",accessToken);
          await redisClient.hsetAsync(`${uid}`,"displayname",displayname);
          await redisClient.hsetAsync(`${uid}`,"image", image);
          await redisClient.hsetAsync(`${uid}`,"refreshToken", refreshToken);
          await redisClient.hsetAsync(`${uid}`,"expiresAt", expiresAt);
        }catch(e){
          console.log("WARNING");
          console.log(e);
          res.send(e);
          return;
        }
        res.send(signInFirebaseTemplate(firebaseToken, accessToken));

    }); 
  } catch(e){
    console.log(e);
  }
  });

  app.get('/artists/:id',cors(),async (req, res) => {
    
      let accessToken = await redisClient.hgetAsync(`${req.params.id}`, "accesstoken")
      var result = {};
      
      try{
      var {data} = await axios.get(`https://api.spotify.com/v1/me/top/artists`,{headers: {Authorization: `Bearer ${accessToken}`}});
      //console.log(data);
      result = JSON.stringify(data.items);
      }catch (e){
        console.log(e);
      }
      //console.log(result);
      res.send(result);
  }); 

  app.listen(9000, () => {
    console.log("Server is running!");
    console.log("Your routes will be running on http://localhost:9000");
});
