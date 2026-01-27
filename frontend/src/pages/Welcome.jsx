import React from 'react'
import { useNavigate } from 'react-router-dom'


const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex"
      style={{
        backgroundColor: "#fef9e7",
        backgroundImage: `radial-gradient(circle at 10px 10px, #f6d365 5%, transparent 6%),
                          radial-gradient(circle at 30px 30px, #f6d365 5%, transparent 6%)`,
        backgroundSize: "40px 40px",
      }}
    >
      {/* Left Side - Sign Up */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-8">
          <img
            src="/assets/tunetype-logo.png"
            alt="TuneType Logo"
            className="w-64 h-64 mx-auto"
          />
          <h1 className="text-2xl font-bold">TUNETYPE</h1>
          <h2 className="text-2xl">LET'S GET STARTED</h2>
        </div>

        {/* Sign up Form */}
        <div className="border-4 border-black rounded-3xl p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">SIGN UP</h2>
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full border-2 border-black p-2 mb-4 rounded" 
          />
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full border-2 border-black p-2 mb-4 rounded" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full border-2 border-black p-2 mb-4 rounded" 
          />
          <button className="w-full bg-gray-200 border-4 border-black px-8 py-2 rounded-xl font-bold hover:bg-gray-300">
            SIGN UP
          </button>
        </div>
      </div>

      {/* Right Side - Options */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8 gap-4">
        <button 
          onClick={() => navigate('/homepage')}
          className="bg-gray-200 border-4 border-black px-12 py-4 rounded-xl font-bold hover:bg-gray-300"
        >
          PLAY AS GUEST
        </button>
        
        <h2 className="text-xl font-bold">OR</h2>
        
        <button 
          onClick={() => navigate('/signin')}
          className="bg-gray-200 border-4 border-black px-12 py-4 rounded-xl font-bold hover:bg-gray-300"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Welcome;