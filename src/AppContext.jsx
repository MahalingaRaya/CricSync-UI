import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

const API_BASE_URL = "https://cricsync-engine.onrender.com/api/matches"; 

export const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState([
    { role: "Commentator Required", league: "BENGALURU PREMIER LEAGUE", venue: "ITPL", pay: "3,000/Day" },
    { role: "Umpire Required", league: "Bangalore Corporate Cup", venue: "Chinnaswamy Stadium", pay: "2,500/Match" },
    { role: "Scorer Required", league: "Whitefield Premier League", venue: "Varthur Sports Ground", pay: "1,200/Match" }
  ]);

  const [liveMatch, setLiveMatch] = useState({
    id: null,
    teamA: "Team A",
    teamB: "Team B",
    runs: 0,
    wickets: 0,
    balls: 0,
    venue: "LIVE"
  });

  const fetchActiveMatch = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/active`);
      if (response.ok) {
        const data = await response.json();
        
        // Dynamic Fallbacks: Tries both naming variations (teamA vs teamAName) 
        // to instantly clear the "Loading..." text from your screen.
        setLiveMatch({
          id: data.id,
          teamA: data.teamA || data.teamAName || "Team A", 
          teamB: data.teamB || data.teamBName || "Team B",
          runs: data.runsA !== undefined ? data.runsA : (data.runs !== undefined ? data.runs : 0),       
          wickets: data.wicketsA !== undefined ? data.wicketsA : (data.wickets !== undefined ? data.wickets : 0), 
          balls: data.ballsA !== undefined ? data.ballsA : (data.balls !== undefined ? data.balls : 0),     
          venue: data.status || "LIVE"
        });
      }
    } catch (error) {
      console.error("Error connecting to live CricSync API Engine:", error);
    }
  };

  useEffect(() => {
    fetchActiveMatch();
    const interval = setInterval(fetchActiveMatch, 3000);
    return () => clearInterval(interval);
  }, []);

  const addLeagueEvent = async (newEvent) => {
    setJobs((prevJobs) => [newEvent, ...prevJobs]);

    // Construct the payload to send both naming variants so the database saves it cleanly
    const matchPayload = {
      status: "LIVE",
      teamA: newEvent.teamA || "Team A",
      teamAName: newEvent.teamA || "Team A",
      teamB: newEvent.teamB || "Team B",
      teamBName: newEvent.teamB || "Team B",
      runsA: 0,
      wicketsA: 0,
      ballsA: 0
    };

    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matchPayload)
      });
      if (response.ok) {
        const savedMatch = await response.json();
        setLiveMatch({
          id: savedMatch.id,
          teamA: savedMatch.teamA || savedMatch.teamAName,
          teamB: savedMatch.teamB || savedMatch.teamBName,
          runs: savedMatch.runsA ?? 0,
          wickets: savedMatch.wicketsA ?? 0,
          balls: savedMatch.ballsA ?? 0,
          venue: savedMatch.status
        });
      }
    } catch (error) {
      console.error("Failed to persist tournament to cloud storage:", error);
    }
  };

  const updateDatabaseScore = async (newRuns, newWickets, newBalls) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update?runs=${newRuns}&wickets=${newWickets}&balls=${newBalls}`, {
        method: 'PUT'
      });
      if (response.ok) {
        const updatedMatch = await response.json();
        setLiveMatch({
          id: updatedMatch.id,
          teamA: updatedMatch.teamA || updatedMatch.teamAName,
          teamB: updatedMatch.teamB || updatedMatch.teamBName,
          runs: updatedMatch.runsA ?? 0,
          wickets: updatedMatch.wicketsA ?? 0,
          balls: updatedMatch.ballsA ?? 0,
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

export const useApp = () => useContext(AppContext);
