import { Pokemon, PokemonDetail } from '../../domain/entities/Pokemon';
import { PokemonRepository } from '../../domain/repositories/PokemonRepository';
import { IPokemonDataSource } from '../datasource/IPokemonDataSource';
import { ILocalStorage } from '../storage/ILocalStorage';
import { PokemonRaw } from '../models/PokemonRaw';

const CACHE_KEY = 'pokemon_list'
const CACHE_TIMESTAMP_KEY = 'pokemon_list_timestamp'
const CACHE_TTL_MS = 5 * 60 * 1000

export class PokemonRepositoryImpl implements PokemonRepository {

  constructor(
    private datasource: IPokemonDataSource,
    private storage: ILocalStorage
  ) {}

  async getPokemonList(): Promise<Pokemon[]> {
    const [cachedData, cachedTimestamp] = await Promise.all([
      this.storage.getItem(CACHE_KEY),
      this.storage.getItem(CACHE_TIMESTAMP_KEY),
    ])

    const cacheAge = cachedTimestamp ? Date.now() - Number(cachedTimestamp) : Infinity
    const isCacheValid = !!cachedData && cacheAge < CACHE_TTL_MS

    if (isCacheValid) {
      return JSON.parse(cachedData!)
    }

    try {
      const data = await this.datasource.getPokemonList()
      const pokemons = data.map((item: PokemonRaw) => {
        const id = Number(item.url.split('/')[6])
        return {
          id,
          name: item.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        }
      })

      await Promise.all([
        this.storage.setItem(CACHE_KEY, JSON.stringify(pokemons)),
        this.storage.setItem(CACHE_TIMESTAMP_KEY, String(Date.now())),
      ])

      return pokemons
    } catch (err) {
      if (cachedData) {
        return JSON.parse(cachedData)
      }
      throw err
    }
  }

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
}
