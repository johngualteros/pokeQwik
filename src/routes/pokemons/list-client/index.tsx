/* eslint-disable @typescript-eslint/no-unused-vars */
import { component$, useContext, useOnDocument, useStore, useTask$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-pokemons';
import type { SmallPokemon } from '~/interfaces';
import { $ } from '@builder.io/qwik';
import { PokemonListContext } from '~/context/pokemon/pokemon-list.context';

// interface PokemonPageState {
//   currentPage: number;
//   isLoading: boolean;
//   pokemons: SmallPokemon[];
// }

export default component$(() => {

  // const pokemonState = useStore<PokemonPageState>({
  //   currentPage: 0,
  //   isLoading: false,
  //   pokemons: [],
  // });

  const pokemonList = useContext(PokemonListContext);

  // useVisibleTask$(async ({ track }) => {
  //   track(() => pokemonState.currentPage);
  //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
  //   pokemonState.pokemons = [...pokemonState.pokemons ,...pokemons];
  // });

  useTask$(async ({ track }) => {
    track(() => pokemonList.currentPage);
    pokemonList.isLoading = true;
    const pokemons = await getSmallPokemons(pokemonList.currentPage * 10, 30);
    pokemonList.pokemons = [...pokemonList.pokemons ,...pokemons];
    pokemonList.isLoading = false;
  });

  useOnDocument('scroll', $((_event) => {
    const maxScroll = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;

    if ((currentScroll + 200) >= maxScroll && !pokemonList.isLoading) {
      pokemonList.isLoading = true;
      pokemonList.currentPage++;
    }
  }));

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Actual page: {pokemonList.currentPage}</span>
        <span>isLoading?: </span>
      </div>
      <div class="mt-10">
        <button
          onClick$={() => pokemonList.currentPage++}
          class="btn btn-primary mr-2">
          Latest
        </button>
      </div>
      <div class="grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-7 mt-5">
        {
          pokemonList.pokemons.map((pokemon: any) => (
            <div class="m-5 flex flex-col justify-center items-center" key={pokemon.name}>
              {/* <img src={pokemon.url} alt={pokemon.name} width={200} height={200}/> */}
              <PokemonImage pokemonId={pokemon.id} />
              <span class="capitalize">{pokemon.name}</span>
            </div>
          ))
        }
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "List Client",
};