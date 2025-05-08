import React, { useEffect, useState } from 'react';
import {
  getAllCountries,
  getCountryByName,
  getCountriesByRegion,
} from "../services/countryService";
import SearchBar from "../components/SearchBar";
import CountryCard from "../components/CountryCard";
import RegionFilter from "../components/RegionFilter";
import CountryDetailsModal from "../components/CountryDetailsModal";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCountries();
      setCountries(data);
    };
    fetchData();
  }, []);

  const filteredCountries = countries.filter((country) => {
    const matchesRegion = !selectedRegion || country.region === selectedRegion;

    const nameMatch = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const langMatch = Object.values(country.languages || {}).some((lang) =>
      lang.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return matchesRegion && (nameMatch || langMatch);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-center text-blue-900 drop-shadow mb-2">
            🌍 Explore Countries of the World
          </h1>
          <p className="text-center text-blue-700 mb-4">
            Discover {countries.length} countries and their details
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white/70 p-4 rounded-2xl shadow-lg">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <RegionFilter selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
        </div>
        {filteredCountries.length === 0 ? (
          <div className="text-center text-xl text-blue-700 mt-20">
            No countries found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                className="hover:scale-105 transition-transform duration-300"
                onClick={() => setSelectedCountryCode(country.cca3)}
              />
            ))}
          </div>
        )}
        {/* Modal for country details */}
        {selectedCountryCode && (
          <CountryDetailsModal
            code={selectedCountryCode}
            onClose={() => setSelectedCountryCode(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
