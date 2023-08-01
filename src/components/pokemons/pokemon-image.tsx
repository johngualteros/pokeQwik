/* eslint-disable qwik/jsx-img */
import { type Signal, component$, useSignal, useTask$ } from "@builder.io/qwik";

interface PokemonImageProps {
  pokemonId: number;
  size?: number;
  backImage?: boolean;
  reveal?: Signal<boolean>;
}

export const PokemonImage = component$(
  ({ pokemonId, size, backImage = false, reveal }: PokemonImageProps) => {
    const imageLoaded = useSignal<boolean>(false);

    useTask$(({track}) => {
      track(() => pokemonId);
      imageLoaded.value = false;
    });

    return (
      <div class='flex items-center justify-center' style={{width: `${size}px`, height: `${size}px`}}>
        <span>{ imageLoaded.value ? '' : 'Cargando...'}</span>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${backImage ? 'back/' : ''}${pokemonId}.png`}
          alt="Pokemon"
          style={{ width: `${size ?? 200}px` }}
          onLoad$={() => imageLoaded.value = true}
          class={{
            'hidden': !imageLoaded.value ?? false,
            'brightness-0': reveal?.value ?? false,
          }}
        />
      </div>
    );
  }
);
