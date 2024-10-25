import { z } from "zod";

// schema for movie data
const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  popularity: z.number(),
});

// schema for the API response
const MovieResponseSchema = z.object({
  page: z.number(),
  results: z.array(MovieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

type MovieResponse = z.infer<typeof MovieResponseSchema>;

const fetchMovies = async (
  pageNumber: number,
  query: string = ""
): Promise<MovieResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const url = query
    ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${pageNumber}`
    : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pageNumber}`;

  const options: RequestInit = {
    cache: query ? "no-store" : "force-cache",
    next: query ? undefined : { revalidate: 600 },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch movies`);
    }

    const rawData = await response.json();
    const validatedData = MovieResponseSchema.parse(rawData);
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      console.error("Validation error:", error.errors);
      const errorMessages = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      throw new Error(`Invalid API response: ${JSON.stringify(errorMessages)}`);
    }
    throw error;
  }
};

export default fetchMovies;
