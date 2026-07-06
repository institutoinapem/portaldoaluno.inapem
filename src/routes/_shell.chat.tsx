import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_shell/chat")({ component: Chat });

const conversations = [
  { id: "1", name: "Marina Costa", role: "Professora", avatar: "MC", last: "Ótima pergunta! Vou responder em breve...", time: "10:24", unread: 2 },
  { id: "2", name: "Suporte", role: "Atendimento", avatar: "SU", last: "Seu chamado #4521 foi respondido.", time: "09:12", unread: 0 },
  { id: "3", name: "Rafael Lima", role: "Professor", avatar: "RL", last: "Ficou muito bom o projeto final!", time: "Ontem", unread: 0 },
  { id: "4", name: "Grupo UX/UI - Turma 08", role: "Grupo", avatar: "UX", last: "Ana: alguém tem o link do webinar?", time: "Ontem", unread: 5 },
];

const messages = [
  { me: false, text: "Oi Lucas! Recebi sua entrega do projeto. Muito bem estruturado!", time: "10:20" },
  { me: true, text: "Obrigado, professora! Tive dúvida na parte de hierarquia visual.", time: "10:22" },
  { me: false, text: "Ótima pergunta! Vou responder em breve com um exemplo prático.", time: "10:24" },
];

function Chat() {
  const [active, setActive] = useState("1");
  const conv = conversations.find(c => c.id === active)!;

  return (
    <div className="grid lg:grid-cols-[320px_1fr] h-[calc(100vh-4rem)]">
      <aside className="border-r bg-card flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Pesquisar conversas..." className="pl-9 h-9" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)}
              className={`w-full flex items-center gap-3 p-3 hover:bg-muted transition text-left ${active === c.id ? "bg-muted" : ""}`}>
              <Avatar><AvatarFallback className="bg-brand text-brand-foreground text-xs">{c.avatar}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="font-medium text-sm truncate">{c.name}</p>
                  <span className="text-[10px] text-muted-foreground">{c.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{c.last}</p>
              </div>
              {c.unread > 0 && <span className="h-5 min-w-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold grid place-items-center px-1.5">{c.unread}</span>}
            </button>
          ))}
        </div>
      </aside>

      <section className="flex flex-col bg-background">
        <div className="p-4 border-b flex items-center gap-3">
          <Avatar><AvatarFallback className="bg-brand text-brand-foreground text-xs">{conv.avatar}</AvatarFallback></Avatar>
          <div>
            <p className="font-semibold text-sm">{conv.name}</p>
            <p className="text-xs text-muted-foreground">{conv.role} · online</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
              <Card className={`max-w-md p-3 ${m.me ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                <p className="text-sm">{m.text}</p>
                <p className={`text-[10px] mt-1 ${m.me ? "opacity-80" : "text-muted-foreground"}`}>{m.time}</p>
              </Card>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex gap-2">
          <Input placeholder="Digite uma mensagem..." className="flex-1" />
          <Button><Send className="h-4 w-4" /></Button>
        </div>
      </section>
    </div>
  );
}
