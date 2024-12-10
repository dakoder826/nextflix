"use client";

import { useSearch } from "../contexts/SearchContext.js";

import MovieItem from "./MovieItem.jsx";
import Spinner from "./Spinner.jsx";

export default function MovieList() {
  const { searchResults, searchResultsPending } = useSearch();

  return (
    <>
      {searchResultsPending ? (
        <Spinner />
      ) : (
        <ul className="list-none pt-2">
          {searchResults?.map((movie) => (
            <MovieItem movie={movie} key={movie.imdbID} />
          ))}
        </ul>
      )}
    </>
  );
}
