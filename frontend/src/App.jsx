import { Routes, Route } from "react-router-dom";
import SongSelect from "./pages/SongSelect";
import Game from "./pages/Game";
import Welcome from "./pages/Welcome";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <Routes>
      {/* Implement all path to the pages accordingly */}
      <Route path="/" element={<Welcome />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Gameplay */}
      <Route path="/songs" element={<SongSelect />} />
      <Route path="/play/:songId" element={<Game />} />
    </Routes>
  );
}
