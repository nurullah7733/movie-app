/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_TMDB_API_KEY: "5d40735d3612f4fe985c6d41e1ab7369",
  },
  images: {
    domains: ["image.tmdb.org"],
  },
};

export default nextConfig;
