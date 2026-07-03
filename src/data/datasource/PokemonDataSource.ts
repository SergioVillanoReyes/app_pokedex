import { IPokemonDataSource } from './IPokemonDataSource';
import { PokemonDetailResponse, PokemonRaw } from '../models/PokemonRaw';
import { HttpClient } from '../http/HttpClient';

export class PokemonDataSource implements IPokemonDataSource {

  constructor(private httpClient: HttpClient) {}

  async getPokemonList(): Promise<PokemonRaw[]> {
    const json = await this.httpClient.get<{ results: PokemonRaw[] }>('/pokemon')
    return json.results
  }

  async getPokemonDetail(id: number): Promise<PokemonDetailResponse> {
    return this.httpClient.get<PokemonDetailResponse>(`/pokemon/${id}`)
  }

}
