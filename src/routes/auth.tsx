import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Mail, Lock, User, ArrowLeft } from "lucide-react";
import logoInapem from "@/assets/logo-inapem.jpg";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar ou cadastrar-se — INAPEM" },
      { name: "description", content: "Acesse sua conta INAPEM ou crie um cadastro gratuito para começar seus estudos." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left / Brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-brand/15 via-background to-accent/15 p-10">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand/15 blur-3xl" aria-hidden />
        <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" aria-hidden />

        <Link to="/" className="relative flex items-center gap-3">
          <img src={logoInapem} alt="INAPEM" className="h-11 w-11 rounded-lg object-contain bg-white ring-1 ring-border shadow-soft" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-brand">INAPEM</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Portal de Cursos</span>
          </div>
        </Link>

        <div className="relative max-w-md">
          <div className="inline-grid h-12 w-12 place-items-center rounded-xl bg-brand text-brand-foreground shadow-elevated">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight">Aprenda com uma instituição de referência.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Formações em Neuropsicopedagogia, TDAH, Autismo (ABA) e Educação Inclusiva.
            Entre na sua conta ou crie um cadastro gratuito para começar.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> Certificados reconhecidos</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> Aulas 100% online e no seu ritmo</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> Suporte pedagógico dedicado</li>
          </ul>
        </div>

        <p className="relative text-xs text-muted-foreground">© {new Date().getFullYear()} INAPEM — Todos os direitos reservados.</p>
      </div>

      {/* Right / Form panel */}
      <div className="flex flex-col p-6 md:p-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar ao site
          </Link>
          <Link to="/" className="lg:hidden flex items-center gap-2">
            <img src={logoInapem} alt="INAPEM" className="h-8 w-8 rounded-md object-contain bg-white ring-1 ring-border" />
            <span className="text-sm font-bold text-brand">INAPEM</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <Card className="w-full max-w-md border shadow-elevated">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">
                  {tab === "signin" ? "Acesse sua conta" : "Crie seu cadastro"}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tab === "signin"
                    ? "Entre para continuar seus estudos no portal INAPEM."
                    : "É rápido e gratuito. Comece agora mesmo."}
                </p>
              </div>

              <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Entrar</TabsTrigger>
                  <TabsTrigger value="signup">Inscreva-se</TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="mt-6">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                      <Label htmlFor="signin-email">E-mail</Label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="signin-email" type="email" placeholder="voce@email.com" className="pl-9" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="signin-password">Senha</Label>
                        <button type="button" className="text-xs text-primary hover:underline">Esqueci minha senha</button>
                      </div>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="signin-password" type="password" placeholder="••••••••" className="pl-9" required />
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full">Entrar</Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Não tem conta?{" "}
                      <button type="button" onClick={() => setTab("signup")} className="font-semibold text-primary hover:underline">
                        Inscreva-se
                      </button>
                    </p>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="mt-6">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-name">Nome completo</Label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="signup-name" type="text" placeholder="Seu nome" className="pl-9" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-email">E-mail</Label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="signup-email" type="email" placeholder="voce@email.com" className="pl-9" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-password">Senha</Label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="signup-password" type="password" placeholder="Mínimo 8 caracteres" className="pl-9" required />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Ao criar sua conta você concorda com os Termos de Uso e a Política de Privacidade.
                    </p>
                    <Button type="submit" size="lg" className="w-full">Criar conta</Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Já possui cadastro?{" "}
                      <button type="button" onClick={() => setTab("signin")} className="font-semibold text-primary hover:underline">
                        Entrar
                      </button>
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
