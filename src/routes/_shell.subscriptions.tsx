import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_shell/subscriptions")({ component: Subscriptions });

const plans = [
  { name: "Básico", price: 39, features: ["Acesso a 50+ cursos", "Certificados básicos", "Suporte por e-mail"], current: false },
  { name: "Premium", price: 79, features: ["Acesso ilimitado a todos os cursos", "Certificados oficiais", "Aulas ao vivo", "Suporte prioritário"], current: true, popular: true },
  { name: "Business", price: 149, features: ["Tudo do Premium", "Gestão de equipe", "Relatórios avançados", "Gerente de sucesso dedicado"], current: false },
];

function Subscriptions() {
  return (
    <div className="p-4 md:p-8 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Assinaturas</h1>
        <p className="text-sm text-muted-foreground">Escolha o plano ideal para o seu momento.</p>
      </div>

      <Card><CardContent className="p-6 flex flex-col md:flex-row md:items-center gap-4 justify-between bg-gradient-to-br from-brand/10 to-accent/10">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Plano atual</p>
          <p className="text-2xl font-bold">Premium</p>
          <p className="text-sm text-muted-foreground">Próxima cobrança em 15/12/2026 · R$ 79,00/mês</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Alterar plano</Button>
          <Button variant="ghost" className="text-destructive">Cancelar</Button>
        </div>
      </CardContent></Card>

      <div className="grid gap-5 md:grid-cols-3">
        {plans.map(p => (
          <Card key={p.name} className={p.popular ? "border-primary shadow-elevated relative" : ""}>
            {p.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                <Sparkles className="h-3 w-3 mr-1" /> Mais popular
              </Badge>
            )}
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-lg font-bold">{p.name}</p>
                <p className="text-3xl font-bold mt-2">R$ {p.price}<span className="text-sm font-normal text-muted-foreground">/mês</span></p>
              </div>
              <ul className="space-y-2 text-sm">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2"><Check className="h-4 w-4 text-success mt-0.5 shrink-0" /> {f}</li>
                ))}
              </ul>
              <Button className="w-full" variant={p.current ? "outline" : "default"} disabled={p.current}>
                {p.current ? "Plano atual" : "Assinar"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
