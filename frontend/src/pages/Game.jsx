import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { songs } from "../data/songs";

const Game = () => {
  const { songId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const mode = searchParams.get("mode") || "normal";
  const script = searchParams.get("script") || "kana"; // Kana or Kanji

  const song = songs.find((s) => s.id === songId);
  if (!song) return <div>Song not found!</div>;

  const { name, audioSrc, lyrics } = song;

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [userInput, setUserInput] = useState(""); // User typing input
  const [speed, setSpeed] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
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

    audio._onTimeUpdate = () => {
      if (audio.currentTime >= line.end) {
        audio.pause();
        audio.removeEventListener("timeupdate", audio._onTimeUpdate);

        // Automatically skip "..." lines
        if (line.kana === "...") {
          skipLine();
        }
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
      if (nextIndex >= lyrics.length) {
        setIsFinished(true);
        return prev;
      }
      if (isFinished) setIsFinished(false);
      return nextIndex;
    });
  };

  // Previous line
  const previousLine = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();

    setCurrentLineIndex((prev) => {
      const newIndex = prev - 1 < 0 ? 0 : prev - 1;
      if (isFinished) setIsFinished(false);
      return newIndex;
    });
  };

  // Restart game
  const restartGame = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setCurrentLineIndex(0);
    setUserInput("");
    setIsFinished(false);
  };

  // Toggle speed
  const toggleSpeed = () => {
    if (!audioRef.current) return;
    const newSpeed = speed === 1 ? 0.5 : 1;
    setSpeed(newSpeed);
    audioRef.current.playbackRate = newSpeed;
  };

  // Play line whenever currentLineIndex changes
  useEffect(() => {
    if (!isFinished) playLine();
    setUserInput(""); // Clear input on line change
  }, [currentLineIndex]);

  // Handle Enter key for line progression
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const currentLine = lyrics[currentLineIndex]?.[script];
      if (!currentLine) return;

      // Only proceed for non-"..." lines
      if (currentLine !== "...") {
        if (userInput === currentLine) {
          setUserInput("");
          skipLine();
        } else {
          alert("Incorrect! Try again.");
        }
      }
    }
  };

  // Render highlighted line for real-time feedback
  const renderHighlightedLine = () => {
    const currentLine = lyrics[currentLineIndex]?.[script] || "";
    return currentLine.split("").map((char, idx) => {
      let colorClass = "";
      if (idx < userInput.length) {
        colorClass =
          userInput[idx] === char ? "text-green-500" : "text-red-500";
      }
      return (
        <span key={idx} className={colorClass}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="p-6">
      {/* Main content */}
      <div className="flex justify-between">
        {/* Left: song info and lyrics */}
        <div className="w-2/3">
          <h1 className="text-2xl font-bold mb-2">Playing: {name}</h1>
          <h2 className="text-lg mb-4">
            Mode: {mode.charAt(0).toUpperCase() + mode.slice(1)} | Script:{" "}
            {script.charAt(0).toUpperCase() + script.slice(1)}
          </h2>

          {isFinished ? (
            <p className="text-green-600 font-bold text-2xl mt-4 text-center">
              Good job!
            </p>
          ) : (
            <>
              {/* Highlighted current line */}
              <p className="mt-4 text-xl">{renderHighlightedLine()}</p>

              {/* Typing input only if line is not "..." */}
              {lyrics[currentLineIndex]?.kana !== "..." && (
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type the lyrics here..."
                  className="mt-2 p-2 border rounded w-full text-lg"
                  autoFocus
                />
              )}
            </>
          )}
        </div>

        {/* Right: header + buttons */}
        <div className="w-1/3 flex flex-col items-center gap-2">
          {/* Header button stacked on top of other buttons */}
          <div className="mb-4 w-full flex justify-center">
            <button
              onClick={() => navigate("/songs")}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Back to Song Selection
            </button>
          </div>

          {/* Buttons */}
          {isFinished ? (
            <button
              onClick={restartGame}
              className="px-4 py-2 bg-red-500 text-white rounded w-auto"
            >
              Retry
            </button>
          ) : (
            <>
              {currentLineIndex > 0 && (
                <button
                  onClick={previousLine}
                  className="px-4 py-2 bg-gray-500 text-white rounded w-auto"
                >
                  Previous Line
                </button>
              )}
              <button
                onClick={playLine}
                className="px-4 py-2 bg-blue-500 text-white rounded w-auto"
              >
                Replay Line
              </button>
              <button
                onClick={skipLine}
                className="px-4 py-2 bg-green-500 text-white rounded w-auto"
              >
                Skip Line
              </button>
              <button
                onClick={restartGame}
                className="px-4 py-2 bg-red-500 text-white rounded w-auto"
              >
                Restart Game
              </button>
              <button
                onClick={toggleSpeed}
                className="px-4 py-2 bg-purple-500 text-white rounded w-auto"
              >
                Speed: {speed}x
              </button>
            </>
          )}
        </div>
      </div>

      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
};

export default Game;
