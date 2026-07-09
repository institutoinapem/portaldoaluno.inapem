import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Sun, Moon, Menu, LogIn, User, LogOut, ChevronDown, FolderHeart } from "lucide-react";
import logoInapem from "@/assets/logo-inapem.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";
import { useState, useEffect, useRef } from "react";

// Imports do Firebase para monitoramento de sessão
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, type User as FirebaseUser } from "firebase/auth";

export function TopBar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Escuta se o usuário está logado ou não em tempo real
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fecha o dropdown caso o usuário clique fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false);
      navigate({ to: "/auth" });
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  // Pega as iniciais do nome para o Avatar de fallback
  const getInitials = (name: string | null) => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

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
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Portal</span>
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
        </div>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Alternar tema">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {user ? (
            /* Menu do Usuário Logado (Dropdown Animado) */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-muted/80 transition-all focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <div className="h-8 w-8 rounded-full bg-brand/10 text-brand border border-brand/20 flex items-center justify-center text-xs font-semibold shadow-inner">
                  {getInitials(user.displayName)}
                </div>
                <span className="hidden md:block text-sm font-medium max-w-[120px] truncate">
                  {user.displayName?.split(" ")[0] || "Minha Conta"}
                </span>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-elevated animate-in fade-in slide-in-from-top-3 duration-200 origin-top-right">
                  <div className="px-2 py-2 border-b mb-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Identificado como</p>
                    <p className="text-sm font-medium truncate mt-0.5">{user.displayName || "Usuário"}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                  </div>

                  <Link
                    to="/minha-conta"
                    onClick={() => setDropdownOpen(false)}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <User className="h-4 w-4 text-muted-foreground" />
                    Minha Conta
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors mt-1"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair da conta
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Botão Padrão de Login se Deslogado */
            <Button asChild variant="ghost" className="sm:inline-flex">
              <Link to="/auth">
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}