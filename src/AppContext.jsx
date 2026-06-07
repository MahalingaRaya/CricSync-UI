import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();
const API_BASE_URL = "https://cricsync-engine.onrender.com/api"; 

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "Mahalinga Raya", role: "ORGANIZER" });
  const [customCommentary, setCustomCommentary] = useState("");
  const [history, setHistory] = useState([]);
  
  const [liveMatch, setLiveMatch] = useState({
    id: localStorage.getItem('activeMatchId') || 1, 
    maxOvers: parseInt(localStorage.getItem('matchMaxOvers')) || 2,
    innings: 1, target: 0,
    teamA: "Fetching...", teamB: "Please Wait",
    runs: 0, wickets: 0, balls: 0, 
    leagueName: "Local League"
  });

  const [timeline, setTimeline] = useState([]);
  
  // Master Array holds all stats permanently
  const [allPlayers, setAllPlayers] = useState([]);
  const [striker, setStriker] = useState(null);
  const [nonStriker, setNonStriker] = useState(null);
  const [currentBowler, setCurrentBowler] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const activeId = localStorage.getItem('activeMatchId') || 1;
        const matchRes = await fetch(`${API_BASE_URL}/matches/${activeId}`);
        if (matchRes.ok) {
          const matchData = await matchRes.json();
          setLiveMatch(prev => ({ ...prev, id: matchData.id, maxOvers: matchData.maxOvers || prev.maxOvers, teamA: matchData.teamA, teamB: matchData.teamB, runs: matchData.runsA || prev.runs, wickets: matchData.wicketsA || prev.wickets, balls: matchData.ballsA || prev.balls }));
        }

        const playerRes = await fetch(`${API_BASE_URL}/match-players/match/${activeId}`);
        if (playerRes.ok) {
          const players = await playerRes.json();
          setAllPlayers(players);
        }
      } catch (err) { console.error("Backend sleeping."); }
    };
    fetchInitialData();
  }, []);

  const isTeamABatting = liveMatch.innings === 1;
  const battingTeamName = isTeamABatting ? liveMatch.teamA : liveMatch.teamB;
  const bowlingTeamName = isTeamABatting ? liveMatch.teamB : liveMatch.teamA;
  
  const battingRoster = allPlayers.filter(p => p.teamName === battingTeamName);
  const bowlingRoster = allPlayers.filter(p => p.teamName === bowlingTeamName);

  // 🔥 THE FIX: eventText now accepts bilingual objects {en, kn}
  const processDelivery = async ({ batterRuns = 0, extraRuns = 0, isLegal = true, physicalRuns = 0, isWicket = false, isByeOrLegBye = false, eventText = { en: "", kn: "" } }) => {
    setHistory(prev => [...prev, { match: liveMatch, striker, nonStriker, currentBowler, allPlayers }]);

    const totalRunsThisBall = batterRuns + extraRuns;
    const newRuns = liveMatch.runs + totalRunsThisBall;
    const newWickets = liveMatch.wickets + (isWicket ? 1 : 0);
    const newBalls = liveMatch.balls + (isLegal ? 1 : 0);
    const isEndOfOver = (newBalls % 6 === 0) && isLegal;

    let updatedStriker = { ...striker };
    let updatedBowler = { ...currentBowler };

    if (striker) {
      updatedStriker.runsScored += batterRuns;
      if (isLegal || (!isLegal && extraRuns > 1)) updatedStriker.ballsFaced += 1;
      if (batterRuns === 4) updatedStriker.fours += 1;
      if (batterRuns === 6) updatedStriker.sixes += 1;
    }
    
    if (currentBowler) {
      const runsAgainstBowler = isByeOrLegBye ? 0 : totalRunsThisBall;
      updatedBowler.runsConceded += runsAgainstBowler;
      if (isWicket) updatedBowler.wicketsTaken += 1;
      if (isLegal) {
        let completedOvers = Math.floor(updatedBowler.oversBowled);
        let currentBalls = Math.round((updatedBowler.oversBowled - completedOvers) * 10) + 1;
        updatedBowler.oversBowled = currentBalls === 6 ? completedOvers + 1.0 : completedOvers + (currentBalls / 10);
      }
    }

    setLiveMatch(prev => ({ ...prev, runs: newRuns, wickets: newWickets, balls: newBalls }));

    let swapNeeded = (physicalRuns % 2 !== 0);
    if (isEndOfOver) swapNeeded = !swapNeeded;

    let nextStriker = swapNeeded ? nonStriker : updatedStriker;
    let nextNonStriker = swapNeeded ? updatedStriker : nonStriker;

    setStriker(nextStriker);
    setNonStriker(nextNonStriker);
    setCurrentBowler(isEndOfOver ? null : updatedBowler);

    setAllPlayers(prev => prev.map(p => 
      p.id === updatedStriker.id ? updatedStriker : 
      p.id === updatedBowler?.id ? updatedBowler : 
      p
    ));

    // 🔥 THE FIX: Routing English and Kannada strings to the timeline
    const overStr = `${Math.floor((newBalls - (isLegal ? 1 : 0)) / 6)}.${((newBalls - (isLegal ? 1 : 0)) % 6) + (isLegal ? 1 : 0)}`;
    const actionTextEn = customCommentary || eventText.en;
    const actionTextKn = customCommentary || eventText.kn || eventText.en; // Fallback to English if Kannada is missing
    
    setTimeline(prev => [{ id: Date.now(), overDisplay: overStr, commentaryEn: actionTextEn, commentaryKn: actionTextKn }, ...prev]);
    
    syncToBackend(newRuns, newWickets, newBalls);
    setCustomCommentary("");
  };

  const undoLastAction = () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setLiveMatch(previousState.match); setStriker(previousState.striker); setNonStriker(previousState.nonStriker); setCurrentBowler(previousState.currentBowler);
    setAllPlayers(previousState.allPlayers);
    setTimeline(prev => prev.slice(1));
    syncToBackend(previousState.match.runs, previousState.match.wickets, previousState.match.balls);
  };

  const syncToBackend = (runs, wickets, balls) => {
    const updatePayload = liveMatch.innings === 1 ? { id: liveMatch.id, runsA: runs, wicketsA: wickets, ballsA: balls } : { id: liveMatch.id, runsB: runs, wicketsB: wickets, ballsB: balls };
    try { fetch(`${API_BASE_URL}/matches/update-live`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatePayload) }); } catch (error) {}
  };

  const startSecondInnings = () => {
    setHistory([]); setStriker(null); setNonStriker(null); setCurrentBowler(null);
    setLiveMatch(prev => ({ ...prev, innings: 2, target: prev.runs + 1, runs: 0, wickets: 0, balls: 0 }));
    setTimeline([{ id: Date.now(), overDisplay: "0.0", commentaryEn: "Run chase begins!", commentaryKn: "ರನ್ ಚೇಸ್ ಪ್ರಾರಂಭ!" }]);
  };

  return (
    <AppContext.Provider value={{ 
      liveMatch, timeline, customCommentary, setCustomCommentary, processDelivery, undoLastAction, history, startSecondInnings, user,
      battingRoster, bowlingRoster, striker, setStriker, nonStriker, setNonStriker, currentBowler, setCurrentBowler, allPlayers
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
