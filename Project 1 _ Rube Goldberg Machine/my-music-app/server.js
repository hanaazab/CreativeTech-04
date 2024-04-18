require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { GoogleAuth } = require('google-auth-library');

// Initialize the Google auth library with the path to your service account key
const auth = new GoogleAuth({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });


const client = auth.getClient();
const app = express();
const port = 3000;

app.use(express.static('public'));

// Endpoint to get a random top track from Last.fm
app.get('/random-track', async (req, res) => {
    try {
        const { data } = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${process.env.LASTFM_API_KEY}&format=json`);
        const tracks = data.tracks.track;
        const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
        res.json(randomTrack);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching track');
    }
});

// Endpoint to get lyrics from Genius
app.get('/lyrics', async (req, res) => {
    const { artist, title } = req.query;
    try {
        const { data } = await axios.get(`https://api.genius.com/search?q=${encodeURIComponent(title + ' ' + artist)}`, {
            headers: {
                'Authorization': `Bearer ${process.env.GENIUS_CLIENT_ACCESS_TOKEN}`
            }
        });
        const hit = data.response.hits.find(hit => hit.result.primary_artist.name.toLowerCase() === artist.toLowerCase());
        if (hit) {
            res.json({ lyrics: hit.result.url }); // Sending URL because Genius does not provide lyrics directly
        } else {
            res.status(404).send('No lyrics found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching lyrics');
    }
});

async function getGoogleAPIClient() {
    return await auth.getClient(); // Now auth is initialized, we can await getClient
  }

  app.post('/analyze-sentiment', express.json(), async (req, res) => {
    const { text } = req.body; // Make sure the client sends `text` in the request body

    try {
        // Call the Perspective API using the proper URL and query parameters
        const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${encodeURIComponent(process.env.PERSPECTIVE_API_KEY)}`;
        const data = {
            comment: { text },
            requestedAttributes: { TOXICITY: {} }
        };

        // Make a POST request directly using axios, no need to get a Google client
        const analyzeResponse = await axios.post(url, data);
        res.json(analyzeResponse.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error analyzing sentiment');
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



//  // Endpoint to analyze sentiment using Perspective API through google-auth
// app.post('/analyze-sentiment', express.json(), async (req, res) => {
//     const { text } = req.body; // Make sure the client sends `text` in the request body

//     try {
//         const client = await getGoogleAPIClient(); // Ensure this is called in async context

//         // Call the Perspective API using the proper URL and query parameters
//         const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${encodeURIComponent(process.env.PERSPECTIVE_API_KEY)}`;
//         const data = {
//             comment: { text },
//             requestedAttributes: { TOXICITY: {} }
//         };

//         const analyzeResponse = await client.request({ url, method: 'POST', data });
//         res.json(analyzeResponse.data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error analyzing sentiment');
//     }
// });

// Endpoint to analyze sentiment using Perspective API

