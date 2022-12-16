const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin=require('firebase-admin');

const got = require('got'); // Imagga API dependency

const app = express();

var serviceAccount = require('../admin.json');

//Firebase Database Credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://whatworks-ac068-default-rtdb.firebaseio.com",
  authDomain: "whatworks-ac068.firebaseapp.com",
});

// Init Database
var db = admin.database();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Imagga API information
const apiKey = 'acc_85ae39694e22d63';
const apiSecret = 'ffc1f370ede63eea2582717e209eaef8';

app.get('/', (req, res) => {
  res.send("Home directory!");
  res.end("Received GET request!");  
});

app.post('/tagReview', async (req, res) => {
  try {
    const userReviewID = req.body.userReviewID;
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    
    const url = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(imageURL);
    const response = await got(url, {username: apiKey, password: apiSecret});

    // Parse the tags
    let parseData = JSON.parse(response.body);
    
    let tags : string[] = []

    parseData.result.tags.forEach(element => {
      tags.push(element.tag.en);
    });

    let tagRef = db.ref('TagReviews/');
    var oneRev = tagRef.child(userReviewID);

    oneRev.set({
      review: {
        userReviewID: `${userReviewID}`,
        title: `${title}`,
        imageURL: `${imageURL}`,
        tags: `${tags}`
      }
    });
    

  } catch (error) {
    console.log(error);
  }
  res.end("Operation finished.");  
});

app.get('/hellos', (req, res) => {
  res.send("Hello!");
  res.end("Received GET request!");  
});

app.post('/hello', (req, res) => {
  res.end("Received POST request!");  
});


app.post('/updateFlares', (req, res) => {
  const type = '' + req.query.type;
  // incr / decr

  res.end("Received POST request!");  
});

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);

