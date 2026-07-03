export type PokemonRaw = {
  name: string
  url: string
}

export type PokemonDetailResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;

  abilities: AbilityResponse[];

  types: TypeResponse[];

  stats: StatResponse[];

  sprites: SpritesResponse;
};

export type AbilityResponse = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type TypeResponse = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type StatResponse = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type SpritesResponse = {
  front_default: string | null;

  other: {
    'official-artwork': {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
};
