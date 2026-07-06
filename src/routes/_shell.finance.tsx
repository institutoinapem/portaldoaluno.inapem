import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { purchases } from "@/lib/mock-data";
import { Wallet, Receipt, TrendingUp, Ticket, Download, CreditCard } from "lucide-react";

export const Route = createFileRoute("/_shell/finance")({ component: Finance });

function Finance() {
  const total = purchases.reduce((s, p) => s + p.value, 0);
  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Financeiro</h1>
        <p className="text-sm text-muted-foreground">Sua área financeira completa.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Wallet, label: "Total investido", value: `R$ ${total.toFixed(2)}` },
          { icon: TrendingUp, label: "Cursos adquiridos", value: purchases.length },
          { icon: Ticket, label: "Cupons disponíveis", value: 2 },
          { icon: CreditCard, label: "Créditos", value: "R$ 45,00" },
        ].map(s => (
          <Card key={s.label}><CardContent className="p-5">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary mb-3"><s.icon className="h-5 w-5" /></div>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xl font-bold">{s.value}</p>
          </CardContent></Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-5 border-b flex items-center justify-between">
            <p className="font-bold">Histórico de compras</p>
            <Link to="/subscriptions" className="text-sm text-primary hover:underline">Ver assinaturas</Link>
          </div>
          <div className="divide-y">
            {purchases.map(p => (
              <div key={p.id} className="p-4 flex items-center gap-4 flex-wrap">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-muted text-primary shrink-0"><Receipt className="h-4 w-4" /></div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{p.course}</p>
                  <p className="text-xs text-muted-foreground">{p.date} · {p.method} · {p.invoice}</p>
                </div>
                <span className="font-semibold text-sm">R$ {p.value.toFixed(2)}</span>
                <Badge variant={p.status === "Aprovado" ? "default" : "secondary"} className={p.status === "Aprovado" ? "bg-success text-success-foreground" : ""}>
                  {p.status}
                </Badge>
                <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
