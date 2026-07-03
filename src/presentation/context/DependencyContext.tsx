import { createContext, useContext } from 'react';
import { GetPokemonListUseCase } from '../../domain/usecases/GetPokemonListUseCase';
import { GetPokemonDetailUseCase } from '../../domain/usecases/GetPokemonDetailUseCase';

type AppDependencies = {
  getPokemonListUseCase: GetPokemonListUseCase,
  getPokemonDetailUseCase: GetPokemonDetailUseCase
}

export const DependencyContext = createContext<AppDependencies | null>(null);

export const useDependencies = (): AppDependencies => {
  const ctx = useContext(DependencyContext);
  if (!ctx) throw new Error('useDependencies must be used within DependencyContext.Provider');
  return ctx;
};
