import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { FavoritesContext } from "../context/favoritesContext";

const CountryCard = ({ country, className, onClick }) => {
  const { user } = useContext(AuthContext);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  const isFavorite = Array.isArray(favorites) && favorites.includes(country.cca3);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent modal open when clicking favorite
    if (isFavorite) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country.cca3);
    }
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

      {user && (
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 bg-white dark:bg-gray-800 text-sm px-2 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {isFavorite ? "★ Remove" : "☆ Favorite"}
        </button>
      )}
    </div>
  );
};

export default CountryCard;
