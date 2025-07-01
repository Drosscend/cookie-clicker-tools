import type { OptimalLayouts } from "@/types/garden";

export const OPTIMAL_LAYOUTS: OptimalLayouts = {
  // Standard adjacent layouts for most mutations
  adjacent: {
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
        0, 1, 2, 3, 4, 5, 6, 11, 12, 14, 15, 17, 18, 23, 24, 25, 26, 27, 28, 29,
      ],
    },
  },

  // Same plant mutations
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
        0, 1, 2, 3, 4, 5, 8, 9, 12, 13, 14, 15, 16, 17, 20, 21, 24, 25, 26, 27,
        28, 29, 30, 31, 32, 33, 34, 35,
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
      zones: [],
      description:
        "Meddleweed espacés pour éviter contamination. Récolte manuelle après vieillissement.",
    },
  },

  // Golden Clover layout
  golden_clover: {
    6: {
      plants: [
        { pos: 6, type: "ordinary-clover" },
        { pos: 7, type: "ordinary-clover" },
        { pos: 8, type: "ordinary-clover" },
        { pos: 12, type: "ordinary-clover" },
        { pos: 14, type: "ordinary-clover" },
        { pos: 18, type: "ordinary-clover" },
        { pos: 19, type: "ordinary-clover" },
        { pos: 20, type: "ordinary-clover" },
      ],
      zones: [13],
      probability: "1.83%",
    },
  },

  // Everdaisy configuration
  everdaisy: {
    6: {
      plants: [
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
      ],
    },
  },

  // Shriekbulb configuration
  shriekbulb: {
    6: {
      plants: [
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
      ],
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
      zones: [14, 17],
    },
  },
};
