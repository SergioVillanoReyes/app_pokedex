import { IPokemonDataSource } from './IPokemonDataSource';
import { PokemonDetailResponse, PokemonListResponse } from '../models/PokemonRaw';
import { HttpClient } from '../http/HttpClient';

export class PokemonDataSource implements IPokemonDataSource {

  constructor(private httpClient: HttpClient) {}

  async getPokemonList(offset: number, limit: number): Promise<PokemonListResponse> {
    return this.httpClient.get<PokemonListResponse>(`/pokemon?offset=${offset}&limit=${limit}`)
  }

  async getPokemonDetail(id: number): Promise<PokemonDetailResponse> {
    return this.httpClient.get<PokemonDetailResponse>(`/pokemon/${id}`)
  }

}
