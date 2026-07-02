import { createContext, useContext } from 'react';
import { GetPokemonListUseCase } from '../../domain/usecases/GetPokemonListUseCase';

type AppDependencies = {
  getPokemonListUseCase: GetPokemonListUseCase
}

export const DependencyContext = createContext<AppDependencies | null>(null);

export const useDependencies = (): AppDependencies => {
  const ctx = useContext(DependencyContext);
  if (!ctx) throw new Error('useDependencies must be used within DependencyContext.Provider');
  return ctx;
};
