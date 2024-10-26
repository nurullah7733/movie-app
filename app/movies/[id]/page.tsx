import { Suspense } from "react";
import Image from "next/image";
import getMovieDetails from "../../libs/APIRequest/movieDetailsRequest";
import getMovieCredits from "../../libs/APIRequest/movieCreditsRequest";
import getMovieRecommendations from "../../libs/APIRequest/movieRecomendationsRequest";
import CastSection from "./_components/castSection";
import RecomendationSection from "./_components/recomendationSection";
import { getWatchlist } from "../../actions/watchlistActions";
import useWatchlistStore from "../../zustand/useWatchlist";
import WatchlistSection from "./_components/watchlistSection";
import { Metadata } from "next";

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const movie = await getMovieDetails(params.id);

  return {
    title: `${movie.title}`,
    description:
      movie.overview ||
      `View details about ${movie.title} including cast, ratings, and recommendations`,
    openGraph: {
      title: `${movie.title} - Movie Details`,
      description: movie.overview,
      images: [`https://image.tmdb.org/t/p/w500${movie.poster_path}`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${movie.title} - Movie Details`,
      description: movie.overview,
      images: [`https://image.tmdb.org/t/p/w500${movie.poster_path}`],
    },
  };
}

export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  // frist load watchlist
  const getWatchlistFormServer = await getWatchlist();
  useWatchlistStore.setState({ watchlist: getWatchlistFormServer });

  const movieCreditsPromise = getMovieCredits(id);
  const movieRecommendationsPromise = getMovieRecommendations(id);

  const movie = await getMovieDetails(id);

  return (
    <div className="  dark:bg-gray-800  ">
      <main className="container mx-auto px-4 py-8">
        {/* Movie Hero Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="relative w-full md:w-1/3 aspect-[2/3]">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="rounded-lg object-cover"
              priority
            />
          </div>

          <div className="flex-1">
            {/* Watchlist Section */}
            <WatchlistSection movie={movie} />
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <div className="flex gap-2 mb-4">
              {movie.genres.map((genre: { id: number; name: string }) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Release Date: {new Date(movie.release_date).toLocaleDateString()}
            </p>
            <p className="text-lg mb-6">{movie.overview}</p>
            <div className="inline-flex items-center bg-yellow-100 dark:bg-yellow-900 px-4 py-2 rounded-lg">
              <span className="font-bold text-yellow-700 dark:text-yellow-300">
                ★ {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Cast </h2>
          <Suspense
            fallback={<div className="text-center">Loading Movie Cast...</div>}
          >
            <CastSection movieCreditsPromise={movieCreditsPromise} />
          </Suspense>
        </div>

        {/* Recommendations Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">
            You Might Also Like
          </h2>
          <Suspense
            fallback={
              <div className="text-center">Loading Recomendation Movie...</div>
            }
          >
            <RecomendationSection
              movieRecommendationsPromise={movieRecommendationsPromise}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
