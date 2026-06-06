import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();
const API_BASE_URL = "https://cricsync-engine.onrender.com/api"; 

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "Mahalinga Raya", role: "ORGANIZER" });
  const [customCommentary, setCustomCommentary] = useState("");
  const [lastBallResult, setLastBallResult] = useState("");
  
  // STRIPPED FAKE DATA - Forces the UI to wait for the real database
  const [liveMatch, setLiveMatch] = useState({
    id: 1, 
    teamA: "Connecting to Engine...", 
    teamB: "Please Wait",
    runs: 0, 
    wickets: 0, 
    balls: 0, 
    venue: "Fetching from cloud...", 
    leagueName: "System Booting..."
  });

  const [timeline, setTimeline] = useState([]);
  const [jobs, setJobs] = useState([]);

  const fetchEcosystemData = async () => {
    try {
      const matchRes = await fetch(`${API_BASE_URL}/matches/1`);
      if (matchRes.ok) {
        const data = await matchRes.json();
        if (data) {
          // This will overwrite the "Connecting to Engine..." text with RCB vs CSK
          setLiveMatch({
            id: data.id || 1,
            teamA: data.teamA,
            teamB: data.teamB,
            runs: data.runsA !== undefined ? data.runsA : 0,
            wickets: data.wicketsA !== undefined ? data.wicketsA : 0,
            balls: data.ballsA !== undefined ? data.ballsA : 0,
            venue: "Chinnaswamy Stadium",
            leagueName: "CricSync Pro League"
          });
        }
      }

      const timelineRes = await fetch(`${API_BASE_URL}/matches/1/timeline`);
      if (timelineRes.ok) {
        const logs = await timelineRes.json();
        if (logs && logs.length > 0) setTimeline(logs);
      }
    } catch (err) {
      console.error("Waiting for backend to wake up...");
    }
  };

  useEffect(() => {
    fetchEcosystemData();
    // Polls the database every 4 seconds
    const interval = setInterval(fetchEcosystemData, 4000); 
    return () => clearInterval(interval);
  }, []);

  const addLeagueEvent = async (newEvent) => {};

  const updateDatabaseScore = async (newRuns, newWickets, newBalls, ballEvent = "") => {
    setLastBallResult(ballEvent);
    
    // Instant UI Update
    setLiveMatch(prev => ({
      ...prev,
      runs: newRuns,
      wickets: newWickets,
      balls: newBalls
    }));

    const isWicket = ballEvent === 'W';
    const runsToRecord = (isWicket || isNaN(ballEvent)) ? 0 : parseInt(ballEvent);
    const currentOver = Math.floor((newBalls - 1) / 6);
    const currentBallInOver = ((newBalls - 1) % 6) + 1;

    // Push to backend
    try {
      await fetch(`${API_BASE_URL}/ball-by-ball`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          match: { id: liveMatch.id },
          inningsNumber: 1, 
          overNumber: currentOver,
          ballNumber: currentBallInOver,
          runsScored: runsToRecord,
          extraRuns: 0,
          isWicket: isWicket,
          commentaryText: customCommentary || (isWicket ? "WICKET!" : `${runsToRecord} runs scored.`)
        })
      });
      setCustomCommentary("");
    } catch (error) {
      console.error("Failed to sync.", error);
    }
  };

  return (
    <AppContext.Provider value={{ jobs, liveMatch, timeline, customCommentary, setCustomCommentary, lastBallResult, setLastBallResult, addLeagueEvent, updateDatabaseScore, user }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
