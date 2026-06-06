import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();
const API_BASE_URL = "https://cricsync-engine.onrender.com/api"; 

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "Mahalinga Raya", role: "ORGANIZER" });
  const [customCommentary, setCustomCommentary] = useState("");
  const [lastBallResult, setLastBallResult] = useState("");
  
  // 1. DYNAMIC INITIAL STATE: Reads the user's specific match from their phone
  const [liveMatch, setLiveMatch] = useState({
    id: localStorage.getItem('activeMatchId') || 1, 
    teamA: "Fetching...", 
    teamB: "Please Wait",
    runs: 0, 
    wickets: 0, 
    balls: 0, 
    venue: "Chinnaswamy Stadium", 
    leagueName: "Local League"
  });

  const [timeline, setTimeline] = useState([]);
  const [jobs, setJobs] = useState([]);

  // 2. FETCHES THE SPECIFIC MATCH FROM SPRING BOOT
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
            teamA: data.teamA,
            teamB: data.teamB,
            runs: data.runsA || prev.runs,
            wickets: data.wicketsA || prev.wickets,
            balls: data.ballsA || prev.balls
          }));
        }
      } catch (err) {
        console.error("Backend sleeping, relying on flawless local UI state.");
      }
    };
    fetchInitialData();
  }, []);

  const updateDatabaseScore = async (newRuns, newWickets, newBalls, ballEvent = "") => {
    setLastBallResult(ballEvent);
    
    // Instant UI Update
    setLiveMatch(prev => ({
      ...prev,
      runs: newRuns,
      wickets: newWickets,
      balls: newBalls
    }));

    const overStr = `${Math.floor((newBalls - 1) / 6)}.${((newBalls - 1) % 6) + 1}`;
    const actionText = customCommentary || (ballEvent === 'W' ? "WICKET! Huge breakthrough!" : `${ballEvent} runs scored.`);
    
    setTimeline(prev => [{
      id: Date.now(),
      overDisplay: overStr,
      commentaryEn: actionText,
      commentaryKn: "" 
    }, ...prev]);

    // 3. UPDATES THE SPECIFIC MATCH IN THE CLOUD
    try {
      fetch(`${API_BASE_URL}/matches/update-live`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: liveMatch.id, // Uses the dynamic ID here!
          runsA: newRuns,
          wicketsA: newWickets,
          ballsA: newBalls
        })
      });
    } catch (error) {
      // Ignored for seamless UI
    }
    
    setCustomCommentary("");
  };

  const addLeagueEvent = async (newEvent) => {};

  return (
    <AppContext.Provider value={{ 
      jobs, liveMatch, setLiveMatch, timeline, customCommentary, 
      setCustomCommentary, lastBallResult, setLastBallResult, 
      addLeagueEvent, updateDatabaseScore, user 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
