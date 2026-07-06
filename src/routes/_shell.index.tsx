import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HScroll } from "@/components/portal/HScroll";
import { CourseCard } from "@/components/portal/CourseCard";
import { courses, notifications, events, activities } from "@/lib/mock-data";
import { Award, BookOpen, Clock, Flame, TrendingUp, CalendarClock, Bell, PlayCircle } from "lucide-react";

export const Route = createFileRoute("/_shell/")({
  component: Dashboard,
});

function Dashboard() {
  const inProgress = courses.filter((c) => c.enrolled && !c.completed);
  const completed = courses.filter((c) => c.completed);
  const totalProgress = Math.round(
    inProgress.concat(completed).reduce((s, c) => s + (c.progress ?? 0), 0) /
      Math.max(1, inProgress.length + completed.length),
  );

  const stats = [
    { label: "Progresso geral", value: `${totalProgress}%`, icon: TrendingUp, hint: "+8% esta semana" },
    { label: "Cursos em andamento", value: inProgress.length, icon: BookOpen, hint: `${completed.length} concluídos` },
    { label: "Horas estudadas", value: "48h", icon: Clock, hint: "Esta semana: 6h" },
    { label: "Sequência", value: "12 dias", icon: Flame, hint: "Seu recorde: 21" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">
      {/* Welcome */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-brand/10 via-background to-accent/10 p-6 md:p-8">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/10 blur-3xl" aria-hidden />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Bem-vindo de volta 👋</p>
            <h1 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight">Lucas, continue de onde parou</h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Você concluiu <span className="font-semibold text-foreground">4 aulas</span> esta semana. Faltam
              <span className="font-semibold text-foreground"> 3 aulas</span> para completar o módulo atual.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild size="lg">
              <Link to="/lessons/$id" params={{ id: "l6" }}>
                <PlayCircle className="mr-2 h-4 w-4" />
                Continuar assistindo
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/courses">Explorar cursos</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="mt-1 text-2xl font-bold">{s.value}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{s.hint}</p>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress row */}
      <HScroll title="Progresso do curso" subtitle="Continue de onde parou" seeAllTo="/my-courses">
        {inProgress.map((c) => (
          <div key={c.id} className="snap-start">
            <CourseCard course={c} variant="progress" />
          </div>
        ))}
      </HScroll>

      {/* Available courses */}
      <HScroll title="Cursos disponíveis" subtitle="Recomendados para você" seeAllTo="/courses">
        {courses.filter((c) => !c.enrolled).map((c) => (
          <div key={c.id} className="snap-start">
            <CourseCard course={c} />
          </div>
        ))}
      </HScroll>

      {/* Bottom grid: events, activity, notifications */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader className="flex-row items-center justify-between pb-3">
            <CardTitle className="text-base flex items-center gap-2"><CalendarClock className="h-4 w-4 text-primary" /> Próximos eventos</CardTitle>
            <Link to="/schedule" className="text-xs text-primary hover:underline">Ver agenda</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {events.map((e) => (
              <div key={e.id} className="flex items-start gap-3 rounded-lg border p-3">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-accent/15 text-accent-foreground shrink-0">
                  <CalendarClock className="h-4 w-4 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{e.title}</p>
                  <p className="text-xs text-muted-foreground">{e.date}</p>
                </div>
                <Badge variant="secondary" className="text-[10px]">{e.type}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader className="flex-row items-center justify-between pb-3">
            <CardTitle className="text-base flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> Últimas atividades</CardTitle>
            <Link to="/history" className="text-xs text-primary hover:underline">Histórico</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.course} · {a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader className="flex-row items-center justify-between pb-3">
            <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> Notificações</CardTitle>
            <Link to="/notifications" className="text-xs text-primary hover:underline">Ver todas</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="flex items-start gap-3 rounded-lg border p-3 bg-card">
                {n.unread && <span className="mt-1.5 h-2 w-2 rounded-full bg-accent shrink-0" />}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{n.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{n.desc}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{n.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Certificates strip */}
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-brand to-accent text-white shadow-elevated">
              <Award className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-bold">Certificados disponíveis</h3>
              <p className="text-sm text-muted-foreground">Você tem 2 certificados prontos para download e compartilhamento.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:min-w-52">
              <Progress value={totalProgress} className="h-2" />
              <p className="mt-1 text-xs text-muted-foreground">Próximo certificado em {100 - totalProgress}%</p>
            </div>
            <Button asChild><Link to="/certificates">Ver certificados</Link></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
