import { useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function HScroll({
  title,
  subtitle,
  seeAllTo,
  children,
}: {
  title: string;
  subtitle?: string;
  seeAllTo?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-1">
          {seeAllTo && (
            <Link to={seeAllTo} className="mr-2 text-xs font-semibold text-primary hover:underline">
              Ver todos
            </Link>
          )}
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => scroll(-1)} aria-label="Anterior">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => scroll(1)} aria-label="Próximo">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div ref={ref} className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        {children}
      </div>
    </section>
  );
}
