import Image from "next/image";
import React from "react";

interface CastSectionProps {
  movieCreditsPromise: Promise<
    {
      id: number;
      name: string;
      profile_path: string | null;
      character: string;
    }[]
  >;
}

const CastSection: React.FC<CastSectionProps> = async ({
  movieCreditsPromise,
}) => {
  const credits = await movieCreditsPromise;
  return (
    <section className="mb-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {credits.map((person) => (
          <div key={person.id} className="overflow-hidden">
            <div className="relative w-full aspect-[2/3]">
              <Image
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                    : "/placeholder-avatar.jpg"
                }
                alt={person.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{person.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {person.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CastSection;
