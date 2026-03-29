import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Game from "./pages/Game";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="ow-app min-h-screen text-slate-100 flex flex-col">
        <Navbar />
        <main className="w-full flex-1">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
