import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { courses, lessons } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Users, Clock, PlayCircle, FileText, Video, ClipboardCheck, Radio, Heart, Share2, ShoppingCart, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_shell/courses/$id")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.id === params.id);
    if (!course) throw notFound();
    return { course };
  },
  component: CourseDetail,
  notFoundComponent: () => (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Curso não encontrado</h1>
      <Link to="/courses" className="text-primary hover:underline">Voltar para cursos</Link>
    </div>
  ),
});

const typeIcon = { video: Video, pdf: FileText, quiz: ClipboardCheck, live: Radio } as const;

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const done = lessons.filter((l) => l.completed).length;
  const pct = Math.round((done / lessons.length) * 100);

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Hero */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/courses" className="hover:underline">Cursos</Link>
            <span>/</span>
            <span>{course.category}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>{course.category}</Badge>
            <Badge variant="secondary">{course.level}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-accent text-accent" /> <b>{course.rating}</b> <span className="text-muted-foreground">(1.2k avaliações)</span></div>
            <div className="flex items-center gap-1.5 text-muted-foreground"><Users className="h-4 w-4" /> {course.students.toLocaleString("pt-BR")} alunos</div>
            <div className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-4 w-4" /> {course.hours}h totais</div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border p-3 w-fit">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-brand text-brand-foreground font-bold text-sm">
              {course.instructorAvatar}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Instrutor</p>
              <p className="text-sm font-semibold">{course.instructor}</p>
            </div>
          </div>
        </div>

        {/* Buy card */}
        <div>
          <Card className="sticky top-20 overflow-hidden">
            <div className="aspect-video" style={{ background: course.cover }} />
            <CardContent className="p-5 space-y-4">
              {course.enrolled ? (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm"><span>Seu progresso</span><b>{pct}%</b></div>
                    <Progress value={pct} className="h-2" />
                  </div>
                  <Button asChild className="w-full" size="lg">
                    <Link to="/lessons/$id" params={{ id: "l6" }}>
                      <PlayCircle className="h-4 w-4 mr-1.5" /> Continuar curso
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    {course.promoPrice ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">R$ {course.promoPrice}</span>
                        <span className="text-sm text-muted-foreground line-through">R$ {course.price}</span>
                        <Badge className="bg-accent text-accent-foreground">
                          -{Math.round(((course.price - course.promoPrice) / course.price) * 100)}%
                        </Badge>
                      </div>
                    ) : (
                      <span className="text-3xl font-bold">R$ {course.price}</span>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">Ou 12x de R$ {(((course.promoPrice ?? course.price) / 12).toFixed(2))} sem juros</p>
                  </div>
                  <Button className="w-full" size="lg" asChild><Link to="/checkout">Comprar agora</Link></Button>
                  <Button variant="outline" className="w-full" asChild><Link to="/cart"><ShoppingCart className="h-4 w-4 mr-1.5" /> Adicionar ao carrinho</Link></Button>
                </>
              )}
              <div className="flex justify-center gap-2">
                <Button variant="ghost" size="sm"><Heart className="h-4 w-4 mr-1.5" /> Favoritar</Button>
                <Button variant="ghost" size="sm"><Share2 className="h-4 w-4 mr-1.5" /> Compartilhar</Button>
              </div>
              <div className="pt-2 border-t space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> {course.hours}h de conteúdo</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> {course.lessons} aulas</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Certificado de conclusão</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Acesso vitalício</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão geral</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <Card><CardContent className="p-6 space-y-3">
            <h3 className="font-bold">Objetivos</h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm">
              {course.objectives.map((o) => (
                <li key={o} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success shrink-0" /> {o}</li>
              ))}
            </ul>
          </CardContent></Card>
          <div className="grid md:grid-cols-2 gap-6">
            <Card><CardContent className="p-6 space-y-2">
              <h3 className="font-bold">Requisitos</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {course.requirements.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </CardContent></Card>
            <Card><CardContent className="p-6 space-y-2">
              <h3 className="font-bold">Público-alvo</h3>
              <p className="text-sm text-muted-foreground">{course.audience}</p>
            </CardContent></Card>
          </div>
        </TabsContent>
        <TabsContent value="content">
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y">
                {lessons.map((l, i) => {
                  const Icon = typeIcon[l.type];
                  return (
                    <li key={l.id} className="flex items-center gap-3 p-4 hover:bg-muted/40">
                      <span className="text-sm font-mono text-muted-foreground w-6">{String(i+1).padStart(2, "0")}</span>
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-sm flex-1">{l.title}</span>
                      <span className="text-xs text-muted-foreground">{l.duration}</span>
                      {l.completed && <CheckCircle2 className="h-4 w-4 text-success" />}
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card><CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold">{course.rating}</div>
              <div>
                <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}</div>
                <p className="text-sm text-muted-foreground">Baseado em 1.240 avaliações</p>
              </div>
            </div>
            <div className="space-y-3">
              {[1,2,3].map((i) => (
                <div key={i} className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-muted text-xs font-semibold">A{i}</div>
                    <span className="text-sm font-medium">Aluno {i}</span>
                    <div className="ml-auto flex">{[1,2,3,4,5].map(k => <Star key={k} className="h-3 w-3 fill-accent text-accent" />)}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">Excelente curso, muito bem estruturado e com exemplos práticos que fizeram toda a diferença.</p>
                </div>
              ))}
            </div>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
