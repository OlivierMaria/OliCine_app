import React, { useState } from "react";

const Like = () => {
  const initialFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleRemoveFavorite = (id) => {
    // Supprimer le film de la liste des favoris
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    // Mettre à jour le stockage local (localStorage)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    // Mettre à jour l'état local pour refléter les changements
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mes coups de cœur</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105"
            >
              <img
                className="h-64 w-full object-cover"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="p-4">
                <h1 className="text-xl font-bold mb-2">{movie.title}</h1>
                <p className="text-gray-600 mb-2">
                  Date de sortie: {movie.release_date}
                </p>
                <p className="text-gray-600 mb-2">
                  Note du film: {movie.vote_average} ⭐
                </p>
                <div className="h-40 overflow-y-auto">
                  <h2 className="text-xl font-bold mb-2">Synopsis :</h2>
                  <p className="text-gray-800">{movie.overview}</p>
                </div>
                <button
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  onClick={() => handleRemoveFavorite(movie.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Aucun film dans vos coups de cœur.</p>
      )}
    </div>
  );
};

export default Like;
