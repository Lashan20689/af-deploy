// src/components/_tests_/CountryCard.test.jsx
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import CountryCard from "../CountryCard";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { FavoritesContext } from "../../context/favoritesContext";
import { vi } from "vitest";

const mockCountry = {
  cca3: "USA",
  name: { common: "United States" },
  region: "Americas",
  population: 331000000,
  flags: { svg: "https://restcountries.com/data/usa.svg" },
};

const renderWithContext = (
  ui,
  {
    user = {},
    favorites = [],
    addFavorite = vi.fn(),
    removeFavorite = vi.fn(),
  } = {}
) => {
  return render(
    <AuthContext.Provider value={{ user }}>
      <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
        <BrowserRouter>{ui}</BrowserRouter>
      </FavoritesContext.Provider>
    </AuthContext.Provider>
  );
};

describe("CountryCard Component", () => {
  test("renders country details", () => {
    renderWithContext(<CountryCard country={mockCountry} />, {
      user: { username: "john" },
      favorites: [],
    });

    expect(screen.getByText("United States")).toBeInTheDocument();

    // ✅ Find all <p> elements and check their contents
    const paragraphs = screen.getAllByRole("paragraph", { hidden: true }); // fallback if needed

    // ✅ OR more reliably: use getAllByText for label (Region:) then check the parent
    const regionP = screen.getByText("Region:", { selector: "strong" }).closest("p");
    expect(regionP).toHaveTextContent("Region:");
    expect(regionP).toHaveTextContent("Americas");

    const populationP = screen.getByText("Population:", { selector: "strong" }).closest("p");
    expect(populationP).toHaveTextContent("Population:");
    expect(populationP).toHaveTextContent("331,000,000");

    expect(screen.getByRole("img")).toHaveAttribute("src", mockCountry.flags.svg);
  });

  test("shows ☆ Favorite if not in favorites", () => {
    renderWithContext(<CountryCard country={mockCountry} />, {
      user: { username: "john" },
      favorites: [],
    });

    expect(screen.getByRole("button")).toHaveTextContent("☆ Favorite");
  });

  test("shows ★ Remove if in favorites", () => {
    renderWithContext(<CountryCard country={mockCountry} />, {
      user: { username: "john" },
      favorites: ["USA"],
    });

    expect(screen.getByRole("button")).toHaveTextContent("★ Remove");
  });

  test("calls addFavorite when clicking favorite button", () => {
    const addFavorite = vi.fn();
    renderWithContext(<CountryCard country={mockCountry} />, {
      user: { username: "john" },
      favorites: [],
      addFavorite,
    });

    fireEvent.click(screen.getByRole("button"));
    expect(addFavorite).toHaveBeenCalledWith("USA");
  });

  test("calls removeFavorite when clicking remove button", () => {
    const removeFavorite = vi.fn();
    renderWithContext(<CountryCard country={mockCountry} />, {
      user: { username: "john" },
      favorites: ["USA"],
      removeFavorite,
    });

    fireEvent.click(screen.getByRole("button"));
    expect(removeFavorite).toHaveBeenCalledWith("USA");
  });
});
