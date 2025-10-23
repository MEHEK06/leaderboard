import  { useEffect, useState } from "react";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

 
const fetchLeaderboard = async () => {
  try {
    console.log("Fetching leaderboard...");
    const res = await fetch("http://localhost:3001/api/leaderboard");
    console.log("Raw response:", res);
    const data = await res.json();
    console.log("Fetched data:", data);
    setPlayers(data);
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
  }
};

 
  useEffect(() => {
    fetchLeaderboard(); 
    const interval = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-blue-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-950">
         Live Leaderboard
      </h1>

      <div className="w-full max-w-md bg-blue-50 rounded-xl shadow-md overflow-hidden">
        
        <div className="flex justify-between bg-blue-200 text-blue-950 font-semibold p-3 px-6">
          <span>Player</span>
          <span>Score</span>
        </div>

        
        <div className="divide-y divide-gray-200">
          {players.length === 0 ? (
            <p className="text-center p-4">Loading...</p>
          ) : (
            players.map((player, i) => (
              <div
                key={i}
                className="flex justify-between p-3 px-6 hover:bg-blue-100 transition-colors"
              >
                
                <span >{player[0]}</span>

                <span className="font-semibold">{player[1]}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
