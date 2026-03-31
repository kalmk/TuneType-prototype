import { useState } from "react";
import { useNavigate } from "react-router-dom";

const songs = [
  { id: "rabbit", name: "うさぎ", nameEn: "Rabbit" },
  { id: "katatataki", name: "肩たたき", nameEn: "Shoulder Pat" },
  { id: "moon", name: "つき", nameEn: "Moon" },
  { id: "doll", name: "人形", nameEn: "Doll" },
];

const MODES = [
  { id: "normal", label: "Normal", desc: "Type the lyrics at your own pace" },
  { id: "quiz", label: "Quiz", desc: "Fill in the missing characters" },
];

const SCRIPTS = [
  { id: "kana", label: "Kana", sub: "ひらがな・カタカナ" },
  { id: "kanji", label: "Kanji", sub: "漢字まじり" },
];

const SongSelect = () => {
  const navigate = useNavigate();
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedMode, setSelectedMode] = useState("normal");
  const [selectedScript, setSelectedScript] = useState("kana");

  const handleStart = () => {
    if (selectedSong) {
      navigate(
        `/play/${selectedSong}?mode=${selectedMode}&script=${selectedScript}`,
      );
    }
  };

  return (
    <div className="min-h-screen bg-amber-100 text-gray-900 flex flex-col items-center p-6">
      {/* Top bar */}
      <div className="w-full max-w-3xl flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/homepage")}
          className="px-4 py-1 border-2 border-black rounded-lg 
          bg-white shadow hover:bg-gray-100"
        >
          Back
        </button>

        <h1 className="text-2xl font-bold tracking-wide">SONG SELECT</h1>
      </div>

      {/* Layout */}
      <div className="w-full max-w-3xl grid gap-5 sm:grid-cols-[1fr_1.5fr]">
        {/* LEFT — songs */}
        <div className="bg-white border-4 border-black rounded-2xl p-4 shadow">
          <h2 className="font-bold mb-3">SONGS</h2>

          {songs.map((song) => (
            <div
              key={song.id}
              onClick={() => setSelectedSong(song.id)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg 
                border-2 cursor-pointer mb-2 transition
                ${
                  selectedSong === song.id
                    ? "bg-amber-400 border-black shadow"
                    : "border-transparent hover:bg-amber-50 hover:border-amber-400"
                }`}
            >
              <div>
                <div className="font-bold">{song.name}</div>
                <div className="text-xs text-gray-500">{song.nameEn}</div>
              </div>

              {selectedSong === song.id && (
                <span className="font-bold">Selected</span>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT — options */}
        <div
          className="bg-white border-4 border-black rounded-2xl
         p-4 shadow flex flex-col"
        >
          {/* Mode */}
          <div className="mb-5">
            <div className="text-sm font-bold mb-2">GAME MODE</div>

            <div className="flex gap-2">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMode(m.id)}
                  className={`flex-1 p-3 rounded-xl border-2 text-center transition
                    ${
                      selectedMode === m.id
                        ? "bg-amber-400 border-black shadow"
                        : "bg-amber-50 border-gray-300 hover:border-amber-400"
                    }`}
                >
                  <div className="font-bold">{m.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Script */}
          <div className="mb-5">
            <div className="text-sm font-bold mb-2">SCRIPT</div>

            <div className="flex gap-2">
              {SCRIPTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedScript(s.id)}
                  className={`flex-1 p-3 rounded-xl border-2 text-center transition
                    ${
                      selectedScript === s.id
                        ? "bg-amber-400 border-black shadow"
                        : "bg-amber-50 border-gray-300 hover:border-amber-400"
                    }`}
                >
                  <div className="font-bold">{s.label}</div>
                  <div className="text-xs text-gray-500">{s.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          {selectedSong && (
            <div
              className="bg-amber-50 border border-amber-300 rounded-lg
             px-3 py-2 text-sm font-semibold mb-4"
            >
              {songs.find((s) => s.id === selectedSong)?.name} · {selectedMode}{" "}
              · {selectedScript}
            </div>
          )}

          <div className="flex-1" />

          {/* Start */}
          <button
            onClick={handleStart}
            disabled={!selectedSong}
            className={`w-full py-3 text-lg font-bold rounded-xl border-4 transition
              ${
                selectedSong
                  ? "bg-green-600 text-white border-black shadow hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
              }`}
          >
            {selectedSong ? "START GAME" : "SELECT A SONG"}
          </button>

          {!selectedSong && (
            <p className="text-xs text-gray-400 text-center mt-2">
              Select a song to begin
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongSelect;
