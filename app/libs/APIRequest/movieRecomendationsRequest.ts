import { z } from "zod";

// Movie Recommendations Schema
const MovieRecommendationSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  release_date: z.string(),
  overview: z.string(),
});

const RecommendationsResponseSchema = z.object({
  page: z.number(),
  results: z.array(MovieRecommendationSchema),
});

type MovieRecommendation = z.infer<typeof MovieRecommendationSchema>;

const getMovieRecommendations = async (
  id: string
): Promise<MovieRecommendation[]> => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const rawData = await res.json();
    const validatedData = RecommendationsResponseSchema.parse(rawData);
    return validatedData.results.slice(0, 12); // Return top 12 recommendations
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Recommendations validation error:", error.errors);
      return []; // Return empty array on validation error
    }
    return [];
  }
};

export default getMovieRecommendations;
