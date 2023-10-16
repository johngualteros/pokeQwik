import { component$, Slot } from '@builder.io/qwik';

import Navbar from '~/components/shared/navbar/navbar';

import { PokemonProvider } from '~/context/pokemon/pokemon-provider';

export default component$(() => {
  return (
    <PokemonProvider>
      <Navbar />
      <main class='flex flex-col items-center justify-center'>
        <Slot />
      </main>
    </PokemonProvider>
  );
});
