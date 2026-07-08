import { Link } from "@tanstack/react-router";
import { Search, Sun, Moon, Menu, LogIn } from "lucide-react";
import logoInapem from "@/assets/logo-inapem.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";

export function TopBar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background/80 backdrop-blur-lg">
      <div className="flex h-full items-center gap-3 px-4 md:px-6">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onToggleSidebar} aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src={logoInapem}
            alt="INAPEM"
            className="h-11 w-11 rounded-lg object-contain bg-white ring-1 ring-border shadow-soft"
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-brand">INAPEM</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Portal de Cursos</span>
          </div>
        </Link>

        {/* Search */}
        <div className="relative flex-1 max-w-xl ml-2 md:ml-6">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Localizar cursos, áreas, professores..."
            className="pl-9 h-10 bg-muted/60 border-transparent focus-visible:bg-background focus-visible:border-input"
            aria-label="Buscar"
          />
          <kbd className="hidden md:inline pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Alternar tema">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/">
              <LogIn className="mr-2 h-4 w-4" />
              Entrar
            </Link>
          </Button>
          <Button asChild>
            <Link to="/">Inscreva-se</Link>
          </Button>
        </div>
      </div>
      <div className="h-[2px] w-full bg-gradient-to-r from-brand via-accent to-brand" aria-hidden />
    </header>
  );
}
