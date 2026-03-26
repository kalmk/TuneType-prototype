import api from "../lib/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { songs } from "../data/songs";

const profilePics = [
  "blushing.jpeg",
  "cute.jpeg",
  "happy.jpeg",
  "neutral.jpeg",
  "sad.jpeg",
  "smile.jpeg",
];

const Profile = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [bio, setBio] = useState("");
  const [favoriteSongIds, setFavoriteSongIds] = useState([]);
  const [showPicSelector, setShowPicSelector] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data);
        setBio(data.bio || "");
        setFavoriteSongIds(data.favoriteSongs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setUser]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const toggleFavoriteSong = (songId) => {
    setFavoriteSongIds((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId],
    );
  };

  const selectProfilePic = (pic) => {
    setUser({ ...user, profilePic: pic });
    setShowPicSelector(false);
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const { data } = await api.put("/users/update", {
        profilePic: user.profilePic,
        bio,
        favoriteSongs: favoriteSongIds,
      });
      setUser(data);
      showToast("Profile saved");
    } catch {
      showToast("Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-100">
        <div className="w-12 h-12 border-4 border-amber-300 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-100">
        <p className="text-lg font-bold">Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-100 p-6 font-sans text-gray-900">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full border-2 shadow-md z-50
          ${
            toast.type === "error"
              ? "bg-red-400 text-white border-black"
              : "bg-black text-amber-300 border-amber-300"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Back */}
      <button
        onClick={() => navigate("/homepage")}
        className="mb-6 px-4 py-1 border-2 border-black rounded-lg bg-white shadow hover:bg-gray-100"
      >
        Back
      </button>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div
          onClick={() => setShowPicSelector(true)}
          className="w-28 h-28 rounded-full border-4 border-black shadow-md overflow-hidden cursor-pointer relative"
        >
          <img
            src={`/assets/profilePics/${user.profilePic || "neutral.jpeg"}`}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-500 opacity-0 hover:opacity-30 transition-opacity rounded-full" />
        </div>

        <h1 className="text-2xl font-bold mt-3">{user.userName}</h1>
      </div>

      {/* Cards */}
      <div className="max-w-xl mx-auto flex flex-col gap-5">
        {/* Bio */}
        <div className="bg-white border-4 border-black rounded-2xl p-4 shadow">
          <div className="font-bold mb-2">BIO</div>
          <textarea
            className="w-full border-2 border-black rounded-lg p-2 bg-amber-50 focus:outline-none
             focus:ring-2 focus:ring-amber-400"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
          />
          <div className="text-right text-xs text-gray-400 mt-1">
            {bio.length} / 200
          </div>
        </div>

        {/* Favorite Songs */}
        <div className="bg-white border-4 border-black rounded-2xl p-4 shadow">
          <div className="flex justify-between mb-2 font-bold">
            <span>FAVORITE SONGS</span>
            {favoriteSongIds.length > 0 && (
              <span className="px-3 py-0.5 text-xs font-bold border-2 border-black bg-amber-400 rounded-full">
                {favoriteSongIds.length}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {songs.map((song) => {
              const active = favoriteSongIds.includes(song.id);
              return (
                <button
                  key={song.id}
                  onClick={() => toggleFavoriteSong(song.id)}
                  className={`text-sm px-3 py-2 rounded-lg border-2 text-left font-semibold transition
                    ${
                      active
                        ? "bg-amber-400 border-black shadow"
                        : "bg-amber-50 border-gray-300 hover:border-amber-400"
                    }`}
                >
                  {song.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-center mt-6">
        <button
          onClick={saveProfile}
          disabled={saving}
          className="px-10 py-3 bg-green-600 text-white font-bold text-lg rounded-xl border-4 border-black shadow
          hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
        >
          {saving ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "SAVE PROFILE"
          )}
        </button>
      </div>

      {/* Modal */}
      {showPicSelector && (
        <div
          onClick={() => setShowPicSelector(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border-4 border-black rounded-2xl p-5 w-full max-w-sm relative"
          >
            <button
              onClick={() => setShowPicSelector(false)}
              className="absolute top-3 right-3 w-8 h-8 border-2 border-black rounded-full bg-white"
            >
              X
            </button>

            <div className="text-center font-bold mb-4">
              Choose your picture
            </div>

            <div className="grid grid-cols-3 gap-3">
              {profilePics.map((pic) => (
                <div
                  key={pic}
                  onClick={() => selectProfilePic(pic)}
                  className={`aspect-square rounded-full overflow-hidden border-2 cursor-pointer
                    ${
                      user.profilePic === pic
                        ? "border-black shadow"
                        : "border-gray-300 hover:border-amber-400"
                    }`}
                >
                  <img
                    src={`/assets/profilePics/${pic}`}
                    alt={pic}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
