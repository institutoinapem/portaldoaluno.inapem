import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CourseCard } from "@/components/portal/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { courses, CATEGORIES, LEVELS } from "@/lib/mock-data";
import { Search, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/_shell/courses")({
  component: CoursesPage,
});

function CoursesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todos");
  const [level, setLevel] = useState("Todos");
  const [instructor, setInstructor] = useState("Todos");

  const instructors = useMemo(() => ["Todos", ...Array.from(new Set(courses.map((c) => c.instructor)))], []);

  const filtered = courses.filter((c) => {
    if (q && !c.title.toLowerCase().includes(q.toLowerCase())) return false;
    if (cat !== "Todos" && c.category !== cat) return false;
    if (level !== "Todos" && c.level !== level) return false;
    if (instructor !== "Todos" && c.instructor !== instructor) return false;
    return true;
  });

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Cursos disponíveis</h1>
        <p className="text-sm text-muted-foreground">Explore nossa biblioteca completa de cursos.</p>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border bg-card p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Pesquisar por título..." className="pl-9 h-11" />
        </div>
        <div className="flex flex-wrap gap-3">
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Categoria" /></SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Nível" /></SelectTrigger>
            <SelectContent>
              {LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={instructor} onValueChange={setInstructor}>
            <SelectTrigger className="w-[200px]"><SelectValue placeholder="Instrutor" /></SelectTrigger>
            <SelectContent>
              {instructors.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => { setQ(""); setCat("Todos"); setLevel("Todos"); setInstructor("Todos"); }}>Limpar</Button>
            <Button variant="outline" size="sm"><SlidersHorizontal className="h-4 w-4 mr-1.5" /> Mais filtros</Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.filter(c => c !== "Todos").map((c) => (
            <Badge
              key={c}
              variant={cat === c ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setCat(cat === c ? "Todos" : c)}
            >
              {c}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{filtered.length} cursos encontrados</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((c) => (
          <div key={c.id} className="w-full">
            <CourseCard course={c} />
          </div>
        ))}
      </div>
    </div>
  );
}
