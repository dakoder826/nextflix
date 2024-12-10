"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { auth, signIn, signOut } from "./auth";

const key = process.env.MOVIE_API_KEY;
const supabaseUrl = process.env.SUPABASE_URL;

export async function fetchMovies(query) {
  if (!query || query.length < 1) return [];

  // if (query.length < 3) return { error: "Please provide a longer query" };

  const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`);
  const data = await res.json();

  if (data.Response === "False") return [];

  return data.Search; // Return movie data
}

export async function fetchMovieDetails(selectedId) {
  // Check if selectedId is provided
  if (!selectedId) return {};

  // Make the API call to OMDB API
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`,
  );

  // Check for a valid response
  const data = await res.json();

  // Handle case when movie is not found
  if (data.Response === "False") throw new Error("Movie not found");

  // Return the movie data if the API call is successful
  return data; // data contains the movie details
}

export async function addWatchedMovie(newMovie) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const imageName = newMovie.poster.split("M/")[1].replace(/@/g, "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/posters/${imageName}`;

  const response = await fetch(newMovie.poster);
  const imageBlob = await response.blob();

  // Retrieving storage bucket data
  const { data: bucketData, error: bucketError } = await supabase.storage
    .from("posters")
    .list();

  if (bucketError) {
    throw new Error("Error retrieving bucket data");
  }
  const imageExists = bucketData.some((file) => file.name === imageName);

  // If the image isn't already in the storage bucket, go ahead and upload it
  if (!imageExists) {
    const { error: storageError } = await supabase.storage
      .from("posters")
      .upload(imageName, imageBlob);

    if (storageError) {
      throw new Error("Poster could not be uploaded");
    }
  }

  // Add movie
  const { error } = await supabase
    .from("watchedMovies")
    .insert([{ ...newMovie, poster: imagePath, userId: session.user.userId }]);
  // Other way
  // const { error } = await supabase.from("watchedMovies").insert([newMovie]);

  if (error) {
    throw new Error("Movie could not be created");
  }

  // Delete the cabin IF there was an error uploading the image
  // if (storageError) {
  //   await supabase.from("watchedMovies").delete().eq("id", data.id); // data.id coming from data object received above
  //   console.log(storageError);
  //   throw new Error("Poster could not be uploaded and movie was not created");
  // }

  // Clear cache
  revalidatePath("/");
}

export async function deleteWatchedMovie(deletedMovieId) {
  const { error } = await supabase
    .from("watchedMovies")
    .delete()
    .eq("id", deletedMovieId);

  if (error) {
    throw new Error("Movie could not be deleted");
  }
  // To clear the cache
  revalidatePath("/");
}

export async function updateWatchedMovie(movieId, updatedFields) {
  const { error } = await supabase
    .from("watchedMovies")
    .update(updatedFields) // Dynamically update fields
    .eq("id", movieId) // Use the unique identifier (assuming it's 'id')
    .select();

  if (error) {
    throw new Error("Movie could not be updated");
  }
  revalidatePath("/"); // Ensure the updated data is reflected
}

export async function signInAction() {
  // If you had more than one provider, you'd have to loop through them
  await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
