import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Mail, Lock, User, ArrowLeft, Loader2 } from "lucide-react";
import logoInapem from "@/assets/logo-inapem.jpg";

// Imports do Firebase
import { auth, db, doc, setDoc } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";

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
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    try {
      if (tab === "signup") {
        // 1. Cria o usuário no Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Salva o nome dele no perfil de autenticação
        await updateProfile(user, { displayName: name });

        // 3. Cria um documento seguro na coleção "users" do Firestore usando o UID dele
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: name,
          email: email,
          createdAt: new Date().toISOString(),
          role: "student" // Define que ele é um estudante por padrão
        });

        setSuccessMsg("Conta criada com sucesso! Você já pode fazer login.");
        setTab("signin");
      } else {
        // Fluxo de Login no Firebase Authentication
        await signInWithEmailAndPassword(auth, email, password);
        
        // Login efetuado com sucesso, redireciona para a home
        navigate({ to: "/" });
      }
    } catch (err: any) {
      // Tradução amigável e segura de erros comuns do Firebase
      switch (err.code) {
        case "auth/email-already-in-use":
          setErrorMsg("Este e-mail já está em uso.");
          break;
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          setErrorMsg("E-mail ou senha incorretos.");
          break;
        case "auth/weak-password":
          setErrorMsg("A senha deve conter pelo menos 6 caracteres.");
          break;
        default:
          setErrorMsg("Ocorreu um erro ao processar. Verifique os dados e tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Painel Esquerdo */}
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
        </div>

        <p className="relative text-xs text-muted-foreground">© {new Date().getFullYear()} INAPEM — Todos os direitos reservados.</p>
      </div>

      {/* Painel Direito */}
      <div className="flex flex-col p-6 md:p-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar ao site
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <Card className="w-full max-w-md border shadow-elevated">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">
                  {tab === "signin" ? "Acesse sua conta" : "Crie seu cadastro"}
                </h1>
              </div>

              <Tabs value={tab} onValueChange={(v) => {
                setTab(v as "signin" | "signup");
                setErrorMsg(null);
                setSuccessMsg(null);
              }}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Entrar</TabsTrigger>
                  <TabsTrigger value="signup">Inscreva-se</TabsTrigger>
                </TabsList>

                {errorMsg && (
                  <div className="mt-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {errorMsg}
                  </div>
                )}
                {successMsg && (
                  <div className="mt-4 p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                    {successMsg}
                  </div>
                )}

                <TabsContent value="signin" className="mt-6">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                      <Label htmlFor="signin-email">E-mail</Label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="signin-email" name="email" type="email" placeholder="voce@email.com" className="pl-9" required disabled={loading} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="signin-password">Senha</Label>
                      </div>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="signin-password" name="password" type="password" placeholder="••••••••" className="pl-9" required disabled={loading} />
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Entrar"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="mt-6">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-name">Nome completo</Label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="signup-name" name="name" type="text" placeholder="Seu nome" className="pl-9" required disabled={loading} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-email">E-mail</Label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="signup-email" name="email" type="email" placeholder="voce@email.com" className="pl-9" required disabled={loading} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-password">Senha</Label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="signup-password" name="password" type="password" placeholder="Mínimo 6 caracteres" className="pl-9" minLength={6} required disabled={loading} />
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                       {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Criar conta"}
                    </Button>
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