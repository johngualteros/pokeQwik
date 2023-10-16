/* eslint-disable qwik/jsx-img */
import { component$, useSignal, useTask$, useComputed$ } from "@builder.io/qwik";

interface PokemonImageProps {
  pokemonId: number;
  size?: number;
  backImage?: boolean;
  reveal?: boolean;
}

export const PokemonImage = component$(
  ({ pokemonId, size, backImage = false, reveal }: PokemonImageProps) => {
    const imageLoaded = useSignal<boolean>(false);

    useTask$(({track}) => {
      track(() => pokemonId);
      imageLoaded.value = false;
    });

    const imageUrl = useComputed$(() => {
      return (backImage) ?
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png` :
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    })

    return (
      <div class='flex items-center justify-center' style={{width: `200px`, height: `200px`}}>
        <span>{ imageLoaded.value ? '' : 'Cargando...'}</span>
        <img
          src={imageUrl.value}
          alt="Pokemon"
          onLoad$={() => imageLoaded.value = true}
          width='200'
          height='200'
          class={{
            'hidden': !imageLoaded.value ?? false,
            'brightness-0': reveal ?? false,
          }}
        />
      </div>
    );
  }
);
