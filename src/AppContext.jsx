import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();
const API_BASE_URL = "https://cricsync-engine.onrender.com/api"; 

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "Mahalinga Raya", role: "ORGANIZER" });
  const [customCommentary, setCustomCommentary] = useState("");
  const [lastBallResult, setLastBallResult] = useState("");
  
  // Track Innings, Target, and Max Overs
  const [liveMatch, setLiveMatch] = useState({
    id: localStorage.getItem('activeMatchId') || 1, 
    maxOvers: parseInt(localStorage.getItem('matchMaxOvers')) || 2,
    innings: 1,
    target: 0,
    teamA: "Fetching...", 
    teamB: "Please Wait",
    runs: 0, wickets: 0, balls: 0, 
    leagueName: "Local League"
  });

  const [timeline, setTimeline] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const activeId = localStorage.getItem('activeMatchId') || 1;
        const matchRes = await fetch(`${API_BASE_URL}/matches/${activeId}`);
        if (matchRes.ok) {
          const data = await matchRes.json();
          setLiveMatch(prev => ({
            ...prev,
            id: data.id,
            maxOvers: data.maxOvers || prev.maxOvers,
            teamA: data.teamA,
            teamB: data.teamB,
            runs: data.runsA || prev.runs,
            wickets: data.wicketsA || prev.wickets,
            balls: data.ballsA || prev.balls
          }));
        }
      } catch (err) {
        console.error("Backend sleeping.");
      }
    };
    fetchInitialData();
  }, []);

  const updateDatabaseScore = async (newRuns, newWickets, newBalls, ballEvent = "") => {
    setLastBallResult(ballEvent);
    
    setLiveMatch(prev => ({ ...prev, runs: newRuns, wickets: newWickets, balls: newBalls }));

    const overStr = `${Math.floor((newBalls - 1) / 6)}.${((newBalls - 1) % 6) + 1}`;
    const actionText = customCommentary || (ballEvent === 'W' ? "WICKET! Huge breakthrough!" : `${ballEvent} runs scored.`);
    
    setTimeline(prev => [{ id: Date.now(), overDisplay: overStr, commentaryEn: actionText, commentaryKn: "" }, ...prev]);

    // Send payload based on which inning is active
    const updatePayload = liveMatch.innings === 1 
      ? { id: liveMatch.id, runsA: newRuns, wicketsA: newWickets, ballsA: newBalls }
      : { id: liveMatch.id, runsB: newRuns, wicketsB: newWickets, ballsB: newBalls };

    try {
      fetch(`${API_BASE_URL}/matches/update-live`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload)
      });
    } catch (error) {}
    setCustomCommentary("");
  };

  // NEW: Flips the match to Innings 2
  const startSecondInnings = () => {
    setLiveMatch(prev => ({
      ...prev,
      innings: 2,
      target: prev.runs + 1,
      runs: 0,
      wickets: 0,
      balls: 0
    }));
    setTimeline([{ id: Date.now(), overDisplay: "0.0", commentaryEn: "Innings Break. Run chase is about to begin!", commentaryKn: "" }]);
  };

  return (
    <AppContext.Provider value={{ 
      jobs, liveMatch, setLiveMatch, timeline, customCommentary, 
      setCustomCommentary, lastBallResult, setLastBallResult, 
      updateDatabaseScore, startSecondInnings, user 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
