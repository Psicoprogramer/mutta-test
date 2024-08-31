/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/PokeAPI/**"
      },
      {
        protocol: "https",
        hostname: "https://static.wikia.nocookie.net/",
        port: "",
        pathname: "/pokemongo_es_gamepedia/*"
      }
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
