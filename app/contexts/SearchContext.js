"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";

// Create a Context for the search query
const SearchContext = createContext();

// Custom hook to use the search context
export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

// Provider component to wrap around your app or specific part of the app
export function SearchProvider({ children }) {
  const [searchResultsPending, setSearchResultsPending] = useState(false);

  const searchParams = useSearchParams();
  // Using URL is great for user navigation
  const queryURL = searchParams.get("query");

  const router = useRouter();

  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState(queryURL || "");

  const [watchedMovies, setWatchedMovies] = useState([]);

  const [showPopup, setShowPopup] = useState(false);

  function handleCloseMovie() {
    const params = new URLSearchParams();
    params.delete("selectedId");
    router.push(`?${params.toString()}`);
  }

  function handleDeleteLocally(movieId) {
    const updatedMovies = watchedMovies.filter((m) => m.imdbID !== movieId);
    setWatchedMovies(updatedMovies);
  }

  // function toggleFavoriteLocally(movie) {
  //   const updatedMovies = watchedMovies.map((m) =>
  //     m.imdbID === movie.imdbID ? { ...m, isFavorite: !isFavorite } : m,
  //   );
  //   setWatchedMovies(updatedMovies);
  //   setIsFavorite(!isFavorite);
  // }

  function handleAddLocally(newMovie) {
    setWatchedMovies((watchedMovies) => [...watchedMovies, newMovie]);
    if (watchedMovies.length < 1) {
      setShowPopup(true);
    }
    handleCloseMovie();
  }

  function handleUpdateLocally(updatedMovie) {
    setWatchedMovies((watchedMovies) =>
      watchedMovies.map((movie) =>
        movie.imdbID === updatedMovie.imdbID ? updatedMovie : movie,
      ),
    );
  }

  function closePopup() {
    setShowPopup(false);
  }

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        searchResults,
        setSearchResults,
        searchResultsPending,
        setSearchResultsPending,
        handleCloseMovie,
        watchedMovies,
        setWatchedMovies,
        handleDeleteLocally,
        handleAddLocally,
        handleUpdateLocally,
        showPopup,
        closePopup,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

// localStorage.setItem("watched", JSON.stringify([...watched, movie]))
// function handleSelectMovie(id) {
//   setSelectedId((selectedId) => (id === selectedId ? null : id));
// }

//   // addWatchedMovie(movie);
//   // localStorage.setItem("watched", JSON.stringify([...watched, movie]))
// }

// function handleDeleteMovie(deletedMovieImdb) {
//   setWatchedMovies((watchedMovies) =>
//     watchedMovies.filter((movie) => movie.imdbID !== deletedMovieImdb),
//   );
//
