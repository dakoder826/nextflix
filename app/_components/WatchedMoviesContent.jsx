"use client";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedSummary from "./WatchedSummary";
import { useSearch } from "../contexts/SearchContext";

export default function WatchedMoviesContent({ user, initialWatchedMovies }) {
  const { watchedMovies, setWatchedMovies } = useSearch();

  // If user isn't logged in, rely on client-side context
  if (!user && watchedMovies.length === 0) {
    setWatchedMovies(initialWatchedMovies);
  }

  // Use server-fetched movies if the user is logged in
  return (
    <>
      <WatchedSummary
        watchedMovies={user ? initialWatchedMovies : watchedMovies}
      />
      <WatchedMoviesList
        watchedMovies={user ? initialWatchedMovies : watchedMovies}
      />
    </>
  );
}

// "use client";
// import WatchedMoviesList from "./WatchedMoviesList";
// import WatchedSummary from "./WatchedSummary";
// import { useSearch } from "../contexts/SearchContext";

// export default function WatchedMoviesContent({ user, initialWatchedMovies }) {
//   const { watchedMovies, setWatchedMovies } = useSearch();

//   if (!user) {
//     setWatchedMovies(initialWatchedMovies);

//     // //  For logged-in users, rely on client-side context
//     // if (watchedMovies.length === 0) {
//     // }
//     return (
//       <>
//         <WatchedSummary watchedMovies={watchedMovies} />
//         <WatchedMoviesList watchedMovies={watchedMovies} />
//       </>
//     );
//   }

//   console.log(initialWatchedMovies);

//   // Use server-fetched movies if the user is logged in
//   return (
//     <>
//       <WatchedSummary watchedMovies={initialWatchedMovies} />
//       <WatchedMoviesList watchedMovies={initialWatchedMovies} user={user} />
//     </>
//   );
// }
