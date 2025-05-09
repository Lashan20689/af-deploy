import React, { useEffect, useState } from "react";
import { getCountryByCode } from "../services/countryService";

const Favorites = () => {
  const [favoriteCountries, setFavoriteCountries] = useState([]);

  // Helper to get favorites from localStorage
  const getStoredFavorites = () =>
    JSON.parse(localStorage.getItem("favorites")) || [];

  // Remove a country from favorites
  const handleRemove = (code) => {
    const updatedFavorites = getStoredFavorites().filter((c) => c !== code);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavoriteCountries((prev) => prev.filter((country) => country.cca3 !== code));
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = getStoredFavorites();
      if (storedFavorites.length > 0) {
        const promises = storedFavorites.map(code => getCountryByCode(code));
        const results = await Promise.all(promises);
        setFavoriteCountries(results.map(arr => arr[0]));
      } else {
        setFavoriteCountries([]);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Favorite Countries</h2>
      {favoriteCountries.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoriteCountries.map((country) => (
            <div key={country.cca3} className="border rounded shadow p-4 flex flex-col items-center">
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="w-full h-32 object-cover mb-2"
              />
              <h3 className="font-bold">{country.name.common}</h3>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <button
                onClick={() => handleRemove(country.cca3)}
                className="mt-3 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
