import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import debounce from "lodash.debounce";

type SearchState = {
  searchQuery: string;
  debouncedQuery: string;
  setSearchQuery: (value: string) => void;
};

const useSearch = create<SearchState>()(
  subscribeWithSelector((set) => {
    const setDebouncedQuery = debounce((query: string) => {
      set({ debouncedQuery: query });
    }, 500);

    return {
      searchQuery: "",
      debouncedQuery: "",
      setSearchQuery: (value: string) => {
        set({ searchQuery: value });
        setDebouncedQuery(value);
      },
    };
  })
);

export default useSearch;
