import { $, component$, useContext } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";

export default component$(() => {
  const nav = useNavigate();
  // const pokemonId = useSignal<number>(1);
  // const showBackImage = useSignal<boolean>(false);
  // const revealPokemon = useSignal<boolean>(false);

  const pokemonGame = useContext(PokemonGameContext);

  const changePokemonId = $((value: number) => {
    if (pokemonGame.pokemonId + value <= 0) return;
    pokemonGame.pokemonId += value;
  });

  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonGame.pokemonId}/`);
  });

  return (
    <>
      <span class="text-2xl font-bold">Simple Search</span>
      <span class="text-9xl">{pokemonGame.pokemonId}</span>

      {/* <Link href={`/pokemon/${pokemonId.value}/`}> */}
      <div class="cursor-pointer" onClick$={async () => await goToPokemon()}>
        <PokemonImage
          pokemonId={pokemonGame.pokemonId}
          size={200}
          backImage={pokemonGame.showBackImage}
          reveal={pokemonGame.isPokemonVisible}
          />
      </div>
      {/* </Link> */}

      <div>
        {/* $symbol is lazy load for qwik */}
        <button onClick$={() => changePokemonId(-1)} class="btn btn-primary">
          Last
        </button>
        <button onClick$={() => changePokemonId(1)} class="btn btn-primary">
          Next
        </button>
        <button
          onClick$={() => (pokemonGame.showBackImage = !pokemonGame.showBackImage)}
          class="btn btn-primary"
        >
          Rotate
        </button>
        <button
          onClick$={() => (pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible)}
          class="btn btn-primary"
        >
          Reveal
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "pokeqwik application",
    },
  ],
};
