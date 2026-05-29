import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();
const API_BASE_URL = "https://cricsync-engine.onrender.com/api/matches"; 

export const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [user, setUser] = useState({ username: "MahaTech Mahi", role: "ORGANIZER" }); // Default Session State
  
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

  // Fetches live scores, permanent database logs, and available jobs simultaneously
  const fetchEcosystemData = async () => {
    try {
      // 1. Fetch current active game metrics
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
            venue: data.status || "LIVE",
            leagueName: data.leagueName || "Corporate Premier League 2K26"
          });

          // 2. Fetch the historical ball-by-ball timeline array for this active ID
          if (activeMatchId) {
            const timelineRes = await fetch(`${API_BASE_URL}/${activeMatchId}/timeline`);
            if (timelineRes.ok) {
              const logs = await timelineRes.json();
              setTimeline(logs);
            }
          }
        }
      }

      // 3. Fetch public dynamic marketplace hiring openings from the database
      const jobsRes = await fetch(`${API_BASE_URL}/marketplace`);
      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        setJobs(jobsData);
      }
    } catch (err) {
      console.error("Failed to sync client with cricsync ecosystem endpoints:", err);
    }
  };

  // Poll the database engine completely every 3 seconds
  useEffect(() => {
    fetchEcosystemData();
    const interval = setInterval(fetchEcosystemData, 3000);
    return () => clearInterval(interval);
  }, []);

  const addLeagueEvent = async (newEvent) => {
    const inputTeamA = newEvent.teamA || "MahaTech Mahi";
    const inputTeamB = newEvent.teamB || "CricSync";
    const inputLeague = newEvent.league || "Corporate Premier League 2K26";
    const inputVenue = newEvent.venue || "International Stadium Bengaluru";

    setCustomCommentary("");
    setLastBallResult("");

    const matchPayload = {
      status: "LIVE",
      teamA: inputTeamA,
      teamAName: inputTeamA,
      teamB: inputTeamB,
      teamBName: inputTeamB,
      leagueName: inputLeague,
      venue: inputVenue,
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
        await fetchEcosystemData(); // Trigger full refresh to align states immediately
      }
    } catch (error) {
      console.error("Failed to persist match parameters live:", error);
    }
  };

  // Pushes changes straight to your updated database logging logic endpoint
  const updateDatabaseScore = async (newRuns, newWickets, newBalls, ballEvent = "") => {
    setLastBallResult(ballEvent);
    setCustomCommentary(""); 

    try {
      const response = await fetch(
        `${API_BASE_URL}/update-live?id=${liveMatch.id}&runs=${newRuns}&wickets=${newWickets}&balls=${newBalls}&lastBallEvent=${ballEvent}`, 
        { method: 'PUT' }
      );
      if (response.ok) {
        // Clear internal states to pull freshly generated database strings cleanly
        const updatedMatch = await response.json();
        setLiveMatch({
          id: updatedMatch.id,
          teamA: updatedMatch.teamA || liveMatch.teamA,
          teamB: updatedMatch.teamB || liveMatch.teamB,
          runs: updatedMatch.runsA ?? newRuns,
          wickets: updatedMatch.wicketsA ?? newWickets,
          balls: updatedMatch.ballsA ?? newBalls,
          venue: updatedMatch.status || liveMatch.venue,
          leagueName: updatedMatch.leagueName || liveMatch.leagueName
        });
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
