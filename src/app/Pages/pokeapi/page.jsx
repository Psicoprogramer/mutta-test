import ScrollToTopButton from "app/app/Components/Buttons/ScrollToTopButton";
import PokemonList from "app/app/Components/Cards/PokemonList";
import Header from "app/app/Components/Headers/Header";


const Page = () => {
  
  return (
    <>
      <Header/>
      <PokemonList/>
      <ScrollToTopButton></ScrollToTopButton>
    </>
  );
};

export default Page;
