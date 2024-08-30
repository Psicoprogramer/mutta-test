import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center bg-white from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl  lg:bg-white lg:p-4 lg:bg-white ">
          <code className=" text-black  font-mono font-bold">
            {" "}
            Prueba tecnica de Brayan cabrera Diez - Desarrollador Front end
          </code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 text-custon-mutta-green sm-text-black"
            href="https://mutaworld.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Para{" "}
            <Image
              src="/muttaLogo.png"
              alt="Logo de mutta "
              className="dark:invert"
              width={200}
              height={100}
              priority
            />
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center relative px-1 py-1 ring-1 ring-black ring-opacity-5 before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] transition-transform duration-300 ease-in-out hover:scale-105">
        <Image
          className="relative rounded-xl"
          src="/ash_y_picachu_sin_bg.png"
          alt="Pokemon Ash Pikachu"
          width={500}
          height={150}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <Link
            href={"/Pages/pokeapi"}
            className="flex flex-col  group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Poke Test{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                <Image
                  src="/pokebola.png"
                  width={30}
                  height={30}
                  alt="pokebola"
                ></Image>
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm  opacity-80`}>
              Card conectada a la Api de Pokemon
            </p>
          </Link>
      </div>
    </main>
  );
}
