import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Mail, Shield, Calendar, Loader2, ArrowLeft, LogOut, BookOpen } from "lucide-react";

// Imports do Firebase
import { auth, db, doc } from "@/lib/firebase";
import { onAuthStateChanged, signOut, type User as FirebaseUser } from "firebase/auth";
import { getDoc } from "firebase/firestore";

export const Route = createFileRoute("/minha-conta")({
  head: () => ({
    meta: [
      { title: "Minha Conta — INAPEM" },
      { name: "description", content: "Gerencie seu perfil e suas informações cadastrais no portal INAPEM." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [dbData, setDbData] = useState<{ role?: string; createdAt?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        // Proteção de Rota: se não houver usuário, chuta de volta pro login
        navigate({ to: "/auth" });
        return;
      }
      
      setUser(currentUser);

      try {
        // Busca os metadados salvos na tabela de usuários do Firestore
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setDbData(docSnap.data());
        }
      } catch (error) {
        console.error("Erro ao resgatar dados complementares do Firestore:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate({ to: "/auth" });
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] w-full flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 text-brand animate-spin" />
        <p className="text-sm text-muted-foreground animate-pulse">Sincronizando chaves de acesso...</p>
      </div>
    );
  }

  // Tratamento de segurança nulo
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header da página */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-2">
            <ArrowLeft className="h-3 w-3" /> Voltar para o início
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Painel de Perfil</h1>
          <p className="text-sm text-muted-foreground">Gerencie suas informações e credenciais de acesso acadêmico.</p>
        </div>

        <Button variant="outline" size="sm" onClick={handleLogout} className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 gap-2 border-red-200/60">
          <LogOut className="h-4 w-4" /> Sair do Portal
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Card Lateral de Resumo */}
        <Card className="md:col-span-1 shadow-soft h-fit">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-brand/10 border-2 border-brand/20 text-brand flex items-center justify-center text-2xl font-bold mb-4 shadow-sm">
              {user.displayName ? user.displayName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "U"}
            </div>
            <h3 className="font-bold text-lg leading-tight truncate max-w-full">{user.displayName || "Usuário"}</h3>
            <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand/10 text-brand capitalize">
              <Shield className="h-3 w-3" />
              {dbData?.role === "student" ? "Estudante" : dbData?.role || "Membro"}
            </span>
          </CardContent>
        </Card>

        {/* Informações Cadastrais */}
        <Card className="md:col-span-2 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Informações da Conta</CardTitle>
            <CardDescription>Dados registrados e validados de segurança na base de dados.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 p-3 rounded-lg bg-muted/40 border border-border/40">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                  <User className="h-3.5 w-3.5 text-brand" /> Nome Cadastrado
                </div>
                <p className="text-sm font-semibold mt-1">{user.displayName || "Não informado"}</p>
              </div>

              <div className="space-y-1.5 p-3 rounded-lg bg-muted/40 border border-border/40">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                  <Mail className="h-3.5 w-3.5 text-brand" /> Endereço de E-mail
                </div>
                <p className="text-sm font-semibold mt-1 truncate">{user.email}</p>
              </div>

              <div className="space-y-1.5 p-3 rounded-lg bg-muted/40 border border-border/40">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                  <Calendar className="h-3.5 w-3.5 text-brand" /> Registro na Plataforma
                </div>
                <p className="text-sm font-semibold mt-1">
                  {dbData?.createdAt 
                    ? new Date(dbData.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
                    : "Recentemente"
                  }
                </p>
              </div>

              <div className="space-y-1.5 p-3 rounded-lg bg-muted/40 border border-border/40">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                  <BookOpen className="h-3.5 w-3.5 text-brand" /> Status de Matrícula
                </div>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">Ativo / Regular</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}