import React, { useContext } from "react";
import { FavoritesContext } from "../context/favoritesContext";
import { getCountryByCode } from "../services/countryService";
import { useEffect, useState } from "react";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const [favoriteCountries, setFavoriteCountries] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length > 0) {
        // Fetch details for all favorite country codes
        const promises = favorites.map(code => getCountryByCode(code));
        const results = await Promise.all(promises);
        setFavoriteCountries(results.map(arr => arr[0]));
      } else {
        setFavoriteCountries([]);
      }
    };
    fetchFavorites();
  }, [favorites]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Favorite Countries</h2>
      {favoriteCountries.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoriteCountries.map(country => (
            <div key={country.cca3} className="border rounded shadow p-4">
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="w-full h-32 object-cover mb-2"
              />
              <h3 className="font-bold">{country.name.common}</h3>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
