"use client";

import { CheckCircle, Circle, Target } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { OPTIMAL_LAYOUTS } from "@/lib/tools/garden/layouts";
import { MUTATION_RECIPES } from "@/lib/tools/garden/mutations";
import { ALL_SEEDS, SEEDS_DATA } from "@/lib/tools/garden/seeds";
import type { LayoutConfig } from "@/types/garden";

export default function GardenPage() {
  // Starting seeds (available from beginning)
  const [ownedSeeds, setOwnedSeeds] = useState(["bakers-wheat"]);

  // Get next seed to unlock
  const getNextSeed = () => {
    for (const seed of ALL_SEEDS) {
      if (!ownedSeeds.includes(seed)) {
        return seed;
      }
    }
    return null;
  };

  // Check if can unlock a seed
  const canUnlock = (seedKey: string) => {
    if (ownedSeeds.includes(seedKey)) return false;

    const recipe = MUTATION_RECIPES[seedKey as keyof typeof MUTATION_RECIPES];
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
        ALL_SEEDS.forEach((otherSeed) => {
          const recipe =
            MUTATION_RECIPES[otherSeed as keyof typeof MUTATION_RECIPES];
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
    const recipe = MUTATION_RECIPES[seedKey as keyof typeof MUTATION_RECIPES];
    if (!recipe)
      return { grid: Array(36).fill(null), zones: [], description: "" };

    const layoutType = recipe.layout;
    const gardenSize = 6;
    const layout: LayoutConfig | undefined =
      OPTIMAL_LAYOUTS[layoutType as keyof typeof OPTIMAL_LAYOUTS]?.[gardenSize];

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
    ? MUTATION_RECIPES[nextSeed as keyof typeof MUTATION_RECIPES]
    : null;
  const optimalLayout = nextSeed
    ? getOptimalLayout(nextSeed)
    : { grid: Array(36).fill(null), zones: [], description: "" };

  const progressPercentage = (ownedSeeds.length / ALL_SEEDS.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header title="Garden Optimizer" showBackButton={true} />
      <div className="mx-auto max-w-7xl p-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-bold font-sans text-4xl">
            🌱 Guide Optimisé Cookie Clicker Garden
          </h1>
          <Card className="mt-6 inline-block transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="mb-2 font-bold text-primary text-xl">
                Progression: {ownedSeeds.length}/{ALL_SEEDS.length} graines
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
                      {SEEDS_DATA[nextSeed as keyof typeof SEEDS_DATA].emoji}
                    </div>
                    <div className="mb-2 font-bold text-primary text-xl">
                      {SEEDS_DATA[nextSeed as keyof typeof SEEDS_DATA].name}
                    </div>
                    <Badge
                      variant={getRarityVariant(
                        SEEDS_DATA[nextSeed as keyof typeof SEEDS_DATA].rarity,
                      )}
                      className="px-4 py-1 font-semibold text-sm"
                    >
                      {SEEDS_DATA[nextSeed as keyof typeof SEEDS_DATA].rarity}
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
                              {
                                SEEDS_DATA[parent as keyof typeof SEEDS_DATA]
                                  .emoji
                              }
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
                            {SEEDS_DATA[nextSeed as keyof typeof SEEDS_DATA]
                              .maturity === 0
                              ? "Immortel ✨"
                              : `${SEEDS_DATA[nextSeed as keyof typeof SEEDS_DATA].maturity} ticks`}
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
                                ? `${SEEDS_DATA[cell as keyof typeof SEEDS_DATA]?.name}${nextSeed === "brown-mold" || nextSeed === "crumbspore" ? " (à récolter manuellement)" : ""}`
                                : optimalLayout.zones.includes(idx)
                                  ? "Zone de mutation"
                                  : "Vide"
                            }
                          >
                            {cell && SEEDS_DATA[cell as keyof typeof SEEDS_DATA]
                              ? SEEDS_DATA[cell as keyof typeof SEEDS_DATA]
                                  .emoji
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
                  {ALL_SEEDS.map((seedKey, index) => {
                    const seed = SEEDS_DATA[seedKey as keyof typeof SEEDS_DATA];
                    const isOwned = ownedSeeds.includes(seedKey);
                    const canBeUnlocked = canUnlock(seedKey);
                    const recipe =
                      MUTATION_RECIPES[
                        seedKey as keyof typeof MUTATION_RECIPES
                      ];

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
                    onClick={() => setOwnedSeeds([...ALL_SEEDS])}
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
