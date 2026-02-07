import React from 'react'
import { useNavigate } from 'react-router-dom'


const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#fef9e7",
        backgroundImage: `radial-gradient(circle at 10px 10px, #f6d365 5%, transparent 6%),
                          radial-gradient(circle at 30px 30px, #f6d365 5%, transparent 6%)`,
        backgroundSize: "40px 40px",
      }}
    >
      {/* logo and title*/}
      <div className="text-center mb-4">
        <div className="text-center mb-8">
          <img
            src="/assets/tunetype-logo.png"
            alt="TuneType Logo"
            className="w-64 h-64 mx-auto"
          />
          <h1 className="text-3xl font-bold">T U N E T Y P E</h1>
          <h2 className="text-2xl">LET'S GET STARTED</h2>
        </div>
      </div>

      {/* buttons */}
      <div className="flex flex-col items-center gap-4">
        <button 
          onClick={() => navigate('/homepage', {state: {isLoggedIn: false}})}
          className="bg-yellow-200 border-4 border-black px-12 py-4 rounded-xl font-bold hover:bg-gray-300"
        >
          PLAY AS GUEST
        </button>
        
        <h2 className="text-xl font-bold">OR</h2>
        
        <button 
          onClick={() => navigate('/signup')}
          className="bg-yellow-200 border-4 border-black px-12 py-4 rounded-xl font-bold hover:bg-gray-300"
        >
          SIGN UP / LOGIN
        </button>
      </div>
    </div>
  );
};

export default Welcome;