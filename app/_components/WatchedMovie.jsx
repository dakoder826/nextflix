"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";

import ConfirmationModal from "./ConfirmationModal";
import SpinnerMini from "./SpinnerMini";
import { deleteWatchedMovie, updateWatchedMovie } from "../_lib/actions";
import { useSearch } from "../contexts/SearchContext";

export default function WatchedMovie({ watchedMovie, isSignedIn }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    watchedMovie.isFavorite || false,
  );

  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isFavoritePending, startFavoriteTransition] = useTransition();

  const { handleDeleteLocally, handleUpdateLocally } = useSearch();

  async function handleDelete(e) {
    e.preventDefault();
    if (isSignedIn) {
      startDeleteTransition(async () => {
        // Delete from server for signed-in users
        await deleteWatchedMovie(watchedMovie.id);
      });
      console.log(isDeletePending);
    } else {
      // Update local state for non-signed-in users
      handleDeleteLocally(watchedMovie.imdbID);
    }
    // No need for this as we are already redirecting the user back to the homepage
    // setIsModalOpen(false);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const nextFavoriteState = !isFavorite;

    if (isSignedIn) {
      startFavoriteTransition(async () => {
        // Update on the server for signed-in users
        await updateWatchedMovie(watchedMovie.id, {
          isFavorite: nextFavoriteState,
        });
        setIsFavorite(nextFavoriteState);
      });
    } else {
      // Update local state for non-signed-in users
      const updatedMovie = {
        ...watchedMovie,
        isFavorite: nextFavoriteState,
      };
      handleUpdateLocally(updatedMovie);
      setIsFavorite(nextFavoriteState);
    }
  }

  function openModal(e) {
    e.preventDefault();
    setIsModalOpen(true);
  }

  function closeModal(e) {
    e.preventDefault();
    setIsModalOpen(false);
  }

  return (
    <>
      <Link
        href={`?selectedId=${watchedMovie.imdbID}`}
        className="relative grid cursor-pointer grid-cols-[3.7rem,1fr] grid-rows-[auto-auto] gap-x-4 border-b-2 border-b-background-dark px-3 py-2 text-sm transition-all duration-300 hover:bg-background-dark"
      >
        <Image
          src={watchedMovie.poster || ""}
          alt={`${watchedMovie.title} poster`}
          width={120}
          height={180}
          className="row-span-2 w-full"
        />
        <h3 className="text-xl font-bold">{watchedMovie.title}</h3>
        <div className="flex items-center gap-6">
          <p className="flex gap-2 text-lg">
            <span>🌟</span>
            <span>{watchedMovie.userRating}</span>
          </p>
          <p className="text-lg">
            <span>{watchedMovie.year}</span>
          </p>

          <button
            className={`flex items-center gap-2 rounded-lg px-4 py-2 font-bold text-white transition-all duration-300 ${
              isFavorite
                ? "bg-gray-500 hover:bg-gray-400"
                : "bg-favorite-light hover:bg-favorite-dark"
            } disabled:cursor-not-allowed disabled:opacity-60`}
            onClick={handleUpdate}
            disabled={isFavoritePending}
          >
            {isFavoritePending ? (
              <SpinnerMini />
            ) : isFavorite ? (
              "Unfavorite"
            ) : (
              "Favorite"
            )}
          </button>

          <button
            className="btn-delete flex aspect-square h-7 cursor-pointer items-center justify-center rounded-full border-0 bg-red-dark text-2xl font-bold text-background-dark transition-all duration-300 hover:bg-red-light"
            onClick={openModal}
          >
            &times;
          </button>
        </div>
      </Link>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        isPending={isDeletePending}
        title="Are you sure?"
        message="Do you really want to delete from your watchlist?"
      />
    </>
  );
}
