import { useNavigate } from "react-router-dom";
import { songs } from "../data/songs";
import useUserStore from "../store/userStore";
import api from "../lib/axios";
import JoinedUsers from "../components/JoinedUsers";

const HomePage = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      clearUser();
      navigate("/");
    } catch (error) {
      console.log("Logout failed");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-amber-100 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div className="text-2xl font-bold">
          {user ? (
            <>
              Hey, <span className="text-amber-600">{user.userName}</span>
            </>
          ) : (
            <>
              Welcome, <span className="text-amber-600">Guest</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-1 border-2 border-gray-900 rounded-lg bg-amber-200
               text-amber-700 font-bold shadow-md hover:bg-amber-300 transition"
            >
              Logout
            </button>
          )}
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 px-3 py-1 border-2 border-gray-900 rounded-lg
             bg-white shadow-md hover:bg-gray-100 transition"
          >
            <div
              className="w-8 h-8 rounded-full bg-amber-400 border-2 border-gray-900 flex 
            items-center justify-center text-sm font-bold"
            >
              {user ? user.userName?.[0]?.toUpperCase() : "?"}
            </div>
            Profile
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="flex flex-col items-center mb-10 relative">
        <button
          onClick={() => navigate("/songs")}
          className="relative z-10 px-10 py-4 bg-green-600 text-white font-bold text-2xl 
          rounded-2xl border-4 border-gray-900 shadow-lg hover:bg-green-700 transition"
        >
          LET'S PLAY
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid gap-5 max-w-5xl mx-auto sm:grid-cols-2 items-stretch">
        {/* Songlist */}
        <div className="flex flex-col bg-white border-4 border-gray-900 rounded-2xl p-5 shadow-lg h-full">
          <div className="flex justify-between items-center mb-3 text-lg font-bold">
            <span>SONGLIST</span>
            <span className="bg-amber-400 border-2 border-gray-900 rounded-full px-3 py-0.5 text-sm font-extrabold">
              {songs.length} tracks
            </span>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 max-h-[calc(4*3.25rem)]">
            {songs.map((song, i) => (
              <div
                key={song.id}
                className="flex items-center gap-3 p-2 rounded-lg border-2 border-transparent
                 hover:border-amber-400 hover:bg-amber-50 transition"
              >
                <div className="text-gray-500 w-5 text-right flex-shrink-0 font-bold">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-sm truncate">
                    {song.name}
                  </div>
                  <div className="text-gray-500 text-xs">{song.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Friends Joined */}
        <div
          className="flex flex-col bg-white border-4 border-gray-900 rounded-2xl 
        p-5 shadow-lg h-full"
        >
          <div className="text-lg font-bold mb-3">FRIENDS JOINED</div>
          <div className="flex-1 overflow-y-auto pr-2 max-h-[calc(4*3.25rem)]">
            {user ? (
              <JoinedUsers />
            ) : (
              <div className="text-center py-10 text-gray-400">
                Log in to see who's playing!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
