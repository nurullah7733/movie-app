"use client";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useWatchlistStore from "./../../../zustand/useWatchlist";
import { MovieCardProps } from "@/app/types/types";

const WatchlistSection = ({ movie }: { movie: MovieCardProps }) => {
  const { addMovie, removeMovie, isMovieInWatchlist } = useWatchlistStore();

  const isInWatchlist = isMovieInWatchlist(movie.id);
  const handleToggleWatchlist = () => {
    if (isInWatchlist) {
      removeMovie(movie.id);
    } else {
      addMovie({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      });
    }
  };
  return (
    <div
      className="inline-flex mb-2 gap-2 cursor-pointer items-center bg-yellow-100 dark:bg-yellow-900 px-4 py-2 rounded-lg"
      onClick={handleToggleWatchlist}
    >
      <p className="font-bold text-yellow-700 dark:text-yellow-300">
        {isInWatchlist ? <FaHeart /> : <FaRegHeart />}
      </p>

      <p className="font-bold text-yellow-700 dark:text-yellow-300">
        {isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      </p>
    </div>
  );
};

export default WatchlistSection;
