export interface Pokemon {
    id: number,
    name: string, 
    image: string,
}

export interface PokemonDetail {
  id: number;
  name: string;

  image: string;

  height: number;
  weight: number;

  baseExperience: number;

  abilities: string[];

  types: string[];

  stats: PokemonStat[];
}

export interface PokemonStat {
  name: string;
  value: number;
}