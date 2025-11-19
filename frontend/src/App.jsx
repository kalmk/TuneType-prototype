import { useRef } from "react";

export default function App() {
  const audioRef = useRef(null);

  const handleStart = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Start playback when button is clicked
    audio.play().catch((err) => {
      console.log("Play blocked:", err);
    });
  };

  return (
    <div className="p-8 font-sans text-center">
      <h1 className="text-3xl font-bold mb-4">TuneType</h1>
      <button
        onClick={handleStart}
        className="p-4 bg-green-500 text-white rounded text-xl"
      >
        Start Game
      </button>

      {/* Audio element */}
      <audio ref={audioRef} src="/assets/Rabbit_xf.mp3" />
    </div>
  );
}
