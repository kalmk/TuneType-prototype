import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SongSelect = () => {
  const navigate = useNavigate();

  // List of songs from songs.js
  const songs = [
    { id: "rabbit", name: "うさぎ" },
    { id: "katatataki", name: "肩たたき"},
    { id: "moon", name: "つき"},
    { id: "doll", name: "人形"},

  ];

  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedMode, setSelectedMode] = useState("normal");
  const [selectedScript, setSelectedScript] = useState("kana");

  const handleStart = () => {
    if (selectedSong) {
      navigate(
        `/play/${selectedSong}?mode=${selectedMode}&script=${selectedScript}`
      );
    }
  };

  const handleBackHome = () => {
    navigate("/homepage"); // navigate to HomePage
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{
        backgroundColor: "#fef9e7",
        backgroundImage: `radial-gradient(circle at 10px 10px, #f6d365 5%, transparent 6%),
                          radial-gradient(circle at 30px 30px, #f6d365 5%, transparent 6%)`,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-xl p-6">
        {/* LEFT PANEL: Songs list */}
        <div className="md:w-1/3 bg-gray-100 p-4 rounded-xl shadow-inner">
          <h2 className="font-semibold mb-4 text-xl text-center">Songs</h2>
          <ul className="space-y-2">
            {songs.map((song) => (
              <li
                key={song.id}
                className={`p-3 cursor-pointer rounded-lg border text-center transition-all duration-200 ${
                  selectedSong === song.id
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-200"
                }`}
                onClick={() => setSelectedSong(song.id)}
              >
                {song.name}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT PANEL: Mode & Script selection */}
        <div className="md:w-2/3 flex flex-col gap-6 bg-gray-100 p-4 rounded-xl shadow-inner">
          {/* Game Mode */}
          <div>
            <h2 className="font-semibold mb-2 text-lg">Game Mode</h2>
            <div className="flex gap-4">
              {["normal", "quiz"].map((mode) => (
                <button
                  key={mode}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedMode === mode
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedMode(mode)}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Script selection */}
          <div>
            <h2 className="font-semibold mb-2 text-lg">Script</h2>
            <div className="flex gap-4">
              {["kana", "kanji"].map((script) => (
                <button
                  key={script}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedScript === script
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedScript(script)}
                >
                  {script.charAt(0).toUpperCase() + script.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Start button */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleStart}
              disabled={!selectedSong}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedSong
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Start Game
            </button>

            {/* Back to Home button */}
            <button
              onClick={handleBackHome}
              className="px-6 py-3 rounded-lg font-semibold bg-blue-400 text-white hover:bg-blue-500 transition-all duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongSelect;
