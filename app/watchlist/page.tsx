"use client";
import Image from "next/image";
import useWatchlistStore from "../zustand/useWatchlist";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";

const WatchlistPage = () => {
  const { watchlist, removeMovie } = useWatchlistStore();
  return (
    <div className="dark:bg-gray-800 bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">My Watchlist</h1>

        {watchlist && watchlist.length === 0 && (
          <p className="text-center text-gray-500">Your watchlist is empty</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist &&
            watchlist.map((movie) => (
              <div
                key={movie.id}
                className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative">
                  <Link href={`/movies/${movie.id}`}>
                    <Image
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/placeholder.png"
                      }
                      alt={`${movie.title} poster`}
                      width={300}
                      height={450}
                      className="w-full h-auto"
                    />
                  </Link>
                  <div
                    className="absolute top-0 right-0 p-2 bg-red-500"
                    onClick={() => removeMovie(movie.id)}
                  >
                    <button>
                      <IoMdClose />
                    </button>
                  </div>
                </div>
                <Link href={`/movies/${movie.id}`}>
                  <div className="p-4">
                    <h2 className="font-semibold text-lg mb-2 truncate">
                      {movie.title}
                    </h2>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WatchlistPage;
