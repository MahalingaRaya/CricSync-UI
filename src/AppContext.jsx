import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();
const API_BASE_URL = "https://cricsync-engine.onrender.com/api/matches"; 

export const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState([
    { role: "Commentator (Kannada)", league: "Bengaluru T20 League", venue: "Chinnaswamy Stadium", pay: "3,500/Match" },
    { role: "Umpire Required", league: "Bangalore Corporate Cup", venue: "Gopalan Sports Ground", pay: "2,500/Match" },
    { role: "Scorer Required", league: "Whitefield Premier League", venue: "Varthur Ground", pay: "1,200/Match" }
  ]);

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

  // NEW: Global state variable to capture your custom Broadcaster input strings dynamically!
  const [customCommentary, setCustomCommentary] = useState("");

  const fetchActiveMatch = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/active`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setLiveMatch({
            id: data.id,
            teamA: data.teamA || data.teamAName || "MahaTech Mahi", 
            teamB: data.teamB || data.teamBName || "CricSync",
            runs: data.runsA !== undefined ? data.runsA : 0,       
            wickets: data.wicketsA !== undefined ? data.wicketsA : 0, 
            balls: data.ballsA !== undefined ? data.ballsA : 0,     
            venue: data.status || "LIVE",
            leagueName: data.leagueName || "Corporate Premier League 2K26"
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

  const addLeagueEvent = async (newEvent) => {
    const inputTeamA = newEvent.teamA || "MahaTech Mahi";
    const inputTeamB = newEvent.teamB || "CricSync";
    const inputLeague = newEvent.league || "Corporate Premier League 2K26";
    const inputVenue = newEvent.venue || "International Stadium Bengaluru";

    const jobFormat = { role: "Official Required", league: inputLeague, venue: inputVenue, pay: "TBD" };
    setJobs((prevJobs) => [jobFormat, ...prevJobs]);

    // Clear previous custom text when a brand new match begins
    setCustomCommentary("");

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
          teamA: savedMatch.teamA || savedMatch.teamAName || inputTeamA,
          teamB: savedMatch.teamB || savedMatch.teamBName || inputTeamB,
          runs: savedMatch.runsA ?? 0,
          wickets: savedMatch.wicketsA ?? 0,
          balls: savedMatch.ballsA ?? 0,
          venue: savedMatch.status || "LIVE",
          leagueName: savedMatch.leagueName || inputLeague
        });
      }
    } catch (error) {
      console.error("Failed to persist match parameters live:", error);
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
          teamA: updatedMatch.teamA || updatedMatch.teamAName || liveMatch.teamA,
          teamB: updatedMatch.teamB || updatedMatch.teamBName || liveMatch.teamB,
          runs: updatedMatch.runsA ?? newRuns,
          wickets: updatedMatch.wicketsA ?? newWickets,
          balls: updatedMatch.ballsA ?? newBalls,
          venue: updatedMatch.status || liveMatch.venue,
          leagueName: updatedMatch.leagueName || liveMatch.leagueName
        });
        
        // Reset custom input text on a fresh score change to allow dynamic default messages
        setCustomCommentary("");
      }
    } catch (error) {
      console.error("Failed to sync score changes securely:", error);
    }
  };

  return (
    <AppContext.Provider value={{ jobs, liveMatch, setLiveMatch, customCommentary, setCustomCommentary, addLeagueEvent, updateDatabaseScore }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
