# Cookie Clicker Tools

Une boîte à outils pour le jeu [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/), dont l'outil principal est un **guide interactif du jardin**.

Le mini-jeu du jardin repose sur des croisements entre plantes voisines : deux plantes adjacentes peuvent en faire apparaître une troisième, avec une probabilité qui dépend de l'espèce, du sol et de la maturité. Débloquer les 34 graines demande d'enchaîner ces croisements dans le bon ordre. Ce guide rassemble l'information nécessaire au même endroit.

> Projet personnel construit en une journée, pour mon propre usage de joueur. Il n'est pas déployé et n'est plus maintenu.

## Le guide du jardin

- **Les 34 graines** avec, pour chacune, sa recette de croisement, sa maturité, sa probabilité de mutation et son effet
- **Suivi de progression** : on coche les graines possédées, l'outil indique celles qu'on peut débloquer immédiatement
- **Dispositions optimales** à reproduire dans le jeu selon la graine visée
- **Guide des sols** (fertilizer, wood chips, clay, pebbles) et de leur effet sur la croissance et les mutations
- **Pièges de contamination** : les espèces qui envahissent leurs voisines

## Stack technique

- [Next.js](https://nextjs.org/) (App Router) et [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) avec la configuration en CSS
- [shadcn/ui](https://ui.shadcn.com/) et [Radix UI](https://www.radix-ui.com/) pour les primitives d'interface
- [Biome](https://biomejs.dev/) pour le formatage et l'analyse, avec un crochet de pré-commit
- [Bun](https://bun.sh/) comme gestionnaire de paquets

Volontairement sans bibliothèque de gestion d'état ni client de requêtes : l'outil n'en a pas besoin.

## Démarrage local

```bash
git clone https://github.com/Drosscend/cookie-clicker-tools
cd cookie-clicker-tools
bun install
bun dev
```

L'application est disponible sur [http://localhost:3000](http://localhost:3000), et le guide du jardin sur `/garden`.

## Scripts

| Commande         | Description                          |
| ---------------- | ------------------------------------ |
| `bun dev`        | Serveur de développement (Turbopack) |
| `bun run build`  | Build de production                  |
| `bun start`      | Serveur de production                |
| `bun run check`  | Analyse et formatage (Biome)         |

## État du projet

Seul le guide du jardin est réellement implémenté. La page d'accueil liste d'autres outils (calculateur de production, optimiseur de bâtiments, assistant pour la bourse, etc.) qui sont restés à l'état d'intentions.
