import { supabase } from "./supabase";

export async function getWatchedMovies(userId) {
  const { data, error } = await supabase
    .from("watchedMovies")
    .select("*")
    .eq("userId", userId)
    .order("created_at", { ascending: false }); // So it's given in ascending order

  if (error) {
    throw new Error("Movies could not be loaded");
  }
  return data;
}

export async function getUser(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function createUser(newUser) {
  const { data, error } = await supabase.from("users").insert([newUser]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}
