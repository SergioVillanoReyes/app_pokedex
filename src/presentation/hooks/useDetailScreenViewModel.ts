import { useState } from 'react'
import { useDependencies } from '../context/DependencyContext';
import { PokemonDetail } from '../../domain/entities/Pokemon';

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
    } catch (err: any) {
      console.log(err);
      setError(err.message || 'An error occurred' )
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