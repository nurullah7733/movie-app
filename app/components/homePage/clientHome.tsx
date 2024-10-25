"use client";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import useScrollPosition from "../../libs/scrollTracker/scrollTracker";
import MovieCard from "../common/movieCard";
import useSearch from "../../zustand/useSearch";
import { MovieCardProps, MovieResponse } from "../../types/types";
import fetchMovies from "../../libs/APIRequest/moviesRequest";

interface ClientHomeProps {
  initialData: MovieResponse;
}

export default function ClientHome({ initialData }: ClientHomeProps) {
  const scrollPosition = useScrollPosition();
  const { debouncedQuery } = useSearch();
  const { ref, inView } = useInView();
  console.log(debouncedQuery, "debouncedQuery");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["movies", debouncedQuery],
      queryFn: ({ pageParam = 1 }) => fetchMovies(pageParam, debouncedQuery),
      initialPageParam: 1,
      initialData: debouncedQuery
        ? undefined
        : {
            pages: [initialData],
            pageParams: [1],
          },
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
      staleTime: 60000,
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && scrollPosition > 200) {
      fetchNextPage();
    }
  }, [data, inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.pages.map((page) =>
          page.results.map((movie: MovieCardProps) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              title={movie.title}
              poster_path={movie.poster_path || ""}
            />
          ))
        )}
      </div>
      {isLoading && <p className="text-center mt-4">Loading movies...</p>}
      {!isLoading && data && data.pages[0].results.length === 0 && (
        <p className="text-center mt-4">No movies found</p>
      )}
      {isFetchingNextPage && (
        <p className="text-center mt-4">Loading more movies...</p>
      )}
      <div ref={ref} className="h-10" />
    </div>
  );
}
