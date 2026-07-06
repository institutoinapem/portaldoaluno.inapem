import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Video, Download, Search, Music, Presentation } from "lucide-react";

const materials = [
  { id: "m1", title: "Guia de tipografia moderna", type: "PDF", size: "2.4 MB", module: "Módulo 1", icon: FileText },
  { id: "m2", title: "Apresentação - Design Systems", type: "PPT", size: "8.1 MB", module: "Módulo 2", icon: Presentation },
  { id: "m3", title: "Vídeo bônus: entrevista", type: "MP4", size: "124 MB", module: "Bônus", icon: Video },
  { id: "m4", title: "Podcast - Tendências de UX", type: "MP3", size: "34 MB", module: "Bônus", icon: Music },
  { id: "m5", title: "Checklist de handoff", type: "PDF", size: "612 KB", module: "Módulo 4", icon: FileText },
  { id: "m6", title: "Templates Figma", type: "FIG", size: "3.2 MB", module: "Módulo 3", icon: FileText },
];

export const Route = createFileRoute("/_shell/materials")({ component: Materials });

function Materials() {
  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Materiais</h1>
        <p className="text-sm text-muted-foreground">Todos os materiais dos seus cursos, organizados por módulo.</p>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Pesquisar materiais..." className="pl-9" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {materials.map(m => (
          <Card key={m.id}><CardContent className="p-4 flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
              <m.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium truncate">{m.title}</p>
              <p className="text-xs text-muted-foreground">{m.module} · {m.type} · {m.size}</p>
            </div>
            <Button size="sm" variant="outline"><Download className="h-4 w-4 mr-1.5" /> Baixar</Button>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
