import { PokemonDataSource } from '../../data/datasource/PokemonDataSource';
import { PokemonRepositoryImpl } from '../../data/repositories/PokemonRepositoryImpl';
import { GetPokemonDetailUseCase } from '../../domain/usecases/GetPokemonDetailUseCase';
import { GetPokemonListUseCase } from '../../domain/usecases/GetPokemonListUseCase';
import { HttpClient } from '../../data/http/HttpClient';
import { NetworkChecker } from '../../data/http/NetworkChecker';
import { LocalStorageDataSource } from '../../data/storage/LocalStorageDataSource';

const networkChecker = new NetworkChecker();
const httpClient = new HttpClient('https://pokeapi.co/api/v2', networkChecker);
const datasource = new PokemonDataSource(httpClient);
const storage = new LocalStorageDataSource();
const repository = new PokemonRepositoryImpl(datasource, storage);

export const getPokemonListUseCase = new GetPokemonListUseCase(repository);
export const getPokemonDetailUseCase = new GetPokemonDetailUseCase(repository);