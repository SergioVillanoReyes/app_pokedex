import { PokemonDetailResponse, PokemonListResponse } from '../models/PokemonRaw';

export interface IPokemonDataSource {
  getPokemonList(offset: number, limit: number): Promise<PokemonListResponse>
  getPokemonDetail(id: number): Promise<PokemonDetailResponse>
}
