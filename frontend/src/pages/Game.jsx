import { useParams, useSearchParams } from "react-router-dom";

const Game = () => {
  const { songId } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "normal";

  // Map songId to audio source
  const songs = {
    rabbit: "/assets/Rabbit_xf.mp3",
    // Add more songs here later
  };

  const audioSrc = songs[songId];

  if (!audioSrc) {
    return <div>Song not found!</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Playing: {songId}</h1>
      <h2 className="text-lg mb-4">Mode: {mode.charAt(0).toUpperCase() + mode.slice(1)}</h2>
      
      <audio controls autoPlay src={audioSrc} className="w-full">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Game;
