import { GetPokemonListUseCase } from '../../../domain/usecases/GetPokemonListUseCase';
import { PokemonRepository } from '../../../domain/repositories/PokemonRepository';
import { Pokemon } from '../../../domain/entities/Pokemon';

const mockPokemons: Pokemon[] = [
  { id: 1, name: 'bulbasaur', image: 'https://image.url/1.png' },
  { id: 2, name: 'ivysaur', image: 'https://image.url/2.png' },
];

const mockRepository: jest.Mocked<PokemonRepository> = {
  getPokemonList: jest.fn(),
  getPokemonById: jest.fn(),
};

describe('GetPokemonListUseCase', () => {
  let useCase: GetPokemonListUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new GetPokemonListUseCase(mockRepository);
  });

  it('should call repository.getPokemonList with correct offset and limit', async () => {
    mockRepository.getPokemonList.mockResolvedValue({ pokemons: mockPokemons, hasMore: true });

    await useCase.execute(0, 20);

    expect(mockRepository.getPokemonList).toHaveBeenCalledWith(0, 20);
    expect(mockRepository.getPokemonList).toHaveBeenCalledTimes(1);
  });

  it('should return the list and hasMore from repository', async () => {
    mockRepository.getPokemonList.mockResolvedValue({ pokemons: mockPokemons, hasMore: true });

    const result = await useCase.execute(0, 20);

    expect(result.pokemons).toEqual(mockPokemons);
    expect(result.hasMore).toBe(true);
  });

  it('should return hasMore false when there are no more pages', async () => {
    mockRepository.getPokemonList.mockResolvedValue({ pokemons: mockPokemons, hasMore: false });

    const result = await useCase.execute(0, 20);

    expect(result.hasMore).toBe(false);
  });

  it('should propagate error if repository throws', async () => {
    mockRepository.getPokemonList.mockRejectedValue(new Error('Network error'));

    await expect(useCase.execute(0, 20)).rejects.toThrow('Network error');
  });
});
