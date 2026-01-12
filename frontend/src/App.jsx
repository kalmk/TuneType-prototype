import { Routes, Route } from "react-router-dom";
import SongSelect from "./pages/SongSelect";
import Game from "./pages/Game";

export default function App() {
  return (
    <Routes>
      <Route path="/songs" element={<SongSelect />} />
      <Route path="/play/:songId" element={<Game />} />
    </Routes>
  );
}
