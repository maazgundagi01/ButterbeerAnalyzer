import React, { useEffect } from 'react';
import TitleBar from "../components/TitleBar";
import video1 from "../assets/1115063_Broadcast_Man_1280x720.mp4"
import axios from 'axios';
import { useState } from 'react';


export default function Dashboard() {
  const [videoId, setVideoId] = useState<string>('');
  const [comments, setComments] = useState<any>([]);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoId(event.target.value);
 };

const server = import.meta.env.VITE_SERVER;
  const fetchComments = () => {
    axios.get(`${server}/comments?videoId=${videoId}`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error("Error fetching comments:", error));
  };
  

  function getSentimentColor(val: number) {
    if (val > 0) {
      return 'text-green-500'; // Tailwind CSS class for green text
    } else if (val < 0) {
      return 'text-red-500'; // Tailwind CSS class for red text
    } else {
      return 'text-gray-500'; // Tailwind CSS class for gray text
    }
  }
  const [score, setScore] = useState(0);
  function analysisDisplay() {
    if (comments && comments.length > 0) {
      const total = comments.reduce((acc: number, comment: any) => acc + comment.sentimentScore, 0);
      const average = total / comments.length;
      setScore(average);
      return `Average Sentiment Score: ${average.toFixed(2)}`;
    } else {
      // Handle the case where comments are not available
      return 'Search something';
    }
  }
  function commentDisplay(){
    if(comments){return comments.map((comment: any, index: number) => (
      <div key={index} className="p-2 my-2 rounded-md bg-gray-900 border-gray-600">
        <p className={`text-xl ${getSentimentColor(comment.sentimentScore)}`}>
          Sentiment Score:<strong>{comment.sentimentScore}</strong>
        </p>
        <p className='text-gray-300'><strong>User:</strong> {comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
        <p className='text-white'><strong>Comment:</strong> {comment.snippet.topLevelComment.snippet.textDisplay}</p>
      </div>
    ))}else{
      return 'Search something'
    }
    
  }
  useEffect(() => {
    analysisDisplay();
  }, [comments]);
  


  return (
    
    <>
      <TitleBar title="Dashboard " />
      <main className="h-screen"> {/* Set main to full viewport height */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 h-full">
          {/* Top Section */}
          <section className="relative flex flex-col items-center justify-center h-1/2 mb-0 rounded-lg overflow-hidden"> {/* Set height to 50% and remove bottom margin */}
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
            >
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div> {/* Adjust opacity as needed */}
            <div className="relative z-10 text-center "> {/* Ensure text is above the video and overlay */}
              <h1 className="mx-2 rounded-sm text-4xl p-2  text-white font-bold text-shadow">ButterBeer Analyzer - Youtube Comments</h1>
              <h2 className="text-white rounded-sm mb-3 w-fit m-auto p-2 bg-slate-900/20 text-xl font-medium mt-3 text-shadow">Video comment section might be full of fans or trolls, but as long as it's full it has data!</h2>
              <label htmlFor="name-search" className='text-white  bg-slate-900/40 px-2 py-1 rounded-sm'>Enter URL</label><br/>
              <input name="name-search mt-2" onChange={handleInputChange}
                type="text"
                placeholder="Enter YouTube Video URL"
                className="border border-gray-300 rounded-lg p-2 mb-4 w-full max-w-md"
              />
              <div className="flex justify-center"> {/* Center the button */}
                <button onClick={fetchComments} className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg">
                  Submit
                </button>
              </div>
            </div>
          </section>

          {/* Bottom Section */}
          <section className="flex flex-col md:flex-row mt-8 flex-grow space-y-4 md:space-y-0 md:space-x-4">
            {/* Comments Section (30% width) */}
            <div className=" shadow-lg border-r border-gray-700 p-4 md:w-1/3 flex-grow">
              <h2 className="text-l font-semibold mb-2 text-gray-300 w-fit rounded-md px-2 py1 bg-gray-900">Analyze</h2>
              <h1 className="text-xl font-bold text-white">Average Score: {score}</h1>
              <div className="h-48 rounded-lg"></div> {/* Placeholder for comments */}
            </div>

            {/* Analysis Section (60% width) */}
            <div className="shadow-lg rounded-lg p-4 md:w-2/3 flex-grow max-h-80 overflow-scroll overflow-y-scroll overflow-x-hidden ">
              <h2 className="text-l text-gray-300 bg-gray-900 w-fit rounded-md px-2 py1 font-semibold mb-2">Comments</h2>
              {
                commentDisplay()
              }
            <div className="h-48 rounded-lg"></div> {/* Placeholder for analysis */}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}