import { PokemonRaw } from '../models/PokemonRaw';

export interface IPokemonDataSource {
  getPokemonList(): Promise<PokemonRaw[]>
}
