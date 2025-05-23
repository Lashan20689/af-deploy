import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCountryByCode } from "../services/countryService";

const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    getCountryByCode(code).then((data) => setCountry(data[0]));
  }, [code]);

  if (!country) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-2">{country.name.common}</h2>
        <img src={country.flags.svg} alt={country.name.common} className="w-64 mb-4 mx-auto rounded" />
        <p><strong>Capital:</strong> {country.capital?.[0]}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
      </div>
    </div>
  );
};

export default CountryDetails;
