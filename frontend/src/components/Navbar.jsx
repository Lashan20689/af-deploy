import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-500 text-white dark:bg-gray-800">
      <div className="flex gap-4 items-center">
        <Link to="/" className="text-lg font-bold">REST Countries</Link>
        <Link to="/login" className="text-sm underline">Login</Link>
        <Link to="/register" className="text-sm underline">Register</Link>
        {/* ⭐ Favourite Button */}
        <Link
          to="/favorites" // <-- Make sure this matches your route!
          className="text-sm underline bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
        >
          Favourite
        </Link>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-white text-black px-2 py-1 rounded"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
