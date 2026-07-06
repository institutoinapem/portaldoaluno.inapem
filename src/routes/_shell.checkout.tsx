import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, QrCode, FileText, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_shell/checkout")({ component: Checkout });

function Checkout() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Checkout</h1>
        <p className="text-sm text-muted-foreground flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-success" /> Pagamento 100% seguro e criptografado</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card><CardContent className="p-6 space-y-4">
            <p className="font-bold">Dados do comprador</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Nome completo</Label><Input defaultValue="Lucas Silva" /></div>
              <div className="space-y-2"><Label>E-mail</Label><Input defaultValue="lucas@email.com" /></div>
              <div className="space-y-2"><Label>CPF</Label><Input placeholder="000.000.000-00" /></div>
              <div className="space-y-2"><Label>Telefone</Label><Input defaultValue="(11) 99999-0000" /></div>
            </div>
          </CardContent></Card>

          <Card><CardContent className="p-6 space-y-4">
            <p className="font-bold">Forma de pagamento</p>
            <RadioGroup defaultValue="card" className="space-y-2">
              {[
                { id: "card", label: "Cartão de crédito", icon: CreditCard, hint: "Até 12x sem juros" },
                { id: "pix", label: "PIX", icon: QrCode, hint: "5% de desconto adicional" },
                { id: "boleto", label: "Boleto bancário", icon: FileText, hint: "Compensação em até 2 dias úteis" },
              ].map(o => (
                <label key={o.id} htmlFor={o.id} className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/40 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value={o.id} id={o.id} />
                  <o.icon className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{o.label}</p>
                    <p className="text-xs text-muted-foreground">{o.hint}</p>
                  </div>
                </label>
              ))}
            </RadioGroup>
            <div className="grid md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2 md:col-span-2"><Label>Número do cartão</Label><Input placeholder="0000 0000 0000 0000" /></div>
              <div className="space-y-2"><Label>Validade</Label><Input placeholder="MM/AA" /></div>
              <div className="space-y-2"><Label>CVV</Label><Input placeholder="000" /></div>
              <div className="space-y-2 md:col-span-2"><Label>Nome no cartão</Label><Input /></div>
            </div>
          </CardContent></Card>

          <div className="flex items-start gap-2">
            <Checkbox id="terms" defaultChecked />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              Li e aceito os <a className="text-primary hover:underline" href="#">termos de uso</a> e a <a className="text-primary hover:underline" href="#">política de privacidade</a>.
            </label>
          </div>
        </div>

        <Card className="h-fit sticky top-20"><CardContent className="p-5 space-y-4">
          <p className="font-bold">Resumo</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="truncate">UX/UI Design</span><span>R$ 197,00</span></div>
            <div className="flex justify-between"><span className="truncate">React & TypeScript</span><span>R$ 247,00</span></div>
          </div>
          <Separator />
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>R$ 444,00</span></div>
            <div className="flex justify-between text-success"><span>Desconto</span><span>- R$ 44,40</span></div>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold"><span>Total</span><span>R$ 399,60</span></div>
          <Button size="lg" className="w-full">Confirmar compra</Button>
          <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1"><ShieldCheck className="h-3 w-3" /> Transação protegida por 3D Secure</p>
        </CardContent></Card>
      </div>
    </div>
  );
}
