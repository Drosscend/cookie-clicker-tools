import type { Tool } from "@/types";

export const TOOLS: Tool[] = [
  {
    id: "garden",
    name: "Garden Optimizer",
    description:
      "Guide complet pour débloquer toutes les graines du jardin avec des layouts optimisés et stratégies de sols.",
    icon: "🌱",
    category: "garden",
    difficulty: "intermediate",
    href: "/garden",
    isPopular: true,
  },
  {
    id: "cookie-calculator",
    name: "Cookie Calculator",
    description:
      "Calculateur avancé de production de cookies, CpS et optimisation des bâtiments.",
    icon: "🍪",
    category: "calculator",
    difficulty: "beginner",
    href: "/calculator",
    isNew: true,
  },
  {
    id: "golden-cookie-predictor",
    name: "Golden Cookie Predictor",
    description:
      "Prédicteur des apparitions de Golden Cookies et optimisation des gains.",
    icon: "🍀",
    category: "optimization",
    difficulty: "advanced",
    href: "/golden-cookies",
  },
  {
    id: "building-optimizer",
    name: "Building Optimizer",
    description:
      "Optimiseur pour les achats de bâtiments et upgrades selon votre stratégie.",
    icon: "🏭",
    category: "buildings",
    difficulty: "intermediate",
    href: "/buildings",
  },
  {
    id: "achievement-tracker",
    name: "Achievement Tracker",
    description:
      "Suivi des succès avec guides détaillés et stratégies pour les débloquer.",
    icon: "🏆",
    category: "achievements",
    difficulty: "beginner",
    href: "/achievements",
  },
  {
    id: "stock-market",
    name: "Stock Market Helper",
    description:
      "Assistant pour le mini-jeu du marché boursier avec prédictions et stratégies.",
    icon: "📈",
    category: "optimization",
    difficulty: "expert",
    href: "/stock-market",
  },
  {
    id: "pantheon-optimizer",
    name: "Pantheon Optimizer",
    description:
      "Optimiseur pour les slots du Panthéon selon vos objectifs actuels.",
    icon: "🏛️",
    category: "optimization",
    difficulty: "advanced",
    href: "/pantheon",
  },
  {
    id: "grimoire-spells",
    name: "Grimoire Spells",
    description:
      "Guide des sorts du Grimoire avec calculs de backfire et stratégies optimales.",
    icon: "📚",
    category: "optimization",
    difficulty: "advanced",
    href: "/grimoire",
  },
  {
    id: "prestige-calculator",
    name: "Prestige Calculator",
    description:
      "Calculateur pour déterminer le moment optimal pour faire un prestige.",
    icon: "⭐",
    category: "calculator",
    difficulty: "intermediate",
    href: "/prestige",
  },
  {
    id: "sugar-lump-tracker",
    name: "Sugar Lump Tracker",
    description:
      "Suivi des Sugar Lumps avec prédictions de maturation et stratégies d'utilisation.",
    icon: "🍯",
    category: "optimization",
    difficulty: "intermediate",
    href: "/sugar-lumps",
  },
];

export const CATEGORIES = [
  { id: "garden", name: "Garden", icon: "🌱", color: "green" },
  { id: "buildings", name: "Buildings", icon: "🏭", color: "blue" },
  { id: "achievements", name: "Achievements", icon: "🏆", color: "yellow" },
  { id: "calculator", name: "Calculators", icon: "🧮", color: "purple" },
  { id: "optimization", name: "Optimization", icon: "⚡", color: "orange" },
] as const;

export const DIFFICULTY_LEVELS = [
  {
    id: "beginner",
    name: "Beginner",
    color: "green",
    description: "Facile à utiliser, idéal pour débuter",
  },
  {
    id: "intermediate",
    name: "Intermediate",
    color: "yellow",
    description: "Nécessite une connaissance basique du jeu",
  },
  {
    id: "advanced",
    name: "Advanced",
    color: "orange",
    description: "Pour les joueurs expérimentés",
  },
  {
    id: "expert",
    name: "Expert",
    color: "red",
    description: "Fonctionnalités très avancées",
  },
] as const;
