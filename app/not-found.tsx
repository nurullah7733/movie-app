import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-800">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 text-blue-500 underline">
        Go back to Home
      </Link>
    </div>
  );
}
