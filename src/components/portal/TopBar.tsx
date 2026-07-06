import { Link, useRouterState } from "@tanstack/react-router";
import { GraduationCap, Search, Bell, Sun, Moon, ShoppingCart, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./theme-provider";
import { notifications } from "@/lib/mock-data";

export function TopBar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { theme, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background/80 backdrop-blur-lg">
      <div className="flex h-full items-center gap-3 px-4 md:px-6">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onToggleSidebar} aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-brand-foreground shadow-soft">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight">Instituto Lumen</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Portal do Aluno</span>
          </div>
        </Link>

        {/* Search */}
        <div className="relative flex-1 max-w-xl ml-2 md:ml-6">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Localizar cursos, aulas, professores..."
            className="pl-9 h-10 bg-muted/60 border-transparent focus-visible:bg-background focus-visible:border-input"
            aria-label="Buscar"
          />
          <kbd className="hidden md:inline pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Alternar tema">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Link to="/cart" aria-label="Carrinho">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 rounded-full bg-accent text-[10px] font-semibold text-accent-foreground grid place-items-center px-1">2</span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" aria-label="Notificações">
                <Bell className="h-5 w-5" />
                {unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground grid place-items-center px-1">
                    {unread}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notificações</span>
                <Link to="/notifications" className="text-xs text-primary hover:underline">Ver todas</Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.slice(0, 4).map((n) => (
                <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 py-2">
                  <div className="flex w-full items-center gap-2">
                    {n.unread && <span className="h-2 w-2 rounded-full bg-primary" />}
                    <span className="text-sm font-medium">{n.title}</span>
                    <span className="ml-auto text-[10px] text-muted-foreground">{n.time}</span>
                  </div>
                  <span className="text-xs text-muted-foreground line-clamp-2">{n.desc}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-1 flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-muted transition-colors" aria-label="Perfil">
                <Avatar className="h-8 w-8 ring-2 ring-background">
                  <AvatarFallback className="bg-brand text-brand-foreground text-xs font-semibold">LS</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start leading-tight">
                  <span className="text-xs font-semibold">Lucas Silva</span>
                  <span className="text-[10px] text-muted-foreground">Aluno Premium</span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Lucas Silva</span>
                  <span className="text-xs text-muted-foreground font-normal">lucas@email.com</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/profile">Meu perfil</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/my-courses">Meus cursos</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/certificates">Certificados</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/finance">Financeiro</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/settings">Configurações</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/help">Ajuda</Link></DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Subtle brand strip */}
      <div className="h-[2px] w-full bg-gradient-to-r from-brand via-accent to-brand" aria-hidden />
      {pathname === "/" ? null : null}
    </header>
  );
}

export { Badge };
