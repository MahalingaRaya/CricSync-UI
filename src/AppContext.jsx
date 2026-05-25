import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Global State for Available Jobs/Leagues
  const [jobs, setJobs] = useState([
    { role: "Umpire Required", league: "Bangalore Corporate Cup", venue: "Chinnaswamy Stadium", pay: "2,500/Match", status: "Open" },
    { role: "Scorer Required", league: "Whitefield Premier League", venue: "Varthur Sports Ground", pay: "1,200/Match", status: "Open" },
    { role: "Commentator Wanted", league: "Karnataka State T20", venue: "Alur Grounds", pay: "3,000/Day", status: "Open" }
  ]);

  // Global State for the current active match score
  const [liveMatch, setLiveMatch] = useState({
    teamA: "RCB",
    teamB: "CSK",
    runs: 186,
    wickets: 4,
    balls: 111, // 18.3 overs
    venue: "Chinnaswamy Stadium"
  });

  // Action to add a new event/job from Organizer panel
  const addLeagueEvent = (newEvent) => {
    setJobs((prevJobs) => [newEvent, ...prevJobs]);
    setLiveMatch({
      teamA: newEvent.teamA,
      teamB: newEvent.teamB,
      runs: 0,
      wickets: 0,
      balls: 0,
      venue: newEvent.venue
    });
  };

  return (
    <AppContext.Provider value={{ jobs, setJobs, liveMatch, setLiveMatch, addLeagueEvent }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
