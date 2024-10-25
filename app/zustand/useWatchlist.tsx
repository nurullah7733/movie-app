import { create } from "zustand";
import {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} from "../actions/watchlistActions";
import { MovieCardProps } from "../types/types";

interface WatchlistStore {
  watchlist: MovieCardProps[];
  loadWatchlist: () => Promise<void>;
  addMovie: (movie: MovieCardProps) => Promise<void>;
  removeMovie: (movieId: number) => Promise<void>;
  isMovieInWatchlist: (movieId: number) => boolean;
}

const useWatchlistStore = create<WatchlistStore>((set, get) => ({
  watchlist: [],

  loadWatchlist: async () => {
    const movies = await getWatchlist();
    set({ watchlist: movies });
  },
  addMovie: async (movie) => {
    const prevWatchlist = get().watchlist;
    const exits = prevWatchlist.some(
      (item: MovieCardProps) => item.id === movie.id
    );
    if (!exits) {
      set((state) => ({ watchlist: [...state.watchlist, movie] }));

      try {
        await addToWatchlist(movie);
      } catch (error) {
        set({ watchlist: prevWatchlist }); //
        console.error("Failed to add to watchlist:", error);
      }
    }
  },
  removeMovie: async (movieId) => {
    const prevWatchlist = get().watchlist;
    set((state) => ({
      watchlist: state.watchlist.filter((movie) => movie.id !== movieId),
    }));

    try {
      await removeFromWatchlist(movieId);
    } catch (error) {
      set({ watchlist: prevWatchlist });
      console.error("Failed to remove from watchlist:", error);
    }
  },
  isMovieInWatchlist: (movieId: number): boolean => {
    const { watchlist } = useWatchlistStore.getState();
    return watchlist.some((movie) => movie.id === movieId);
  },
}));

export default useWatchlistStore;
