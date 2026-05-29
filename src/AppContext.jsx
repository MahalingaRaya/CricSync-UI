import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();
const API_BASE_URL = "https://cricsync-engine.onrender.com/api/matches"; 

export const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [user, setUser] = useState({ username: "MahaTech Mahi", role: "ORGANIZER" });
  
  const [liveMatch, setLiveMatch] = useState({
    id: null, 
    teamA: "MahaTech Mahi", 
    teamB: "CricSync",
    runs: 0, 
    wickets: 0, 
    balls: 0, 
    venue: "LIVE", 
    leagueName: "Corporate Premier League 2K26"
  });

  const [customCommentary, setCustomCommentary] = useState("");
  const [lastBallResult, setLastBallResult] = useState("");

  // CENTRAL DATA DESK: Polls scores, permanent logs, and job boards simultaneously
  const fetchEcosystemData = async () => {
    try {
      // 1. Fetch current active match configuration fields
      const matchRes = await fetch(`${API_BASE_URL}/active`);
      if (matchRes.ok) {
        const data = await matchRes.json();
        if (data) {
          const activeMatchId = data.id;
          
          setLiveMatch({
            id: activeMatchId,
            teamA: data.teamA || "MahaTech Mahi",
            teamB: data.teamB || "CricSync",
            runs: data.runsA !== undefined ? data.runsA : 0,
            wickets: data.wicketsA !== undefined ? data.wicketsA : 0,
            balls: data.ballsA !== undefined ? data.ballsA : 0,
            venue: data.venue || "LIVE", // FIXED: Changed from data.status to data.venue to match your entity data
            leagueName: data.leagueName || "Corporate Premier League 2K26"
          });

          // 2. Fetch the historical ball-by-ball timeline logs array dynamically
          if (activeMatchId) {
            const timelineRes = await fetch(`${API_BASE_URL}/${activeMatchId}/timeline`);
            if (timelineRes.ok) {
              const logs = await timelineRes.json();
              setTimeline(logs);
            }
          }
        }
      }

      // 3. Fetch dynamic marketplace items directly from the database
      const jobsRes = await fetch(`${API_BASE_URL}/marketplace`);
      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        setJobs(jobsData);
      }
    } catch (err) {
      console.error("Failed to sync client endpoints with cloud engine:", err);
    }
  };

  // Poll the backend every 3000ms safely
  useEffect(() => {
    fetchEcosystemData();
    const interval = setInterval(fetchEcosystemData, 3000);
    return () => clearInterval(interval);
  }, []);

  // MASTER PUBLISH SYNC: Maps custom payload parameters to standard backend entities exactly
  const addLeagueEvent = async (newEvent) => {
    const inputTeamA = newEvent.teamA || "MahaTech Mahi";
    const inputTeamB = newEvent.teamB || "CricSync";
    const inputLeague = newEvent.league || "Corporate Premier League 2K26";
    const inputVenue = newEvent.venue || "International Stadium Bengaluru";

    setCustomCommentary("");
    setLastBallResult("");

    const matchPayload = {
      teamA: inputTeamA,
      teamB: inputTeamB,
      leagueName: inputLeague,
      venue: inputVenue,
      runsA: 0,
      wicketsA: 0,
      ballsA: 0
    };

    try {
      // FIXED: Pointing route targeting to /create to match your consolidated MatchController endpoint mapping
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matchPayload)
      });
      
      if (response.ok) {
        // Automatically generate a dynamic hiring role item inside the database marketplace table
        const jobPayload = {
          roleRequired: "Kannada Commentator Required",
          leagueName: inputLeague,
          venue: inputVenue,
          payPerMatch: "3,500/Match"
        };

        await fetch(`${API_BASE_URL}/marketplace/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jobPayload)
        });

        // Re-trigger an immediate calculation to update the Dashboard view screens instantly
        await fetchEcosystemData();
      }
    } catch (error) {
      console.error("Failed to persist match parameters live:", error);
    }
  };

  const updateDatabaseScore = async (newRuns, newWickets, newBalls, ballEvent = "") => {
    setLastBallResult(ballEvent);
    setCustomCommentary(""); 

    try {
      const response = await fetch(
        `${API_BASE_URL}/update-live?id=${liveMatch.id}&runs=${newRuns}&wickets=${newWickets}&balls=${newBalls}&lastBallEvent=${ballEvent}`, 
        { method: 'PUT' }
      );
      if (response.ok) {
        await fetchEcosystemData(); // Keep frontend UI completely aligned with data changes
      }
    } catch (error) {
      console.error("Failed to sync score changes securely:", error);
    }
  };

  return (
    <AppContext.Provider value={{ jobs, liveMatch, timeline, customCommentary, setCustomCommentary, lastBallResult, setLastBallResult, addLeagueEvent, updateDatabaseScore, user }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
