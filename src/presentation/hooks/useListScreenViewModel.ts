import { useState, useRef } from 'react'
import { Pokemon } from '../../domain/entities/Pokemon';
import { useDependencies } from '../context/DependencyContext';
import { HttpError } from '../../data/http/HttpError';

const PAGE_SIZE = 20

export const useListScreenViewModel = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const offsetRef = useRef<number>(0)

  const { getPokemonListUseCase } = useDependencies();

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    offsetRef.current = 0
    try {
      const { pokemons: data, hasMore: more } = await getPokemonListUseCase.execute(0, PAGE_SIZE);
      setPokemons(data);
      setHasMore(more)
      offsetRef.current = PAGE_SIZE
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

  const loadMore = async () => {
    if (loading) return;
    if (loadingMore) return;
    if (!hasMore) return;
    if (pokemons.length === 0) return;
    setLoadingMore(true)
    try {
      const { pokemons: data, hasMore: more } = await getPokemonListUseCase.execute(offsetRef.current, PAGE_SIZE)
      setPokemons((prev) => [...prev, ...data])
      setHasMore(more)
      offsetRef.current += PAGE_SIZE
    } catch (err) {
      if (err instanceof HttpError) {
        setError(`[${err.status}] ${err.message}`)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoadingMore(false)
    }
  }

  return {
    pokemons,
    loading,
    loadingMore,
    error,
    hasMore,
    fetchList,
    loadMore,
  }
}
