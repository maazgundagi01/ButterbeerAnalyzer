import express from 'express';
import dotenv from 'dotenv';
import Sentiment from 'sentiment';
import { extractVideoId } from './services/services.js';
//Environment Variables
dotenv.config();
const port = process.env.PORT;
const apiKey = process.env.APIKEY;
//Express initializations
const app = express();
app.use(express.json());
//Sentiment analysis using sentiment npm module
const sentiment = new Sentiment;
const getComments = async (videoId) => {
    return fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&part=snippet&videoId=${videoId}&textFormat=plainText`)
        .then((response) => {
        if (!response.ok) {
            console.log(`There was an error`);
        }
        return response.json();
    })
        .then((data) => {
        const commentsWithSentiment = data.items.map((item) => {
            const text = item.snippet.topLevelComment.snippet.textDisplay;
            const sentimentResult = sentiment.analyze(text);
            return {
                ...item,
                sentimentScore: sentimentResult.score
            };
        });
        console.log(commentsWithSentiment);
        return commentsWithSentiment;
    })
        .catch(err => {
        console.error(`There was an error${err}`);
        throw err;
    });
};
app.get('/comments', async (req, res) => {
    const vidId = extractVideoId(req.query.videoId);
    if (!vidId) {
        return res.status(400).json({ error: 'Video ID is required' });
    }
    getComments(vidId)
        .then(comments => {
        res.json(comments);
    })
        .catch(err => {
        res.status(500).json({ error: 'Failed to fetch comments' });
    });
});
app.listen(port, () => {
    return console.log(`Server running on http://localhost:${port}`);
});
