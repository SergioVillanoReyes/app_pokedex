import { useState } from 'react'
import { useDependencies } from '../context/DependencyContext';
import { PokemonDetail } from '../../domain/entities/Pokemon';
import { HttpError } from '../../data/http/HttpError';

export const useDetailScreenViewModel = (id: number) => {
  const [detailPokemon, setDetailPokemon] = useState<PokemonDetail>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { getPokemonDetailUseCase } = useDependencies();

  const fetchDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPokemonDetailUseCase.execute(id)
      setDetailPokemon(data)
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
    detailPokemon,
    loading,
    error,
    fetchDetail
  }

}