import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { activities } from "@/lib/mock-data";
import { History as HistoryIcon, Download, Award, PlayCircle } from "lucide-react";

export const Route = createFileRoute("/_shell/history")({ component: History });

function History() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Histórico</h1>
        <p className="text-sm text-muted-foreground">Todas as suas atividades registradas.</p>
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Tudo</TabsTrigger>
          <TabsTrigger value="lessons">Aulas</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
          <TabsTrigger value="certs">Certificados</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6 space-y-3">
          {activities.concat(activities).map((a, i) => (
            <Card key={i}><CardContent className="p-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-muted text-primary">
                <HistoryIcon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.course} · {a.time}</p>
              </div>
            </CardContent></Card>
          ))}
        </TabsContent>
        <TabsContent value="lessons" className="mt-6"><EmptyIcon icon={PlayCircle} text="Suas aulas assistidas aparecerão aqui." /></TabsContent>
        <TabsContent value="downloads" className="mt-6"><EmptyIcon icon={Download} text="Seus downloads recentes aparecerão aqui." /></TabsContent>
        <TabsContent value="certs" className="mt-6"><EmptyIcon icon={Award} text="Certificados emitidos aparecerão aqui." /></TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyIcon({ icon: Icon, text }: { icon: typeof PlayCircle; text: string }) {
  return (
    <Card><CardContent className="p-12 text-center text-muted-foreground">
      <Icon className="h-10 w-10 mx-auto mb-3 opacity-40" />
      <p className="text-sm">{text}</p>
    </CardContent></Card>
  );
}
