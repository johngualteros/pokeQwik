import { component$, useContext } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$, type RequestEventLoader } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export const usePokemonId = routeLoader$<number>(({params, redirect}: RequestEventLoader) => {
    const id = Number(params.id);
    if(isNaN(id)) {
        redirect(307, '/'); 
    }
    if(id <= 0 || id > 1000) {
        redirect(307, '/'); 
    }
    return id;
});

export default component$(() => {
    // const pokemonId = useSignal<number>(Number.parseInt(useLocation().params.id));
    const pokemonId = usePokemonId();
    const pokemonGameContext = useContext(PokemonGameContext);
    return (
        <>
            <PokemonImage 
                pokemonId={pokemonId.value}
                size={200}
                backImage={pokemonGameContext.showBackImage}
                reveal={pokemonGameContext.isPokemonVisible}                
           />
        </>
    );
  
});

export const head: DocumentHead = {
    title: 'Pokemon',
}