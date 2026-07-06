import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, BookOpen, GraduationCap, Award, TrendingUp, Calendar,
  MessagesSquare, MessageCircle, Heart, History, CreditCard, Settings,
  HelpCircle, Bell, ShoppingBag, User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { section: "Aprendizado", items: [
    { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/courses", label: "Cursos disponíveis", icon: BookOpen },
    { to: "/my-courses", label: "Meus cursos", icon: GraduationCap },
    { to: "/progress", label: "Progresso", icon: TrendingUp },
    { to: "/certificates", label: "Certificados", icon: Award },
    { to: "/schedule", label: "Agenda", icon: Calendar },
  ]},
  { section: "Interação", items: [
    { to: "/community", label: "Comunidade", icon: MessagesSquare },
    { to: "/chat", label: "Chat", icon: MessageCircle },
    { to: "/notifications", label: "Notificações", icon: Bell },
    { to: "/favorites", label: "Favoritos", icon: Heart },
    { to: "/history", label: "Histórico", icon: History },
  ]},
  { section: "Conta", items: [
    { to: "/cart", label: "Carrinho", icon: ShoppingBag },
    { to: "/finance", label: "Financeiro", icon: CreditCard },
    { to: "/profile", label: "Perfil", icon: User },
    { to: "/settings", label: "Configurações", icon: Settings },
    { to: "/help", label: "Ajuda", icon: HelpCircle },
  ]},
];

export function SideNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm lg:hidden" onClick={onClose} aria-hidden />
      )}

      <aside
        className={cn(
          "fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 shrink-0 border-r bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <nav className="h-full overflow-y-auto no-scrollbar py-4 px-3">
          {nav.map((group) => (
            <div key={group.section} className="mb-5">
              <div className="px-3 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                {group.section}
              </div>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={onClose}
                        className={cn(
                          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                          active
                            ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-soft"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        )}
                      >
                        <Icon className={cn("h-4 w-4", active ? "" : "text-muted-foreground group-hover:text-foreground")} />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="mx-3 mt-4 rounded-xl border bg-gradient-to-br from-brand/10 to-accent/10 p-4">
            <div className="text-xs font-semibold">Plano Premium</div>
            <p className="mt-1 text-xs text-muted-foreground">Acesso ilimitado a todos os cursos e certificados.</p>
            <Link to="/subscriptions" className="mt-3 inline-block text-xs font-semibold text-primary hover:underline">
              Gerenciar plano →
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
