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
  
  const [selectedPic, setSelectedPic] = useState(() => {
    const saved = localStorage.getItem('profilePicture');
    return saved || '/assets/C:.jpeg';
  });
  const [showPicSelecter, setPicSelecter] = useState(false);

  const profilePicOptions = [
    '/assets/neutral.jpeg',
    '/assets/sad.jpeg',
    '/assets/cute.jpeg',
    '/assets/happy.jpeg',
    '/assets/blushing.jpeg',
    '/assets/smile.jpeg'
  ];

  const handlePicSelect = (pic) => {
    // if (isLoggedIn) {
      setSelectedPic(pic);
      localStorage.setItem('profilePicture', pic);
      setPicSelecter(false);
    // }
  };

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

      {/* re-add guest message check when backend is ready */}

      {/* profile pic + username + bio */}
      <div className="flex items-start gap-4 mt-16 mb-8">
        {/* profile pic with selector */}
        <div className="relative">
          <div 
            onClick={() => setPicSelecter(!showPicSelecter)}
            className="w-32 h-32 rounded-full border-4 border-black bg-white flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors shadow-lg overflow-hidden"
          >
            <img src={selectedPic} alt="Profile" className="w-full h-full object-cover" />
          </div>
          
          {/* picture picker dropdown */}
          {showPicSelecter && (
            <div className="absolute top-full mt-2 left-0 border-4 border-black rounded-2xl bg-white p-4 shadow-lg z-50 flex gap-3">
              {profilePicOptions.map((pic, index) => (
                <div
                  key={index}
                  onClick={() => handlePicSelect(pic)}
                  className={`w-16 h-16 flex-shrink-0 flex items-center justify-center cursor-pointer rounded-xl hover:bg-gray-200 transition-colors overflow-hidden ${
                    selectedPic === pic ? 'bg-green-200 border-4 border-black' : 'border-4 border-gray-300'
                  }`}
                >
                  <img src={pic} alt="Avatar option" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
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
    </div>
  )
}

export default Profile;