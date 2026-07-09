import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Mail, Lock, User, ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
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

    // --- VALIDAÇÕES CLIENT-SIDE STRICT (SNIPER) ---
    if (!email || !password) {
      setErrorMsg("Todos os campos obrigatórios precisam ser preenchidos.");
      setLoading(false);
      return;
    }

    if (tab === "signup") {
      if (!name || name.trim().length < 3) {
        setErrorMsg("O nome precisa ter pelo menos 3 caracteres.");
        setLoading(false);
        return;
      }
      
      // Valida se o usuário digitou pelo menos Nome e Sobrenome
      const nameParts = name.trim().split(/\s+/);
      if (nameParts.length < 2) {
        setErrorMsg("Por favor, insira seu nome completo (Nome e sobrenome).");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setErrorMsg("A senha precisa ter no mínimo 6 caracteres.");
        setLoading(false);
        return;
      }
    }

    try {
      if (tab === "signup") {
        // 1. Cria o usuário no Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Salva o nome dele no perfil de autenticação
        await updateProfile(user, { displayName: name });

        // 3. Cria o documento seguro no banco de dados Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: name,
          email: email,
          createdAt: new Date().toISOString(),
          role: "student" 
        });

        setSuccessMsg("Conta criada com sucesso! Redirecionando para o acesso...");
        
        // Transição animada de aba pós-cadastro bem-sucedido
        setTimeout(() => {
          setTab("signin");
          setSuccessMsg(null);
        }, 2500);

      } else {
        // Fluxo de Login no Firebase Authentication
        await signInWithEmailAndPassword(auth, email, password);
        navigate({ to: "/" });
      }
    } catch (err: any) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setErrorMsg("Este endereço de e-mail já está cadastrado no sistema.");
          break;
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          setErrorMsg("Credenciais inválidas. Verifique seu e-mail e senha.");
          break;
        case "auth/weak-password":
          setErrorMsg("Senha considerada fraca pelo servidor. Use uma combinação mais complexa.");
          break;
        case "auth/invalid-email":
          setErrorMsg("O formato do e-mail inserido é inválido.");
          break;
        case "auth/user-disabled":
          setErrorMsg("Esta conta foi desativada pelos administradores.");
          break;
        default:
          setErrorMsg("Erro de comunicação com o servidor. Tente novamente em instantes.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background transition-colors duration-500">
      {/* Painel Esquerdo */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-brand/15 via-background to-accent/15 p-10">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand/15 blur-3xl" aria-hidden />
        <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" aria-hidden />

        <Link to="/" className="relative flex items-center gap-3 group">
          <img src={logoInapem} alt="INAPEM" className="h-11 w-11 rounded-lg object-contain bg-white ring-1 ring-border shadow-soft transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-brand">INAPEM</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Portal de Cursos</span>
          </div>
        </Link>

        <div className="relative max-w-md animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="inline-grid h-12 w-12 place-items-center rounded-xl bg-brand text-brand-foreground shadow-elevated animate-pulse">
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
      <div className="flex flex-col p-6 md:p-10 justify-between">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Voltar ao site
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <Card className="w-full max-w-md border shadow-elevated transition-all duration-300 hover:shadow-xl">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6 transition-all">
                <h1 className="text-2xl font-bold tracking-tight transform duration-300">
                  {tab === "signin" ? "Acesse sua conta" : "Crie seu cadastro"}
                </h1>
              </div>

              <Tabs value={tab} onValueChange={(v) => {
                setTab(v as "signin" | "signup");
                setErrorMsg(null);
                setSuccessMsg(null);
              }} className="w-full">
                <TabsList className="grid w-full grid-cols-2 backdrop-blur-sm">
                  <TabsTrigger value="signin" className="data-[state=active]:translate-y-[-1px] transition-transform">Entrar</TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:translate-y-[-1px] transition-transform">Inscreva-se</TabsTrigger>
                </TabsList>

                {/* Bloco de Mensagem de Erro Animado */}
                {errorMsg && (
                  <div className="mt-4 p-3 flex items-start gap-2.5 text-sm text-red-600 bg-red-50/80 border border-red-200 rounded-md shadow-sm animate-in fade-in slide-in-from-top-2 duration-300 raw-shake">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 animate-bounce" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Bloco de Mensagem de Sucesso Animado */}
                {successMsg && (
                  <div className="mt-4 p-3 flex items-start gap-2.5 text-sm text-green-600 bg-green-50/80 border border-green-200 rounded-md shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-green-500 animate-pulse" />
                    <span>{successMsg}</span>
                  </div>
                )}

                <TabsContent value="signin" className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-1.5">
                      <Label htmlFor="signin-email">E-mail</Label>
                      <div className="relative group">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand transition-colors" />
                        <Input id="signin-email" name="email" type="email" placeholder="voce@email.com" className="pl-9 transition-all focus:ring-2 focus:ring-brand/20" required disabled={loading} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="signin-password">Senha</Label>
                      </div>
                      <div className="relative group">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand transition-colors" />
                        <Input id="signin-password" name="password" type="password" placeholder="••••••••" className="pl-9 transition-all focus:ring-2 focus:ring-brand/20" required disabled={loading} />
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full active:scale-[0.98] transition-transform" disabled={loading}>
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Entrar de forma segura"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-name">Nome completo</Label>
                      <div className="relative group">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand transition-colors" />
                        <Input id="signup-name" name="name" type="text" placeholder="Ex: Maria Silva" className="pl-9 transition-all focus:ring-2 focus:ring-brand/20" required disabled={loading} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-email">E-mail</Label>
                      <div className="relative group">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand transition-colors" />
                        <Input id="signup-email" name="email" type="email" placeholder="voce@email.com" className="pl-9 transition-all focus:ring-2 focus:ring-brand/20" required disabled={loading} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-password">Senha</Label>
                      <div className="relative group">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand transition-colors" />
                        <Input id="signup-password" name="password" type="password" placeholder="Mínimo 6 caracteres" className="pl-9 transition-all focus:ring-2 focus:ring-brand/20" minLength={6} required disabled={loading} />
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-brand hover:bg-brand/90 text-brand-foreground active:scale-[0.98] transition-transform" disabled={loading}>
                       {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Validar e criar conta"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div className="text-center text-xs text-muted-foreground lg:hidden">
          © {new Date().getFullYear()} INAPEM
        </div>
      </div>
    </div>
  );
}