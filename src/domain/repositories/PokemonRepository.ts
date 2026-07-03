import { Pokemon, PokemonDetail } from '../entities/Pokemon';

export interface PokemonRepository {
  getPokemonList(offset: number, limit: number): Promise<{ pokemons: Pokemon[], hasMore: boolean }>
  getPokemonById(id: number): Promise<PokemonDetail>
}