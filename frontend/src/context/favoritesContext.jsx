import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./authContext";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    if (!user) return;
    const res = await fetch("http://localhost:5000/api/user/favorites", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const data = await res.json();
    setFavorites(data);
  };

  const addFavorite = async (countryCode) => {
    if (!user) return;
    const res = await fetch("http://localhost:5000/api/user/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ countryCode }),
    });
    const data = await res.json();
    setFavorites(data);
  };

  const removeFavorite = async (countryCode) => {
    if (!user) return;
    const res = await fetch("http://localhost:5000/api/user/favorites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ countryCode }),
    });
    const data = await res.json();
    setFavorites(data);
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
