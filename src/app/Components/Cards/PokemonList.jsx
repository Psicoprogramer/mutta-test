'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState, useRef } from 'react';
import ApiServices from 'app/app/Services/ApiServices';
import Search from "../Inputs/Search";

export default function PokemonList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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
      setIsLoading(true);
      try {
        const newData = await apiService.fetchData(offset);
        setData(prevData => [...prevData, ...newData]);
        setFilteredData(prevData => [...prevData, ...newData]);
        setHasMore(newData.length > 0); 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [offset]);

  return (
    <div>
      <Search data={data} setFilteredData={setFilteredData} />
      <section className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {filteredData.map((pokemon, index) => {
          const pokemonId = pokemon.url?.split("/")[6];
          const pokemonName = pokemon.name || "Unknown";
          return (
            <div
              key={pokemonId}
              ref={filteredData.length === index + 1 ? lastElementRef : null} // Attach ref only to the last element
            >
              <Link href={`/Pokeapi/${pokemonId}`}>
                <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                  <div className="p-3 flex flex-col h-full">
                    <h2 className="text-white font-bold text-center p-2">
                      {pokemonName}
                    </h2>
                    <Image
                      className="rounded-full shadow-sm"
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
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-5">
          <div className="animate-spin">
            <Image src="/pokebola.png" alt="Loading" width={100} height={100} />
          </div>
        </div>
      )}
      {!hasMore && <p>No hay más datos para cargar</p>}
    </div>
  );
}
