"use client";

import { CheckCircle, Circle, Target } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// Type definitions for layout objects
interface LayoutConfig {
  plants: { pos: number; type: string }[];
  zones: number[];
  probability?: string;
  description?: string;
}

interface OptimalLayouts {
  [layoutType: string]: {
    [gardenSize: number]: LayoutConfig;
  };
}

export default function Page() {
  // Starting seeds (available from beginning)
  const [ownedSeeds, setOwnedSeeds] = useState(["bakers-wheat"]);

  // All seeds in order of unlock difficulty
  const allSeeds = [
    "bakers-wheat", // Starting seed
    "meddleweed", // Auto-spawns in empty areas
    "thumbcorn", // 2x Baker's Wheat (common ~1%)
    "cronerice", // Baker's Wheat + Thumbcorn
    "bakeberry", // 2x Baker's Wheat (rare ~0.1%)
    "gildmillet", // Thumbcorn + Cronerice
    "brown-mold", // Harvest old Meddleweed manually
    "crumbspore", // Harvest old Meddleweed manually
    "white-mildew", // 1x Brown Mold alone (auto-mutation)
    "ordinary-clover", // Baker's Wheat + Gildmillet
    "chocoroot", // Baker's Wheat + Brown Mold
    "white-chocoroot", // Chocoroot + White Mildew
    "doughshroom", // 2x Crumbspore (~0.5%)
    "green-rot", // Ordinary Clover + White Mildew
    "shimmerlily", // Gildmillet + Ordinary Clover (~0.2%)
    "wrinklegill", // Brown Mold + Crumbspore
    "wardlichen", // Cronerice + White Mildew
    "keenmoss", // 1x Wardlichen alone (auto-mutation)
    "tidygrass", // Baker's Wheat + White Chocoroot
    "elderwort", // Shimmerlily + Cronerice (~0.2%)
    "whiskerbloom", // Shimmerlily + White Mildew
    "nursetulip", // 2x Whiskerbloom
    "chimerose", // Shimmerlily + Elderwort
    "drowsyfern", // Chocoroot + Keenmoss
    "queenbeet", // Bakeberry + Chocoroot (~0.1%, très rare)
    "glovemorel", // Doughshroom + Elderwort
    "cheapcap", // Doughshroom + Shimmerlily
    "fools-bolete", // Doughshroom + Green Rot
    "ichorpuff", // Elderwort + Crumbspore (~0.2%)
    "golden-clover", // 4+ Ordinary Clover (~0.07%, extrêmement rare)
    "duketater", // Queenbeet + Elderwort (configuration complexe)
    "shriekbulb", // 5x Elderwort OU 3x Duketater
    "everdaisy", // 3x Tidygrass + 3x Elderwort (lignes alternées, ~0.2%)
    "juicy-queenbeet", // 8x Queenbeet en cercle (~0.001%, le plus rare)
  ];

  // Seed data with accurate information
  const seedData = {
    "bakers-wheat": {
      name: "Baker's Wheat",
      emoji: "🌾",
      type: "plant",
      rarity: "starter",
      maturity: 5,
      effect: "+1% CpS",
    },
    meddleweed: {
      name: "Meddleweed",
      emoji: "🌿",
      type: "fungus",
      rarity: "starter",
      maturity: 5,
      effect: "Spawns naturally, can contaminate",
    },
    thumbcorn: {
      name: "Thumbcorn",
      emoji: "🌽",
      type: "plant",
      rarity: "common",
      maturity: 3,
      effect: "+2% cookies per click",
    },
    cronerice: {
      name: "Cronerice",
      emoji: "🌾",
      type: "plant",
      rarity: "common",
      maturity: 5,
      effect: "+3% grandma CpS",
    },
    bakeberry: {
      name: "Bakeberry",
      emoji: "🫐",
      type: "plant",
      rarity: "uncommon",
      maturity: 8,
      effect: "+1% CpS, harvest bonus",
    },
    gildmillet: {
      name: "Gildmillet",
      emoji: "🌾",
      type: "plant",
      rarity: "uncommon",
      maturity: 6,
      effect: "+1% golden cookie gains, +0.1% duration",
    },
    "brown-mold": {
      name: "Brown Mold",
      emoji: "🍄",
      type: "fungus",
      rarity: "uncommon",
      maturity: 3,
      effect: "-1% CpS, can spread",
    },
    crumbspore: {
      name: "Crumbspore",
      emoji: "🍄",
      type: "fungus",
      rarity: "uncommon",
      maturity: 4,
      effect: "Can contaminate, harvest bonus",
    },
    "white-mildew": {
      name: "White Mildew",
      emoji: "🦠",
      type: "fungus",
      rarity: "uncommon",
      maturity: 3,
      effect: "+1% CpS",
    },
    "ordinary-clover": {
      name: "Ordinary Clover",
      emoji: "🍀",
      type: "plant",
      rarity: "uncommon",
      maturity: 5,
      effect: "+1% golden cookie frequency",
    },
    chocoroot: {
      name: "Chocoroot",
      emoji: "🥔",
      type: "plant",
      rarity: "rare",
      maturity: 6,
      effect: "+1% CpS, harvest bonus",
    },
    "white-chocoroot": {
      name: "White Chocoroot",
      emoji: "🥔",
      type: "plant",
      rarity: "rare",
      maturity: 6,
      effect: "+1% golden cookie gains, harvest bonus",
    },
    doughshroom: {
      name: "Doughshroom",
      emoji: "🍄",
      type: "fungus",
      rarity: "rare",
      maturity: 6,
      effect: "+1% CpS",
    },
    "green-rot": {
      name: "Green Rot",
      emoji: "🦠",
      type: "fungus",
      rarity: "rare",
      maturity: 4,
      effect: "+1% golden cookie frequency, +1% random drops",
    },
    shimmerlily: {
      name: "Shimmerlily",
      emoji: "🌸",
      type: "plant",
      rarity: "rare",
      maturity: 7,
      effect: "+1% golden cookie gains & frequency",
    },
    wrinklegill: {
      name: "Wrinklegill",
      emoji: "🍄",
      type: "fungus",
      rarity: "rare",
      maturity: 5,
      effect: "Wrinklers spawn 2% faster, digest 1% more",
    },
    wardlichen: {
      name: "Wardlichen",
      emoji: "🦠",
      type: "fungus",
      rarity: "rare",
      maturity: 8,
      effect: "-2% wrath cookies, wrinklers spawn 15% slower",
    },
    keenmoss: {
      name: "Keenmoss",
      emoji: "🌿",
      type: "fungus",
      rarity: "rare",
      maturity: 6,
      effect: "+3% random drops",
    },
    tidygrass: {
      name: "Tidygrass",
      emoji: "🌱",
      type: "plant",
      rarity: "rare",
      maturity: 4,
      effect: "Prevents weeds/fungi in 5×5 area",
    },
    elderwort: {
      name: "Elderwort",
      emoji: "🌿",
      type: "plant",
      rarity: "rare",
      maturity: 0,
      effect: "+1% wrath cookies, immortal, speeds aging",
    },
    whiskerbloom: {
      name: "Whiskerbloom",
      emoji: "🌺",
      type: "plant",
      rarity: "rare",
      maturity: 7,
      effect: "+1% CpS",
    },
    nursetulip: {
      name: "Nursetulip",
      emoji: "🌷",
      type: "plant",
      rarity: "rare",
      maturity: 5,
      effect: "Boosts nearby plants by 20%",
    },
    chimerose: {
      name: "Chimerose",
      emoji: "🌹",
      type: "plant",
      rarity: "rare",
      maturity: 7,
      effect: "+1% CpS",
    },
    drowsyfern: {
      name: "Drowsyfern",
      emoji: "🌿",
      type: "plant",
      rarity: "rare",
      maturity: 5,
      effect: "+3% CpS while game closed",
    },
    queenbeet: {
      name: "Queenbeet",
      emoji: "🥬",
      type: "plant",
      rarity: "epic",
      maturity: 16,
      effect: "-2% CpS, huge harvest bonus",
    },
    glovemorel: {
      name: "Glovemorel",
      emoji: "🍄",
      type: "fungus",
      rarity: "epic",
      maturity: 7,
      effect: "+4% click cookies, +1% cursor efficiency, -1% CpS",
    },
    cheapcap: {
      name: "Cheapcap",
      emoji: "🍄",
      type: "fungus",
      rarity: "epic",
      maturity: 8,
      effect: "-20% building costs",
    },
    "fools-bolete": {
      name: "Fool's Bolete",
      emoji: "🍄",
      type: "fungus",
      rarity: "epic",
      maturity: 6,
      effect: "+2% golden cookie frequency, -5% gains",
    },
    ichorpuff: {
      name: "Ichorpuff",
      emoji: "🍄",
      type: "fungus",
      rarity: "epic",
      maturity: 8,
      effect: "Slows aging in 3×3, -50% efficiency",
    },
    "golden-clover": {
      name: "Golden Clover",
      emoji: "🍀",
      type: "plant",
      rarity: "legendary",
      maturity: 5,
      effect: "+3% golden cookie frequency",
    },
    duketater: {
      name: "Duketater",
      emoji: "🥔",
      type: "plant",
      rarity: "legendary",
      maturity: 24,
      effect: "+4% CpS, 10% chance to survive harvest",
    },
    shriekbulb: {
      name: "Shriekbulb",
      emoji: "🧅",
      type: "plant",
      rarity: "legendary",
      maturity: 8,
      effect: "-2% CpS, plants 5% less efficient in 3×3",
    },
    everdaisy: {
      name: "Everdaisy",
      emoji: "🌼",
      type: "plant",
      rarity: "legendary",
      maturity: 10,
      effect: "Immortal when surrounded by flowers",
    },
    "juicy-queenbeet": {
      name: "Juicy Queenbeet",
      emoji: "🥬",
      type: "plant",
      rarity: "legendary",
      maturity: 32,
      effect: "Cannot be planted, +1 sugar lump when sacrificing",
    },
  };

  // Accurate mutation recipes based on research and wiki images
  const mutationRecipes = {
    thumbcorn: {
      parents: ["bakers-wheat", "bakers-wheat"],
      chance: "1%",
      baseChance: 1,
      description: "2x Baker's Wheat adjacents",
      difficulty: "facile",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "same_plant",
    },
    bakeberry: {
      parents: ["bakers-wheat", "bakers-wheat"],
      chance: "0.1%",
      baseChance: 0.1,
      description: "2x Baker's Wheat adjacents (très rare)",
      difficulty: "difficile",
      soilStrategy: "Fertilizer → Wood Chips obligatoire",
      layout: "same_plant",
    },
    cronerice: {
      parents: ["bakers-wheat", "thumbcorn"],
      chance: "1%",
      baseChance: 1,
      description: "Baker's Wheat + Thumbcorn adjacents",
      difficulty: "facile",
      soilStrategy:
        "Synchroniser la maturité (Wheat d'abord, attendre 2 ticks, puis Thumbcorn)",
      layout: "adjacent",
    },
    gildmillet: {
      parents: ["thumbcorn", "cronerice"],
      chance: "1%",
      baseChance: 1,
      description: "Thumbcorn + Cronerice adjacents",
      difficulty: "facile",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "adjacent",
    },
    "brown-mold": {
      parents: ["meddleweed"],
      chance: "19.8%",
      baseChance: 19.8,
      description: "Récolte MANUELLE de Meddleweed vieux (chance = âge × 0.2%)",
      difficulty: "spécial",
      soilStrategy:
        "1) Fertilizer pour croissance → 2) Clay pour vieillissement → 3) Récolte manuelle à âge 99",
      layout: "manual_harvest",
    },
    crumbspore: {
      parents: ["meddleweed"],
      chance: "19.8%",
      baseChance: 19.8,
      description:
        "Récolte MANUELLE de Meddleweed vieux (même méthode que Brown Mold)",
      difficulty: "spécial",
      soilStrategy:
        "1) Fertilizer pour croissance → 2) Clay pour vieillissement → 3) Récolte manuelle à âge 99",
      layout: "manual_harvest",
    },
    "white-mildew": {
      parents: ["brown-mold"],
      chance: "7%",
      baseChance: 7,
      description: "1 SEUL Brown Mold mature - auto-mutation sur lui-même",
      difficulty: "facile",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "single",
    },
    "ordinary-clover": {
      parents: ["bakers-wheat", "gildmillet"],
      chance: "3%",
      baseChance: 3,
      description: "Baker's Wheat + Gildmillet adjacents",
      difficulty: "modéré",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "adjacent",
    },
    chocoroot: {
      parents: ["bakers-wheat", "brown-mold"],
      chance: "2.5%",
      baseChance: 2.5,
      description: "Baker's Wheat + Brown Mold adjacents",
      difficulty: "modéré",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "adjacent",
    },
    "white-chocoroot": {
      parents: ["chocoroot", "white-mildew"],
      chance: "2%",
      baseChance: 2,
      description: "Chocoroot + White Mildew adjacents",
      difficulty: "modéré",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "adjacent",
    },
    doughshroom: {
      parents: ["crumbspore", "crumbspore"],
      chance: "0.5%",
      baseChance: 0.5,
      description: "2x Crumbspore adjacents",
      difficulty: "difficile",
      soilStrategy: "Fertilizer → Wood Chips obligatoire",
      layout: "same_plant",
    },
    "green-rot": {
      parents: ["ordinary-clover", "white-mildew"],
      chance: "1%",
      baseChance: 1,
      description: "Ordinary Clover + White Mildew adjacents",
      difficulty: "modéré",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "adjacent",
    },
    shimmerlily: {
      parents: ["gildmillet", "ordinary-clover"],
      chance: "0.2%",
      baseChance: 0.2,
      description: "Gildmillet + Ordinary Clover adjacents",
      difficulty: "très difficile",
      soilStrategy: "Fertilizer → Wood Chips obligatoire, beaucoup de patience",
      layout: "adjacent",
    },
    wrinklegill: {
      parents: ["brown-mold", "crumbspore"],
      chance: "1%",
      baseChance: 1,
      description: "Brown Mold + Crumbspore adjacents",
      difficulty: "modéré",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "adjacent",
    },
    wardlichen: {
      parents: ["cronerice", "white-mildew"],
      chance: "1%",
      baseChance: 1,
      description: "Cronerice + White Mildew adjacents",
      difficulty: "modéré",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "adjacent",
    },
    keenmoss: {
      parents: ["wardlichen"],
      chance: "7%",
      baseChance: 7,
      description: "1 SEUL Wardlichen mature - auto-mutation sur lui-même",
      difficulty: "facile",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "single",
    },
    tidygrass: {
      parents: ["bakers-wheat", "white-chocoroot"],
      chance: "2%",
      baseChance: 2,
      description: "Baker's Wheat + White Chocoroot adjacents",
      difficulty: "modéré",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "adjacent",
    },
    elderwort: {
      parents: ["shimmerlily", "cronerice"],
      chance: "0.2%",
      baseChance: 0.2,
      description: "Shimmerlily + Cronerice adjacents",
      difficulty: "très difficile",
      soilStrategy: "Fertilizer → Wood Chips obligatoire, très long",
      layout: "adjacent",
    },
    whiskerbloom: {
      parents: ["shimmerlily", "white-mildew"],
      chance: "1%",
      baseChance: 1,
      description: "Shimmerlily + White Mildew adjacents",
      difficulty: "modéré",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "adjacent",
    },
    nursetulip: {
      parents: ["whiskerbloom", "whiskerbloom"],
      chance: "5%",
      baseChance: 5,
      description: "2x Whiskerbloom adjacents",
      difficulty: "modéré",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "same_plant",
    },
    chimerose: {
      parents: ["shimmerlily", "elderwort"],
      chance: "0.5%",
      baseChance: 0.5,
      description: "Shimmerlily + Elderwort adjacents",
      difficulty: "difficile",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "adjacent",
    },
    drowsyfern: {
      parents: ["chocoroot", "keenmoss"],
      chance: "1%",
      baseChance: 1,
      description: "Chocoroot + Keenmoss adjacents",
      difficulty: "modéré",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "adjacent",
    },
    queenbeet: {
      parents: ["bakeberry", "chocoroot"],
      chance: "0.1%",
      baseChance: 0.1,
      description: "Bakeberry + Chocoroot adjacents",
      difficulty: "extrêmement difficile",
      soilStrategy:
        "Fertilizer → Wood Chips obligatoire, puis Clay pour conservation",
      layout: "adjacent",
    },
    glovemorel: {
      parents: ["doughshroom", "elderwort"],
      chance: "0.5%",
      baseChance: 0.5,
      description: "Doughshroom + Elderwort adjacents",
      difficulty: "difficile",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "adjacent",
    },
    cheapcap: {
      parents: ["doughshroom", "shimmerlily"],
      chance: "0.5%",
      baseChance: 0.5,
      description: "Doughshroom + Shimmerlily adjacents",
      difficulty: "difficile",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "adjacent",
    },
    "fools-bolete": {
      parents: ["doughshroom", "green-rot"],
      chance: "0.5%",
      baseChance: 0.5,
      description: "Doughshroom + Green Rot adjacents",
      difficulty: "difficile",
      soilStrategy: "Fertilizer → Wood Chips",
      layout: "adjacent",
    },
    ichorpuff: {
      parents: ["elderwort", "crumbspore"],
      chance: "0.2%",
      baseChance: 0.2,
      description: "Elderwort + Crumbspore adjacents",
      difficulty: "très difficile",
      soilStrategy: "Fertilizer → Wood Chips obligatoire",
      layout: "adjacent",
    },
    "golden-clover": {
      parents: [
        "ordinary-clover",
        "ordinary-clover",
        "ordinary-clover",
        "ordinary-clover",
      ],
      chance: "1.83%",
      baseChance: 1.83,
      description: "Configuration spéciale Ordinary Clover (Level 6 Garden)",
      difficulty: "cauchemar",
      soilStrategy: "Wood Chips obligatoire, maintenance complexe",
      layout: "golden_clover",
    },
    duketater: {
      parents: ["queenbeet", "elderwort"],
      chance: "0.1%",
      baseChance: 0.1,
      description: "Configuration complexe Queenbeet + Elderwort",
      difficulty: "cauchemar",
      soilStrategy: "Très avancé, pattern spécial",
      layout: "adjacent",
    },
    shriekbulb: {
      parents: ["duketater", "duketater", "duketater"],
      chance: "10 plants possible",
      baseChance: 0.1,
      description:
        "Pattern en damier avec Duketater/Elderwort (Level 6: 10 mutations possibles)",
      difficulty: "cauchemar",
      soilStrategy: "Pebbles pour immortalité, configuration en damier",
      layout: "shriekbulb",
    },
    everdaisy: {
      parents: [
        "tidygrass",
        "tidygrass",
        "tidygrass",
        "elderwort",
        "elderwort",
        "elderwort",
      ],
      chance: "0.2%",
      baseChance: 0.2,
      description: "Lignes alternées: Tidygrass / vide / Elderwort / vide",
      difficulty: "cauchemar",
      soilStrategy:
        "Pattern alterné très spécifique, immortel quand entouré de fleurs",
      layout: "everdaisy",
    },
    "juicy-queenbeet": {
      parents: [
        "queenbeet",
        "queenbeet",
        "queenbeet",
        "queenbeet",
        "queenbeet",
        "queenbeet",
        "queenbeet",
        "queenbeet",
      ],
      chance: "0.001%",
      baseChance: 0.001,
      description:
        "8x Queenbeet en cercle parfait autour d'une case vide (plusieurs cercles possibles)",
      difficulty: "impossible",
      soilStrategy: "Tous matures en même temps, peut prendre des semaines",
      layout: "juicy_queenbeet",
    },
  };

  // Optimized layouts based on official Cookie Clicker Wiki configurations
  const optimalLayouts: OptimalLayouts = {
    // Standard adjacent layouts for most mutations (from wiki image 1)
    adjacent: {
      // Level 6 garden - optimal 2 different plants setup
      6: {
        plants: [
          { pos: 7, type: "parent1" },
          { pos: 8, type: "parent2" },
          { pos: 9, type: "parent1" },
          { pos: 10, type: "parent2" },
          { pos: 13, type: "parent2" },
          { pos: 16, type: "parent2" },
          { pos: 19, type: "parent1" },
          { pos: 20, type: "parent2" },
          { pos: 21, type: "parent1" },
          { pos: 22, type: "parent2" },
        ],
        zones: [
          0, 1, 2, 3, 4, 5, 6, 11, 12, 14, 15, 17, 18, 23, 24, 25, 26, 27, 28,
          29,
        ],
      },
    },

    // Same plant mutations (from wiki image 1)
    same_plant: {
      6: {
        plants: [
          { pos: 6, type: "parent1" },
          { pos: 7, type: "parent1" },
          { pos: 10, type: "parent1" },
          { pos: 11, type: "parent1" },
          { pos: 18, type: "parent1" },
          { pos: 19, type: "parent1" },
          { pos: 22, type: "parent1" },
          { pos: 23, type: "parent1" },
        ],
        zones: [
          0, 1, 2, 3, 4, 5, 8, 9, 12, 13, 14, 15, 16, 17, 20, 21, 24, 25, 26,
          27, 28, 29, 30, 31, 32, 33, 34, 35,
        ],
      },
    },

    // Single plant mutations (auto-mutations)
    single: {
      6: {
        plants: [{ pos: 14, type: "parent1" }],
        zones: [7, 8, 9, 13, 15, 19, 20, 21],
      },
    },

    // Manual harvest layout for Brown Mold/Crumbspore
    manual_harvest: {
      6: {
        plants: [
          { pos: 7, type: "meddleweed" },
          { pos: 16, type: "meddleweed" },
          { pos: 25, type: "meddleweed" },
          { pos: 9, type: "meddleweed" },
          { pos: 18, type: "meddleweed" },
          { pos: 27, type: "meddleweed" },
        ],
        zones: [], // No mutation zones - manual harvest only
        description:
          "Meddleweed espacés pour éviter contamination. Récolte manuelle après vieillissement.",
      },
    },

    // Golden Clover layouts (from wiki image 2 - Level 6: 1,83% probability)
    golden_clover: {
      6: {
        plants: [
          // Configuration from Level 6 wiki image
          { pos: 6, type: "ordinary-clover" },
          { pos: 7, type: "ordinary-clover" },
          { pos: 8, type: "ordinary-clover" },
          { pos: 12, type: "ordinary-clover" },
          { pos: 14, type: "ordinary-clover" },
          { pos: 18, type: "ordinary-clover" },
          { pos: 19, type: "ordinary-clover" },
          { pos: 20, type: "ordinary-clover" },
        ],
        zones: [13], // Center position where Golden Clover can spawn
        probability: "1.83%",
      },
    },

    // Everdaisy configurations (from wiki image 4)
    everdaisy: {
      6: {
        plants: [
          // Standard alternating pattern: T-T-T / E-E-E / T-T-T / E-E-E
          { pos: 0, type: "tidygrass" },
          { pos: 1, type: "tidygrass" },
          { pos: 2, type: "tidygrass" },
          { pos: 3, type: "tidygrass" },
          { pos: 4, type: "tidygrass" },
          { pos: 5, type: "tidygrass" },
          { pos: 12, type: "elderwort" },
          { pos: 13, type: "elderwort" },
          { pos: 14, type: "elderwort" },
          { pos: 15, type: "elderwort" },
          { pos: 16, type: "elderwort" },
          { pos: 17, type: "elderwort" },
          { pos: 24, type: "tidygrass" },
          { pos: 25, type: "tidygrass" },
          { pos: 26, type: "tidygrass" },
          { pos: 27, type: "tidygrass" },
          { pos: 28, type: "tidygrass" },
          { pos: 29, type: "tidygrass" },
        ],
        zones: [
          6, 7, 8, 9, 10, 11, 18, 19, 20, 21, 22, 23, 30, 31, 32, 33, 34, 35,
        ], // Empty alternating rows
      },
    },

    // Shriekbulb configurations (from wiki image 3 - Level 6: 10 shriekbulbs)
    shriekbulb: {
      6: {
        plants: [
          // Checkerboard pattern with Duketater/Elderwort
          { pos: 0, type: "duketater" },
          { pos: 2, type: "duketater" },
          { pos: 4, type: "duketater" },
          { pos: 7, type: "duketater" },
          { pos: 9, type: "duketater" },
          { pos: 11, type: "duketater" },
          { pos: 12, type: "duketater" },
          { pos: 14, type: "duketater" },
          { pos: 16, type: "duketater" },
          { pos: 19, type: "duketater" },
          { pos: 21, type: "duketater" },
          { pos: 23, type: "duketater" },
          { pos: 24, type: "duketater" },
          { pos: 26, type: "duketater" },
          { pos: 28, type: "duketater" },
          { pos: 31, type: "duketater" },
          { pos: 33, type: "duketater" },
          { pos: 35, type: "duketater" },
        ],
        zones: [
          1, 3, 5, 6, 8, 10, 13, 15, 17, 18, 20, 22, 25, 27, 29, 30, 32, 34,
        ], // Mutation spots
      },
    },

    // Juicy Queenbeet: 8 Queenbeets in perfect 3x3 circle
    juicy_queenbeet: {
      6: {
        plants: [
          // First 3x3 circle (top-left)
          { pos: 7, type: "queenbeet" },
          { pos: 8, type: "queenbeet" },
          { pos: 9, type: "queenbeet" },
          { pos: 13, type: "queenbeet" },
          { pos: 15, type: "queenbeet" },
          { pos: 19, type: "queenbeet" },
          { pos: 20, type: "queenbeet" },
          { pos: 21, type: "queenbeet" },

          // Second 3x3 circle (top-right)
          { pos: 10, type: "queenbeet" },
          { pos: 11, type: "queenbeet" },
          { pos: 12, type: "queenbeet" },
          { pos: 16, type: "queenbeet" },
          { pos: 18, type: "queenbeet" },
          { pos: 22, type: "queenbeet" },
          { pos: 23, type: "queenbeet" },
          { pos: 24, type: "queenbeet" },
        ],
        zones: [14, 17], // Center positions for both circles
      },
    },
  };

  // Get next seed to unlock
  const getNextSeed = () => {
    for (const seed of allSeeds) {
      if (!ownedSeeds.includes(seed)) {
        return seed;
      }
    }
    return null;
  };

  // Check if can unlock a seed
  const canUnlock = (seedKey: string) => {
    if (ownedSeeds.includes(seedKey)) return false;

    const recipe = mutationRecipes[seedKey as keyof typeof mutationRecipes];
    if (!recipe) return false;

    // Check if we have all required parent plants
    const requiredParents = [...new Set(recipe.parents)]; // Remove duplicates
    return requiredParents.every((parent) => ownedSeeds.includes(parent));
  };

  // Toggle seed ownership
  const toggleSeed = (seedKey: string) => {
    if (ownedSeeds.includes(seedKey)) {
      // Remove seed and all seeds that depend on it
      const dependentSeeds: string[] = [];
      const findDependents = (seed: string) => {
        allSeeds.forEach((otherSeed) => {
          const recipe =
            mutationRecipes[otherSeed as keyof typeof mutationRecipes];
          if (
            recipe?.parents.includes(seed) &&
            !dependentSeeds.includes(otherSeed)
          ) {
            dependentSeeds.push(otherSeed);
            findDependents(otherSeed);
          }
        });
      };
      findDependents(seedKey);

      setOwnedSeeds(
        ownedSeeds.filter((s) => s !== seedKey && !dependentSeeds.includes(s)),
      );
    } else {
      setOwnedSeeds([...ownedSeeds, seedKey]);
    }
  };

  // Get optimal layout for current mutation
  const getOptimalLayout = (seedKey: string) => {
    const recipe = mutationRecipes[seedKey as keyof typeof mutationRecipes];
    if (!recipe)
      return { grid: Array(36).fill(null), zones: [], description: "" };

    const layoutType = recipe.layout;
    const gardenSize = 6;
    const layout: LayoutConfig | undefined =
      optimalLayouts[layoutType as keyof typeof optimalLayouts]?.[gardenSize];

    if (!layout)
      return {
        grid: Array(36).fill(null),
        zones: [],
        description: "Configuration non optimisée",
      };

    const grid = Array(36).fill(null);
    layout.plants.forEach((plant) => {
      if (plant.pos < 36) {
        let seedType: string;
        if (plant.type.startsWith("parent")) {
          const parentIndex = Number.parseInt(plant.type.slice(-1)) - 1;
          seedType = recipe.parents[parentIndex];
        } else if (plant.type === "meddleweed") {
          // Special case for manual harvest layouts
          seedType = "meddleweed";
        } else {
          seedType = plant.type;
        }
        grid[plant.pos] = seedType;
      }
    });

    const description = layout.probability
      ? `${layout.plants.length} plantes, ${layout.zones?.length || 0} zones (${layout.probability} avec Wood Chips)`
      : layout.description
        ? layout.description
        : `${layout.plants.length} plantes, ${layout.zones?.length || 0} zones de mutation`;

    return {
      grid,
      zones: (layout.zones as number[]) || [],
      description,
    };
  };

  // Get rarity variant
  const getRarityVariant = (rarity: string) => {
    switch (rarity) {
      case "starter":
        return "secondary";
      case "common":
        return "default";
      case "uncommon":
        return "secondary";
      case "rare":
        return "default";
      case "epic":
        return "default";
      case "legendary":
        return "destructive";
      default:
        return "secondary";
    }
  };

  // Get difficulty variant
  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty) {
      case "facile":
        return "default";
      case "modéré":
        return "secondary";
      case "difficile":
        return "default";
      case "très difficile":
        return "destructive";
      case "extrêmement difficile":
        return "destructive";
      case "cauchemar":
        return "destructive";
      case "impossible":
        return "destructive";
      case "spécial":
        return "outline";
      default:
        return "secondary";
    }
  };

  const nextSeed = getNextSeed();
  const nextRecipe = nextSeed
    ? mutationRecipes[nextSeed as keyof typeof mutationRecipes]
    : null;
  const optimalLayout = nextSeed
    ? getOptimalLayout(nextSeed)
    : { grid: Array(36).fill(null), zones: [], description: "" };

  const progressPercentage = (ownedSeeds.length / allSeeds.length) * 100;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-bold font-sans text-4xl">
            🍪 Guide Optimisé Cookie Clicker Garden
          </h1>
          <Card className="mt-6 inline-block transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="mb-2 font-bold text-primary text-xl">
                Progression: {ownedSeeds.length}/{allSeeds.length} graines
              </div>
              <div className="mb-3 text-accent-foreground text-lg">
                {progressPercentage.toFixed(1)}% complété
              </div>
              <Progress value={progressPercentage} className="h-3 w-72" />
              {progressPercentage === 100 && (
                <div className="mt-3 font-semibold text-primary">
                  🎉 Félicitations ! 🎉
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Next step panel */}
          <div className="lg:col-span-1">
            {nextSeed && nextRecipe ? (
              <Card className="mb-6 transition-all duration-300">
                <CardHeader className="rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 font-bold text-primary">
                    <Target className="text-accent" size={28} />
                    Prochaine étape
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="text-center">
                    <div className="mb-3 text-5xl">
                      {seedData[nextSeed as keyof typeof seedData].emoji}
                    </div>
                    <div className="mb-2 font-bold text-primary text-xl">
                      {seedData[nextSeed as keyof typeof seedData].name}
                    </div>
                    <Badge
                      variant={getRarityVariant(
                        seedData[nextSeed as keyof typeof seedData].rarity,
                      )}
                      className="px-4 py-1 font-semibold text-sm"
                    >
                      {seedData[nextSeed as keyof typeof seedData].rarity}
                    </Badge>
                  </div>

                  {/* Recipe and chance */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="mb-3 font-bold text-primary text-sm">
                        Recette:
                      </div>
                      <div className="mb-3 flex flex-wrap justify-center gap-3">
                        {[...new Set(nextRecipe.parents)].map((parent, idx) => (
                          <div
                            key={idx.toString()}
                            className="flex items-center gap-2 rounded-full bg-card/80 px-3 py-2"
                          >
                            <div className="text-3xl">
                              {seedData[parent as keyof typeof seedData].emoji}
                            </div>
                            {nextRecipe.parents.filter((p) => p === parent)
                              .length > 1 && (
                              <Badge
                                variant="secondary"
                                className="font-bold text-xs"
                              >
                                x
                                {
                                  nextRecipe.parents.filter((p) => p === parent)
                                    .length
                                }
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex justify-between rounded-lg bg-accent/20 p-2">
                          <span className="font-medium">Chance de base:</span>
                          <span className="font-bold text-primary">
                            {nextRecipe.chance}
                          </span>
                        </div>
                        <div className="flex justify-between rounded-lg bg-primary/20 p-2">
                          <span className="font-medium">Avec Wood Chips:</span>
                          <span className="font-bold text-accent">
                            {typeof nextRecipe.baseChance === "number" &&
                            nextRecipe.baseChance < 100
                              ? `${(nextRecipe.baseChance * 3).toFixed(3)}%`
                              : nextRecipe.chance}
                          </span>
                        </div>
                        <div className="flex justify-between rounded-lg bg-secondary/30 p-2">
                          <span className="font-medium">Difficulté:</span>
                          <Badge
                            variant={getDifficultyVariant(
                              nextRecipe.difficulty,
                            )}
                            className="font-bold text-xs"
                          >
                            {nextRecipe.difficulty}
                          </Badge>
                        </div>
                        <div className="flex justify-between rounded-lg bg-muted/50 p-2">
                          <span className="font-medium">Maturité:</span>
                          <span className="font-bold text-foreground">
                            {seedData[nextSeed as keyof typeof seedData]
                              .maturity === 0
                              ? "Immortel ✨"
                              : `${seedData[nextSeed as keyof typeof seedData].maturity} ticks`}
                          </span>
                        </div>
                        {nextSeed === "golden-clover" && (
                          <>
                            <div className="flex justify-between rounded-lg bg-gradient-to-r from-yellow-200 to-amber-200 p-2">
                              <span className="font-medium text-amber-800">
                                Config Wiki Lvl 6:
                              </span>
                              <span className="font-bold text-amber-800">
                                1.83%
                              </span>
                            </div>
                            <div className="flex justify-between rounded-lg bg-gradient-to-r from-amber-200 to-yellow-300 p-2">
                              <span className="font-medium text-amber-800">
                                Avec Wood Chips:
                              </span>
                              <span className="font-bold text-amber-800">
                                5.49%
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Strategy */}
                  <Alert className="border-accent/30">
                    <Target className="h-5 w-5 text-accent" />
                    <AlertDescription>
                      <div className="space-y-3 text-sm">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <strong className="text-primary">Sol:</strong>{" "}
                          <span className="text-foreground">
                            {nextRecipe.soilStrategy}
                          </span>
                        </div>
                        <div className="rounded-lg bg-accent/10 p-3">
                          <strong className="text-accent-foreground">
                            Description:
                          </strong>{" "}
                          <span className="text-foreground">
                            {nextRecipe.description}
                          </span>
                        </div>
                        <div className="rounded-lg bg-secondary/10 p-3">
                          <strong className="text-secondary-foreground">
                            Layout:
                          </strong>{" "}
                          <span className="text-foreground">
                            {optimalLayout.description}
                          </span>
                        </div>
                        {nextRecipe.baseChance < 1 && (
                          <div className="rounded-lg bg-destructive/10 p-3 font-bold text-destructive">
                            ⚠️ Mutation rare - Wood Chips obligatoire !
                          </div>
                        )}
                      </div>
                    </AlertDescription>
                  </Alert>

                  {/* Special alerts for specific seeds */}
                  {nextSeed === "golden-clover" && (
                    <Alert className="border-yellow-300">
                      <AlertDescription>
                        <div className="mb-2 font-bold text-amber-800 text-lg">
                          🍀 Golden Clover - Configuration Wiki
                        </div>
                        <div className="space-y-1 text-amber-700 text-sm">
                          <div className="rounded bg-amber-50 p-2">
                            Level 6 Garden: 1,83% de probabilité avec Wood Chips
                          </div>
                          <div className="rounded bg-yellow-50 p-2">
                            8 Ordinary Clover disposés autour d'une case
                            centrale
                          </div>
                          <div className="rounded bg-amber-50 p-2">
                            Meilleur setup comparé à Baker's Wheat + Gildmillet
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  {(nextSeed === "brown-mold" || nextSeed === "crumbspore") && (
                    <Alert className="border-orange-300 bg-gradient-to-r from-orange-100 to-amber-100">
                      <AlertDescription>
                        <div className="mb-3 font-bold text-lg text-orange-800">
                          🍄 Brown Mold/Crumbspore - Récolte manuelle
                        </div>
                        <div className="space-y-2 text-orange-700 text-sm">
                          <div className="rounded-lg bg-orange-50 p-2">
                            <strong>Étape 1:</strong> Fertilizer - plante
                            plusieurs Meddleweed espacés
                          </div>
                          <div className="rounded-lg bg-amber-50 p-2">
                            <strong>Étape 2:</strong> Attends qu'ils deviennent
                            matures (5 ticks)
                          </div>
                          <div className="rounded-lg bg-orange-50 p-2">
                            <strong>Étape 3:</strong> Clay - change vers Clay
                            pour ralentir le vieillissement
                          </div>
                          <div className="rounded-lg bg-amber-50 p-2">
                            <strong>Étape 4:</strong> Attends qu'ils
                            vieillissent (âge 50+ recommandé)
                          </div>
                          <div className="rounded-lg bg-orange-50 p-2">
                            <strong>Étape 5:</strong> Clique individuellement
                            sur chaque Meddleweed
                          </div>
                          <div className="rounded-lg bg-red-50 p-2 font-bold text-red-600">
                            ⚠️ NE PAS utiliser "Harvest All" !
                          </div>
                          <div className="rounded-lg bg-yellow-50 p-2">
                            Chance = âge × 0.2% (max 19.8% à âge 99)
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Optimal layout visualization */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="mb-3 text-center font-bold text-primary">
                        Layout optimisé (6x6):
                        {(nextSeed === "brown-mold" ||
                          nextSeed === "crumbspore") && (
                          <span className="text-destructive">
                            {" "}
                            - Récolte Manuelle
                          </span>
                        )}
                      </div>
                      <div className="mx-auto mb-4 grid max-w-52 grid-cols-6 gap-1 rounded-xl bg-card/50 p-3">
                        {optimalLayout.grid.map((cell, idx) => (
                          <div
                            key={idx.toString()}
                            className={`flex h-7 w-7 items-center justify-center rounded-xl border-2 font-bold text-sm transition-all duration-200 hover:scale-110 ${
                              cell
                                ? (
                                    nextSeed === "brown-mold" ||
                                      nextSeed === "crumbspore"
                                  )
                                  ? "border-orange-300 bg-gradient-to-br from-orange-100 to-amber-100"
                                  : "border-primary/30 bg-gradient-to-br from-primary/20 to-accent/20"
                                : optimalLayout.zones.includes(idx)
                                  ? "animate-pulse border-accent bg-gradient-to-br from-yellow-100 to-amber-100"
                                  : "border-muted bg-gradient-to-br from-muted/50 to-background"
                            }`}
                            title={
                              cell
                                ? `${seedData[cell as keyof typeof seedData]?.name}${nextSeed === "brown-mold" || nextSeed === "crumbspore" ? " (à récolter manuellement)" : ""}`
                                : optimalLayout.zones.includes(idx)
                                  ? "Zone de mutation"
                                  : "Vide"
                            }
                          >
                            {cell && seedData[cell as keyof typeof seedData]
                              ? seedData[cell as keyof typeof seedData].emoji
                              : optimalLayout.zones.includes(idx)
                                ? "✨"
                                : (nextSeed === "brown-mold" ||
                                      nextSeed === "crumbspore") &&
                                    !cell
                                  ? "👆"
                                  : ""}
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2 text-center text-sm">
                        <div className="flex items-center justify-center gap-6 text-xs">
                          <div className="flex items-center gap-2 rounded-full bg-card/80 px-3 py-1">
                            <div
                              className={`h-4 w-4 rounded-full border-2 ${
                                nextSeed === "brown-mold" ||
                                nextSeed === "crumbspore"
                                  ? "border-orange-300 bg-gradient-to-br from-orange-100 to-amber-100"
                                  : "border-primary/30 bg-gradient-to-br from-primary/20 to-accent/20"
                              }`}
                            ></div>
                            <span className="font-medium">
                              {nextSeed === "brown-mold" ||
                              nextSeed === "crumbspore"
                                ? `Meddleweed (${optimalLayout.grid.filter(Boolean).length})`
                                : `Plantes (${optimalLayout.grid.filter(Boolean).length})`}
                            </span>
                          </div>
                          {optimalLayout.zones.length > 0 && (
                            <div className="flex items-center gap-2 rounded-full bg-card/80 px-3 py-1">
                              <div className="h-4 w-4 rounded-full border-2 border-accent bg-gradient-to-br from-yellow-100 to-amber-100"></div>
                              <span className="font-medium">
                                Mutations ({optimalLayout.zones.length})
                              </span>
                            </div>
                          )}
                        </div>
                        {(nextSeed === "brown-mold" ||
                          nextSeed === "crumbspore") && (
                          <div className="rounded-lg bg-destructive/10 p-2 font-bold text-destructive text-xs">
                            👆 Clique individuellement sur chaque Meddleweed
                            vieux
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            ) : (
              <Card className="mb-6 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 text-6xl">🎉</div>
                  <CardTitle className="mb-4 font-bold text-3xl text-primary">
                    Félicitations !
                  </CardTitle>
                  <p className="mb-4 text-lg text-muted-foreground">
                    Toutes les graines sont débloquées !
                  </p>
                  <div className="rounded-lg bg-accent/20 p-3 font-medium text-accent-foreground text-sm">
                    Tu peux maintenant sacrifier ton jardin pour 10 Sugar Lumps
                    ! ✨
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Soil guide */}
            <Card className="transition-all duration-300">
              <CardHeader className="rounded-t-lg">
                <CardTitle className="font-bold text-primary">
                  Guide des sols 🌱
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <Alert className="border-orange-300 bg-gradient-to-r from-orange-100 to-amber-100">
                  <AlertDescription>
                    <div className="font-bold text-lg text-orange-800">
                      🌱 Fertilizer (3 min/tick)
                    </div>
                    <div className="font-medium text-orange-700">
                      Croissance RAPIDE - Pour faire pousser
                    </div>
                  </AlertDescription>
                </Alert>

                <Alert className="border-amber-300 bg-gradient-to-r from-amber-100 to-yellow-100">
                  <AlertDescription>
                    <div className="font-bold text-amber-800 text-lg">
                      🪵 Wood Chips (10 min/tick)
                    </div>
                    <div className="font-medium text-amber-700">
                      Mutations x3 - OBLIGATOIRE pour muter ✨
                    </div>
                  </AlertDescription>
                </Alert>

                <Alert className="border-stone-300 bg-gradient-to-r from-stone-100 to-gray-100">
                  <AlertDescription>
                    <div className="font-bold text-lg text-stone-800">
                      🧱 Clay (15 min/tick)
                    </div>
                    <div className="font-medium text-stone-700">
                      Vieillissement lent - Pour conserver
                    </div>
                  </AlertDescription>
                </Alert>

                <Alert className="border-gray-300 bg-gradient-to-r from-gray-100 to-slate-100">
                  <AlertDescription>
                    <div className="font-bold text-gray-800 text-lg">
                      🪨 Pebbles (35% drop chance)
                    </div>
                    <div className="font-medium text-gray-700">
                      Pour Elderwort immortel et drops garantis
                    </div>
                  </AlertDescription>
                </Alert>

                <Separator className="my-4" />

                <Alert
                  variant="destructive"
                  className="bg-gradient-to-r from-red-100 to-orange-100"
                >
                  <AlertDescription>
                    <div className="mb-3 font-bold text-lg">
                      ⚠️ Attention Contamination:
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="rounded-lg bg-red-50 p-2">
                        • <strong>Meddleweed:</strong> Contamine orthogonalement
                        (haut/bas/gauche/droite)
                      </div>
                      <div className="rounded-lg bg-orange-50 p-2">
                        • <strong>Crumbspore:</strong> Peut contaminer les
                        plantes adjacentes
                      </div>
                      <div className="rounded-lg bg-yellow-50 p-2">
                        • <strong>Protection:</strong> Laisse des cases vides
                        entre les plants importants
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>

                <Alert className="border-green-300 bg-gradient-to-r from-green-100 to-emerald-100">
                  <AlertDescription>
                    <div className="mb-3 font-bold text-green-800 text-lg">
                      💡 Stratégie générale:
                    </div>
                    <div className="space-y-2 text-green-700 text-sm">
                      <div className="rounded-lg bg-green-50 p-2">
                        1. <strong>Fertilizer</strong> pour croissance rapide
                      </div>
                      <div className="rounded-lg bg-emerald-50 p-2">
                        2. <strong>Wood Chips</strong> dès que matures pour
                        muter (x3 chance)
                      </div>
                      <div className="rounded-lg bg-green-50 p-2">
                        3. <strong>Clay</strong> pour prolonger la durée de vie
                      </div>
                      <div className="rounded-lg bg-emerald-50 p-2">
                        4. <strong>Pebbles</strong> pour Elderwort immortel (35%
                        drop chance)
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* All seeds list */}
          <div className="lg:col-span-2">
            <Card className="transition-all duration-300">
              <CardHeader className="rounded-t-lg">
                <CardTitle className="font-bold text-primary text-xl">
                  Toutes les graines 🌱
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {allSeeds.map((seedKey, index) => {
                    const seed = seedData[seedKey as keyof typeof seedData];
                    const isOwned = ownedSeeds.includes(seedKey);
                    const canBeUnlocked = canUnlock(seedKey);
                    const recipe =
                      mutationRecipes[seedKey as keyof typeof mutationRecipes];

                    return (
                      <div
                        key={seedKey}
                        className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                          isOwned
                            ? "border-accent bg-gradient-to-br from-accent/20 to-primary/10"
                            : canBeUnlocked
                              ? "border-primary bg-gradient-to-br from-primary/20 to-accent/10"
                              : "border-muted bg-gradient-to-br from-card to-muted/50"
                        }`}
                      >
                        <Button
                          onClick={() => toggleSeed(seedKey)}
                          variant="ghost"
                          className="h-full w-full flex-col gap-3 rounded-2xl p-4 hover:bg-transparent"
                        >
                          {/* Header avec index et statut */}
                          <div className="flex w-full items-start justify-between">
                            <Badge
                              variant="outline"
                              className="bg-card/80 font-bold text-xs"
                            >
                              #{index + 1}
                            </Badge>
                            <div className="flex items-center gap-2">
                              {canBeUnlocked && !isOwned && (
                                <Badge
                                  variant="default"
                                  className="px-3 py-1 font-bold text-primary-foreground text-xs"
                                >
                                  Prêt ✨
                                </Badge>
                              )}
                              {isOwned ? (
                                <CheckCircle
                                  className="text-accent"
                                  size={20}
                                />
                              ) : (
                                <Circle
                                  className="text-muted-foreground"
                                  size={20}
                                />
                              )}
                            </div>
                          </div>

                          {/* Section principale */}
                          <div className="flex flex-col items-center gap-3">
                            {/* Emoji et nom */}
                            <div className="text-center">
                              <div className="mb-3 text-4xl transition-all duration-200">
                                {seed.emoji}
                              </div>
                              <div className="px-1 font-bold text-foreground text-sm leading-tight">
                                {seed.name}
                              </div>
                            </div>

                            {/* Badges organisés */}
                            <div className="flex w-full flex-col gap-2">
                              <Badge
                                variant={getRarityVariant(seed.rarity)}
                                className="w-full justify-center py-2 font-bold text-xs"
                              >
                                {seed.rarity}
                              </Badge>

                              {recipe && (
                                <Badge
                                  variant={getDifficultyVariant(
                                    recipe.difficulty,
                                  )}
                                  className="w-full justify-center py-2 font-bold text-xs"
                                >
                                  {recipe.difficulty}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Informations techniques */}
                          <div className="mt-auto w-full space-y-2">
                            <Separator className="my-3" />
                            <div className="grid grid-cols-1 gap-2 text-center text-muted-foreground text-xs">
                              <div className="flex justify-between rounded-lg bg-muted/50 p-2">
                                <span className="font-medium">Maturité:</span>
                                <span className="font-bold">
                                  {seed.maturity === 0
                                    ? "Immortel ✨"
                                    : `${seed.maturity} ticks`}
                                </span>
                              </div>
                              {recipe && (
                                <div className="flex justify-between rounded-lg bg-accent/20 p-2">
                                  <span className="font-medium">Chance:</span>
                                  <span className="font-bold text-accent-foreground">
                                    {recipe.chance}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Effet de la plante */}
                            <div className="rounded-lg border bg-gradient-to-r from-muted/30 to-accent/10 p-3 text-center text-xs">
                              <div className="font-bold text-foreground">
                                {seed.effect}
                              </div>
                            </div>
                          </div>
                        </Button>
                      </div>
                    );
                  })}
                </div>

                {/* Quick actions */}
                <Separator className="my-8" />
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    onClick={() => setOwnedSeeds(["bakers-wheat"])}
                    variant="outline"
                    size="sm"
                    className="font-semibold transition-all duration-200"
                  >
                    🔄 Reset (départ)
                  </Button>
                  <Button
                    onClick={() =>
                      setOwnedSeeds([
                        "bakers-wheat",
                        "meddleweed",
                        "thumbcorn",
                        "cronerice",
                        "bakeberry",
                      ])
                    }
                    variant="outline"
                    size="sm"
                    className="font-semibold transition-all duration-200"
                  >
                    🌱 Base complète
                  </Button>
                  <Button
                    onClick={() => setOwnedSeeds([...allSeeds])}
                    variant="outline"
                    size="sm"
                    className="font-semibold transition-all duration-200"
                  >
                    🎉 Tout débloquer
                  </Button>
                  <Button
                    onClick={() => setOwnedSeeds([])}
                    variant="destructive"
                    size="sm"
                    className="font-semibold transition-all duration-200"
                  >
                    🗑️ Tout effacer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
