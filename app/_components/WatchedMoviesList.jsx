import WatchedMovie from "./WatchedMovie.jsx";

export default function WatchedMoviesList({ watchedMovies, isSignedIn }) {
  return (
    <ul className="list-none pt-2">
      {watchedMovies.map((watchedMovie) => (
        <WatchedMovie
          watchedMovie={watchedMovie}
          key={watchedMovie.imdbID}
          isSignedIn={isSignedIn}
        />
      ))}
    </ul>
  );
}
