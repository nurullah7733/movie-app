import Home from "./components/homePage/home";
import fetchMovies from "./libs/APIRequest/moviesRequest";

export default async function Page(): Promise<React.ReactElement> {
  const initialData = await fetchMovies(1);

  return <Home initialData={initialData} />;
}
