import React from 'react';
const RegionFilter = ({ selectedRegion, setSelectedRegion }) => {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania", "Antarctic"];

  return (
    <select
      value={selectedRegion}
      onChange={(e) => setSelectedRegion(e.target.value)}
      className="p-2 border border-gray-400 rounded bg-white text-gray-900 dark:bg-gray-100 dark:text-gray-900"
    >
      <option value="">Filter by Region</option>
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
};

export default RegionFilter;