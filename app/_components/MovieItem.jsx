"use client";
import Link from "next/link";
import Image from "next/image";

import { useSearch } from "../contexts/SearchContext";

export default function MovieItem({ movie }) {
  const { query } = useSearch();

  // Other way without Link component
  // async function handleSelectMovie(movieId) {
  //   const params = new URLSearchParams();
  //   if (query) params.set("query", query);
  //   params.set("selectedId", movieId);
  //   router.push(`?${params.toString()}`);
  // }

  return (
    <Link
      href={`?query=${query}&selectedId=${movie.imdbID}`}
      // onClick={() => handleSelectMovie(movie.imdbID)}
      className="relative grid cursor-pointer grid-cols-[3rem,1fr] grid-rows-[auto-auto] gap-x-4 border-b-2 border-b-background-dark px-3 py-2 text-sm transition-all duration-300 hover:bg-background-dark"
    >
      <Image
        src={movie.Poster != "N/A" ? movie.Poster : ""}
        alt={`${movie.Title} poster`}
        width={120}
        height={180}
        className="row-span-2 w-full"
      />

      <h3 className="text-lg font-bold">{movie.Title}</h3>
      <div>
        <p className="flex items-center gap-2">
          <span>🗓</span>
          <span className="text-lg">{movie.Year}</span>
        </p>
      </div>
    </Link>
  );
}
