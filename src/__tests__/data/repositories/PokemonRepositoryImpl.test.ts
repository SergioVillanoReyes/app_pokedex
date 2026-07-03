import { PokemonRepositoryImpl } from '../../../data/repositories/PokemonRepositoryImpl';
import { IPokemonDataSource } from '../../../data/datasource/IPokemonDataSource';
import { ILocalStorage } from '../../../data/storage/ILocalStorage';
import { PokemonListResponse } from '../../../data/models/PokemonRaw';

const mockApiResponse: PokemonListResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
};

const mockDatasource: jest.Mocked<IPokemonDataSource> = {
  getPokemonList: jest.fn(),
  getPokemonDetail: jest.fn(),
};

const mockStorage: jest.Mocked<ILocalStorage> = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

describe('PokemonRepositoryImpl - getPokemonList', () => {
  let repository: PokemonRepositoryImpl;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new PokemonRepositoryImpl(mockDatasource, mockStorage);
  });

  it('should fetch from API and save cache when no cache exists', async () => {
    mockStorage.getItem.mockResolvedValue(null);
    mockDatasource.getPokemonList.mockResolvedValue(mockApiResponse);
    mockStorage.setItem.mockResolvedValue();

    const result = await repository.getPokemonList(0, 20);

    expect(mockDatasource.getPokemonList).toHaveBeenCalledWith(0, 20);
    expect(mockStorage.setItem).toHaveBeenCalledTimes(2);
    expect(result.pokemons).toHaveLength(2);
    expect(result.pokemons[0]).toEqual({ id: 1, name: 'bulbasaur', image: expect.stringContaining('1.png') });
    expect(result.hasMore).toBe(true);
  });

  it('should return cache when it is still valid', async () => {
    const cached = { pokemons: [{ id: 1, name: 'bulbasaur', image: 'url' }], hasMore: true };
    const recentTimestamp = String(Date.now() - 60 * 1000);

    mockStorage.getItem
      .mockResolvedValueOnce(JSON.stringify(cached))
      .mockResolvedValueOnce(recentTimestamp);

    const result = await repository.getPokemonList(0, 20);

    expect(mockDatasource.getPokemonList).not.toHaveBeenCalled();
    expect(result).toEqual(cached);
  });

  it('should fetch from API when cache is expired', async () => {
    const cached = { pokemons: [{ id: 1, name: 'bulbasaur', image: 'url' }], hasMore: true };
    const expiredTimestamp = String(Date.now() - 10 * 60 * 1000);

    mockStorage.getItem
      .mockResolvedValueOnce(JSON.stringify(cached))
      .mockResolvedValueOnce(expiredTimestamp);

    mockDatasource.getPokemonList.mockResolvedValue(mockApiResponse);
    mockStorage.setItem.mockResolvedValue();

    await repository.getPokemonList(0, 20);

    expect(mockDatasource.getPokemonList).toHaveBeenCalledTimes(1);
  });

  it('should return expired cache as offline fallback when API fails', async () => {
    const cached = { pokemons: [{ id: 1, name: 'bulbasaur', image: 'url' }], hasMore: true };
    const expiredTimestamp = String(Date.now() - 10 * 60 * 1000);

    mockStorage.getItem
      .mockResolvedValueOnce(JSON.stringify(cached))
      .mockResolvedValueOnce(expiredTimestamp);

    mockDatasource.getPokemonList.mockRejectedValue(new Error('No internet connection'));

    const result = await repository.getPokemonList(0, 20);

    expect(result).toEqual(cached);
  });

  it('should propagate error when API fails and no cache exists', async () => {
    mockStorage.getItem.mockResolvedValue(null);
    mockDatasource.getPokemonList.mockRejectedValue(new Error('No internet connection'));

    await expect(repository.getPokemonList(0, 20)).rejects.toThrow('No internet connection');
  });

  it('should return hasMore false when next is null', async () => {
    mockStorage.getItem.mockResolvedValue(null);
    mockDatasource.getPokemonList.mockResolvedValue({ ...mockApiResponse, next: null });
    mockStorage.setItem.mockResolvedValue();

    const result = await repository.getPokemonList(0, 20);

    expect(result.hasMore).toBe(false);
  });

  it('should correctly map pokemon url to id', async () => {
    mockStorage.getItem.mockResolvedValue(null);
    mockDatasource.getPokemonList.mockResolvedValue(mockApiResponse);
    mockStorage.setItem.mockResolvedValue();

    const result = await repository.getPokemonList(0, 20);

    expect(result.pokemons[0].id).toBe(1);
    expect(result.pokemons[1].id).toBe(2);
  });
});
