import { GetPokemonDetailUseCase } from '../../../domain/usecases/GetPokemonDetailUseCase';
import { PokemonRepository } from '../../../domain/repositories/PokemonRepository';
import { PokemonDetail } from '../../../domain/entities/Pokemon';

const mockDetail: PokemonDetail = {
  id: 25,
  name: 'pikachu',
  image: 'https://image.url/25.png',
  height: 4,
  weight: 60,
  baseExperience: 112,
  abilities: ['static', 'lightning-rod'],
  types: ['electric'],
  stats: [
    { name: 'hp', value: 35 },
    { name: 'attack', value: 55 },
  ],
};

const mockRepository: jest.Mocked<PokemonRepository> = {
  getPokemonList: jest.fn(),
  getPokemonById: jest.fn(),
};

describe('GetPokemonDetailUseCase', () => {
  let useCase: GetPokemonDetailUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new GetPokemonDetailUseCase(mockRepository);
  });

  it('should call repository.getPokemonById with correct id', async () => {
    mockRepository.getPokemonById.mockResolvedValue(mockDetail);

    await useCase.execute(25);

    expect(mockRepository.getPokemonById).toHaveBeenCalledWith(25);
    expect(mockRepository.getPokemonById).toHaveBeenCalledTimes(1);
  });

  it('should return the pokemon detail from repository', async () => {
    mockRepository.getPokemonById.mockResolvedValue(mockDetail);

    const result = await useCase.execute(25);

    expect(result).toEqual(mockDetail);
  });

  it('should propagate error if repository throws', async () => {
    mockRepository.getPokemonById.mockRejectedValue(new Error('Not found'));

    await expect(useCase.execute(25)).rejects.toThrow('Not found');
  });
});
