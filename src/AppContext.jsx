import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();
const API_BASE_URL = "https://cricsync-engine.onrender.com/api"; 

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "Mahalinga Raya", role: "ORGANIZER" });
  const [customCommentary, setCustomCommentary] = useState("");
  
  // NEW: History Stack for the UNDO button
  const [history, setHistory] = useState([]);
  
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

  // UPDATED: Now takes increments and a flag for legal deliveries
  const processDelivery = async (addedRuns, addedWickets, isLegalBall, ballEvent = "") => {
    // 1. Save current state to history BEFORE changing it (for Undo)
    setHistory(prev => [...prev, liveMatch]);

    const newRuns = liveMatch.runs + addedRuns;
    const newWickets = liveMatch.wickets + addedWickets;
    const newBalls = liveMatch.balls + (isLegalBall ? 1 : 0); // Extras don't add balls!

    setLiveMatch(prev => ({ ...prev, runs: newRuns, wickets: newWickets, balls: newBalls }));

    const overStr = `${Math.floor((newBalls - (isLegalBall ? 1 : 0)) / 6)}.${((newBalls - (isLegalBall ? 1 : 0)) % 6) + (isLegalBall ? 1 : 0)}`;
    const actionText = customCommentary || `${ballEvent} ${addedRuns > 0 && !ballEvent.includes('Wicket') ? `(${addedRuns} Runs)` : ''}`;
    
    setTimeline(prev => [{ id: Date.now(), overDisplay: overStr, commentaryEn: actionText, commentaryKn: "" }, ...prev]);

    // 2. Sync to Spring Boot
    syncToBackend(newRuns, newWickets, newBalls);
    setCustomCommentary("");
  };

  // NEW: The Undo Logic
  const undoLastAction = () => {
    if (history.length === 0) return; // Nothing to undo
    
    const previousState = history[history.length - 1]; // Grab the last state
    setHistory(prev => prev.slice(0, -1)); // Remove it from memory
    
    setLiveMatch(previousState); // Revert the UI
    setTimeline(prev => prev.slice(1)); // Remove the last commentary line
    
    // Force backend to revert
    syncToBackend(previousState.runs, previousState.wickets, previousState.balls);
  };

  const syncToBackend = (runs, wickets, balls) => {
    const updatePayload = liveMatch.innings === 1 
      ? { id: liveMatch.id, runsA: runs, wicketsA: wickets, ballsA: balls }
      : { id: liveMatch.id, runsB: runs, wicketsB: wickets, ballsB: balls };

    try {
      fetch(`${API_BASE_URL}/matches/update-live`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload)
      });
    } catch (error) {}
  };

  const startSecondInnings = () => {
    setHistory([]); // Clear undo history for new innings
    setLiveMatch(prev => ({
      ...prev,
      innings: 2,
      target: prev.runs + 1,
      runs: 0, wickets: 0, balls: 0
    }));
    setTimeline([{ id: Date.now(), overDisplay: "0.0", commentaryEn: "Run chase begins!", commentaryKn: "" }]);
  };

  return (
    <AppContext.Provider value={{ 
      jobs, liveMatch, timeline, customCommentary, setCustomCommentary, 
      processDelivery, undoLastAction, history, startSecondInnings, user 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
