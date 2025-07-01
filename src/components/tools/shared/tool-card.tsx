import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Tool } from "@/types";

interface ToolCardProps {
  tool: Tool;
}

const getDifficultyVariant = (difficulty: Tool["difficulty"]) => {
  switch (difficulty) {
    case "beginner":
      return "default";
    case "intermediate":
      return "secondary";
    case "advanced":
      return "outline";
    case "expert":
      return "destructive";
    default:
      return "secondary";
  }
};

const getCategoryColor = (category: Tool["category"]) => {
  switch (category) {
    case "garden":
      return "bg-green-100 text-green-800 border-green-200";
    case "buildings":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "achievements":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "calculator":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "optimization":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className="group relative h-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="text-4xl transition-transform duration-200 group-hover:scale-110">
            {tool.icon}
          </div>
          <div className="flex flex-col gap-2">
            {tool.isNew && (
              <Badge variant="default" className="bg-green-500 text-white">
                New
              </Badge>
            )}
            {tool.isPopular && (
              <Badge variant="default" className="bg-blue-500 text-white">
                Popular
              </Badge>
            )}
          </div>
        </div>

        <div>
          <CardTitle className="font-bold text-lg">{tool.name}</CardTitle>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge className={`text-xs ${getCategoryColor(tool.category)}`}>
              {tool.category}
            </Badge>
            <Badge
              variant={getDifficultyVariant(tool.difficulty)}
              className="text-xs"
            >
              {tool.difficulty}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <CardDescription className="text-sm leading-relaxed">
          {tool.description}
        </CardDescription>

        <div className="mt-auto">
          <Button asChild className="w-full">
            <Link href={tool.href}>Utiliser l'outil</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
