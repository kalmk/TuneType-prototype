import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{
        backgroundColor: "#fef9e7",
        backgroundImage: `radial-gradient(circle at 10px 10px, #f6d365 5%, transparent 6%),
                          radial-gradient(circle at 30px 30px, #f6d365 5%, transparent 6%)`,
        backgroundSize: "40px 40px",
      }}
    >
      {/* Logo + Title */}
      <div className="text-center mb-8">
        <img
          src="/assets/imgs/tunetype-logo.png"
          alt="TuneType Logo"
          className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto"
        />

        <h1 className="text-2xl sm:text-3xl font-bold mt-2">T U N E T Y P E</h1>
        <h2 className="text-lg sm:text-2xl">LET'S GET STARTED</h2>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        <button
          onClick={() => navigate("/homepage")}
          className="w-full bg-yellow-200 border-4 border-black py-3 rounded-xl font-bold hover:bg-gray-300 transition"
        >
          PLAY AS GUEST
        </button>

        <h2 className="text-lg font-bold">OR</h2>

        <button
          onClick={() => navigate("/signup")}
          className="w-full bg-yellow-200 border-4 border-black py-3 rounded-xl font-bold hover:bg-gray-300 transition"
        >
          SIGN UP / LOGIN
        </button>
      </div>

      {/* Cat Animation */}
      <div className="fixed bottom-0 right-2 sm:right-4">
        <img
          src="/assets/imgs/cat-animation-transparent.gif"
          alt="Cat animation"
          className="w-40 sm:w-60 md:w-80"
        />
      </div>
    </div>
  );
};

export default Welcome;
