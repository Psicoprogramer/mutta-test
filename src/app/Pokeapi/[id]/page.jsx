"use client";

import ErrorMessage from "app/app/Components/error/ErrorMessage";
import Header from "app/app/Components/Headers/Header";
import ApiServices from "app/app/Services/ApiServices";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PokemonCard = ({ params }) => {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon";
  const apiService = new ApiServices(apiUrl);

  const [data, setData] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const pokemonData = await apiService.fetchSingleData(params.id);
        setData(pokemonData);

        // Fetch evolution chain
        const speciesData = await fetch(pokemonData.species.url).then((res) =>
          res.json()
        );
        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolutionChainData = await fetch(evolutionChainUrl).then((res) =>
          res.json()
        );
        const evolutions = extractEvolutions(evolutionChainData.chain);
        setEvolutions(evolutions);
        setAudioUrl(pokemonData.cries.latest); 
      } catch (error) {
        setError("No pudimos cargar la información del Pokémon. Inténtalo de nuevo más tarde.");
        console.error("Error fetching data:", error);
      }
    };

    fetchPokemonData();
  }, [params.id]);

  const extractEvolutions = (chain) => {
    const evolutions = [];
    let current = chain;
  
    while (current) {
      if (current.species) {
        const urlParts = current.species.url.split('/');
        const id = urlParts[urlParts.length - 2]; 
        evolutions.push({ id, name: current.species.name });
      }
      if (current.evolves_to.length > 0) {
        current = current.evolves_to[0];
      } else {
        break;
      }
    }
  
    return evolutions;
  };
  const playSound = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };
  if (error) return <ErrorMessage message={error} />;

  if (!data)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-5">
        <div className="animate-spin">
          <Image src="/pokebola.ico" alt="Loading" width={100} height={100} />
        </div>
      </div>
    );

  const typeIcons = {
    normal: "/pokemon_types/type_normal.png",
    fire: "/pokemon_types/type_fire.png",
    water: "/pokemon_types/type_water.png",
    electric: "/pokemon_types/type_electric.png",
    grass: "/pokemon_types/type_grass.png",
    ice: "/pokemon_types/type_ice.png",
    fighting: "/pokemon_types/type_fighting.png",
    poison: "/pokemon_types/type_poison.png",
    ground: "/pokemon_types/type_ground.png",
    flying: "/pokemon_types/type_flying.png",
    psychic: "/pokemon_types/type_psychic.png",
    bug: "/pokemon_types/type_bug.png",
    rock: "/pokemon_types/type_rock.png",
    ghost: "/pokemon_types/type_ghost.png",
    dragon: "/pokemon_types/type_dragon.png",
    dark: "/pokemon_types/type_dark.png",
    steel: "/pokemon_types/type_steel.png",
    fairy: "/pokemon_types/type_fairy.png",
  };

  return (
    <>
      <Header />
      <div className=" mt-20 flex justify-center items-center min-h-screen bg-gray-900 text-white p-5">
        <div className="bg-[#f0f0f0] rounded-2xl shadow-lg w-[300px] p-6">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#ffcb05] to-[#f08030] rounded-2xl opacity-30 blur-[50px]" />
            <div className="relative z-10 flex flex-col items-center">
              <Image
                src={data.sprites.other["official-artwork"].front_default}
                alt={data.name}
                width={150}
                height={150}
                className="rounded-full border-4 border-[#f0f0f0]"
                style={{ aspectRatio: "150/150", objectFit: "cover" }}
              />
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-[#333]">{data.name}</h3>
                <div className="flex justify-center  mt-2">
                  {data.types.map((type, index) => (
                    <img
                      key={index}
                      src={typeIcons[type.type.name]}
                      alt={type.type.name}
                      className="w-13 h-8 mx-1"
                    />
                  ))}
                </div>
                <p className="text-lg text-[#666] mt-1">Height: {data.height / 10} m</p>
                <p className="text-lg text-[#666] mt-1">Weight: {data.weight / 10} kg</p>
                {audioUrl && (
                  <button
                    onClick={playSound}
                    className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    listen to pokemon
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="relative mt-6">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#ffcb05] to-[#f08030] rounded-2xl opacity-20 blur-[30px]" />
            <div className="relative z-10 grid grid-cols-3 gap-4">
              {data.moves.slice(0, 3).map((move, index) => (
                <div key={index} className="flex flex-col items-center">
                  <p className="text-black">Atack {index + 1}</p>
                  <AbilityIcon className="w-8 h-8 fill-[#f08030]" />
                  <p className="text-sm text-[#666] mt-1">{move.move.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
          <h4 className="text-xl font-bold text-[#333] mb-4">Evolutions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 justify-center">
            {evolutions.map((evolution, index) => (
              <div key={index} className="bg-[#ffffff] rounded-lg shadow-lg  flex flex-col items-center">
                <Link href={`/Pokeapi/${evolution.id}`} className="flex flex-col items-center p-2">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${evolution.id}.png`}
                      alt={evolution.name}
                      width={100}
                      height={100}
                      className="rounded-full border-4 border-[#f0f0f0]"
                    />
                    <p className="mt-2 text-center text-sm font-semibold text-[#333]">{evolution.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

const AbilityIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

export default PokemonCard;
