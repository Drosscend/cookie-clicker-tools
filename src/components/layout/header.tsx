import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  backHref?: string;
}

export function Header({
  title,
  showBackButton = false,
  backHref = "/",
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={backHref} className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Retour
              </Link>
            </Button>
          )}

          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80">
              <div className="text-2xl">🍪</div>
              <span className="font-bold text-lg">Cookie Clicker Tools</span>
            </Link>
            {title && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="font-medium text-foreground">{title}</span>
              </>
            )}
          </div>
        </div>

        <Button variant="outline" size="sm" asChild>
          <Link href="/" className="flex items-center gap-2">
            <Home size={16} />
            Accueil
          </Link>
        </Button>
      </div>
    </header>
  );
}
