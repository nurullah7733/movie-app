import ClientHome from "./components/homePage/clientHome";
import fetchMovies from "./libs/APIRequest/moviesRequest";

export default async function Page() {
  // Initial data with caching
  const initialData = await fetchMovies(1);

  return <ClientHome initialData={initialData} />;
}
