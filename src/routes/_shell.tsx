import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Shell } from "@/components/portal/Shell";

export const Route = createFileRoute("/_shell")({
  component: () => (
    <Shell>
      <Outlet />
    </Shell>
  ),
});
