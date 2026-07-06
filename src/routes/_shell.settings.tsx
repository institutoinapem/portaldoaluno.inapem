import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Laptop, Smartphone, Tablet, LogOut, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_shell/settings")({ component: Settings });

function Settings() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-sm text-muted-foreground">Preferências, segurança e privacidade.</p>
      </div>

      <Card><CardContent className="p-6 space-y-4">
        <p className="font-bold">Preferências de notificações</p>
        {[
          "Novos cursos disponíveis",
          "Novas aulas",
          "Correções e feedback",
          "Certificados liberados",
          "Mensagens no chat",
          "Eventos e webinars",
        ].map((l, i) => (
          <div key={l} className="flex items-center justify-between py-1">
            <span className="text-sm">{l}</span>
            <Switch defaultChecked={i < 4} />
          </div>
        ))}
      </CardContent></Card>

      <Card><CardContent className="p-6 space-y-4">
        <p className="font-bold">Sessões ativas</p>
        {[
          { icon: Laptop, name: "MacBook Pro · Chrome", loc: "São Paulo, BR", current: true },
          { icon: Smartphone, name: "iPhone 15 · Safari", loc: "São Paulo, BR", current: false },
          { icon: Tablet, name: "iPad · Safari", loc: "Rio de Janeiro, BR", current: false },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
            <s.icon className="h-5 w-5 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.loc}</p>
            </div>
            {s.current ? <Badge className="bg-success text-success-foreground">Atual</Badge> : <Button variant="ghost" size="sm"><LogOut className="h-4 w-4" /></Button>}
          </div>
        ))}
      </CardContent></Card>

      <Card><CardContent className="p-6 space-y-4">
        <p className="font-bold">Privacidade</p>
        <div className="flex items-center justify-between"><span className="text-sm">Perfil público</span><Switch /></div>
        <div className="flex items-center justify-between"><span className="text-sm">Mostrar progresso na comunidade</span><Switch defaultChecked /></div>
        <div className="flex items-center justify-between"><span className="text-sm">Permitir menções</span><Switch defaultChecked /></div>
      </CardContent></Card>

      <Card className="border-destructive/30"><CardContent className="p-6 space-y-3">
        <p className="font-bold text-destructive">Zona de perigo</p>
        <p className="text-sm text-muted-foreground">A exclusão da conta é permanente e não pode ser desfeita.</p>
        <Separator />
        <Button variant="destructive"><Trash2 className="h-4 w-4 mr-1.5" /> Excluir minha conta</Button>
      </CardContent></Card>
    </div>
  );
}
