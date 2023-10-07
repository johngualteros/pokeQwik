import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import Navbar from '~/components/shared/navbar/navbar';

import styles from './styles.css?inline';
import { PokemonProvider } from '~/context/pokemon/pokemon-provider';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);
  return (
    <PokemonProvider>
      <Navbar />
      <main class='flex flex-col items-center justify-center'>
        <Slot />
      </main>
    </PokemonProvider>
  );
});
