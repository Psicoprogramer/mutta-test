import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      {/* Header Section */}
      <header className="z-10 max-w-5xl w-full flex flex-col items-center lg:flex-row lg:justify-between mb-12">
        {/* Logo */}
        <div className="flex items-center mb-4 lg:mb-0">
          <Image
            src="/pokebola.ico"
            alt="Pokebola Logo"
            width={50}
            height={50}
            className="mr-4"
          />
          <p className="text-center text-lg font-bold text-gray-900 dark:text-white">
            Prueba técnica de Brayan Cabrera Diez - Desarrollador Front End
          </p>
        </div>

        {/* External Link */}
        <a
          className="flex items-center gap-2 text-custon-mutta-green dark:text-white hover:underline"
          href="https://mutaworld.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-black">Para{" "}</p> 
          <Image
            src="/muttaLogo.png"
            alt="Logo de Mutta"
            width={150}
            height={75}
            priority
          />
        </a>
      </header>

      {/* Main Image Section */}
      <div className="relative flex items-center justify-center mb-12 transition-transform duration-300 ease-in-out hover:scale-105">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 dark:from-yellow-800 dark:via-yellow-900 dark:to-black opacity-40 blur-3xl z-[-1]"></div>
        <Image
          className="rounded-xl shadow-lg"
          src="/ash_y_picachu_sin_bg.png"
          alt="Ash and Pikachu"
          width={500}
          height={300}
          priority
        />
      </div>

      {/* Navigation Links */}
      <div className="grid gap-8 lg:grid-cols-4 sm:grid-cols-2 text-center lg:text-left">
        <Link
          href={"/Pokeapi"}
          className="group flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 border border-transparent hover:border-gray-300 dark:hover:border-neutral-700"
        >
          <h2 className="text-2xl font-semibold mb-3 dark:text-white text-gray-800">
            Poke Test{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              <Image
                src="/pokebola.ico"
                width={30}
                height={30}
                alt="Pokebola"
              />
            </span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Card conectada a la API de Pokémon
          </p>
        </Link>
         {/* LinkedIn Card */}
         <Link
          href="https://www.linkedin.com/in/brayancabrerapsicodevp/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 border border-transparent hover:border-gray-300 dark:hover:border-neutral-700"
        >
          <h2 className="text-2xl font-semibold mb-3 dark:text-white text-gray-800">
            Mi LinkedIn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              <Image
                src="/linkeding.png"
                width={30}
                height={30}
                alt="LinkedIn"
              />
            </span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Conéctate conmigo en LinkedIn para ver mi experiencia y habilidades.
          </p>
        </Link>
      </div>
    </main>
  );
}
