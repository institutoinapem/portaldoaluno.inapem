import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { courses } from "@/lib/mock-data";
import { Trash2, Tag } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_shell/cart")({ component: Cart });

function Cart() {
  const items = courses.slice(3, 5);
  const [coupon, setCoupon] = useState("");
  const subtotal = items.reduce((s, c) => s + (c.promoPrice ?? c.price), 0);
  const discount = coupon === "LUMEN10" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <div className="p-4 md:p-8 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Carrinho</h1>
        <p className="text-sm text-muted-foreground">{items.length} cursos no carrinho</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {items.map(c => (
            <Card key={c.id}><CardContent className="p-4 flex items-center gap-4">
              <div className="h-20 w-32 rounded-md shrink-0" style={{ background: c.cover }} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{c.title}</p>
                <p className="text-xs text-muted-foreground">{c.instructor} · {c.hours}h · {c.lessons} aulas</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-bold">R$ {c.promoPrice ?? c.price}</span>
                  {c.promoPrice && <span className="text-xs text-muted-foreground line-through">R$ {c.price}</span>}
                </div>
              </div>
              <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
            </CardContent></Card>
          ))}
        </div>

        <Card className="h-fit sticky top-20"><CardContent className="p-5 space-y-4">
          <p className="font-bold">Resumo do pedido</p>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())} placeholder="Cupom (ex: LUMEN10)" className="pl-9" />
            </div>
            <Button variant="outline" size="sm">Aplicar</Button>
          </div>
          <Separator />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
            {discount > 0 && <div className="flex justify-between text-success"><span>Desconto (10%)</span><span>- R$ {discount.toFixed(2)}</span></div>}
            <div className="flex justify-between text-muted-foreground text-xs"><span>Impostos</span><span>Inclusos</span></div>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold"><span>Total</span><span>R$ {total.toFixed(2)}</span></div>
          <p className="text-xs text-muted-foreground">Ou 12x de R$ {(total / 12).toFixed(2)} sem juros</p>
          <Button asChild className="w-full" size="lg"><Link to="/checkout">Ir para o checkout</Link></Button>
        </CardContent></Card>
      </div>
    </div>
  );
}
