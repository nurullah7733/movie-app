import { z } from "zod";

const CastMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
  order: z.number(),
});

const CreditsResponseSchema = z.object({
  id: z.number(),
  cast: z.array(CastMemberSchema),
});

type CastMember = z.infer<typeof CastMemberSchema>;

const getMovieCredits = async (id: string): Promise<CastMember[]> => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const rawData = await res.json();
    const validatedData = CreditsResponseSchema.parse(rawData);
    return validatedData.cast.slice(0, 6);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Credits validation error:", error.errors);
      return [];
    }
    return [];
  }
};

export default getMovieCredits;
