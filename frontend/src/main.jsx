import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/authContext";
import { FavoritesProvider } from "./context/favoritesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </AuthProvider>
);




