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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{country.name.common}</h2>
      <img src={country.flags.svg} alt={country.name.common} className="w-64 mb-4" />
      <p><strong>Capital:</strong> {country.capital?.[0]}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
    </div>
  );
};

export default CountryDetails;
