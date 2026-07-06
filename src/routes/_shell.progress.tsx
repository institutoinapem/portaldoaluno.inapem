import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Clock, BookOpen, TrendingUp, Award, PlayCircle } from "lucide-react";

export const Route = createFileRoute("/_shell/progress")({ component: ProgressPage });

const stats = [
  { icon: TrendingUp, label: "Percentual concluído", value: "62%" },
  { icon: Clock, label: "Horas estudadas", value: "48h" },
  { icon: Clock, label: "Tempo restante", value: "18h" },
  { icon: BookOpen, label: "Módulos concluídos", value: "8/14" },
  { icon: PlayCircle, label: "Aulas assistidas", value: "42/68" },
  { icon: Flame, label: "Sequência atual", value: "12 dias" },
];

const week = [4, 2, 6, 3, 5, 7, 4];

function ProgressPage() {
  const max = Math.max(...week);
  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Progresso</h1>
        <p className="text-sm text-muted-foreground">Sua jornada de aprendizado em números.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map(s => (
          <Card key={s.label}><CardContent className="p-4">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary mb-2"><s.icon className="h-4 w-4" /></div>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xl font-bold">{s.value}</p>
          </CardContent></Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Horas de estudo por dia (semana)</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-52 gap-3">
              {["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"].map((d, i) => (
                <div key={d} className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full rounded-t-md bg-gradient-to-t from-brand to-accent transition-all hover:opacity-80" style={{ height: `${(week[i] / max) * 100}%` }} />
                  <span className="text-xs text-muted-foreground">{d}</span>
                  <span className="text-xs font-semibold">{week[i]}h</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Cursos ativos</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "UX/UI Design", pct: 62 },
              { name: "React & TypeScript", pct: 28 },
              { name: "Inglês para Negócios", pct: 15 },
            ].map(c => (
              <div key={c.name} className="space-y-1.5">
                <div className="flex justify-between text-sm"><span className="truncate">{c.name}</span><b>{c.pct}%</b></div>
                <Progress value={c.pct} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Award className="h-4 w-4 text-accent" /> Conquistas</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Primeiro curso", "10 dias seguidos", "50h estudadas", "Primeiro certificado"].map(a => (
            <div key={a} className="rounded-xl border p-4 text-center bg-gradient-to-b from-accent/5 to-transparent">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent/15 text-accent mb-2"><Award className="h-6 w-6" /></div>
              <p className="text-sm font-medium">{a}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
