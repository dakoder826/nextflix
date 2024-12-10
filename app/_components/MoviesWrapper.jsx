"use client";
import { useEffect } from "react";
import { useSearch } from "../contexts/SearchContext";
import Box from "./Box";
import MovieDetails from "./MovieDetails";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedSummary from "./WatchedSummary";
import Popup from "./Popup";
import Link from "next/link";

function MoviesWrapper({ isSignedIn, initialWatchedMovies, selectedId }) {
  const { watchedMovies, setWatchedMovies, showPopup, closePopup } =
    useSearch();

  // Ensure watchedMovies is initialized outside the render phase
  useEffect(() => {
    if (!isSignedIn && watchedMovies.length === 0) {
      setWatchedMovies(initialWatchedMovies);
    }
  }, [isSignedIn, initialWatchedMovies, watchedMovies, setWatchedMovies]);

  // Use server-fetched movies if the user is logged in otherwise rely on client-side context
  const displayedMovies = isSignedIn ? initialWatchedMovies : watchedMovies;

  return (
    <>
      {showPopup && !isSignedIn && (
        <Popup onClose={closePopup}>
          <div className="p-4 text-center">
            <h2 className="text-lg font-bold text-black">
              Watchlist Not Saved
            </h2>
            <p className="text-md mb-2 text-gray-600">
              Your watchlist won&apos;t be saved unless you sign in. Sign in to
              save your movies!
            </p>
            <Link
              // Redirect to sign-in page
              href="signin"
              className="rounded bg-primary-light px-4 py-2 text-white hover:bg-primary-dark"
            >
              Sign In
            </Link>
          </div>
        </Popup>
      )}

      <Box>
        {selectedId ? (
          <MovieDetails
            watchedMovies={displayedMovies}
            isSignedIn={isSignedIn}
          />
        ) : (
          <>
            <WatchedSummary watchedMovies={displayedMovies} />
            <WatchedMoviesList
              watchedMovies={displayedMovies}
              isSignedIn={isSignedIn}
            />
          </>
        )}
      </Box>
    </>
  );
}

export default MoviesWrapper;
