import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();
// Adjusted base URL to point to the root API path for cleaner endpoint routing
const API_BASE_URL = "https://cricsync-engine.onrender.com/api"; 

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "MahaTech Mahi", role: "ORGANIZER" });
  const [customCommentary, setCustomCommentary] = useState("");
  const [lastBallResult, setLastBallResult] = useState("");
  
  // 1. HARDCODED FALLBACK MATCH DATA
  const [liveMatch, setLiveMatch] = useState({
    id: 1, 
    teamA: "MahaTechMahi", 
    teamB: "CricSync",
    runs: 84, 
    wickets: 3, 
    balls: 45, 
    venue: "Chinnaswamy Stadium Bengaluru", 
    leagueName: "Corporate Premier League 2K26"
  });

  // 2. HARDCODED FALLBACK COMMENTARY LOGS 
  const [timeline, setTimeline] = useState([
    {
      id: 3,
      overDisplay: "7.3",
      commentaryEn: "SIX! Absolute monster hit over the deep mid-wicket boundary!",
      commentaryKn: "ಭರ್ಜರಿ ಸಿಕ್ಸರ್! ಗಗನಚುಂಬಿ ಹೊಡೆತ, ಚೆಂಡು ನೇರವಾಗಿ ಗ್ಯಾಲರಿಗೆ ಹೋಗಿ ಬಿದ್ದಿದೆ!"
    },
    {
      id: 2,
      overDisplay: "7.2",
      commentaryEn: "FOUR! Beautifully timed drive flashing through the covers!",
      commentaryKn: "ನಾಲ್ಕು ರನ್! ಭರ್ಜರಿ ಬೌಂಡರಿ! ಮಿಂಚಿನ ವೇಗದಲ್ಲಿ ಚೆಂಡು ಗೆರೆ ದಾಟಿದೆ!"
    },
    {
      id: 1,
      overDisplay: "7.1",
      commentaryEn: "Dot ball. Excellent delivery right in the blockhole.",
      commentaryKn: "ಡಾಟ್ ಬಾಲ್! ಅತ್ಯುತ್ತಮ ಲೈನ್ ಮತ್ತು ಲೆಂತ್ ಬೌಲಿಂಗ್ ಪ್ರದರ್ಶನ."
    }
  ]);

  // 3. HARDCODED FALLBACK JOB OPENINGS 
  const [jobs, setJobs] = useState([
    {
      id: 1,
      roleRequired: "Kannada Commentator",
      leagueName: "Corporate Premier League 2K26",
      venue: "Bengaluru",
      payPerMatch: "3,500/Match"
    },
    {
      id: 2,
      roleRequired: "Live Scorer Ninja",
      leagueName: "Corporate Premier League 2K26",
      venue: "Bengaluru Stadium",
      payPerMatch: "2,000/Match"
    }
  ]);

  const fetchEcosystemData = async () => {
    try {
      const matchRes = await fetch(`${API_BASE_URL}/matches/1`); // Fetching Match ID 1 specifically
      if (matchRes.ok) {
        const data = await matchRes.json();
        if (data) {
          setLiveMatch({
            id: data.id || 1,
            teamA: data.teamA || "MahaTech Mahi",
            teamB: data.teamB || "CricSync",
            runs: data.runsA !== undefined ? data.runsA : 84, // Mapping to your backend's runsA
            wickets: data.wicketsA !== undefined ? data.wicketsA : 3,
            balls: data.ballsA !== undefined ? data.ballsA : 45,
            venue: data.venue || "Chinnaswamy Stadium Bengaluru",
            leagueName: data.leagueName || "Corporate Premier League 2K26"
          });
        }
      }

      // Safe fallbacks for timelines and jobs
      const timelineRes = await fetch(`${API_BASE_URL}/matches/1/timeline`);
      if (timelineRes.ok) {
        const logs = await timelineRes.json();
        if (logs && logs.length > 0) setTimeline(logs);
      }

      const jobsRes = await fetch(`${API_BASE_URL}/matches/marketplace`);
      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        if (jobsData && jobsData.length > 0) setJobs(jobsData);
      }
    } catch (err) {
      console.error("Sync handled safely:", err);
    }
  };

  useEffect(() => {
    fetchEcosystemData();
    const interval = setInterval(fetchEcosystemData, 3000); // Polls every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const addLeagueEvent = async (newEvent) => {
    setLiveMatch({
      id: 1,
      teamA: newEvent.teamA || "MahaTech Mahi",
      teamB: newEvent.teamB || "CricSync",
      runs: 0,
      wickets: 0,
      balls: 0,
      venue: newEvent.venue || "Bengaluru Stadium",
      leagueName: newEvent.league || "Corporate Premier League 2K26"
    });
  };

  // --- THE BRIDGE TO YOUR SPRING BOOT BACKEND ---
  const updateDatabaseScore = async (newRuns, newWickets, newBalls, ballEvent = "") => {
    
    // 1. Instantly update UI (Optimistic Rendering)
    setLastBallResult(ballEvent);
    setLiveMatch(prev => ({
      ...prev,
      runs: newRuns,
      wickets: newWickets,
      balls: newBalls
    }));

    // 2. Calculate over and ball numbers for the database
    const isWicket = ballEvent === 'W';
    const runsToRecord = (isWicket || isNaN(ballEvent)) ? 0 : parseInt(ballEvent);
    const currentOver = Math.floor((newBalls - 1) / 6);
    const currentBallInOver = ((newBalls - 1) % 6) + 1;

    // 3. Fire the POST request to your live Render engine
    try {
      await fetch(`${API_BASE_URL}/ball-by-ball`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          match: { id: liveMatch.id },
          inningsNumber: 1, // Defaults to 1st innings for now
          overNumber: currentOver,
          ballNumber: currentBallInOver,
          runsScored: runsToRecord,
          extraRuns: 0,
          isWicket: isWicket,
          commentaryText: customCommentary || (isWicket ? "WICKET!" : `${runsToRecord} runs scored.`)
        })
      });
      
      // Clear custom commentary input box after successful send
      setCustomCommentary("");
      
    } catch (error) {
      console.error("Failed to sync live ball to database:", error);
    }
  };

  return (
    <AppContext.Provider value={{ jobs, liveMatch, timeline, customCommentary, setCustomCommentary, lastBallResult, setLastBallResult, addLeagueEvent, updateDatabaseScore, user }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
