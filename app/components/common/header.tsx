"use client";
import { FaHeart } from "react-icons/fa";
import ThemeToggle from "./themeToggle";
import { useTheme } from "../../context/useTheme";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import useSearch from "@/app/zustand/useSearch";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import useWindowResize from "../../libs/windowResize/useWindowResize";

const Header = () => {
  const { width = 1200 } = useWindowResize();
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const { setSearchQuery, debouncedQuery } = useSearch();
  const prevDebouncedQuery = useRef(debouncedQuery);

  const { register } = useForm({
    defaultValues: { search: "" },
  });

  // Update the search query as the user types
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    // at least 3 characters
    if (newSearch.length >= 3 || newSearch.length === 0) {
      setSearchQuery(newSearch);
    }
  };

  // Redirect on debounced search query change
  useEffect(() => {
    if (prevDebouncedQuery.current !== debouncedQuery) {
      router.push(`/`); // Redirect to home page on debounced search query change
      prevDebouncedQuery.current = debouncedQuery;
    }
  }, [debouncedQuery, pathname, router]);

  return (
    <header className="sticky h-16 top-0 z-50 w-full border-b bg-white dark:bg-gray-900 backdrop-blur">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between !items-center h-16 gap-2">
          <Link href="/">
            {theme === "dark" ? (
              <Image
                src="/movie-app-logo.png"
                alt="logo"
                width={100}
                height={30}
              />
            ) : (
              <Image
                src="/movie-app-logo-2.png"
                alt="logo"
                width={100}
                height={30}
              />
            )}
          </Link>

          <input
            placeholder={`${
              width < 768
                ? "Search movie..."
                : "Search movies at least 3 characters..."
            }`}
            className="md:w-[400px] lg:w-[600px] border rounded py-2 px-3 text-sm bg-white dark:bg-gray-800"
            {...register("search", {
              minLength: 3,
            })}
            type="text"
            onChange={handleSearchChange} // Update search query on input change
          />

          <div className="flex items-center md:gap-4 gap-2">
            <button>
              <Link href="/watchlist">
                <FaHeart className="h-5 w-5" />
              </Link>
            </button>
            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
