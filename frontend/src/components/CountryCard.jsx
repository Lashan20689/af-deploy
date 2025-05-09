import React from "react";
import { useNavigate } from "react-router-dom";

const CountryCard = ({ country, className, onClick }) => {
  const navigate = useNavigate();

  // Get current favorites from localStorage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const isFavorite = favorites.includes(country.cca3);

  const handleAddOrRemoveAndNavigate = (e) => {
    e.stopPropagation();

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter(code => code !== country.cca3);
    } else {
      updatedFavorites = [...favorites, country.cca3];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    navigate("/favorites");
  };

  return (
    <div
      onClick={onClick}
      className={`block border rounded shadow p-4 hover:bg-gray-100 dark:hover:bg-gray-700 relative cursor-pointer ${className || ""}`}
    >
      <img
        src={country.flags.svg}
        alt={country.name.common}
        className="w-full h-40 object-cover mb-2"
      />
      <h3 className="font-bold">{country.name.common}</h3>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>

      <button
        onClick={handleAddOrRemoveAndNavigate}
        className="mt-2 block w-full bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded transition-colors duration-200"
      >
        {isFavorite ? "Remove from Favorites & Go" : "Add to Favorites & Go"}
      </button>
    </div>
  );
};

export default CountryCard;
