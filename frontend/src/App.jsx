import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";
import Navbar from "./components/Navbar";
import HeroPage from "./pages/HeroPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites"; // <-- Add this line
import { AuthProvider } from "./context/authContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <AuthProvider>
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/country/:code" element={<CountryDetails />} />
          <Route path="/favorites" element={<Favorites />} /> {/* <-- Add this line */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
