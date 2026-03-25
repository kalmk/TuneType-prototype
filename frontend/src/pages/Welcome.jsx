import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center 
    p-8 pt-8 pb-28 overflow-hidden bg-amber-100 font-sans"
    >
      {/* Logo */}
      <div
        className="mb-2 relative w-40 h-40 flex items-center justify-centerborder-4
       border-gray-900 overflow-hidden transition-transform"
      >
        <img
          src="/assets/imgs/tunetype-logo.png"
          alt="TuneType Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h1 className="text-[clamp(2.6rem,8vw,4.2rem)] text-gray-900 tracking-widest leading-none mb-1 font-bold">
        TUNETYPE
      </h1>

      <p className="font-extrabold text-[clamp(0.75rem,2.5vw,1rem)] tracking-widest uppercase text-red-500 mb-9">
        JAPANESE TYPING GAME
      </p>

      {/* CTA buttons */}
      <button
        className="w-full max-w-xs px-6 py-3 border-4 border-gray-900 rounded-xl 
        text-xl tracking-wide bg-amber-400 text-gray-900 mb-4 
        transition-colors hover:bg-amber-500 active:translate-y-1 active:shadow-none"
        onClick={() => navigate("/homepage")}
      >
        Play as Guest
      </button>

      <div className="flex items-center gap-3 w-full max-w-xs my-2 text-gray-900 font-extrabold text-sm tracking-widest">
        <div className="flex-1 h-0.5 bg-gray-900 rounded"></div>
        OR
        <div className="flex-1 h-0.5 bg-gray-900 rounded"></div>
      </div>

      <button
        className="relative w-full max-w-xs px-6 py-3 border-4 border-gray-900 rounded-xl 
        text-xl tracking-wide bg-red-500 text-white  transition-colors
         hover:bg-red-600 active:translate-y-1 active:shadow-none"
        onClick={() => navigate("/signup")}
      >
        Sign Up / Login
        <span
          className="absolute -top-2 -right-3 rotate-12 bg-red-500
         text-white text-xs px-2 py-0.5 border-2 border-gray-900 rounded-full"
        >
          FREE
        </span>
      </button>

      {/* Cat mascot */}
      <img
        src="/assets/imgs/cat-animation-transparent.gif"
        alt="Cat mascot"
        className="fixed bottom-0 right-0 pointer-events-none w-[clamp(120px,22vw,220px)]"
      />
    </div>
  );
};

export default Welcome;
