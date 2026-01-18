import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SongSelect = () => {
  const navigate = useNavigate();

  // Minimal song list (add more later)
  const songs = [{ id: "rabbit", name: "うさぎ" }];

  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedMode, setSelectedMode] = useState("normal");
  const [selectedScript, setSelectedScript] = useState("kana"); // default to Kana

  const handleStart = () => {
    if (selectedSong) {
      navigate(
        `/play/${selectedSong}?mode=${selectedMode}&script=${selectedScript}`
      );
    }
  };

  return (
    <div className="flex h-screen p-4">
      {/* Left panel: Songs list */}
      <div className="w-1/3 border-r pr-4">
        <h2 className="font-bold mb-2">Songs</h2>
        <ul>
          {songs.map((song) => (
            <li
              key={song.id}
              className={`p-2 cursor-pointer ${
                selectedSong === song.id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedSong(song.id)}
            >
              {song.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right panel: Game mode + Script */}
      <div className="w-2/3 pl-4">
        {/* Game Mode */}
        <h2 className="font-bold mb-2">Game Mode</h2>
        <div className="flex gap-4 mb-4">
          {["normal", "quiz"].map((mode) => (
            <button
              key={mode}
              className={`px-4 py-2 border rounded ${
                selectedMode === mode
                  ? "bg-green-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedMode(mode)}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>

        {/* Script selection */}
        <h2 className="font-bold mb-2">Script</h2>
        <div className="flex gap-4 mb-6">
          {["kana", "kanji"].map((script) => (
            <button
              key={script}
              className={`px-4 py-2 border rounded ${
                selectedScript === script
                  ? "bg-purple-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedScript(script)}
            >
              {script.charAt(0).toUpperCase() + script.slice(1)}
            </button>
          ))}
        </div>

        {/* Start button */}
        <div>
          <button
            className={`px-6 py-3 border rounded ${
              selectedSong
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-700 cursor-not-allowed"
            }`}
            onClick={handleStart}
            disabled={!selectedSong}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongSelect;
