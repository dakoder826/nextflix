import { unstable_noStore as noStore } from "next/cache";

import Main from "./_components/Main";
import Box from "./_components/Box";
import MovieList from "./_components/MovieList";

import { auth } from "./_lib/auth";
import MoviesWrapper from "./_components/MoviesWrapper";
import { getWatchedMovies } from "./_lib/data-service";

export default async function Home({ searchParams }) {
  noStore();
  const session = await auth();
  let initialWatchedMovies = [];
  if (session?.user) {
    initialWatchedMovies = await getWatchedMovies(session.user.userId);
  }

  const selectedId = searchParams?.selectedId;

  return (
    <Main>
      <Box>
        <MovieList />
      </Box>
      <MoviesWrapper
        selectedId={selectedId}
        initialWatchedMovies={initialWatchedMovies}
        isSignedIn={!!session?.user}
      />
    </Main>
  );
}
