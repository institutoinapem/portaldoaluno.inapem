import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HScroll } from "@/components/portal/HScroll";
import { CourseCard } from "@/components/portal/CourseCard";
import { courses } from "@/lib/mock-data";
import { Award, BookOpen, Users, ShieldCheck, LogIn, UserPlus, PlayCircle } from "lucide-react";

// Imports da Autenticação do Firebase
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

export const Route = createFileRoute("/_shell/")({
  component: Home,
});

function Home() {
  const featured = courses;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Escuta se o usuário está logado no Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const stats = [
    { label: "Cursos no catálogo", value: "5+", icon: BookOpen },
    { label: "Alunos formados", value: "8.500", icon: Users },
    { label: "Certificados emitidos", value: "8.500", icon: Award },
    { label: "Experiência", value: "20 anos", icon: ShieldCheck },
  ];

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-[1400px] mx-auto">
      
      {/* 1. HERO / BOAS-VINDAS CONDICIONAL */}
      {!loading && (
        <>
          {!user ? (
            /* VISÃO PARA USUÁRIO NÃO LOGADO (VISITANTE) */
            <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-brand/10 via-background to-accent/10 p-6 md:p-10">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/10 blur-3xl" aria-hidden />
              <div className="relative grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
                <div>
                  <Badge variant="secondary" className="mb-3">Portal de Cursos INAPEM</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Aprenda com uma instituição de referência.
                  </h1>
                  <p className="mt-3 max-w-xl text-sm md:text-base text-muted-foreground">
                    Explore o catálogo de cursos, escolha sua área de interesse e comece a estudar.
                    Faça login para continuar de onde parou ou crie sua conta gratuita.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button size="lg" asChild>
                      <Link to="/auth"><UserPlus className="mr-2 h-4 w-4" />Inscreva-se</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link to="/auth"><LogIn className="mr-2 h-4 w-4" />Entrar</Link>
                    </Button>
                    <Button size="lg" variant="ghost" asChild>
                      <Link to="/courses"><PlayCircle className="mr-2 h-4 w-4" />Explorar cursos</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            /* VISÃO PARA USUÁRIO LOGADO (ALUNO) */
            <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-brand/10 via-background to-accent/10 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <Badge variant="secondary" className="mb-2">Portal do Aluno</Badge>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Boas-vindas de volta, {user.displayName || "Aluno"}! 👋
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Escolha um curso abaixo e continue seus estudos de onde parou.
                  </p>
                </div>
                <div>
                  <Button size="lg" asChild>
                    <Link to="/courses"><PlayCircle className="mr-2 h-4 w-4" />Ver Meus Cursos</Link>
                  </Button>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="mt-1 text-2xl font-bold">{s.value}</p>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cursos disponíveis (horizontal) */}
      <HScroll title="Cursos disponíveis" subtitle="Comece agora mesmo" seeAllTo="/courses">
        {featured.map((c) => (
          <div key={c.id} className="snap-start">
            <CourseCard course={c} />
          </div>
        ))}
      </HScroll>

      {/* CTA final (Exibido APENAS para visitantes não logados) */}
      {!user && (
        <Card>
          <CardContent className="p-6 flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-brand to-accent text-white shadow-elevated">
                <Award className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-bold">Pronto para começar?</h3>
                <p className="text-sm text-muted-foreground">Crie sua conta gratuita e tenha acesso à plataforma completa.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline"><Link to="/auth"><LogIn className="mr-2 h-4 w-4" />Entrar</Link></Button>
              <Button asChild><Link to="/auth"><UserPlus className="mr-2 h-4 w-4" />Inscreva-se</Link></Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}