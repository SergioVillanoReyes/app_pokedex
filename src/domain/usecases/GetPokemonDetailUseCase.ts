import { PokemonRepository } from '../repositories/PokemonRepository';

export class GetPokemonDetailUseCase {
  constructor(private repository: PokemonRepository) {}

  execute(id: number){
    return this.repository.getPokemonById(id);
  }
}