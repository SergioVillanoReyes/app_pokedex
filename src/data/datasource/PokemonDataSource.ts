const API = 'https://pokeapi.co/api'
const VERSION_API = '/v2'
const BASE_URL = `${API}${VERSION_API}`

import { IPokemonDataSource } from './IPokemonDataSource';
import { PokemonDetailResponse, PokemonRaw } from '../models/PokemonRaw';

export class PokemonDataSource implements IPokemonDataSource {

  async getPokemonList(): Promise<PokemonRaw[]> {
    const resp = await fetch(`${BASE_URL}/pokemon`);
    const json = await resp.json();
    return json.results;
  }

  async getPokemonDetail(id: number): Promise<PokemonDetailResponse> {
    const resp = await fetch(`${BASE_URL}/pokemon/${id}`);
    return await resp.json();
  }
  
}