import { Pokemon, PokemonDetail } from '../../domain/entities/Pokemon';
import { PokemonRepository } from '../../domain/repositories/PokemonRepository';
import { IPokemonDataSource } from '../datasource/IPokemonDataSource';
import { ILocalStorage } from '../storage/ILocalStorage';
import { PokemonRaw } from '../models/PokemonRaw';

const CACHE_TTL_MS = 5 * 60 * 1000

const cacheKey = (offset: number, limit: number) => `pokemon_list_${offset}_${limit}`
const cacheTimestampKey = (offset: number, limit: number) => `pokemon_list_${offset}_${limit}_timestamp`

export class PokemonRepositoryImpl implements PokemonRepository {

  constructor(
    private datasource: IPokemonDataSource,
    private storage: ILocalStorage
  ) {}

  async getPokemonList(offset: number, limit: number): Promise<{ pokemons: Pokemon[], hasMore: boolean }> {
    const key = cacheKey(offset, limit)
    const timestampKey = cacheTimestampKey(offset, limit)

    const [cachedData, cachedTimestamp] = await Promise.all([
      this.storage.getItem(key),
      this.storage.getItem(timestampKey),
    ])

    const cacheAge = cachedTimestamp ? Date.now() - Number(cachedTimestamp) : Infinity
    const isCacheValid = !!cachedData && cacheAge < CACHE_TTL_MS

    if (isCacheValid) {
      return JSON.parse(cachedData!)
    }

    try {
      const response = await this.datasource.getPokemonList(offset, limit)
      const pokemons = response.results.map((item: PokemonRaw) => {
        const id = Number(item.url.split('/')[6])
        return {
          id,
          name: item.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        }
      })

      const result = { pokemons, hasMore: response.next !== null }

      await Promise.all([
        this.storage.setItem(key, JSON.stringify(result)),
        this.storage.setItem(timestampKey, String(Date.now())),
      ])

      return result
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
