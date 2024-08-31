'use client';
import Header from "app/app/Components/Headers/Header";
import ApiServices from 'app/app/Services/ApiServices';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const PokemonCard = ({ params }) => {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  const apiService = new ApiServices(apiUrl);

  const [data, setData] = useState(null);

  useEffect(() => {
    apiService.fetchSingleData(params.id).then((data) => {
      setData(data);
    });
  }, [params.id]);

  if (!data) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-5">
      <div className="animate-spin">
        <Image
          src="/pokebola.png"
          alt="Loading"
          width={100}
          height={100}
        />
      </div>
    </div>
  );

  const typeIcons = {
    normal: 'https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/4/43/Icon_Normal.png/revision/latest?cb=20220331181122',
    fire: 'https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/4/44/Icon_Fuego.png/revision/latest?cb=20220331181217',
    water: 'https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/d/d3/Icon_Agua.png/revision/latest?cb=20220331181037',
    electric: 'https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/3/33/Icon_El%C3%A9ctrico.png/revision/latest?cb=20220331181243',
    grass: 'https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/7/7f/Icon_Planta.png/revision/latest?cb=20220331181149',
    ice: 'https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/2/22/Icon_Hielo.png/revision/latest?cb=20220331181131',
    fighting: 'https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/4/4c/Icon_Lucha.png/revision/latest?cb=20220331181227',
    poison: 'https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/a/a4/Icon_Siniestro.png/revision/latest?cb=20220331181300',
    ground: 'https://commons.wikimedia.org/wiki/File:Pok%C3%A9mon_Ground_Type_Icon.svg',
    flying: 'https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/d/d3/Icon_Volador.png/revision/latest?cb=20220331181207',
    psychic: 'https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/c/c0/Icon_Ps%C3%ADquico.png/revision/latest?cb=20220331181104',
    bug: 'https://commons.wikimedia.org/wiki/File:Pok%C3%A9mon_Bug_Type_Icon.svg',
    rock: 'https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/1/12/Icon_Roca.png/revision/latest?cb=20220331181056',
    ghost: 'https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/a/a4/Icon_Siniestro.png/revision/latest?cb=20220331181300',
    dragon: 'https://commons.wikimedia.org/wiki/File:Pok%C3%A9mon_Dragon_Type_Icon.svg',
    dark: 'https://commons.wikimedia.org/wiki/File:Pok%C3%A9mon_Dark_Type_Icon.svg',
    steel: 'https://commons.wikimedia.org/wiki/File:Pok%C3%A9mon_Steel_Type_Icon.svg',
    fairy: 'https://commons.wikimedia.org/wiki/File:Pok%C3%A9mon_Fairy_Type_Icon.svg',
  };

  return (
    <>
   <Header></Header>
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-5">
      <div className="bg-[#f0f0f0] rounded-2xl shadow-lg w-[300px] p-6">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#ffcb05] to-[#f08030] rounded-2xl opacity-30 blur-[50px]" />
          <div className="relative z-10 flex flex-col items-center">
            <Image
              src={data.sprites.other['official-artwork'].front_default}
              alt={data.name}
              width={150}
              height={150}
              className="rounded-full border-4 border-[#f0f0f0]"
              style={{ aspectRatio: "150/150", objectFit: "cover" }}
            />
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-[#333]">{data.name}</h3>
              <div className="flex justify-center mt-2">
                {data.types.map((type, index) => (
                  <img
                    key={index}
                    src={typeIcons[type.type.name]}
                    alt={type.type.name}
                    className="w-8 h-8 mx-1"
                  />
                ))}
              </div>
              <p className="text-lg text-[#666] mt-1">{data.types.map(type => type.type.name).join(', ')}</p>
            </div>
          </div>
        </div>
        <div className="relative mt-6">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#ffcb05] to-[#f08030] rounded-2xl opacity-20 blur-[30px]" />
          <div className="relative z-10 grid grid-cols-3 gap-4">
            {data.moves.slice(0, 3).map((move, index) => (
              <div key={index} className="flex flex-col items-center">
                <p className="text-black">Atack {index}</p>
                <AbilityIcon className="w-8 h-8 fill-[#f08030]" />
                <p className="text-sm text-[#666] mt-1">{move.move.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

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
