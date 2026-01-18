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
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
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
      if (userInput === correct) {
        skipLine();
      } else {
        alert("Incorrect! Try again.");
      }
    } else {
      skipLine();
    }
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
    <div className="p-6">
      <div className="flex justify-between">
        {/* LEFT */}
        <div className="w-2/3 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-1">Playing: {name}</h1>
          <h2 className="text-lg mb-6 text-gray-600">
            Mode: {mode} | Script: {script}
          </h2>

          {isFinished ? (
            mode === "quiz" ? (
              <div className="w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Results
                </h2>

                <div className="grid grid-cols-4 gap-4 font-semibold border-b pb-2 mb-2">
                  <div>#</div>
                  <div>Correct</div>
                  <div>Your Answer</div>
                  <div>Result</div>
                </div>

                {lyrics.map((line, idx) => {
                  const correct = line[script];
                  const answer = userInputs[idx] || "";
                  const isEllipsis = correct === "...";
                  const ok = !isEllipsis && correct === answer;

                  return (
                    <div
                      key={idx}
                      className="grid grid-cols-4 gap-4 py-1 border-b"
                    >
                      <div>{idx + 1}</div>
                      <div>{correct}</div>
                      <div>{isEllipsis ? "—" : answer}</div>
                      <div>{isEllipsis ? "—" : ok ? "✅" : "❌"}</div>
                    </div>
                  );
                })}

                <div className="flex justify-center">
                  <button
                    onClick={restartGame}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-green-600 text-2xl font-bold">
                  Good job!
                </p>
                <button
                  onClick={restartGame}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
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
                  className="mt-4 p-3 border rounded w-3/4 text-xl text-center"
                  placeholder="Type the lyrics here..."
                  autoFocus
                />
              )}
            </>
          )}
        </div>

        {/* RIGHT */}
        <div className="w-1/3 flex flex-col items-center gap-2">
          <div className="mb-4">
            <button
              onClick={() => navigate("/songs")}
              className="px-4 py-2 bg-gray-700 text-white rounded"
            >
              Back to Song Selection
            </button>
          </div>

          {!isFinished && (
            <>
              {currentLineIndex > 0 && (
                <button
                  onClick={previousLine}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Previous Line
                </button>
              )}
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
            </>
          )}
        </div>
      </div>

      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
};

export default Game;
