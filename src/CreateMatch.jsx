  const handleCreateMatch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://cricsync-engine.onrender.com/api/matches/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamA: teamA || "Team A",
          teamB: teamB || "Team B",
          maxOvers: Number(overs),
          maxWickets: 10
        })
      });

      if (response.ok) {
        // 1. Capture the new match data from your database
        const newMatchData = await response.json();
        
        // 2. Save this specific Match ID to the user's local phone browser
        localStorage.setItem('activeMatchId', newMatchData.id);
        
        // 3. Teleport them to the Match Center
        navigate('/match-center');
      } else {
        alert("Backend rejected the match.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Connection failed:", error);
      alert("Failed to connect to the Render database.");
      setLoading(false);
    }
  };
