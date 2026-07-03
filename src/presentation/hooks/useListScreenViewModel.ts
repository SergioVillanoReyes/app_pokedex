import { useState } from 'react'
import { Pokemon } from '../../domain/entities/Pokemon';
import { useDependencies } from '../context/DependencyContext';
import { HttpError } from '../../data/http/HttpError';

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
    } catch (err) {
      if (err instanceof HttpError) {
        setError(`[${err.status}] ${err.message}`)
      } else {
        setError('An unexpected error occurred')
      }
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