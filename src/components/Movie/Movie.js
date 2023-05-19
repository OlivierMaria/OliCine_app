import React, { useState, useEffect } from "react";
import axios from "axios";
import InputSearch from "../InputSearch/InputSearch.js";

const Movie = () => {
  const [movies, setMovies] = useState(null);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (searchQuery.length >= 3) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${searchQuery}&language=fr-FR`
          );
          setMovies(response.data.results);
        } else {
          setMovies(null);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
        );
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInitialMovies();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const addToFavorites = (movie) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Vérifier si le film existe déjà dans les favoris
    const isMovieInFavorites = favorites.some((fav) => fav.id === movie.id);
    if (isMovieInFavorites) {
      // Film déjà dans les favoris, ne rien faire
      return;
    }

    favorites.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Mettre à jour le compteur
    setFavoritesCount(favorites.length);
  };

  return (
    <div>
      <p className="text-center text-xl font-bold mb-4">
        Nombre de films dans les coups de cœur 💕 : {favoritesCount}
      </p>
      <InputSearch onSearch={handleSearch} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies &&
          movies.map((movie) => (
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
                  Date de sortie : {movie.release_date}
                </p>
                <p className="text-gray-600 mb-2">
                  Note du film : {movie.vote_average} ⭐
                </p>
                <div className="h-40 overflow-y-auto">
                  <h2 className="text-xl font-bold mb-2">Synopsis :</h2>
                  <p className="text-gray-600">{movie.overview}</p>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded"
                  onClick={() => addToFavorites(movie)}
                >
                  Ajouter aux coups de cœur
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Movie;
