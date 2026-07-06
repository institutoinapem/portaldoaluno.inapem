import { useState, type ReactNode } from "react";
import { TopBar } from "./TopBar";
import { SideNav } from "./SideNav";

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar onToggleSidebar={() => setOpen((v) => !v)} />
      <div className="flex flex-1 w-full">
        <SideNav open={open} onClose={() => setOpen(false)} />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
