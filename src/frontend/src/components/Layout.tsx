import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";
// ── Layout principal — BusPass Algeria ───────────────────────────────────────
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Bus,
  ChevronLeft,
  History,
  LayoutDashboard,
  User,
} from "lucide-react";
import type { ReactNode } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface LayoutProps {
  children: ReactNode;
  titre?: string;
  retour?: string; // route de retour si page secondaire
  actions?: ReactNode;
}

// ── Onglets de navigation ─────────────────────────────────────────────────────
const onglets = [
  {
    href: "/tableau-de-bord",
    label: "Accueil",
    icon: LayoutDashboard,
    ocid: "nav.dashboard_tab",
  },
  { href: "/bus", label: "Autobus", icon: Bus, ocid: "nav.bus_tab" },
  {
    href: "/historique",
    label: "Historique",
    icon: History,
    ocid: "nav.history_tab",
  },
  { href: "/profil", label: "Compte", icon: User, ocid: "nav.profil_tab" },
];

// ── Composant ─────────────────────────────────────────────────────────────────
export function Layout({ children, titre, retour, actions }: LayoutProps) {
  const { utilisateur, estConnecte } = useAuth();
  const { nonLues } = useNotifications();
  const routerState = useRouterState();
  const cheminActuel = routerState.location.pathname;

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      {/* ── Barre supérieure ── */}
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-md">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto w-full">
          {/* Gauche: retour ou logo */}
          <div className="flex items-center gap-2 min-w-0">
            {retour ? (
              <Link
                to={retour}
                className="p-1.5 rounded-full hover:bg-primary-foreground/10 transition-smooth -ml-1"
                data-ocid="nav.back_button"
                aria-label="Retour"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
            ) : null}
            <span className="font-display font-bold text-lg tracking-tight truncate">
              {titre ?? "BusPass"}
            </span>
          </div>

          {/* Droite: actions + notifs */}
          <div className="flex items-center gap-1 shrink-0">
            {actions}
            {estConnecte && (
              <Link
                to="/profil"
                className="relative p-2 rounded-full hover:bg-primary-foreground/10 transition-smooth"
                data-ocid="nav.notifications_button"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {nonLues > 0 && (
                  <Badge
                    className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-accent text-accent-foreground border-0"
                    data-ocid="nav.notifications_badge"
                  >
                    {nonLues > 9 ? "9+" : nonLues}
                  </Badge>
                )}
              </Link>
            )}
            {estConnecte && utilisateur && (
              <div className="ml-1 flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-medium leading-none opacity-90 truncate max-w-[120px]">
                    {utilisateur.nomComplet.split(" ")[0]}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center font-semibold text-sm shrink-0">
                  {utilisateur.nomComplet.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Contenu principal ── */}
      <main className="flex-1 pb-24 max-w-lg mx-auto w-full">{children}</main>

      {/* ── Barre de navigation basse (visible si connecté) ── */}
      {estConnecte && (
        <nav
          className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-[0_-2px_12px_rgba(0,0,0,0.06)]"
          aria-label="Navigation principale"
          data-ocid="nav.bottom_bar"
        >
          <div className="flex items-stretch max-w-lg mx-auto w-full">
            {onglets.map(({ href, label, icon: Icon, ocid }) => {
              const actif =
                cheminActuel === href ||
                (href !== "/tableau-de-bord" && cheminActuel.startsWith(href));
              return (
                <Link
                  key={href}
                  to={href}
                  className={cn(
                    "flex-1 flex flex-col items-center justify-center gap-0.5 py-3 px-1 min-h-[60px] transition-smooth",
                    actif
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  data-ocid={ocid}
                  aria-current={actif ? "page" : undefined}
                >
                  <div
                    className={cn(
                      "relative p-1.5 rounded-xl transition-smooth",
                      actif && "bg-primary/10",
                    )}
                  >
                    <Icon className="w-5 h-5" strokeWidth={actif ? 2.5 : 2} />
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-medium leading-none",
                      actif ? "font-semibold" : "",
                    )}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
