"use client";
import { useSearch } from "../contexts/SearchContext";

export default function NumResults() {
  const { searchResults } = useSearch();
  return (
    <p className="justify-self-end text-lg">
      Found <strong>{searchResults.length}</strong> results
    </p>
  );
}
