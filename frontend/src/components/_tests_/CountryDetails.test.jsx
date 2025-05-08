import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CountryDetails from '../../pages/CountryDetails';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as countryService from '../../services/countryService';
import { vi } from 'vitest';

// Mock response
const mockCountry = [{
  name: { common: "Sri Lanka" },
  flags: { svg: "https://flagcdn.com/lk.svg" },
  capital: ["Sri Jayawardenepura Kotte"],
  region: "Asia",
  population: 21413249,
  languages: { sin: "Sinhala", tam: "Tamil" }
}];

// Mock the service function
vi.spyOn(countryService, 'getCountryByCode').mockImplementation(() => Promise.resolve(mockCountry));

describe('CountryDetails component', () => {
  it('renders country details correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/country/LKA']}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Sri Lanka')).toBeInTheDocument();
      expect(screen.getByText(/Sri Jayawardenepura Kotte/)).toBeInTheDocument();
      expect(screen.getByText(/Asia/)).toBeInTheDocument();
      expect(screen.getByText(/21,413,249/)).toBeInTheDocument();
      expect(screen.getByText(/Sinhala, Tamil/)).toBeInTheDocument();
      expect(screen.getByAltText('Sri Lanka')).toHaveAttribute('src', 'https://flagcdn.com/lk.svg');
    });
  });
});
