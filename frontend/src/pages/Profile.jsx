import api from "../lib/axios";
import React, { useState, useEffect } from "react";
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

  if (loading) {
    return <p className="text-center mt-20 text-xl">Loading profile...</p>;
  }

  if (!user) {
    return (
      <p className="text-center mt-20 text-xl">
        Please log in to view your profile.
      </p>
    );
  }

  const toggleFavoriteSong = (songId) => {
    if (favoriteSongIds.includes(songId)) {
      setFavoriteSongIds(favoriteSongIds.filter((id) => id !== songId));
    } else {
      setFavoriteSongIds([...favoriteSongIds, songId]);
    }
  };

  const selectProfilePic = (pic) => {
    setUser({ ...user, profilePic: pic });
    setShowPicSelector(false);
  };

  const saveProfile = async () => {
    try {
      const { data } = await api.put("/users/update", {
        profilePic: user.profilePic,
        bio,
        favoriteSongs: favoriteSongIds,
      });

      setUser(data);

      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile.");
    }
  };

  return (
    <div
      className="min-h-screen bg-yellow-50 p-6 flex flex-col items-center"
      style={{
        backgroundColor: "#fef9e7",
        backgroundImage: `
          radial-gradient(circle at 10px 10px, #f6d365 5%, transparent 6%),
          radial-gradient(circle at 30px 30px, #f6d365 5%, transparent 6%)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {/* Back button */}
      <button
        onClick={() => navigate("/homepage")}
        className="self-start mb-4 px-4 py-2 bg-white border-2 border-black rounded-lg font-bold hover:bg-gray-200 transition"
      >
        Back to Homepage
      </button>

      {/* Profile picture */}
      <div
        className="w-32 h-32 rounded-full overflow-hidden border-4 border-black mb-4 cursor-pointer"
        onClick={() => setShowPicSelector(true)}
      >
        <img
          src={`/assets/profilePics/${user.profilePic || "neutral.jpeg"}`}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {showPicSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Select Profile Picture</h3>
            <div className="grid grid-cols-3 gap-4">
              {profilePics.map((pic) => (
                <img
                  key={pic}
                  src={`/assets/profilePics/${pic}`}
                  alt={pic}
                  className="w-20 h-20 rounded-full cursor-pointer border-2 border-black hover:border-green-500"
                  onClick={() => selectProfilePic(pic)}
                />
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-red-200 border-2 border-black rounded-lg"
              onClick={() => setShowPicSelector(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <h2 className="text-3xl font-bold mb-2">{user.userName}</h2>

      {/* Bio */}
      <div className="w-full max-w-xl mb-6">
        <label className="block font-bold mb-1">Bio:</label>
        <textarea
          className="w-full border-2 border-black rounded-lg p-2"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
        />
      </div>

      {/* Favorite Songs */}
      <div className="w-full max-w-xl">
        <h3 className="text-xl font-bold mb-2">Favorite Songs:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {songs.map((song) => (
            <button
              key={song.id}
              onClick={() => toggleFavoriteSong(song.id)}
              className={`p-2 border-2 rounded-lg text-left ${
                favoriteSongIds.includes(song.id)
                  ? "bg-blue-300 border-black font-bold"
                  : "bg-white border-gray-300"
              }`}
            >
              {song.name}
            </button>
          ))}
        </div>
      </div>

      <button
        className="mt-4 px-6 py-2 bg-green-300 border-2 border-black rounded-lg font-bold hover:bg-green-400 transition"
        onClick={saveProfile}
      >
        Save Profile
      </button>
    </div>
  );
};

export default Profile;
