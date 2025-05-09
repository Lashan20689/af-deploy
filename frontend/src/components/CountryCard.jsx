import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { FavoritesContext } from "../context/favoritesContext";
import { useNavigate } from "react-router-dom";

const CountryCard = ({ country, className, onClick }) => {
  const { user } = useContext(AuthContext);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();

  const isFavorite = Array.isArray(favorites) && favorites.includes(country.cca3);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country.cca3);
    }
  };

  const handleAddAndNavigate = (e) => {
    e.stopPropagation();
    if (!isFavorite) {
      addFavorite(country.cca3);
    }
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

      {user && (
        <>
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 bg-white dark:bg-gray-800 text-sm px-2 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {isFavorite ? "★ Remove" : "☆ Favorite"}
          </button>
          <button
            onClick={handleAddAndNavigate}
            className="mt-2 block w-full bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded transition-colors duration-200"
          >
            Add to Favorites & Go
          </button>
        </>
      )}
    </div>
  );
};

export default CountryCard;
