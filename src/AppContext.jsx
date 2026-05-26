import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();
const API_BASE_URL = "https://cricsync-engine.onrender.com/api/matches"; 

export const AppProvider = ({ children }) => {
  // 1. Marketplace state for Hires & Seekers ecosystem
  const [jobs, setJobs] = useState([
    { role: "Commentator (Kannada)", league: "Bengaluru T20 League", venue: "Chinnaswamy Stadium", pay: "3,500/Match" },
    { role: "Umpire Required", league: "Bangalore Corporate Cup", venue: "Gopalan Sports Ground", pay: "2,500/Match" },
    { role: "Scorer Required", league: "Whitefield Premier League", venue: "Varthur Ground", pay: "1,200/Match" }
  ]);

  // 2. Global live match state with classic local defaults
  const [liveMatch, setLiveMatch] = useState({
    id: null,
    teamA: "RCB",
    teamB: "CSK",
    runs: 0,
    wickets: 0,
    balls: 0,
    venue: "LIVE",
    leagueName: "Indian Premier League"
  });

  // 3. Fetching from Live Database Engine
  const fetchActiveMatch = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/active`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setLiveMatch({
            id: data.id,
            teamA: data.teamA || data.teamAName || "RCB", 
            teamB: data.teamB || data.teamBName || "CSK",
            runs: data.runsA !== undefined ? data.runsA : 0,       
            wickets: data.wicketsA !== undefined ? data.wicketsA : 0, 
            balls: data.ballsA !== undefined ? data.ballsA : 0,     
            venue: data.status || "LIVE",
            leagueName: data.leagueName || "T20 Match"
          });
        }
      }
    } catch (error) {
      console.error("Error fetching live scorecard:", error);
    }
  };

  useEffect(() => {
    fetchActiveMatch();
    const interval = setInterval(fetchActiveMatch, 3000);
    return () => clearInterval(interval);
  }, []);

  // 4. Action: Catch form inputs dynamically and save to database
  const addLeagueEvent = async (newEvent) => {
    // Fallback tracker: Extracts text regardless of what your form keys are named!
    const inputTeamA = newEvent.teamA || newEvent.teamOne || newEvent.team1 || newEvent.hostTeam || "RCB";
    const inputTeamB = newEvent.teamB || newEvent.teamTwo || newEvent.team2 || newEvent.visitorTeam || "CSK";
    const inputLeague = newEvent.league || newEvent.leagueName || newEvent.tournament || "Local League";
    const inputVenue = newEvent.venue || "Bengaluru";

    // Prepend to marketplace array
    const jobFormat = { role: "Official Required", league: inputLeague, venue: inputVenue, pay: "TBD" };
    setJobs((prevJobs) => [jobFormat, ...prevJobs]);

    // Build perfect JSON payload matching your Spring Boot JPA model
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
        const savedMatch = await response.json();
        setLiveMatch({
          id: savedMatch.id,
          teamA: savedMatch.teamA || savedMatch.teamAName,
          teamB: savedMatch.teamB || savedMatch.teamBName,
          runs: savedMatch.runsA ?? 0,
          wickets: savedMatch.wicketsA ?? 0,
          balls: savedMatch.ballsA ?? 0,
          venue: savedMatch.status,
          leagueName: savedMatch.leagueName
        });
      }
    } catch (error) {
      console.error("Failed to persist match parameters live:", error);
    }
  };

  // 5. Action: Update Scorecard live from Scorer panel
  const updateDatabaseScore = async (newRuns, newWickets, newBalls) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update?runs=${newRuns}&wickets=${newWickets}&balls=${newBalls}`, {
        method: 'PUT'
      });
      if (response.ok) {
        const updatedMatch = await response.json();
        setLiveMatch({
          id: updatedMatch.id,
          teamA: updatedMatch.teamA || updatedMatch.teamAName || "RCB",
          teamB: updatedMatch.teamB || updatedMatch.teamBName || "CSK",
          runs: updatedMatch.runsA ?? 0,
          wickets: updatedMatch.wicketsA ?? 0,
          balls: updatedMatch.ballsA ?? 0,
          venue: updatedMatch.status,
          leagueName: updatedMatch.leagueName
        });
      }
    } catch (error) {
      console.error("Failed to sync score changes securely:", error);
    }
  };

  return (
    <AppContext.Provider value={{ jobs, liveMatch, setLiveMatch, addLeagueEvent, updateDatabaseScore }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
