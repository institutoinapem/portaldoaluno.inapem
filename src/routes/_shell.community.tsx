import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Heart, Share2, Search } from "lucide-react";

export const Route = createFileRoute("/_shell/community")({ component: Community });

const posts = [
  { id: 1, author: "Ana Beatriz", avatar: "AB", time: "há 2h", tag: "UX/UI Design",
    content: "Alguém pode me indicar bons livros sobre design de sistemas? Estou começando agora e adoraria referências.",
    likes: 24, comments: 8 },
  { id: 2, author: "Carlos Mendes", avatar: "CM", time: "há 5h", tag: "React",
    content: "Consegui migrar meu projeto para React 19! Melhorou muito a performance com Server Components.",
    likes: 52, comments: 14 },
  { id: 3, author: "Fernanda Rocha", avatar: "FR", time: "ontem", tag: "Marketing",
    content: "Compartilhando meu case de crescimento orgânico com SEO. Consegui 3x mais tráfego em 6 meses!",
    likes: 89, comments: 22 },
];

function Community() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Comunidade</h1>
        <p className="text-sm text-muted-foreground">Faça perguntas, compartilhe descobertas e conecte-se com outros alunos.</p>
      </div>

      <Card><CardContent className="p-4 space-y-3">
        <Textarea placeholder="Compartilhe uma dúvida, ideia ou conquista..." rows={3} />
        <div className="flex justify-between items-center">
          <Input placeholder="#tópico" className="w-40 h-9" />
          <Button size="sm">Publicar</Button>
        </div>
      </CardContent></Card>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Pesquisar no fórum..." className="pl-9" />
      </div>

      <div className="space-y-4">
        {posts.map(p => (
          <Card key={p.id}><CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10"><AvatarFallback className="bg-brand text-brand-foreground text-xs">{p.avatar}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{p.author}</p>
                <p className="text-xs text-muted-foreground">{p.time}</p>
              </div>
              <Badge variant="secondary">{p.tag}</Badge>
            </div>
            <p className="text-sm">{p.content}</p>
            <div className="flex items-center gap-4 pt-2 border-t text-sm text-muted-foreground">
              <button className="flex items-center gap-1.5 hover:text-accent transition"><Heart className="h-4 w-4" /> {p.likes}</button>
              <button className="flex items-center gap-1.5 hover:text-primary transition"><MessageCircle className="h-4 w-4" /> {p.comments}</button>
              <button className="flex items-center gap-1.5 hover:text-primary transition ml-auto"><Share2 className="h-4 w-4" /></button>
            </div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
