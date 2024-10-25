"use client";
import { useTheme } from "../../context/useTheme";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMoon } from "react-icons/lu";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <FaRegMoon className="w-5 h-5" />
      ) : (
        <LuSunMoon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
