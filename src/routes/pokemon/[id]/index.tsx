import { component$, useSignal } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
    const pokemonId = useSignal<string>(useLocation().params.id);
    return (
        <div>
            <h1>Pokemon: { pokemonId.value }</h1>
        </div>
    );
  
});