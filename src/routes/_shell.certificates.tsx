import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { certificates } from "@/lib/mock-data";
import { Award, Download, Share2, QrCode } from "lucide-react";

export const Route = createFileRoute("/_shell/certificates")({ component: Certificates });

function Certificates() {
  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Certificados</h1>
        <p className="text-sm text-muted-foreground">Baixe, compartilhe e valide seus certificados de conclusão.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {certificates.map(c => (
          <Card key={c.id} className="overflow-hidden">
            <div className="relative p-6 bg-gradient-to-br from-brand to-accent text-white">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-white/20"><Award className="h-6 w-6" /></div>
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-80">Certificado</p>
                  <p className="text-lg font-bold leading-tight">{c.course}</p>
                </div>
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-xs opacity-80">Concluído em</p>
                  <p className="font-semibold">{c.issued}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-80">Carga horária</p>
                  <p className="font-semibold">{c.hours}h</p>
                </div>
              </div>
            </div>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Instrutor</p>
                  <p className="font-medium">{c.instructor}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-xs">Código</p>
                  <p className="font-mono text-xs">{c.code}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1"><Download className="h-4 w-4 mr-1.5" /> Baixar PDF</Button>
                <Button variant="outline"><Share2 className="h-4 w-4" /></Button>
                <Button variant="outline"><QrCode className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
