import { component$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import type { BasicPokemonInfo, PokemonListResponse } from '~/interfaces/Pokemon-list.response';

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`);
  const data = await response.json() as PokemonListResponse;
  return data.results;
});

export default component$(() => {
    const pokemons = usePokemonList();
    return (
      <>
        <div class="flex flex-col">
          <span class="my-5 text-5xl">Status</span>
          <span>Current offset: xxx</span>
          <span>Is Loading page: xxx</span>
        </div>
        <div class="mt-10">
          <Link class="btn btn-primary mr-2">
            Previous
          </Link> 
          <Link class="btn btn-primary mr-2">
            Latest
          </Link>    
        </div>

        <div class="grid grid-cols-6 mt-5">
          {
            pokemons.value.map((pokemon: any) => (
              <div class="m-5 flex flex-col justify-center items-center" key={pokemon.name}>
                <span class="capitalize">{pokemon.name}</span>
              </div>
            ))
          }
        </div>
      </>
    );
});

export const head: DocumentHead = {
  title: "List SSR",
};