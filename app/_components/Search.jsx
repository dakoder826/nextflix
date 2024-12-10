"use client";
import { useEffect, useRef } from "react";
import { useKey } from "../_lib/useKey";
import { useSearch } from "../contexts/SearchContext";
import { fetchMovies } from "../_lib/actions";

export default function Search() {
  // How to not set DOM elements in React
  // useEffect(() => {
  //   const el = document.querySelector(".search");
  //   console.log(el);
  //   el.focus();
  // }, []);

  const { setQuery, setSearchResults, query, setSearchResultsPending } =
    useSearch();
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    // setQuery("");
    // setMovies([]);
  });

  useEffect(() => {
    async function handleFetchMovies(queryURL) {
      setSearchResultsPending(true);
      const newMovies = await fetchMovies(queryURL);
      setSearchResults(newMovies);
      setSearchResultsPending(false);
    }
    handleFetchMovies(query);
  }, [query, setSearchResults, setSearchResultsPending]);

  return (
    <input
      className="w-96 justify-self-center rounded-lg border-0 bg-primary-light px-6 py-4 text-xl text-text-light transition-all duration-300"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
