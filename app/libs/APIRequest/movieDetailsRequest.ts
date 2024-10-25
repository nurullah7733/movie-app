import { z } from "zod";

const MovieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  runtime: z.number().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  status: z.string(),
  tagline: z.string().nullable(),
  budget: z.number(),
  revenue: z.number(),
});

type MovieDetails = z.infer<typeof MovieDetailsSchema>;

const getMovieDetails = async (id: string): Promise<MovieDetails> => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch movie details: ${res.status}`);
    }

    const rawData = await res.json();
    return MovieDetailsSchema.parse(rawData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Movie details validation error:", error.errors);
      throw new Error("Invalid movie details data structure");
    }
    throw error;
  }
};

export default getMovieDetails;
