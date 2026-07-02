const API = 'https://pokeapi.co/api'
const VERSION_API = '/v2'
const BASE_URL = `${API}${VERSION_API}`

import { IPokemonDataSource } from './IPokemonDataSource';
import { PokemonRaw } from '../models/PokemonRaw';

export class PokemonDataSource implements IPokemonDataSource {

  async getPokemonList(): Promise<PokemonRaw[]> {
    const resp = await fetch(`${BASE_URL}/pokemon`);
    const json = await resp.json();
    return json.results;
  }
  
}