import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera } from "lucide-react";

export const Route = createFileRoute("/_shell/profile")({ component: Profile });

function Profile() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Perfil</h1>
        <p className="text-sm text-muted-foreground">Gerencie suas informações pessoais e preferências.</p>
      </div>

      <Card><CardContent className="p-6 flex items-center gap-5">
        <div className="relative">
          <Avatar className="h-20 w-20"><AvatarFallback className="bg-brand text-brand-foreground text-xl">LS</AvatarFallback></Avatar>
          <button className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground shadow-elevated" aria-label="Alterar foto">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div>
          <p className="font-bold text-lg">Lucas Silva</p>
          <p className="text-sm text-muted-foreground">lucas@email.com · Aluno desde março 2025</p>
        </div>
      </CardContent></Card>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="preferences">Preferências</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6">
          <Card><CardContent className="p-6 grid md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Nome completo</Label><Input defaultValue="Lucas Silva" /></div>
            <div className="space-y-2"><Label>E-mail</Label><Input type="email" defaultValue="lucas@email.com" /></div>
            <div className="space-y-2"><Label>Telefone</Label><Input defaultValue="(11) 99999-0000" /></div>
            <div className="space-y-2"><Label>Data de nascimento</Label><Input type="date" defaultValue="1995-06-14" /></div>
            <div className="space-y-2 md:col-span-2"><Label>Endereço</Label><Input defaultValue="Rua das Palmeiras, 123 - São Paulo/SP" /></div>
            <div className="md:col-span-2 flex justify-end"><Button>Salvar alterações</Button></div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card><CardContent className="p-6 space-y-4 max-w-md">
            <div className="space-y-2"><Label>Senha atual</Label><Input type="password" /></div>
            <div className="space-y-2"><Label>Nova senha</Label><Input type="password" /></div>
            <div className="space-y-2"><Label>Confirmar nova senha</Label><Input type="password" /></div>
            <Button>Atualizar senha</Button>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <Card><CardContent className="p-6 space-y-4">
            {[
              { l: "Notificações por e-mail", d: "Receba resumo semanal e novidades." },
              { l: "Notificações push", d: "Alertas em tempo real no navegador." },
              { l: "Sons de notificação", d: "Reproduzir som ao receber notificações." },
              { l: "Modo escuro automático", d: "Alternar tema conforme horário do sistema." },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium text-sm">{p.l}</p>
                  <p className="text-xs text-muted-foreground">{p.d}</p>
                </div>
                <Switch defaultChecked={i < 2} />
              </div>
            ))}
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
