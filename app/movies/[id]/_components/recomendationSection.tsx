import React from "react";
import MovieCard from "@/app/components/common/movieCard";

interface MovieRecommendation {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface RecomendationSectionProps {
  movieRecommendationsPromise: Promise<MovieRecommendation[]>;
}

const RecomendationSection: React.FC<RecomendationSectionProps> = async ({
  movieRecommendationsPromise,
}) => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await delay(3000); // waits for 3 seconds
  const recommendations = await movieRecommendationsPromise;

  return (
    <section>
      <div>
        {recommendations?.length === 0 && (
          <div className="text-center">No Recommendations Movie Found</div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendations.map((movie) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecomendationSection;
