import { Pokemon, PokemonDetail } from '../../domain/entities/Pokemon';
import { PokemonRepository } from '../../domain/repositories/PokemonRepository';
import { IPokemonDataSource } from '../datasource/IPokemonDataSource';
import { PokemonRaw } from '../models/PokemonRaw';

export class PokemonRepositoryImpl implements PokemonRepository {

  constructor(private datasource: IPokemonDataSource){}
  
  async getPokemonById(id: number): Promise<PokemonDetail> {
    const data = await this.datasource.getPokemonDetail(id);
    
    return {
      id: data.id,
      name: data.name,

      image:
    data.sprites.other['official-artwork'].front_default ??
    data.sprites.front_default ??
    '',

      height: data.height,
      weight: data.weight,

      baseExperience: data.base_experience,

      abilities: data.abilities.map(a => a.ability.name),

      types: data.types.map(t => t.type.name),

      stats: data.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
    };
  }

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