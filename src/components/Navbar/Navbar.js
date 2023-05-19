import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo.js";

const Navbar = () => {
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoritesCount(favorites.length);
  }, [favoritesCount]);

  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-gray-300 hover:text-white">
              Accueil
            </Link>
            <Link to="/like" className="ml-4 text-gray-300 hover:text-white">
              Coups de cœurs
            </Link>
          </div>
          <Logo />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
