export interface PokemonDetail {
  id: number;
  name: string;
  sprite: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    }
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    }
  }[];
}
