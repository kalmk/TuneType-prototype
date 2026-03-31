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

  const [isComposing, setIsComposing] = useState(false);

  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null); //states to add gifs

  const tryAgainMessages = ["Uh-oh!", "Try again!", "Again!", "もう一度！"];
  const [tryAgainIndex, setTryAgainIndex] = useState(0);

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

    setLastAnswerCorrect(null); // reset cat
    setTryAgainIndex(0);

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

    setLastAnswerCorrect(null); // reset cat
    setTryAgainIndex(0);

    setCurrentLineIndex((prev) => Math.max(0, prev - 1));
  };

  const replayLine = () => {
    setLastAnswerCorrect(null);
    setTryAgainIndex(0);
    playLine();
  };

  const restartGame = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setCurrentLineIndex(0);
    setUserInput("");
    setUserInputs([]);
    setIsFinished(false);
    playLine();
    setLastAnswerCorrect(null);
    setTryAgainIndex(0);
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

  const normalizeJapaneseInput = (str) => {
    return str
      .replace(/\u3000/g, " ") // full-width space → normal space
      .normalize("NFKC"); // normalize other full-width chars too
  };

  /* ================= INPUT ================= */
  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const correct = lyrics[currentLineIndex]?.[script];
    if (!correct || correct === "...") return;

    if (mode === "normal") {
      if (userInput === correct) {
        setLastAnswerCorrect(true);
        skipLine();
      } else {
        setLastAnswerCorrect(false);
        setTryAgainIndex((prev) => (prev + 1) % tryAgainMessages.length);
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
    <div className="flex items-center justify-center min-h-screen bg-amber-100 p-6 ">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-xl p-6 border-2 border-gray-900">
        {/* LEFT PANEL: Lyrics */}
        <div className="md:w-2/3 bg-gray-100 p-6 rounded-xl shadow-inner flex flex-col items-center border-2 border-gray-900">
          <h1 className="text-2xl font-bold mb-4">{name}</h1>

          {/* Mode & Script badges */}
          <div className="flex gap-3 mb-6">
            <span className="px-3 py-1 text-blue-800 text-sm font-semibold tracking-wide cursor-default">
              Mode: {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </span>
            <span className="px-3 py-1 text-purple-800 text-sm font-semibold tracking-wide cursor-default">
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

                <div className="flex justify-center mt-6">
                  <button
                    onClick={restartGame}
                    className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg w-40 text-lg font-semibold hover:bg-red-600 transition"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 mt-8">
                <p className="text-3xl font-bold text-green-600">Good Job!</p>
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
              {mode !== "quiz" && (
                <div className="min-h-[120px] flex items-center justify-center">
                  <p className="text-3xl font-medium tracking-wide text-center leading-relaxed">
                    {renderHighlightedLine()}
                  </p>
                </div>
              )}

              {lyrics[currentLineIndex]?.kana !== "..." && (
                <input
                  value={userInput}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={(e) => {
                    setIsComposing(false);
                    setUserInput(normalizeJapaneseInput(e.target.value));
                  }}
                  onChange={(e) => {
                    if (!isComposing) {
                      setUserInput(normalizeJapaneseInput(e.target.value));
                    } else {
                      setUserInput(e.target.value); // DO NOT TOUCH during IME
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  className="mt-4 p-3 border rounded-lg w-3/4 text-xl text-center shadow-sm"
                  placeholder="Type the lyrics here..."
                  autoFocus
                />
              )}
            </>
          )}
        </div>

        {/* RIGHT PANEL: Controls */}
        <div className="md:w-1/3 flex flex-col items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-inner border-2 border-gray-900">
          <button
            onClick={() => navigate("/songs")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg w-40 mx-auto font-bold tracking-wide hover:bg-gray-400 transition border-2 border-gray-900"
          >
            Back to Song Selection
          </button>

          {!isFinished && (
            <>
              {currentLineIndex > 0 && (
                <button
                  onClick={previousLine}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg w-40 mx-auto font-bold tracking-wide hover:bg-gray-600 transition border-2 border-gray-900"
                >
                  Previous Line
                </button>
              )}
              <button
                onClick={replayLine}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg w-40 mx-auto font-bold tracking-wide hover:bg-blue-600 transition border-2 border-gray-900"
              >
                Replay Line
              </button>
              <button
                onClick={skipLine}
                className="px-4 py-2 bg-green-600 text-white rounded-lg w-40 mx-auto font-bold tracking-wide hover:bg-green-700 transition border-2 border-gray-900"
              >
                Skip Line
              </button>
              <button
                onClick={restartGame}
                className="px-4 py-2 bg-red-600  text-white rounded-lg w-40 mx-auto font-bold tracking-wide hover:bg-red-700 transition border-2 border-gray-900"
              >
                Restart Game
              </button>
              <button
                onClick={toggleSpeed}
                className="px-4 py-2 bg-purple-500  text-white rounded-lg w-40 mx-auto font-bold tracking-wide hover:bg-purple-600 transition border-2 border-gray-900"
              >
                Speed: {speed}x
              </button>
            </>
          )}
        </div>
      </div>
      {/* During game TRY AGAIN */}
      {!isFinished && lastAnswerCorrect === false && (
        <div className="fixed bottom-6 left-0 flex flex-col items-center">
          <p className="text-xl font-semibold text-gray-600 mb-1 bg-white px-5 py-1 rounded-full shadow">
            {tryAgainMessages[tryAgainIndex]}
          </p>
          <img
            src="/assets/imgs/tryAgain-updated.gif"
            alt="Try Again"
            style={{ width: "200px" }}
          />
        </div>
      )}

      {/* After game show CHEERING */}
      {isFinished && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 flex flex-row items-center gap-4 pointer-events-none px-4">
          <img
            src="/assets/imgs/cheering-updated.gif"
            alt="Cheering"
            className="w-32 sm:w-40 md:w-64 lg:w-80 xl:w-96 max-w-full h-auto"
          />
        </div>
      )}
      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
};

export default Game;
