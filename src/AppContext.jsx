import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

// Change this URL to your live backend Render URL once deployed, e.g., "https://cricsync-backend.render.com"
const API_BASE_URL = "http://localhost:8080/api/matches"; 

export const AppProvider = ({ children }) => {
  // Hardcoded placeholders for available job postings
  const [jobs, setJobs] = useState([
    { role: "Umpire Required", league: "Bangalore Corporate Cup", venue: "Chinnaswamy Stadium", pay: "2,500/Match" },
    { role: "Scorer Required", league: "Whitefield Premier League", venue: "Varthur Sports Ground", pay: "1,200/Match" }
  ]);

  // Global live match state initialized with loading indicators
  const [liveMatch, setLiveMatch] = useState({
    id: null,
    teamA: "Loading...",
    teamB: "Loading...",
    runs: 0,
    wickets: 0,
    balls: 0,
    venue: "Fetching Live Score..."
  });

  // Function to pull current active match details from MySQL via Spring Boot
  const fetchActiveMatch = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/active`);
      if (response.ok) {
        const data = await response.json();
        setLiveMatch(data);
      }
    } catch (error) {
      console.error("Error connecting to CricSync API:", error);
    }
  };

  // Poll backend database every 3 seconds to keep match scores live across all devices
  useEffect(() => {
    fetchActiveMatch();
    const interval = setInterval(fetchActiveMatch, 3000);
    return () => clearInterval(interval);
  }, []);

  // Action: Save a newly broadcasted tournament match directly to MySQL database
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
          runs: 0,
          wickets: 0,
          balls: 0
        })
      });
      if (response.ok) {
        const savedMatch = await response.json();
        setLiveMatch(savedMatch);
      }
    } catch (error) {
      console.error("Failed to persist tournament to cloud storage:", error);
    }
  };

  // Action: Push live ball-by-ball score adjustments directly to database
  const updateDatabaseScore = async (newRuns, newWickets, newBalls) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update?runs=${newRuns}&wickets=${newWickets}&balls=${newBalls}`, {
        method: 'PUT'
      });
      if (response.ok) {
        const updatedMatch = await response.json();
        setLiveMatch(updatedMatch);
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
