import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { lessons } from "@/lib/mock-data";
import { Play, Pause, SkipBack, SkipForward, Maximize, Volume2, Subtitles, Settings, CheckCircle2, Video, FileText, ClipboardCheck, Radio, Download } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_shell/lessons/$id")({
  component: LessonPage,
});

const typeIcon = { video: Video, pdf: FileText, quiz: ClipboardCheck, live: Radio } as const;

function LessonPage() {
  const { id } = Route.useParams();
  const idx = Math.max(0, lessons.findIndex(l => l.id === id));
  const current = lessons[idx] ?? lessons[0];
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState([32]);
  const [speed, setSpeed] = useState("1x");
  const [captions, setCaptions] = useState(true);

  const doneCount = lessons.filter(l => l.completed).length;
  const pct = Math.round((doneCount / lessons.length) * 100);

  return (
    <div className="grid lg:grid-cols-[1fr_360px] min-h-[calc(100vh-4rem)]">
      <div className="p-4 md:p-6 space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/my-courses" className="hover:underline">Meus cursos</Link>
          <span>/</span>
          <Link to="/courses/$id" params={{ id: "c1" }} className="hover:underline">UX/UI Design Completo</Link>
          <span>/</span>
          <span className="text-foreground">{current.title}</span>
        </div>

        {/* Video player */}
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-elevated" style={{ backgroundImage: "linear-gradient(135deg, oklch(0.25 0.05 268), oklch(0.15 0.03 265))" }}>
          <div className="absolute inset-0 grid place-items-center">
            <button
              onClick={() => setPlaying(p => !p)}
              className="grid h-20 w-20 place-items-center rounded-full bg-white/90 text-primary shadow-elevated hover:scale-105 transition"
              aria-label={playing ? "Pausar" : "Reproduzir"}
            >
              {playing ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
            </button>
          </div>
          {captions && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded bg-black/70 px-3 py-1 text-sm text-white">
              "Vamos entender como aplicar hierarquia visual em interfaces..."
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 bg-gradient-to-t from-black/80 to-transparent">
            <Slider value={progress} onValueChange={setProgress} max={100} step={1} />
            <div className="flex items-center gap-2 text-white">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/10"><SkipBack className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/10" onClick={() => setPlaying(p => !p)}>
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/10"><SkipForward className="h-4 w-4" /></Button>
              <Volume2 className="h-4 w-4 ml-2" />
              <span className="text-xs">10:23 / 34:22</span>
              <div className="ml-auto flex items-center gap-1">
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 text-xs" onClick={() => setSpeed(speed === "1x" ? "1.5x" : speed === "1.5x" ? "2x" : "1x")}>{speed}</Button>
                <Button size="icon" variant="ghost" className={`text-white hover:bg-white/10 ${captions ? "bg-white/20" : ""}`} onClick={() => setCaptions(c => !c)}><Subtitles className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/10"><Settings className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/10"><Maximize className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions + info */}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold">{current.title}</h1>
          <Badge variant="secondary">Aula {idx + 1} de {lessons.length}</Badge>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1.5" /> Materiais</Button>
            <Button size="sm"><CheckCircle2 className="h-4 w-4 mr-1.5" /> Marcar como concluída</Button>
          </div>
        </div>

        <Card><CardContent className="p-5 text-sm text-muted-foreground">
          Nesta aula, você aprenderá os princípios de hierarquia visual, uso de espaçamento e como criar padrões que guiam o olhar do usuário através da interface.
        </CardContent></Card>

        <div className="flex justify-between">
          <Button variant="outline" disabled={idx === 0}><SkipBack className="h-4 w-4 mr-1.5" /> Anterior</Button>
          <Button disabled={idx === lessons.length - 1}>Próxima <SkipForward className="h-4 w-4 ml-1.5" /></Button>
        </div>
      </div>

      {/* Sidebar - lesson list */}
      <aside className="border-l bg-card p-4 space-y-3 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
        <div>
          <p className="text-xs text-muted-foreground">Progresso do curso</p>
          <div className="flex items-center gap-2 mt-1">
            <Progress value={pct} className="h-2 flex-1" />
            <span className="text-sm font-semibold">{pct}%</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold px-1">Módulo 2 · Fundamentos</p>
          {lessons.map((l, i) => {
            const Icon = typeIcon[l.type];
            const active = l.id === current.id;
            return (
              <Link
                key={l.id}
                to="/lessons/$id"
                params={{ id: l.id }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${active ? "bg-primary/10 border border-primary/20" : "hover:bg-muted"}`}
              >
                <span className="text-xs text-muted-foreground w-5">{String(i+1).padStart(2, "0")}</span>
                <Icon className="h-4 w-4 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">{l.title}</p>
                  <p className="text-[10px] text-muted-foreground">{l.duration}</p>
                </div>
                {l.completed && <CheckCircle2 className="h-4 w-4 text-success shrink-0" />}
              </Link>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
