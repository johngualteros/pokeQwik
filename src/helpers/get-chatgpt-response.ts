
import { Configuration, OpenAIApi } from 'openai';


const configuration = new Configuration({
    apiKey: import.meta.env.PUBLIC_OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

export const getFunFactAboutPokemon = async (pokemonName: string): Promise<string> => {
    delete configuration.baseOptions.headers['User-Agent'];

    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Give me one fun fact about the pokemon: ${pokemonName}`,
        temperature: 0.2,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })

    return response.data.choices[0].text || 'No fun fact found';
}

