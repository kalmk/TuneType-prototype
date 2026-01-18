import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SongSelect = () => {
  const navigate = useNavigate();

  const songs = [{ id: "rabbit", name: "うさぎ" }];

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Select a Song
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Songs list */}
          <div className="md:w-1/3">
            <h2 className="font-semibold mb-2 text-lg">Songs</h2>
            <ul className="space-y-2">
              {songs.map((song) => (
                <li
                  key={song.id}
                  className={`p-3 cursor-pointer rounded-lg border transition-all duration-200 ${
                    selectedSong === song.id
                      ? "bg-blue-500 text-white border-blue-500"
                      : "hover:bg-gray-100 border-gray-200"
                  }`}
                  onClick={() => setSelectedSong(song.id)}
                >
                  {song.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Mode & Script selection */}
          <div className="md:w-2/3 flex flex-col gap-6">
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
                        : "bg-gray-100 hover:bg-gray-200"
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
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedScript(script)}
                  >
                    {script.charAt(0).toUpperCase() + script.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Start button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handleStart}
                disabled={!selectedSong}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  selectedSong
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Start Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongSelect;
