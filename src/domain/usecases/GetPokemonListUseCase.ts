import { PokemonRepository } from '../repositories/PokemonRepository';

export class GetPokemonListUseCase {
  constructor(private repository: PokemonRepository) {}

  execute(){
    return this.repository.getPokemonList();
  }
}