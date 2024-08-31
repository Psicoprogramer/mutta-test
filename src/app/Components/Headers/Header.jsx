'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <header className={`fixed w-full top-0 left-0 z-50 mb-10 transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Image
              src="/Pokebola.png"
              width={40}
              height={40}
              alt="Pokebola"
              className="hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex space-x-4">
            <Link href="/">
              <span className={`cursor-pointer text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} hover:text-yellow-500 transition-colors duration-300`}>
                Home
              </span>
            </Link>
            <Link href="/Pokeapi">
              <span className={`cursor-pointer text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} hover:text-yellow-500 transition-colors duration-300`}>
                PokeDex
              </span>
            </Link>
          </div>
          <button
            onClick={toggleDarkMode}
            className="ml-4 p-2 rounded-full focus:outline-none bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            {darkMode ? (
              <svg
                className="w-6 h-6 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.464-9.464l-.707-.707m-12.02 0l-.707.707m15.707-4.243l-.707-.707M7.05 7.05l-.707.707m13.657 9.193l-.707.707M7.05 16.95l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-900 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
