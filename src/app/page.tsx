import { ToolCard } from "@/components/tools/shared/tool-card";
import { Badge } from "@/components/ui/badge";
import { TOOLS } from "@/lib/data/tools";

export default function HomePage() {
  const gardenTool = TOOLS.find((tool) => tool.id === "garden");

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 text-6xl">🍪</div>
          <h1 className="mb-4 font-bold text-4xl text-foreground md:text-6xl">
            Cookie Clicker Tools
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Outil optimisé pour débloquer toutes les graines du jardin Cookie
            Clicker.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {gardenTool && (
          <section className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <h2 className="font-bold text-2xl">🌱 Garden Optimizer</h2>
              <Badge variant="secondary">Recommandé</Badge>
            </div>
            <div className="mx-auto max-w-xl">
              <ToolCard tool={gardenTool} />
            </div>
          </section>
        )}

        <div className="mt-16 rounded-lg bg-muted/50 p-6 text-center">
          <p className="text-muted-foreground">
            Cet outil est développé par des passionnés de Cookie Clicker.
            <br />
            Gratuit et open-source. Non affilié à Orteil.
          </p>
        </div>
      </div>
    </div>
  );
}
