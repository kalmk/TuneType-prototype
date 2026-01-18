import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { songs } from "../data/songs";

const Game = () => {
  const { songId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const mode = searchParams.get("mode") || "normal";
  const script = searchParams.get("script") || "kana";

  const song = songs.find((s) => s.id === songId);
  if (!song) return <div>Song not found!</div>;

  const { name, audioSrc, lyrics } = song;

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [speed, setSpeed] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [userInputs, setUserInputs] = useState([]);

  const audioRef = useRef(null);

  /* ================= AUDIO ================= */
  const playLine = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const line = lyrics[currentLineIndex];
    if (!line) return;

    if (audio._onTimeUpdate) {
      audio.removeEventListener("timeupdate", audio._onTimeUpdate);
    }

    audio._onTimeUpdate = () => {
      if (audio.currentTime >= line.end) {
        audio.pause();
        audio.removeEventListener("timeupdate", audio._onTimeUpdate);

        if (line.kana === "...") skipLine();
      }
    };

    audio.currentTime = line.start;
    audio.playbackRate = speed;
    audio.play();
    audio.addEventListener("timeupdate", audio._onTimeUpdate);
  };

  /* ================= GAME FLOW ================= */
  const skipLine = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();

    setCurrentLineIndex((prev) => {
      const next = prev + 1;

      if (mode === "quiz") {
        setUserInputs((inputs) => {
          const copy = [...inputs];
          copy[prev] = userInput;
          return copy;
        });
        setUserInput("");
      }

      if (next >= lyrics.length) {
        setIsFinished(true);
        return prev;
      }

      return next;
    });
  };

  const previousLine = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setCurrentLineIndex((prev) => Math.max(0, prev - 1));
  };

  const restartGame = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setCurrentLineIndex(0);
    setUserInput("");
    setUserInputs([]);
    setIsFinished(false);
    playLine();
  };

  const toggleSpeed = () => {
    const newSpeed = speed === 1 ? 0.5 : 1;
    setSpeed(newSpeed);
    if (audioRef.current) audioRef.current.playbackRate = newSpeed;
  };

  useEffect(() => {
    if (!isFinished) playLine();
    setUserInput("");
  }, [currentLineIndex]);

  /* ================= INPUT ================= */
  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const correct = lyrics[currentLineIndex]?.[script];
    if (!correct || correct === "...") return;

    if (mode === "normal") {
      if (userInput === correct) skipLine();
      else alert("Incorrect! Try again.");
    } else skipLine();
  };

  const renderHighlightedLine = () => {
    const line = lyrics[currentLineIndex]?.[script] || "";
    return line.split("").map((char, idx) => {
      let cls = "";
      if (idx < userInput.length) {
        cls = userInput[idx] === char ? "text-green-500" : "text-red-500";
      }
      return (
        <span key={idx} className={cls}>
          {char}
        </span>
      );
    });
  };

  /* ================= UI ================= */
  return (
    <div className="p-6 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
        {/* LEFT PANEL */}
        <div className="md:w-2/3 flex flex-col items-center bg-gray-100 p-6 rounded-2xl shadow-md">
          <h1 className="text-2xl font-bold mb-1">{name}</h1>

          {/* Mode & Script badges */}
          <div className="flex gap-3 mb-6">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold tracking-wide cursor-default">
              Mode: {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold tracking-wide cursor-default">
              Script: {script.charAt(0).toUpperCase() + script.slice(1)}
            </span>
          </div>

          {isFinished ? (
            mode === "quiz" ? (
              <div className="w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Results</h2>

                <div className="grid grid-cols-3 gap-4 font-semibold border-b pb-2 mb-2">
                  <div>#</div>
                  <div>Correct</div>
                  <div>Your Answer</div>
                </div>

                {lyrics.map((line, idx) => {
                  const correct = line[script];
                  const answer = userInputs[idx] || "";
                  const isEllipsis = correct === "...";

                  return (
                    <div
                      key={idx}
                      className="grid grid-cols-3 gap-4 py-1 border-b items-center"
                    >
                      <div>{idx + 1}</div>
                      <div>{correct}</div>
                      <div
                        className={
                          !isEllipsis && answer !== correct
                            ? "text-red-500 font-semibold"
                            : ""
                        }
                      >
                        {isEllipsis ? "—" : answer}
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-center">
                  <button
                    onClick={restartGame}
                    className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold w-40"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 mt-8">
                <p className="text-3xl font-bold text-green-600">
                  Good Job!
                </p>
                <button
                  onClick={restartGame}
                  className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg w-40 text-lg font-semibold hover:bg-red-600 transition"
                >
                  Retry
                </button>
              </div>
            )
          ) : (
            <>
              {/* LYRIC FOCUS AREA */}
              {mode !== "quiz" && (
                <div className="min-h-[120px] flex items-center justify-center">
                  <p className="text-3xl font-medium tracking-wide text-center leading-relaxed">
                    {renderHighlightedLine()}
                  </p>
                </div>
              )}

              {/* INPUT */}
              {lyrics[currentLineIndex]?.kana !== "..." && (
                <input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="mt-4 p-3 border rounded-lg w-3/4 text-xl text-center shadow-sm"
                  placeholder="Type the lyrics here..."
                  autoFocus
                />
              )}
            </>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="md:w-1/3 flex flex-col items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-md">
          <button
            onClick={() => navigate("/songs")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg w-40 mx-auto font-semibold hover:bg-gray-400 transition"
          >
            Back to Song Selection
          </button>

          {!isFinished && (
            <>
              {currentLineIndex > 0 && (
                <button
                  onClick={previousLine}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg w-40 mx-auto font-semibold hover:bg-gray-600 transition"
                >
                  Previous Line
                </button>
              )}
              <button
                onClick={playLine}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg w-40 mx-auto font-semibold hover:bg-blue-600 transition"
              >
                Replay Line
              </button>
              <button
                onClick={skipLine}
                className="px-4 py-2 bg-green-500 text-white rounded-lg w-40 mx-auto font-semibold hover:bg-green-600 transition"
              >
                Skip Line
              </button>
              <button
                onClick={restartGame}
                className="px-4 py-2 bg-red-500 text-white rounded-lg w-40 mx-auto font-semibold hover:bg-red-600 transition"
              >
                Restart Game
              </button>
              <button
                onClick={toggleSpeed}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg w-40 mx-auto font-semibold hover:bg-purple-600 transition"
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
