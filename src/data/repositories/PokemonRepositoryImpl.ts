import { Pokemon } from '../../domain/entities/Pokemon';
import { PokemonRepository } from '../../domain/repositories/PokemonRepository';
import { IPokemonDataSource } from '../datasource/IPokemonDataSource';
import { PokemonRaw } from '../models/PokemonRaw';

export class PokemonRepositoryImpl implements PokemonRepository {

  constructor(private datasource: IPokemonDataSource){}

  async getPokemonList(): Promise<Pokemon[]> {
    const data = await this.datasource.getPokemonList();

    return data.map((item: PokemonRaw) => {
      const id = Number(item.url.split('/')[6])

      return {
        id,
        name: item.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      }
    })
  }
    
}