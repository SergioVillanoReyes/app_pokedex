import { useState } from 'react'
import { Pokemon } from '../../domain/entities/Pokemon';
import { useDependencies } from '../context/DependencyContext';

export const useListScreenViewModel = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { getPokemonListUseCase } = useDependencies();

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPokemonListUseCase.execute();
      setPokemons(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred' )
    } finally {
      setLoading(false)
    }
  }

  return {
    pokemons,
    loading,
    error,
    fetchList
  }
    
}