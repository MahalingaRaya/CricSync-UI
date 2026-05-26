import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

const API_BASE_URL = "https://cricsync-engine.onrender.com/api/matches"; 

export const AppProvider = ({ children }) => {
  // Marketplace entries (Hires & Seekers ecosystem placeholder)
  const [jobs, setJobs] = useState([
    { role: "Commentator Required", league: "BENGALURU PREMIER LEAGUE", venue: "ITPL", pay: "3,000/Day" },
    { role: "Umpire Required", league: "Bangalore Corporate Cup", venue: "Chinnaswamy Stadium", pay: "2,500/Match" },
    { role: "Scorer Required", league: "Whitefield Premier League", venue: "Varthur Sports Ground", pay: "1,200/Match" }
  ]);

  const [liveMatch, setLiveMatch] = useState({
    id: null,
    teamA: "Loading...",
    teamB: "Loading...",
    runs: 0,
    wickets: 0,
    balls: 0,
    venue: "Fetching Live Score...",
    status: "UPCOMING"
  });

  const fetchActiveMatch = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/active`);
      if (response.ok) {
        const data = await response.json();
        
        // Match these fields precisely with what your Feed layout displays
        setLiveMatch({
          id: data.id,
          teamA: data.teamA || "Team A", 
          teamB: data.teamB || "Team B",
          runs: data.runsA ?? 0,       
          wickets: data.wicketsA ?? 0, 
          balls: data.ballsA ?? 0,     
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

    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: "LIVE",
          teamA: newEvent.teamA || "Team A",
          teamB: newEvent.teamB || "Team B",
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

export const useApp = () => useContext(AppContext);
