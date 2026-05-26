import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

// Pointing directly to your live Render environment URL
const API_BASE_URL = "https://cricsync-engine.onrender.com/api/matches"; 

export const AppProvider = ({ children }) => {
  // Keeps your existing hardcoded placeholder array running seamlessly
  const [jobs, setJobs] = useState([
    { role: "Umpire Required", league: "Bangalore Corporate Cup", venue: "Chinnaswamy Stadium", pay: "2,500/Match" },
    { role: "Scorer Required", league: "Whitefield Premier League", venue: "Varthur Sports Ground", pay: "1,200/Match" }
  ]);

  // Global live match state mapped to work seamlessly with UI components
  const [liveMatch, setLiveMatch] = useState({
    id: null,
    teamA: "Loading...",
    teamB: "Loading...",
    runs: 0,
    wickets: 0,
    balls: 0,
    venue: "Fetching Live Score..."
  });

  // Pull active match from your live Render URL & map your Java database fields safely
  const fetchActiveMatch = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/active`);
      if (response.ok) {
        const data = await response.json();
        
        // Maps backend structural model properties into local frontend state variables
        setLiveMatch({
          id: data.id,
          teamA: data.teamA,
          teamB: data.teamB,
          runs: data.runsA,       // Safely reads your database's runsA
          wickets: data.wicketsA, // Safely reads your database's wicketsA
          balls: data.ballsA,     // Safely reads your database's ballsA
          venue: data.status      // Displays the status string ("LIVE", "COMPLETED", etc.)
        });
      }
    } catch (error) {
      console.error("Error connecting to live CricSync API Engine:", error);
    }
  };

  // Poll backend database every 3 seconds to keep match scores live across devices
  useEffect(() => {
    fetchActiveMatch();
    const interval = setInterval(fetchActiveMatch, 3000);
    return () => clearInterval(interval);
  }, []);

  // Action: Post tournament layout from Form and synchronize state directly with cloud data
  const addLeagueEvent = async (newEvent) => {
    setJobs((prevJobs) => [newEvent, ...prevJobs]);

    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leagueName: newEvent.league,
          teamA: newEvent.teamA,
          teamB: newEvent.teamB,
          venue: newEvent.venue,
          runsA: 0,
          wicketsA: 0,
          ballsA: 0
        })
      });
      if (response.ok) {
        const savedMatch = await response.json();
        setLiveMatch({
          id: savedMatch.id,
          teamA: savedMatch.teamA,
          teamB: savedMatch.teamB,
          runs: savedMatch.runsA,
          wickets: savedMatch.wicketsA,
          balls: savedMatch.ballsA,
          venue: savedMatch.status
        });
      }
    } catch (error) {
      console.error("Failed to persist tournament to cloud storage:", error);
    }
  };

  // Action: Push button adjustments directly to live server query params
  const updateDatabaseScore = async (newRuns, newWickets, newBalls) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update?runs=${newRuns}&wickets=${newWickets}&balls=${newBalls}`, {
        method: 'PUT'
      });
      if (response.ok) {
        const updatedMatch = await response.json();
        setLiveMatch({
          id: updatedMatch.id,
          teamA: updatedMatch.teamA,
          teamB: updatedMatch.teamB,
          runs: updatedMatch.runsA,
          wickets: updatedMatch.wicketsA,
          balls: updatedMatch.ballsA,
          venue: updatedMatch.status
        });
      }
    } catch (error) {
      console.error("Failed to synchronize scorecard with database:", error);
    }
  };

  return (
    <AppContext.Provider value={{ jobs, liveMatch, setLiveMatch, addLeagueEvent, updateDatabaseScore }}>
      {children}
    </AppContext.Provider>
  );
};

// FIXED: Removed 'public' keyword. Standard JavaScript export for custom context hook.
export const useApp = () => useContext(AppContext);
