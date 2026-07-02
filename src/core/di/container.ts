import { PokemonDataSource } from '../../data/datasource/PokemonDataSource';
import { PokemonRepositoryImpl } from '../../data/repositories/PokemonRepositoryImpl';
import { GetPokemonListUseCase } from '../../domain/usecases/GetPokemonListUseCase';

const datasource = new PokemonDataSource();
const repository = new PokemonRepositoryImpl(datasource);

export const getPokemonListUseCase = new GetPokemonListUseCase(repository);