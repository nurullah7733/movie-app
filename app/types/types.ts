export interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string | null;
}

export interface MovieResponse {
  page: number;
  results: {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
  }[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetailsPageProps {
  params: {
    id: string;
  };
}

export interface MovieDetailsRequestTypes {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
  vote_average: number;
}

export interface CreditRequestTypes {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieRecommendationRequestTypes {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}
