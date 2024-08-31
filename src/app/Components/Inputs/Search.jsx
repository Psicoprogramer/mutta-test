import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Search({ onSearch }) {
  const [query, setQuery] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScrollTop > lastScrollTop) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop); // Evitar valores negativos
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div className={`fixed top-10 left-0 w-full z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="flex justify-center my-4  p-4">
        <div className="relative w-1/2">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Busca un Pokémon..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Image src="/pokebola.ico" alt="Pokébola" width={24} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
