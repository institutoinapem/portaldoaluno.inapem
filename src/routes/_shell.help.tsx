import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, MessageCircle, Mail, Search } from "lucide-react";

export const Route = createFileRoute("/_shell/help")({ component: Help });

const faqs = [
  { q: "Como acesso meus cursos comprados?", a: "Todos os cursos comprados ficam disponíveis em 'Meus cursos' no menu lateral. Basta clicar e continuar de onde parou." },
  { q: "Posso baixar as aulas para assistir offline?", a: "Materiais em PDF e áudios podem ser baixados. Aulas em vídeo estão disponíveis apenas para streaming, garantindo sempre a versão mais atualizada." },
  { q: "Como emito meu certificado?", a: "Ao concluir 100% do curso, o certificado é liberado automaticamente na seção Certificados." },
  { q: "Como solicito reembolso?", a: "Você tem até 7 dias após a compra para solicitar reembolso integral. Acesse Financeiro > Solicitações." },
  { q: "Meu pagamento foi recusado, o que fazer?", a: "Verifique os dados do cartão ou tente outra forma de pagamento. Em caso de dúvida, entre em contato com nosso suporte." },
];

function Help() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Central de ajuda</h1>
        <p className="text-sm text-muted-foreground">Encontre respostas ou fale com nosso time.</p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Como podemos ajudar?" className="pl-9 h-12" />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: HelpCircle, label: "FAQ", desc: "Perguntas frequentes" },
          { icon: MessageCircle, label: "Chat de suporte", desc: "Fale conosco agora" },
          { icon: Mail, label: "E-mail", desc: "suporte@lumen.edu.br" },
        ].map(a => (
          <Card key={a.label} className="hover:border-primary/40 transition cursor-pointer"><CardContent className="p-5 space-y-2">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><a.icon className="h-5 w-5" /></div>
            <p className="font-semibold">{a.label}</p>
            <p className="text-xs text-muted-foreground">{a.desc}</p>
          </CardContent></Card>
        ))}
      </div>

      <Card><CardContent className="p-5">
        <p className="font-bold mb-3">Perguntas frequentes</p>
        <Accordion type="single" collapsible>
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i${i}`}>
              <AccordionTrigger className="text-sm text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent></Card>

      <Card><CardContent className="p-5 space-y-3">
        <p className="font-bold">Abrir um chamado</p>
        <Input placeholder="Assunto" />
        <textarea className="w-full min-h-32 rounded-md border bg-background p-3 text-sm" placeholder="Descreva sua solicitação..." />
        <Button>Enviar chamado</Button>
      </CardContent></Card>
    </div>
  );
}
