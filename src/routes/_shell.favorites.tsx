import { createFileRoute } from "@tanstack/react-router";
import { CourseCard } from "@/components/portal/CourseCard";
import { courses } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/favorites")({ component: Favorites });

function Favorites() {
  const favs = courses.filter(c => c.favorite);
  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Favoritos</h1>
        <p className="text-sm text-muted-foreground">Seus cursos, aulas e materiais salvos.</p>
      </div>
      {favs.length === 0 ? (
        <p className="text-muted-foreground">Nenhum favorito ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {favs.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      )}
    </div>
  );
}
