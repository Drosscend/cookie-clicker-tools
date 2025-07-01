// Types globaux (hors outils spécifiques)

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category:
    | "garden"
    | "buildings"
    | "achievements"
    | "calculator"
    | "optimization";
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  href: string;
  isNew?: boolean;
  isPopular?: boolean;
}
