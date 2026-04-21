import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
// ── Routeur principal — BusPass Algeria ──────────────────────────────────────
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// ── Chargement paresseux des pages ────────────────────────────────────────────
const Accueil = lazy(() => import("@/pages/Accueil"));
const Inscription = lazy(() => import("@/pages/Inscription"));
const Connexion = lazy(() => import("@/pages/Connexion"));
const OTP = lazy(() => import("@/pages/OTP"));
const TableauDeBord = lazy(() => import("@/pages/TableauDeBord"));
const Bus = lazy(() => import("@/pages/Bus"));
const LigneDetail = lazy(() => import("@/pages/LigneDetail"));
const Historique = lazy(() => import("@/pages/Historique"));
const Recharge = lazy(() => import("@/pages/Recharge"));
const Profil = lazy(() => import("@/pages/Profil"));

// ── Composant de chargement ───────────────────────────────────────────────────
function PageChargement() {
  return (
    <div className="flex items-center justify-center min-h-dvh bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Chargement…</p>
      </div>
    </div>
  );
}

// ── Route racine (layout wrapping auth) ───────────────────────────────────────
function RootComponent() {
  return (
    <AuthProvider>
      <Outlet />
      <Toaster position="top-center" richColors />
    </AuthProvider>
  );
}

// ── Garde d'authentification ──────────────────────────────────────────────────
function RequiertAuth({ children }: { children: React.ReactNode }) {
  const { estConnecte, chargement } = useAuth();
  if (chargement) return <PageChargement />;
  if (!estConnecte) return <Navigate to="/connexion" />;
  return <>{children}</>;
}

function RequiertNonAuth({ children }: { children: React.ReactNode }) {
  const { estConnecte, chargement } = useAuth();
  if (chargement) return <PageChargement />;
  if (estConnecte) return <Navigate to="/tableau-de-bord" />;
  return <>{children}</>;
}

// ── Définition des routes ─────────────────────────────────────────────────────
const rootRoute = createRootRoute({ component: RootComponent });

const accueilRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageChargement />}>
      <Accueil />
    </Suspense>
  ),
});

const inscriptionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/inscription",
  component: () => (
    <RequiertNonAuth>
      <Suspense fallback={<PageChargement />}>
        <Inscription />
      </Suspense>
    </RequiertNonAuth>
  ),
});

const connexionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/connexion",
  component: () => (
    <RequiertNonAuth>
      <Suspense fallback={<PageChargement />}>
        <Connexion />
      </Suspense>
    </RequiertNonAuth>
  ),
});

const otpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/otp",
  component: () => (
    <Suspense fallback={<PageChargement />}>
      <OTP />
    </Suspense>
  ),
});

const tableauDeBordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tableau-de-bord",
  component: () => (
    <RequiertAuth>
      <Suspense fallback={<PageChargement />}>
        <TableauDeBord />
      </Suspense>
    </RequiertAuth>
  ),
});

const busRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bus",
  component: () => (
    <RequiertAuth>
      <Suspense fallback={<PageChargement />}>
        <Bus />
      </Suspense>
    </RequiertAuth>
  ),
});

const ligneDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bus/$ligneId",
  component: () => (
    <RequiertAuth>
      <Suspense fallback={<PageChargement />}>
        <LigneDetail />
      </Suspense>
    </RequiertAuth>
  ),
});

const historiqueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/historique",
  component: () => (
    <RequiertAuth>
      <Suspense fallback={<PageChargement />}>
        <Historique />
      </Suspense>
    </RequiertAuth>
  ),
});

const rechargeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/recharge",
  component: () => (
    <RequiertAuth>
      <Suspense fallback={<PageChargement />}>
        <Recharge />
      </Suspense>
    </RequiertAuth>
  ),
});

const profilRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profil",
  component: () => (
    <RequiertAuth>
      <Suspense fallback={<PageChargement />}>
        <Profil />
      </Suspense>
    </RequiertAuth>
  ),
});

// ── Création du routeur ───────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  accueilRoute,
  inscriptionRoute,
  connexionRoute,
  otpRoute,
  tableauDeBordRoute,
  busRoute,
  ligneDetailRoute,
  historiqueRoute,
  rechargeRoute,
  profilRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ── Composant racine ──────────────────────────────────────────────────────────
export default function App() {
  return <RouterProvider router={router} />;
}
