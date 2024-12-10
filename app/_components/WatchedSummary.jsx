const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedSummary({ watchedMovies }) {
  const avgRuntime = average(watchedMovies.map((movie) => movie.runTime));
  const avgImdbRating = average(watchedMovies.map((movie) => movie.imdbRating));
  const avgUserRating = average(watchedMovies.map((movie) => movie.userRating));

  return (
    <div className="m-3 flex flex-col rounded-lg bg-background-dark p-6 text-lg shadow-lg">
      <h2 className="mb-2 self-center font-black uppercase">Your Watchlist</h2>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-1">
          <span>#️⃣</span>
          <span>
            {watchedMovies.length === 0 ? (
              <p>No Movies</p>
            ) : (
              <p>
                {watchedMovies.length} movie
                {watchedMovies.length > 1 ? "s" : ""}
              </p>
            )}
          </span>
        </div>
        {/* <p className="flex items-center gap-1">
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p className="flex items-center gap-1">
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p className="flex items-center gap-1">
          <span>⏳</span>
          <span>{Math.round(avgRuntime)} min</span>
        </p> */}
      </div>
    </div>
  );
}
