# Butterbeer Social Analyzer (BBSA)

##Live Demo
[Live Demo of BB Sentiment Analyzer](https://bbanalyzer.netlify.app/)

Butterbeer Social Analyzer (BBSA) is a web application that analyzes YouTube video comments for sentiment. It helps users understand the overall tone of the comment section by calculating a sentiment score for each comment using the **Sentiment npm package**.

## Features

- **Sentiment Analysis**: Analyzes the sentiment of each YouTube comment (positive, negative, or neutral).
- **Real-time Data**: Fetches and processes comments for any YouTube video.
- **Color-coded Sentiment**: Displays sentiment scores with color coding—green for positive, red for negative, and gray for neutral.
- **Average Sentiment Score**: Displays the average sentiment score of all fetched comments.
- **Video & Comment Display**: Shows the video background and a list of comments with sentiment scores.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Axios
- **Backend**: Node.js, Express, Sentiment npm package
- **Deployment**: 
  - Frontend: [Netlify](https://bbanalyzer.netlify.app/)
  - Backend: Hosted on Render
- **External APIs**: Google YouTube Data API

## How It Works

1. **User Input**: Users enter a YouTube video URL.
2. **Fetching Comments**: The app extracts the video ID from the URL and fetches comments from YouTube's Data API.
3. **Sentiment Analysis**: Each comment's sentiment is analyzed using the Sentiment npm package.
4. **Display**: Sentiment scores are displayed with comments, and an average sentiment score is calculated and shown.
