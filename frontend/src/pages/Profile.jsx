import { useNavigate, useLocation } from 'react-router-dom';
import { friends } from '../data/friends';
import { songs } from '../data/songs';
import { useState } from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = location.state?.isLoggedIn || false;
  const [bio, setBio] = useState('');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  const toggleFavorite = (song) => {
    setFavoriteSongs((prev) =>
      prev.find((s) => s.id === song.id)
        ? prev.filter((s) => s.id !== song.id)
        : [...prev, song]
    );
  };

  return (
    <div 
      className="flex flex-col items-start min-h-screen p-6"
      style={{
        backgroundColor: "#fef9e7",
        backgroundImage: `radial-gradient(circle at 10px 10px, #f6d365 5%, transparent 6%),
                          radial-gradient(circle at 30px 30px, #f6d365 5%, transparent 6%)`,
        backgroundSize: "40px 40px",
      }}
    >
      {/* back to homepage button */}
      <header className="absolute top-4 right-4">
        <button 
          onClick={() => navigate('/homepage', { state: { isLoggedIn } })}
          className="bg-white border-4 border-black px-8 py-4 rounded-2xl text-xl font-bold hover:bg-green-300 transition-colors shadow-lg"
        >
          Homepage
        </button>
      </header>

      {/* TODO: re-add guest message check when backend is ready */}

      {/* profile pic + username + bio */}
      <div className="flex items-start gap-4 mt-16 mb-8">
        {/* profile pic placeholder */}
        <div className="w-32 h-32 rounded-full border-4 border-black bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors shadow-lg flex-shrink-0">
          <span className="text-gray-500 text-sm font-bold text-center px-2">PROFILE<br/>PICTURE</span>
        </div>

        {/* username + bio */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold">Username</h1>
          {isEditingBio ? (
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write your bio..."
                className="border-2 border-black rounded-lg p-1 text-sm w-64"
                autoFocus
              />
              <button
                onClick={() => setIsEditingBio(false)}
                className="text-sm font-bold border-2 border-black rounded-lg px-2 hover:bg-gray-200"
              >
                Save
              </button>
            </div>
          ) : (
            <p
              onClick={() => setIsEditingBio(true)}
              className="text-gray-500 text-sm mt-1 cursor-pointer hover:text-gray-700"
            >
              {bio || 'Add a bio...'}
            </p>
          )}
        </div>
      </div>

      {/* favorite songs */}
      <div className="mt-4 w-full max-w-md">
        <h2 className="text-xl font-bold mb-3">FAVORITE SONGS</h2>
        <div className="border-4 border-black rounded-2xl bg-white p-4 shadow-lg">
          {songs.map((song) => {
            const isFavorite = favoriteSongs.find((s) => s.id === song.id);
            return (
              <div
                key={song.id}
                className="flex items-center justify-between border-2 border-black rounded-lg p-3 mb-2 last:mb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 border-2 border-black rounded flex-shrink-0"></div>
                  <div>
                    <p className="font-bold text-sm">{song.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(song)}
                  className={`text-lg ${isFavorite ? 'text-red-500' : 'text-gray-300'}`}
                >
                  ♥
                </button>
              </div>
            );
          })}
          {songs.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-4">No songs available yet.</p>
          )}
        </div>
      </div>

      {/* Guest message - commented out for now, re-add when backend is ready */}
      {/*
      {isLoggedIn ? null : (
        <div className="flex flex-col items-center justify-center w-full h-full mt-40">
          <div className="border-4 border-black rounded-2xl bg-white p-10 shadow-lg text-center max-w-sm">
            <h1 className="text-2xl font-bold mb-3">Guest User</h1>
            <p className="text-gray-500 mb-6">Please log in or sign up to access your profile.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-200 border-4 border-black px-8 py-3 rounded-xl font-bold hover:bg-gray-300 shadow-lg"
            >
              SIGN UP
            </button>
          </div>
        </div>
      )}
      */}
    </div>
  )
}

export default Profile;