'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState, useRef } from 'react';
import ApiServices from 'app/app/Services/ApiServices';
import Search from "../Inputs/Search";
import ErrorMessage from "../error/ErrorMessage";

export default function PokemonList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true); 
  const [hasMore, setHasMore] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true); 
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(""); 

  const observer = useRef();

  const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  const apiService = new ApiServices(apiUrl);

  const lastElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setOffset(prevOffset => prevOffset + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await apiService.fetchData(offset);
        const uniqueData = [...new Set([...data, ...newData])];
        setData(uniqueData);

        if (query) {
          const filtered = uniqueData.filter(pokemon =>
            pokemon.name.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredData(filtered);
        } else {
          setFilteredData(uniqueData);
        }

        setHasMore(newData.length > 0); 
      } catch (error) {
        setError("No pudimos cargar la información del Pokémon. Inténtalo de nuevo más tarde.");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [offset, query]); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setShowSpinner(false);
    }
  }, [isLoading]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    const filtered = data.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="bg-blue-50 min-h-screen relative mt-20">
      {showSpinner && (
        <div className="flex justify-center items-center min-h-screen bg-gray-800 bg-opacity-75 text-white p-5 absolute inset-0 z-50">
          <div className="animate-spin">
            <Image src="/pokebola.png" alt="Loading" width={100} height={100} />
          </div>
        </div>
      )}
      {!showSpinner && (
        <>
          <Search data={data} onSearch={handleSearch} /> 
          <section className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
            {filteredData.map((pokemon, index) => {
              const pokemonId = pokemon.url?.split("/")[6];
              const pokemonName = pokemon.name || "Unknown";

              return (
                <div
                  key={pokemonId ? pokemonId : `${pokemonName}-${index}`}
                  ref={filteredData.length === index + 1 ? lastElementRef : null}
                >
                  <Link href={`/Pokeapi/${pokemonId}`}>
                    <div className="bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full transform hover:scale-105">
                      <div className="p-3 flex flex-col h-full">
                        <h2 className="text-gray-900 font-bold text-center p-2 text-lg">
                          {pokemonName}
                        </h2>
                        <Image
                          className="rounded-full shadow-md"
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemonId}.png`}
                          alt={pokemonName}
                          width={150}
                          height={150}
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </section>
          {isLoading && (
            <div className="flex justify-center items-center min-h-screen bg-gray-800 bg-opacity-75 text-white p-5">
              <div className="animate-spin">
                <Image src="/pokebola.ico" alt="Loading" width={100} height={100} />
              </div>
            </div>
          )}
          {!hasMore && <p className="text-center text-gray-600 mt-4">No hay más datos para cargar</p>}
        </>
      )}
    </div>
  );
}
