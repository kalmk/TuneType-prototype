import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { songs } from "../data/songs";

const Game = () => {
  const { songId } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "normal";

  const song = songs.find((s) => s.id === songId);
  if (!song) return <div>Song not found!</div>;

  const { name, audioSrc, lyrics } = song;

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [speed, setSpeed] = useState(1); // 1x by default
  const audioRef = useRef(null);

  // Play the current line
  const playLine = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const line = lyrics[currentLineIndex];
    if (!line) return;

    // Remove previous listener if exists
    if (audio._onTimeUpdate) {
      audio.removeEventListener("timeupdate", audio._onTimeUpdate);
    }

    // Set up new listener
    audio._onTimeUpdate = () => {
      if (audio.currentTime >= line.end) {
        audio.pause();
        audio.removeEventListener("timeupdate", audio._onTimeUpdate);
        console.log(`Line ${currentLineIndex + 1} ended`);
      }
    };

    audio.currentTime = line.start;
    audio.playbackRate = speed;
    audio.play();
    audio.addEventListener("timeupdate", audio._onTimeUpdate);
  };

  // Skip to the next line
  const skipLine = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();

    setCurrentLineIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex >= lyrics.length ? prev : nextIndex;
    });
  };

  // Go to the previous line
  const previousLine = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();

    setCurrentLineIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  // Restart the game
  const restartGame = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setCurrentLineIndex(0);
  };

  // Toggle speed between 1x and 0.5x
  const toggleSpeed = () => {
    if (!audioRef.current) return;

    const newSpeed = speed === 1 ? 0.5 : 1;
    setSpeed(newSpeed);

    // Apply immediately to current line without restarting
    audioRef.current.playbackRate = newSpeed;
  };

  // Play line whenever currentLineIndex changes
  useEffect(() => {
    playLine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLineIndex]);

  return (
    <div className="p-6 flex justify-between">
      {/* Left side: song info and lyrics */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Playing: {name}</h1>
        <h2 className="text-lg mb-4">
          Mode: {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </h2>
        <p className="mt-4">Current line: {lyrics[currentLineIndex]?.text}</p>
      </div>

      {/* Right side: button section */}
      <div className="flex flex-col gap-2">
        <button
          onClick={previousLine}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Previous Line
        </button>
        <button
          onClick={playLine}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Replay Line
        </button>
        <button
          onClick={skipLine}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Skip Line
        </button>
        <button
          onClick={restartGame}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Restart Game
        </button>
        <button
          onClick={toggleSpeed}
          className="px-4 py-2 bg-purple-500 text-white rounded"
        >
          Speed: {speed}x
        </button>
      </div>

      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
};

export default Game;
