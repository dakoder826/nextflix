"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

import StarRating from "./StarRating";
import Spinner from "./Spinner";
import Button from "./Button";
import ConfirmationModal from "./ConfirmationModal";

import { useSearch } from "../contexts/SearchContext";
import { useKey } from "../_lib/useKey";
import {
  addWatchedMovie,
  deleteWatchedMovie,
  fetchMovieDetails,
  signInAction,
  updateWatchedMovie,
} from "../_lib/actions";

export default function MovieDetails({
  watchedMovies,
  isSignedIn,
  selectedId,
}) {
  const router = useRouter();
  const {
    handleCloseMovie,
    handleDeleteLocally,
    handleAddLocally,
    handleUpdateLocally,
  } = useSearch();

  // const searchParams = useSearchParams();
  // const selectedId = searchParams.get("selectedId");

  const [isAddPending, startAddTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isEditPending, startEditTransition] = useTransition();

  const [userRating, setUserRating] = useState(0);
  const [isEditingRating, setIsEditingRating] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const countRef = useRef(0);

  // Derived state
  const watchedMovie = watchedMovies.find(
    (movie) => movie.imdbID === selectedId,
  );
  const watchedUserRating = watchedMovie?.userRating;
  const isWatched = !!watchedMovie;

  // Effects
  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  useEffect(() => {
    async function handleMovieDetails() {
      startAddTransition(async () => {
        const movieDetails = await fetchMovieDetails(selectedId);
        setMovieDetails(movieDetails); // Update state after fetching
        setUserRating(0);
      });
    }
    handleMovieDetails();
  }, [selectedId]);

  // Modal logic
  function openModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleAdd() {
    const newWatchedMovie = {
      title,
      imdbID: selectedId,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runTime: parseInt(runtime, 10),
      userRating,
      countRatingDecisions: countRef.current,
      isFavorite: false,
    };
    if (isSignedIn) {
      startAddTransition(async () => {
        await addWatchedMovie(newWatchedMovie);
        handleCloseMovie();
      });
    } else {
      handleAddLocally(newWatchedMovie);
    }
  }

  async function handleDelete() {
    if (isSignedIn) {
      startDeleteTransition(async () => {
        await deleteWatchedMovie(watchedMovie.id);
        router.push("/");
      });
    } else {
      handleDeleteLocally(watchedMovie.imdbID);
      router.push("/");
    }
  }

  async function handleSaveRating() {
    if (isSignedIn) {
      startEditTransition(async () => {
        if (userRating > 0) {
          await updateWatchedMovie(watchedMovie.id, { userRating: userRating });
        }
        setIsEditingRating(false); // Exit editing mode
      });
    } else {
      // Update locally for non-signed-in users
      if (userRating > 0) {
        const updatedMovie = {
          ...watchedMovie,
          userRating: userRating,
        };
        handleUpdateLocally(updatedMovie);
      }
    }
    setIsEditingRating(false); // Exit editing mode
  }

  useKey("Escape", handleCloseMovie);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  return (
    <div>
      {isAddPending ? (
        <Spinner />
      ) : (
        <>
          <header className="relative flex">
            <button
              className="absolute left-4 top-4 z-[999] flex aspect-square h-7 cursor-pointer items-center justify-center rounded-full border-none bg-white font-sans text-xl font-bold text-black shadow-[0_8px_20px_rgba(0,0,0,0.8)] hover:bg-primary-dark hover:text-text-light"
              onClick={handleCloseMovie}
            >
              &larr;
            </button>

            <Image
              src={poster}
              alt={`Poster of ${title}`}
              width={150}
              height={250}
              className="w-1/3"
            />
            <div className="flex w-full flex-col gap-4 bg-background-dark px-4 py-6">
              <h2 className="text-2xl font-bold">
                {title}
                {watchedMovie?.isFavorite && (
                  <span className="ml-3 inline-block h-3 w-3 rounded-full bg-green-500"></span>
                )}
              </h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p className="flex items-center gap-2">
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section className="flex flex-col gap-2 p-6">
            <div className="border-1 flex flex-col items-center gap-2 rounded-xl bg-background-dark px-6 py-8">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <Button onClick={handleAdd}>Add to list</Button>
                  )}
                </>
              ) : isEditingRating ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  <Button onClick={handleSaveRating} isPending={isEditPending}>
                    Save rating
                  </Button>
                </>
              ) : (
                <>
                  <p>
                    You rated this movie {watchedUserRating}
                    {watchedUserRating > 1 ? " stars" : " star"}
                  </p>
                  <Button onClick={() => setIsEditingRating(true)}>
                    Edit Rating
                  </Button>
                </>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>

          {isWatched && (
            <div className="flex justify-center">
              <Button type="delete" onClick={openModal}>
                Delete Movie
              </Button>
            </div>
          )}
        </>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        isPending={isDeletePending}
        title="Are you sure?"
        message="Do you really want to delete from your watchlist?"
      />
    </div>
  );
}
