import { useEffect, useState } from "react";
import api from "../lib/axios";
import { songs } from "../data/songs";

export default function JoinedUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    api
      .get("/users/all")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoadingUsers(false));
  }, []);

  const openUserProfile = async (userId) => {
    try {
      setLoadingProfile(true);
      const { data } = await api.get(`/users/${userId}`);
      setSelectedUser(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingProfile(false);
    }
  };

  const closeProfile = () => setSelectedUser(null);

  return (
    <>
      {/* USER LIST */}
      <div className="flex flex-col gap-1">
        {loadingUsers ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-11 rounded-xl animate-pulse bg-amber-100"
            />
          ))
        ) : users.length === 0 ? (
          <div className="text-center text-gray-400 py-8 italic">
            No one's here yet
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              onClick={() => openUserProfile(user._id)}
              className="flex items-center gap-3 p-2 rounded-xl border-2 border-transparent 
              hover:border-amber-400 hover:bg-amber-50 cursor-pointer transition"
            >
              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-full border-2 border-gray-900 bg-amber-400 
              flex items-center justify-center font-bold overflow-hidden"
              >
                {user.profilePic ? (
                  <img
                    src={`/assets/profilePics/${user.profilePic}`}
                    alt={user.userName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user.userName?.[0]?.toUpperCase()
                )}
              </div>

              {/* Name */}
              <span className="font-extrabold text-sm flex-1">
                {user.userName}
              </span>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {(selectedUser || loadingProfile) && (
        <div
          onClick={closeProfile}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-amber-50 border-4 border-gray-900 rounded-3xl
            w-full max-w-sm p-6 relative"
          >
            {/* Close */}
            <button
              onClick={closeProfile}
              className="absolute top-3 right-3 w-8 h-8 rounded-full border-2 border-gray-900 
              bg-white flex items-center justify-center hover:bg-red-100"
            >
              X
            </button>

            {loadingProfile ? (
              <div className="w-10 h-10 border-4 border-amber-300 border-t-black rounded-full animate-spin mx-auto my-10" />
            ) : (
              <>
                {/* Avatar */}
                <div
                  className="w-20 h-20 mx-auto rounded-full border-4 border-gray-900 
                shadow-md bg-amber-400 flex items-center justify-center overflow-hidden text-2xl font-bold"
                >
                  {selectedUser.profilePic ? (
                    <img
                      src={`/assets/profilePics/${selectedUser.profilePic}`}
                      alt={selectedUser.userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    selectedUser.userName?.[0]?.toUpperCase()
                  )}
                </div>

                {/* Name */}
                <div className="text-center text-xl font-bold mt-3">
                  {selectedUser.userName}
                </div>

                {/* Bio */}
                {selectedUser.bio && (
                  <div className="text-center italic text-sm text-gray-500 mt-2">
                    "{selectedUser.bio}"
                  </div>
                )}

                {/* Favorite Songs */}
                {selectedUser.favoriteSongs?.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-bold mb-2">FAVORITE SONGS</div>

                    <div className="flex flex-col gap-1">
                      {selectedUser.favoriteSongs.map((songId) => {
                        const song = songs.find((s) => s.id === songId);
                        return (
                          <div
                            key={songId}
                            className="flex items-center gap-2 bg-white border-2 border-gray-900 
                            rounded-lg px-3 py-1 text-sm font-semibold"
                          >
                            {song ? song.name : songId}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
