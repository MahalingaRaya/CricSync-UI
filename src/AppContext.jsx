import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();
const API_BASE_URL = "https://cricsync-engine.onrender.com/api"; 

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "Mahalinga Raya", role: "ORGANIZER" });
  const [customCommentary, setCustomCommentary] = useState("");
  const [lastBallResult, setLastBallResult] = useState("");
  
  // Clean initial state
  const [liveMatch, setLiveMatch] = useState({
    id: 1, 
    teamA: "Fetching...", 
    teamB: "Please Wait",
    runs: 0, 
    wickets: 0, 
    balls: 0, 
    venue: "Chinnaswamy Stadium", 
    leagueName: "Corporate Premier League"
  });

  const [timeline, setTimeline] = useState([]);
  const [jobs, setJobs] = useState([]);

  // FETCH EXACTLY ONCE ON LOAD (No more auto-refresh loops)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const matchRes = await fetch(`${API_BASE_URL}/matches/1`);
        if (matchRes.ok) {
          const data = await matchRes.json();
          setLiveMatch({
            id: data.id || 1,
            teamA: data.teamA,
            teamB: data.teamB,
            runs: data.runsA || 0,
            wickets: data.wicketsA || 0,
            balls: data.ballsA || 0,
            venue: "Chinnaswamy Stadium",
            leagueName: "Corporate Premier League"
          });
        }
      } catch (err) {
        console.error("Backend sleeping. Using local state.");
      }
    };
    
    fetchInitialData();
  }, []); // The empty array ensures this only runs once!

  const updateDatabaseScore = async (newRuns, newWickets, newBalls, ballEvent = "") => {
    setLastBallResult(ballEvent);
    
    // 1. INSTANT UI UPDATE - This makes the app feel lightning fast
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

    // 2. SILENT BACKEND SYNC - Fires data to database without freezing the screen
    try {
      fetch(`${API_BASE_URL}/ball-by-ball`, {
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
      console.error("Silent sync failed, but UI still works.", error);
    }
  };

  const addLeagueEvent = async (newEvent) => {};

  return (
    <AppContext.Provider value={{ jobs, liveMatch, timeline, customCommentary, setCustomCommentary, lastBallResult, setLastBallResult, addLeagueEvent, updateDatabaseScore, user }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
