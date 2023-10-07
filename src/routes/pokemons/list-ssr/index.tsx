import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-pokemons';
import type { SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ query, redirect, pathname }) => {
  const offset = Number(query.get('offset') || '0');
  if(isNaN(offset)) {
    redirect(301, pathname);
  }
  if(offset < 0) {
    redirect(301, pathname);
  }
  // const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
  // const data = await response.json() as PokemonListResponse;
  // return data.results;
  return getSmallPokemons(offset);
});

export default component$(() => {
    const pokemons = usePokemonList();
    const location = useLocation();

    const currentOffset = useComputed$<number>(()=> {
      const offsetString = new URLSearchParams(location.url.search);
      const offset = offsetString.get('offset');
      return Number(offset || '0');
    })

    return (
      <>
        <div class="flex flex-col">
          <span class="my-5 text-5xl">Status</span>
          <span>Current offset: { currentOffset }</span>
          <span>Is Loading page: { location.isNavigating ? 'YES' : 'NOT' }</span>
        </div>
        <div class="mt-10">
          <Link 
            href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
            class="btn btn-primary mr-2">
            Previous
          </Link> 
          <Link 
            href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
            class="btn btn-primary mr-2">
            Latest
          </Link>    
        </div>

        <div class="grid grid-cols-6 mt-5">
          {
            pokemons.value.map((pokemon: any) => (
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
  title: "List SSR",
};