import { useNavigate, useLocation } from 'react-router-dom';
import { friends } from '../data/friends';
import { songs } from '../data/songs';
import { useState } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = location.state?.isLoggedIn || false;

  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen p-6"
      style={{
        backgroundColor: "#fef9e7",
        backgroundImage: `
          radial-gradient(circle at 10px 10px, #f6d365 5%, transparent 6%),
          radial-gradient(circle at 30px 30px, #f6d365 5%, transparent 6%)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {/* profile button */}
      <header className="absolute top-4 right-4 z-10">
        <button 
          className="flex items-center gap-2"
          onClick={() => navigate('/profile', { state: { isLoggedIn } })}
        >
          <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center bg-white">
            C:
          </div>
          <span className="font-bold">Profile</span>
        </button>
      </header>

      {/* Let's Play Button with music notes around it */}
      <div className="relative flex justify-center mb-16 z-10 group">
        {/* Music notes around the button */}
        <div className="absolute text-5xl animate-shake" style={{ left: '85px', top: '-70px' }}>♩</div>
        <div className="absolute text-5xl animate-shake" style={{ left: '-50px', top: '-40px' }}>♪</div>
        <div className="absolute text-5xl animate-shake" style={{ left: '-110px', top: '20px' }}>♫</div>
        <div className="absolute text-4xl animate-shake" style={{ right: '-60px', top: '-50px' }}>♬</div>
        <div className="absolute text-5xl animate-shake" style={{ right: '-80px', top: '20px' }}>♪</div>
        <div className="absolute text-4xl animate-shake" style={{ left: '-40px', top: '80px' }}>♬</div>
        <div className="absolute text-5xl animate-shake" style={{ right: '-40px', top: '80px' }}>♫</div>
        <div className="absolute text-5xl animate-shake" style={{ right: '80px', top: '90px' }}>♩</div>
        
        <button 
          onClick={() => navigate('/songs')}
          className="bg-white border-4 border-black px-12 py-4 rounded-2xl text-2xl font-bold hover:bg-green-300 transition-colors shadow-lg"
        >
          LET'S PLAY!
        </button>
      </div>

      <style>{`
        @keyframes shake1 {
          0%, 100% { transform: rotate(10deg) translateX(0); }
          50% { transform: rotate(10deg) translateX(3px); }
        }
        @keyframes shake2 {
          0%, 100% { transform: rotate(-10deg) translateX(0); }
          50% { transform: rotate(-10deg) translateX(-3px); }
        }
        @keyframes shake3 {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(0deg) translateY(3px); }
        }
        @keyframes shake4 {
          0%, 100% { transform: rotate(-10deg) translateY(0); }
          50% { transform: rotate(-10deg) translateY(-3px); }
        }
        @keyframes shake5 {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(9deg); }
        }
        @keyframes shake6 {
          0%, 100% { transform: rotate(12deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes shake7 {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          50% { transform: rotate(0deg) translateX(3px); }
        }
        @keyframes shake8 {
          0%, 100% { transform: rotate(-10deg) translateY(0); }
          50% { transform: rotate(-10deg) translateY(-3px); }
        }
        
        .group:hover .animate-shake:nth-child(1) { animation: shake1 0.5s ease-in-out infinite; }
        .group:hover .animate-shake:nth-child(2) { animation: shake2 0.5s ease-in-out infinite; }
        .group:hover .animate-shake:nth-child(3) { animation: shake3 0.5s ease-in-out infinite; }
        .group:hover .animate-shake:nth-child(4) { animation: shake4 0.5s ease-in-out infinite; }
        .group:hover .animate-shake:nth-child(5) { animation: shake5 0.5s ease-in-out infinite; }
        .group:hover .animate-shake:nth-child(6) { animation: shake6 0.5s ease-in-out infinite; }
        .group:hover .animate-shake:nth-child(7) { animation: shake7 0.5s ease-in-out infinite; }
        .group:hover .animate-shake:nth-child(8) { animation: shake8 0.5s ease-in-out infinite; }
      `}</style>

      {/* Placeholder for songlist and friend activity sections */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 z-10 mt-10">
        <div className="border-4 border-black rounded-3xl p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">SONGLIST</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {songs.map(song => (
              <div key={song.id} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded">
                <div className="flex-1">
                  <div className="font-bold">{song.name}</div>
                  <div className="text-sm text-gray-600">{song.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* only show friends list if logged in */}
        {isLoggedIn ? (
          <div className="border-4 border-black rounded-3xl p-6 bg-white">
            <h2 className="text-xl font-bold mb-4">FRIEND ACTIVITY</h2>
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {friends.map(friend => (
                <div key={friend.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center text-xl">
                    C:
                  </div>
                  <div>
                    <p className="font-bold">{friend.username}</p>
                    <p className="text-sm text-gray-600">played: {friend.lastPlayed}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="border-4 border-black rounded-3xl p-6 bg-white">
            <h2 className="text-xl font-bold mb-4">FRIEND ACTIVITY</h2>
            <p className="text-gray-600">Sign in to see friend activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;