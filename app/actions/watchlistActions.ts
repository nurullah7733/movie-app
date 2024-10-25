"use server";
import { MovieCardProps } from "../types/types";

let watchlist: MovieCardProps[] = [];

export async function addToWatchlist(
  movie: MovieCardProps
): Promise<MovieCardProps[]> {
  const exits = watchlist.some((item) => item.id === movie.id);
  if (!exits) {
    watchlist.push(movie);
  }
  return watchlist;
}

export async function removeFromWatchlist(
  movieId: number
): Promise<MovieCardProps[]> {
  watchlist = watchlist.filter((movie) => movie.id !== movieId);
  return watchlist;
}

export async function getWatchlist(): Promise<MovieCardProps[]> {
  return watchlist;
}
