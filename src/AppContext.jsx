import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();
const API_BASE_URL = "https://cricsync-engine.onrender.com/api/matches"; 

public const AppProvider = ({ children }) => {
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

  const fetchEcosystemData = async () => {
    try {
      const matchRes = await fetch(`${API_BASE_URL}/active`);
      if (matchRes.ok) {
        const data = await matchRes.json();
        if (data) {
          setLiveMatch({
            id: data.id,
            teamA: data.teamA || "MahaTech Mahi",
            teamB: data.teamB || "CricSync",
            runs: data.runs !== undefined ? data.runs : 0,
            wickets: data.wickets !== undefined ? data.wickets : 0,
            balls: data.balls !== undefined ? data.balls : 0,
            venue: data.venue || "LIVE",
            leagueName: data.leagueName || "Corporate Premier League 2K26"
          });

          if (data.id) {
            const timelineRes = await fetch(`${API_BASE_URL}/${data.id}/timeline`);
            if (timelineRes.ok) {
              const logs = await timelineRes.json();
              setTimeline(logs);
            }
          }
        }
      }

      const jobsRes = await fetch(`${API_BASE_URL}/marketplace`);
      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        setJobs(jobsData);
      }
    } catch (err) {
      console.error("Sync error:", err);
    }
  };

  useEffect(() => {
    fetchEcosystemData();
    const interval = setInterval(fetchEcosystemData, 3000);
    return () => clearInterval(interval);
  }, []);

  const addLeagueEvent = async (newEvent) => {
    const matchPayload = {
      teamA: newEvent.teamA || "MahaTech Mahi",
      teamB: newEvent.teamB || "CricSync",
      leagueName: newEvent.league || "Corporate Premier League 2K26",
      venue: newEvent.venue || "Bengaluru Stadium"
    };

    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matchPayload)
      });
      if (response.ok) {
        await fetchEcosystemData();
      }
    } catch (error) {
      console.error("Publish error:", error);
    }
  };

  const updateDatabaseScore = async (newRuns, newWickets, newBalls, ballEvent = "") => {
    setLastBallResult(ballEvent);
    try {
      const response = await fetch(
        `${API_BASE_URL}/update-live?id=${liveMatch.id}&runs=${newRuns}&wickets=${newWickets}&balls=${newBalls}&lastBallEvent=${ballEvent}`, 
        { method: 'PUT' }
      );
      if (response.ok) {
        await fetchEcosystemData();
      }
    } catch (error) {
      console.error("Score update error:", error);
    }
  };

  return (
    <AppContext.Provider value={{ jobs, liveMatch, timeline, customCommentary, setCustomCommentary, lastBallResult, setLastBallResult, addLeagueEvent, updateDatabaseScore, user }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
