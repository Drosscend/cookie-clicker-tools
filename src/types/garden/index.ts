// Types spécifiques au Garden

export interface Seed {
  key: string;
  name: string;
  emoji: string;
  type: "plant" | "fungus";
  rarity: "starter" | "common" | "uncommon" | "rare" | "epic" | "legendary";
  maturity: number;
  effect: string;
}

export interface MutationRecipe {
  parents: string[];
  chance: string;
  baseChance: number;
  description: string;
  difficulty:
    | "facile"
    | "modéré"
    | "difficile"
    | "très difficile"
    | "extrêmement difficile"
    | "cauchemar"
    | "impossible"
    | "spécial";
  soilStrategy: string;
  layout:
    | "adjacent"
    | "same_plant"
    | "single"
    | "manual_harvest"
    | "golden_clover"
    | "everdaisy"
    | "shriekbulb"
    | "juicy_queenbeet";
}

export interface LayoutConfig {
  plants: { pos: number; type: string }[];
  zones: number[];
  probability?: string;
  description?: string;
}

export interface OptimalLayouts {
  [layoutType: string]: {
    [gardenSize: number]: LayoutConfig;
  };
}

export interface GardenState {
  ownedSeeds: string[];
  currentTool?: string;
}

export type SoilType = "fertilizer" | "wood-chips" | "clay" | "pebbles";

export interface SoilInfo {
  name: string;
  emoji: string;
  tickDuration: string;
  effect: string;
  color: string;
}
