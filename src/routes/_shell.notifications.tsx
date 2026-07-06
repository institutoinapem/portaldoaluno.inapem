import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { notifications } from "@/lib/mock-data";
import { Bell, Video, Award, MessageCircle, CalendarClock } from "lucide-react";

const iconFor = { lesson: Video, certificate: Award, feedback: MessageCircle, event: CalendarClock } as Record<string, typeof Video>;

export const Route = createFileRoute("/_shell/notifications")({ component: Notifications });

function Notifications() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Notificações</h1>
          <p className="text-sm text-muted-foreground">Mantenha-se por dentro de tudo.</p>
        </div>
        <Button variant="outline" size="sm">Marcar todas como lidas</Button>
      </div>
      <div className="space-y-3">
        {notifications.concat(notifications).map((n, i) => {
          const Icon = iconFor[n.type] ?? Bell;
          return (
            <Card key={i} className={n.unread ? "border-primary/30 bg-primary/5" : ""}>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{n.title}</p>
                    {n.unread && <span className="h-2 w-2 rounded-full bg-accent" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{n.desc}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
