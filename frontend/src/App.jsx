import { Routes, Route } from "react-router-dom";
import SongSelect from "./pages/SongSelect";
import Game from "./pages/Game";
import Welcome from "./pages/Welcome";

export default function App() {
  return (
    <Routes>
      {/* Implement all path to the pages accordingly */}
      <Route path="/welcome" element={<Welcome />} />

      {/* Gameplay */}
      <Route path="/songs" element={<SongSelect />} />
      <Route path="/play/:songId" element={<Game />} />
    </Routes>
  );
}
