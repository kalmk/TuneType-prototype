import { Routes, Route } from "react-router-dom";
import SongSelect from "./pages/SongSelect";
import Game from "./pages/Game";
import Welcome from "./pages/Welcome";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./lib/axios";
import useUserStore from "./store/userStore";

export default function App() {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data);
      } catch (err) {
        console.log("Not logged in");
      }
    };

    checkAuth();
  }, [setUser]);

  return (
    <Routes>
      <Route path="/" element={user ? <HomePage /> : <Welcome />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/songs" element={<SongSelect />} />
      <Route path="/play/:songId" element={<Game />} />
    </Routes>
  );
}
