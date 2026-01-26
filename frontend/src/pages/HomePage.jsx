import { useNavigate } from 'react-router-dom';
import { friends } from '../data/friends';
import { songs } from '../data/songs';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6"
    style={{
      backgroundColor: "#fef9e7", // light sunflower yellow background
      backgroundImage: `radial-gradient(circle at 10px 10px, #f6d365 5%, transparent 6%),
                        radial-gradient(circle at 30px 30px, #f6d365 5%, transparent 6%)`,
      backgroundSize: "40px 40px",
    }}
  >
      {/* profile button */}
      <header className="flex justify-end mb-8">
        <button className="flex items-center gap-2"
          onClick={() => navigate('/profile')}
        >
          <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center">
            C:
          </div>
          <span>Profile</span>
        </button>
      </header>
      {/* Let's Play Button */}
      <div className="flex justify-center mb-16 bg-white">
        <button 
          onClick={() => navigate('/songs')}
          className="bg-white-200 border-4 border-black px-12 py-4 rounded-2xl text-2xl font-bold hover:bg-green-300 transition-colors shadow-lg"
        >
          LET'S PLAY!
        </button>
      </div>

      {/* Placeholder for songlist and friend activity sections */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
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

        <div className="border-4 border-black rounded-3xl p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">FRIEND ACTIVITY</h2>
          <div className="space-y-6 max-h-96 overflow-y-auto"></div>
          {friends.map(friend => (
            <div key={friend.id} className="flex items-center gap-3">
              {/* adding profile pictures */}
              <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center text-xl">
                C:
              </div>
              <p>{friend.username}</p>
              <p>played: {friend.lastPlayed} </p>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;