import React, { useEffect, useState } from "react";
import { getCountryByCode } from "../services/countryService";

const CountryDetailsModal = ({ code, onClose }) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (code) {
      getCountryByCode(code).then((data) => setCountry(data[0]));
    }
  }, [code]);

  if (!code) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative animate-fadeIn border border-gray-200">
        <button
          className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {!country ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2">{country.name.common}</h2>
            <img src={country.flags.svg} alt={country.name.common} className="w-64 mb-4 mx-auto rounded" />
            <p><strong>Capital:</strong> {country.capital?.[0]}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
            <p>
              <strong>Currency:</strong>{" "}
              {country.currencies
                ? Object.values(country.currencies)
                    .map((cur) => `${cur.name} (${cur.symbol})`)
                    .join(", ")
                : "N/A"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CountryDetailsModal;
