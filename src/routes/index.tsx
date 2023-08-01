import { $, component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const nav = useNavigate();
  const pokemonId = useSignal<number>(1);
  const showBackImage = useSignal<boolean>(false);
  const revealPokemon = useSignal<boolean>(false);

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0) return;
    pokemonId.value += value;
  });

  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonId.value}/`);
  });

  return (
    <>
      <span class="text-2xl font-bold">Simple Search</span>
      <span class="text-9xl">{pokemonId}</span>

      {/* <Link href={`/pokemon/${pokemonId.value}/`}> */}
      <div class="cursor-pointer" onClick$={async () => await goToPokemon()}>
        <PokemonImage
          pokemonId={pokemonId.value}
          size={200}
          backImage={showBackImage.value}
          reveal={revealPokemon}
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
          onClick$={() => (showBackImage.value = !showBackImage.value)}
          class="btn btn-primary"
        >
          Rotate
        </button>
        <button
          onClick$={() => (revealPokemon.value = !revealPokemon.value)}
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
