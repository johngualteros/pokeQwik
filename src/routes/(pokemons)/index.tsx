import { $, component$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export default component$(() => {
  const {pokemonId, nextPokemon, previousPokemon, showBackImage, isPokemonVisible, toggleFromBack, toggleVisible} = usePokemonGame();

  const nav = useNavigate();
  
  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonId.value}/`);
  });

  return (
    <>
      <span class="text-2xl font-bold">Simple Search</span>
      <span class="text-9xl">{pokemonId.value}</span>

      {/* <Link href={`/pokemon/${pokemonId.value}/`}> */}
      <div class="cursor-pointer" onClick$={async () => await goToPokemon()}>
        <PokemonImage
          pokemonId={pokemonId.value}
          size={200}
          backImage={showBackImage.value}
          reveal={isPokemonVisible.value}
          />
      </div>
      {/* </Link> */}

      <div>
        {/* $symbol is lazy load for qwik */}
        <button onClick$={previousPokemon} class="btn btn-primary">
          Last
        </button>
        <button onClick$={nextPokemon} class="btn btn-primary">
          Next
        </button>
        <button
          onClick$={toggleFromBack}
          class="btn btn-primary"
        >
          Rotate
        </button>
        <button
          onClick$={toggleVisible}
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
