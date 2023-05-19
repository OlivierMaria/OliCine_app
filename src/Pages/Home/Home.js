import React, { useState, useEffect } from "react";
import Movie from "../../components/Movie/Movie.js";

const Home = () => {
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const updateFavoritesCount = () => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavoritesCount(favorites.length);
    };

    // Update favorites count initially
    updateFavoritesCount();

    // Listen for changes in favorites count
    window.addEventListener("storage", updateFavoritesCount);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("storage", updateFavoritesCount);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="mb-7"></div>
      <Movie favoritesCount={favoritesCount} />
      <button
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleScrollToTop}
      >
        Revenir en haut
      </button>
    </div>
  );
};

export default Home;
