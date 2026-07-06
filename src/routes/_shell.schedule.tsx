import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/mock-data";
import { CalendarClock, Video, ClipboardCheck, Radio, FileCheck } from "lucide-react";

export const Route = createFileRoute("/_shell/schedule")({ component: Schedule });

const iconFor = (t: string) =>
  t.includes("Aula") ? Video : t.includes("Prova") ? ClipboardCheck : t.includes("Webinar") ? Radio : FileCheck;

function Schedule() {
  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Agenda</h1>
        <p className="text-sm text-muted-foreground">Suas próximas aulas, eventos, provas e entregas.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card><CardContent className="p-6 space-y-3">
          {events.concat(events).map((e, i) => {
            const Icon = iconFor(e.type);
            return (
              <div key={i} className="flex items-center gap-4 rounded-xl border p-4 hover:bg-muted/40 transition">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{e.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5"><CalendarClock className="h-3 w-3" /> {e.date}</p>
                </div>
                <Badge variant="secondary">{e.type}</Badge>
              </div>
            );
          })}
        </CardContent></Card>

        <Card><CardContent className="p-6">
          <p className="text-sm font-semibold mb-3">Novembro 2026</p>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {["D","S","T","Q","Q","S","S"].map(d => <div key={d} className="font-semibold text-muted-foreground py-1">{d}</div>)}
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const has = [3, 8, 12, 15, 22].includes(day);
              const today = day === 8;
              return (
                <button key={i} className={`aspect-square rounded-md text-xs relative ${today ? "bg-primary text-primary-foreground font-bold" : "hover:bg-muted"}`}>
                  {day}
                  {has && !today && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-accent" />}
                </button>
              );
            })}
          </div>
        </CardContent></Card>
      </div>
    </div>
  );
}
