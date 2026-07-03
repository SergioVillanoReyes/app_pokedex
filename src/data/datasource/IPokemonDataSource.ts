import { PokemonDetailResponse, PokemonRaw } from '../models/PokemonRaw';

export interface IPokemonDataSource {

  getPokemonList(): Promise<PokemonRaw[]>

  getPokemonDetail(id: number): Promise<PokemonDetailResponse>

}
