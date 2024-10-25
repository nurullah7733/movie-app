import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MovieCardProps {
  movieId: number;
  title: string;
  poster_path: string;
}

const MovieCard = ({ movieId, title, poster_path }: MovieCardProps) => {
  return (
    <div>
      <Link href={`/movies/${movieId}`} className="block">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            width={500}
            height={300}
            className="transition-opacity duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
            <h2 className="text-white text-sm font-semibold p-2">{title}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
