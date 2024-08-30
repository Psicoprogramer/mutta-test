'use client'
import React, { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll event to show or hide the button
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300"
        style={{
          backgroundImage: 'url(/Pokebola.png)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '90px', 
          height: '90px', 
        }}
        aria-label="Scroll to top"
      >
        <span className="font-extrabold text-xl text-black">↑</span> 
      </button>
    )
  );
};

export default ScrollToTopButton;
