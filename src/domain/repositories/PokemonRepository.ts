import { Pokemon, PokemonDetail } from '../entities/Pokemon';

export interface PokemonRepository {

    getPokemonList(): Promise<Pokemon[]>

    getPokemonById(id: number): Promise<PokemonDetail>
    
}