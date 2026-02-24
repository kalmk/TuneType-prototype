import { useEffect, useState } from "react";
import api from "../lib/axios";
import { songs } from "../data/songs"; // <--- add this import

export default function JoinedUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // for profile popup
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    api
      .get("/users/all")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const openUserProfile = async (userId) => {
    try {
      setLoadingProfile(true);
      const { data } = await api.get(`/users/${userId}`);
      setSelectedUser(data);
      setLoadingProfile(false);
    } catch (err) {
      console.log(err);
      setLoadingProfile(false);
    }
  };

  const closeProfile = () => setSelectedUser(null);

  return (
    <div>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user._id}
            className="cursor-pointer hover:text-blue-600"
            onClick={() => openUserProfile(user._id)}
          >
            {user.userName}
          </li>
        ))}
      </ul>

      {/* Profile popup */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={closeProfile}
            >
              ✕
            </button>

            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-black mb-4">
                <img
                  src={`/assets/profilePics/${selectedUser.profilePic || "neutral.jpeg"}`}
                  alt={selectedUser.userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {selectedUser.userName}
              </h2>
              {selectedUser.bio && (
                <p className="mb-4 text-center italic text-gray-700">
                  {selectedUser.bio}
                </p>
              )}
              {selectedUser.favoriteSongs?.length > 0 && (
                <div className="w-full">
                  <h3 className="font-bold mb-2">Favorite Songs:</h3>
                  <ul className="list-disc list-inside">
                    {selectedUser.favoriteSongs.map((songId) => {
                      // Find song name from your local songs array
                      const song = songs.find((s) => s.id === songId);
                      return <li key={songId}>{song ? song.name : songId}</li>;
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
