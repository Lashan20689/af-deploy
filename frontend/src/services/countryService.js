const BASE_URL = "https://restcountries.com/v3.1";

// Fetch all countries
export const getAllCountries = async () => {
  try {
    const res = await fetch(`${BASE_URL}/all`);
    if (!res.ok) throw new Error("Failed to fetch all countries");
    return await res.json();
  } catch (error) {
    console.error(error.message);
    return []; // Return empty array to prevent .map crashes
  }
};

// Search by name
export const getCountryByName = async (name) => {
  try {
    const res = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}`);
    if (!res.ok) throw new Error("Country not found");
    return await res.json();
  } catch (error) {
    console.error(error.message);
    return []; // Return empty array
  }
};

// Filter by region
export const getCountriesByRegion = async (region) => {
  try {
    const res = await fetch(`${BASE_URL}/region/${encodeURIComponent(region)}`);
    if (!res.ok) throw new Error("Region not found");
    return await res.json();
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

// Get full details by country code
export const getCountryByCode = async (code) => {
  try {
    const res = await fetch(`${BASE_URL}/alpha/${encodeURIComponent(code)}`);
    if (!res.ok) throw new Error("Country code not found");
    return await res.json();
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
