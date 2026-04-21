// ── Tableau de bord — BusPass Algeria ────────────────────────────────────────
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { formatSolde, mockLignes, mockTransactions } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";
import type { Notification, TypeNotification } from "@/types";
import { REGIONS, type Region } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bus,
  CreditCard,
  History,
  Maximize2,
  RefreshCw,
  X,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ── Constantes ────────────────────────────────────────────────────────────────
const REGIONS_LIST: Region[] = ["naama", "msharia", "ainSefra"];

// ── Helpers ───────────────────────────────────────────────────────────────────
function horodatageRelatif(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const heures = Math.floor(diff / 3600000);
  const jours = Math.floor(diff / 86400000);
  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  if (heures < 24) return `Il y a ${heures}h`;
  if (jours === 1) return "Hier";
  return `Il y a ${jours} jours`;
}

function infoNotif(type: TypeNotification): {
  emoji: string;
  couleur: string;
  label: string;
} {
  switch (type) {
    case "recharge_succes":
      return {
        emoji: "💰",
        couleur: "bg-accent/15 text-accent",
        label: "Recharge",
      };
    case "trajet_debit":
      return {
        emoji: "🚌",
        couleur: "bg-primary/10 text-primary",
        label: "Trajet",
      };
    case "bus_arrive":
      return {
        emoji: "🚌",
        couleur: "bg-primary/10 text-primary",
        label: "Arrivée",
      };
    case "bus_retard":
      return {
        emoji: "⚠️",
        couleur: "bg-destructive/10 text-destructive",
        label: "Alerte",
      };
    case "compte":
      return {
        emoji: "👤",
        couleur: "bg-secondary text-foreground",
        label: "Compte",
      };
    case "promotion":
      return {
        emoji: "🎁",
        couleur: "bg-accent/15 text-accent",
        label: "Promo",
      };
    default:
      return {
        emoji: "🔔",
        couleur: "bg-muted text-muted-foreground",
        label: "Info",
      };
  }
}

// ── Sous-composant: item notification ────────────────────────────────────────
function ItemNotification({
  notif,
  index,
  onMarquerLue,
}: {
  notif: Notification;
  index: number;
  onMarquerLue: (id: number) => void;
}) {
  const info = infoNotif(notif.typeNotif);
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.28 }}
      onClick={() => onMarquerLue(notif.id)}
      className={cn(
        "w-full text-left flex items-start gap-3 py-3 border-b border-border last:border-0 transition-smooth hover:bg-muted/30 rounded-lg px-1 -mx-1",
        !notif.lue && "bg-primary/3",
      )}
      data-ocid={`dashboard.notification.item.${index + 1}`}
    >
      <div
        className={cn(
          "shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base",
          info.couleur,
        )}
      >
        {info.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-snug line-clamp-2">
          {notif.message}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">
            {horodatageRelatif(notif.timestamp)}
          </span>
          {!notif.lue && (
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
          )}
        </div>
      </div>
      <Badge
        variant="secondary"
        className="shrink-0 text-[10px] px-1.5 py-0.5 h-auto mt-0.5"
      >
        {info.label}
      </Badge>
    </motion.button>
  );
}

// ── Composant principal ───────────────────────────────────────────────────────
export default function TableauDeBord() {
  const { utilisateur } = useAuth();
  const { notifications, marquerLue } = useNotifications();
  const navigate = useNavigate();

  const [regionActive, setRegionActive] = useState<Region>("naama");
  const [chargement, setChargement] = useState(true);
  const [qrOuvert, setQrOuvert] = useState(false);
  const [qrTimestamp, setQrTimestamp] = useState(Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simuler chargement initial
  useEffect(() => {
    const t = setTimeout(() => setChargement(false), 500);
    return () => clearTimeout(t);
  }, []);

  // Régénérer QR toutes les 60s
  useEffect(() => {
    intervalRef.current = setInterval(() => setQrTimestamp(Date.now()), 60000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const rafraichirQr = useCallback(() => setQrTimestamp(Date.now()), []);

  // Données QR dynamiques
  const qrData = useMemo(() => {
    if (!utilisateur) return "";
    return JSON.stringify({
      userId: utilisateur.id,
      carte: utilisateur.numeroCarte,
      solde: utilisateur.solde,
      ts: qrTimestamp,
    });
  }, [utilisateur, qrTimestamp]);

  const lignesRegion = useMemo(
    () => mockLignes.filter((l) => l.region === regionActive).slice(0, 3),
    [regionActive],
  );

  const transactions = useMemo(
    () =>
      mockTransactions
        .filter((t) => t.utilisateurId === utilisateur?.id)
        .slice(0, 3),
    [utilisateur],
  );

  const dernieresNotifs = useMemo(
    () => notifications.slice(0, 3),
    [notifications],
  );
  const nonLues = useMemo(
    () => notifications.filter((n) => !n.lue).length,
    [notifications],
  );

  if (!utilisateur) return null;

  const prenom = utilisateur.nomComplet.split(" ")[0];
  const soldeFormate = formatSolde(utilisateur.solde);

  return (
    <Layout titre="BusPass">
      {/* ── Bandeau supérieur vert ── */}
      <div className="bg-primary text-primary-foreground px-4 pt-3 pb-10">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-primary-foreground/70 text-sm">Bonjour,</p>
          <h1 className="text-2xl font-display font-bold leading-tight">
            {prenom} 👋
          </h1>
          <div className="flex items-center gap-1.5 mt-1 opacity-65">
            <CreditCard className="w-3.5 h-3.5" />
            <span className="text-xs font-mono tracking-wider">
              {utilisateur.numeroCarte}
            </span>
          </div>
        </motion.div>
      </div>

      <div className="px-4 -mt-6 space-y-4 pb-6">
        {/* ── Carte solde + recharge ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.04 }}
          className="rounded-2xl shadow-md overflow-hidden border border-border bg-card"
          data-ocid="dashboard.balance_card"
        >
          <div className="grid grid-cols-[1fr_auto]">
            {/* Solde */}
            <div className="bg-primary p-4 rounded-tl-2xl rounded-bl-2xl">
              <p className="text-primary-foreground/70 text-[11px] font-semibold uppercase tracking-wider mb-1">
                Solde actuel
              </p>
              {chargement ? (
                <Skeleton className="h-9 w-36 bg-primary-foreground/20 rounded-lg" />
              ) : (
                <div
                  className="flex items-end gap-1"
                  data-ocid="dashboard.balance_amount"
                >
                  <span className="text-3xl font-display font-bold text-primary-foreground balance-pulse">
                    {soldeFormate}
                  </span>
                  <span className="text-primary-foreground/70 text-sm font-semibold mb-0.5">
                    DZD
                  </span>
                </div>
              )}
            </div>
            {/* Bouton recharge */}
            <button
              type="button"
              onClick={() => navigate({ to: "/recharge" })}
              className="bg-accent hover:bg-accent/90 active:scale-95 transition-smooth flex flex-col items-center justify-center px-5 gap-1.5 rounded-tr-2xl rounded-br-2xl"
              data-ocid="dashboard.recharge_button"
              aria-label="Recharger le solde"
            >
              <RefreshCw className="w-5 h-5 text-accent-foreground" />
              <span className="text-accent-foreground font-bold text-xs text-center leading-tight">
                Recharger
              </span>
            </button>
          </div>
        </motion.div>

        {/* ── QR Code ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.08 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-4"
          data-ocid="dashboard.qr_section"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-display font-semibold text-base text-foreground">
                Mon QR Code
              </h2>
              <p className="text-xs text-muted-foreground">
                Présentez au receveur pour payer
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={rafraichirQr}
                className="p-2 rounded-xl bg-muted hover:bg-secondary transition-smooth active:scale-95"
                aria-label="Rafraîchir le QR code"
                data-ocid="dashboard.qr_refresh_button"
              >
                <RefreshCw className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                type="button"
                onClick={() => setQrOuvert(true)}
                className="p-2 rounded-xl bg-muted hover:bg-secondary transition-smooth active:scale-95"
                aria-label="Agrandir le QR code"
                data-ocid="dashboard.qr_expand_button"
              >
                <ZoomIn className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {chargement ? (
            <div className="flex justify-center py-2">
              <Skeleton className="w-36 h-36 rounded-xl" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => setQrOuvert(true)}
                className="bg-card border-2 border-primary/20 rounded-xl p-3 shadow-sm active:scale-95 transition-smooth"
                aria-label="Agrandir le QR code"
                data-ocid="dashboard.qr_code"
              >
                <QRCodeSVG
                  value={qrData}
                  size={136}
                  level="M"
                  fgColor="#166534"
                  bgColor="transparent"
                />
              </button>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
                Code dynamique · actualisé automatiquement
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Navigation rapide ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.12 }}
          className="grid grid-cols-2 gap-3"
          data-ocid="dashboard.quick_nav"
        >
          <button
            type="button"
            onClick={() => navigate({ to: "/bus" })}
            className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 hover:border-primary/40 hover:shadow-sm active:scale-95 transition-smooth text-left"
            data-ocid="dashboard.nav_bus_button"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Bus className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-foreground leading-tight">
                Lignes
              </p>
              <p className="text-xs text-muted-foreground">Voir les bus</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate({ to: "/historique" })}
            className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 hover:border-primary/40 hover:shadow-sm active:scale-95 transition-smooth text-left"
            data-ocid="dashboard.nav_historique_button"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <History className="w-5 h-5 text-accent" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-foreground leading-tight">
                Historique
              </p>
              <p className="text-xs text-muted-foreground">Mes trajets</p>
            </div>
          </button>
        </motion.div>

        {/* ── Lignes par région ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.16 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-4"
          data-ocid="dashboard.lignes_section"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-base text-foreground">
              Lignes disponibles
            </h2>
            <button
              type="button"
              onClick={() => navigate({ to: "/bus" })}
              className="text-xs text-primary font-medium flex items-center gap-1"
              data-ocid="dashboard.voir_bus_button"
            >
              Voir tout <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Filtres régions */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
            {REGIONS_LIST.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setRegionActive(region)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-smooth border shrink-0",
                  regionActive === region
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/40",
                )}
                data-ocid={`dashboard.region_tab.${region}`}
              >
                {REGIONS[region]}
              </button>
            ))}
          </div>

          {chargement ? (
            <div className="space-y-2">
              {[1, 2].map((n) => (
                <Skeleton key={n} className="h-14 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {lignesRegion.map((ligne, i) => (
                <button
                  key={ligne.id}
                  type="button"
                  onClick={() =>
                    navigate({
                      to: "/bus/$ligneId",
                      params: { ligneId: String(ligne.id) },
                    })
                  }
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/20 active:scale-[0.99] transition-smooth"
                  data-ocid={`dashboard.ligne_item.${i + 1}`}
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Bus className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground">
                        {ligne.numero}
                      </span>
                      {ligne.statut === "en_service" && (
                        <Badge className="text-[10px] px-1.5 py-0 bg-primary/15 text-primary border-0 shrink-0 h-4">
                          En service
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {ligne.nom}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-accent">
                      {ligne.tarif} DZD
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {ligne.frequenceMin} min
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Derniers mouvements ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.2 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-4"
          data-ocid="dashboard.transactions_section"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-base text-foreground">
              Derniers mouvements
            </h2>
            <button
              type="button"
              onClick={() => navigate({ to: "/historique" })}
              className="text-xs text-primary font-medium flex items-center gap-1"
              data-ocid="dashboard.voir_historique_button"
            >
              Historique <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {chargement ? (
            <div className="space-y-2">
              {[1, 2, 3].map((n) => (
                <Skeleton key={n} className="h-12 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((t, i) => {
                const isRecharge = t.typeTransaction.type === "recharge";
                return (
                  <div
                    key={t.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/30"
                    data-ocid={`dashboard.transaction.item.${i + 1}`}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
                        isRecharge ? "bg-primary/10" : "bg-destructive/10",
                      )}
                    >
                      {isRecharge ? (
                        <ArrowUpRight className="w-4 h-4 text-primary" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {isRecharge ? "Recharge BaridiMob" : "Trajet payé"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(t.timestamp).toLocaleDateString("fr-DZ")}
                      </p>
                    </div>
                    <p
                      className={cn(
                        "text-sm font-bold shrink-0",
                        isRecharge ? "text-primary" : "text-destructive",
                      )}
                    >
                      {isRecharge ? "+" : ""}
                      {formatSolde(t.montant)} DZD
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* ── Notifications récentes ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.24 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-4"
          data-ocid="dashboard.notifications_section"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display font-semibold text-base text-foreground">
                Notifications
              </h2>
              {nonLues > 0 && (
                <Badge className="text-[10px] px-1.5 py-0 bg-accent text-accent-foreground border-0 h-4">
                  {nonLues}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/profil" })}
              className="text-xs text-primary h-7 px-2"
              data-ocid="dashboard.notifications_voir_tout_button"
            >
              Voir tout
            </Button>
          </div>

          {chargement ? (
            <div className="space-y-3 mt-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex items-center gap-3 py-2">
                  <Skeleton className="w-9 h-9 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-full rounded" />
                    <Skeleton className="h-3 w-2/3 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : dernieresNotifs.length === 0 ? (
            <div
              className="flex flex-col items-center py-6 text-center"
              data-ocid="dashboard.notifications_empty_state"
            >
              <span className="text-3xl mb-2">🔔</span>
              <p className="text-sm text-muted-foreground">
                Aucune notification pour le moment
              </p>
            </div>
          ) : (
            <div>
              {dernieresNotifs.map((notif, i) => (
                <ItemNotification
                  key={notif.id}
                  notif={notif}
                  index={i}
                  onMarquerLue={marquerLue}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* ── Modal QR plein écran ── */}
      <AnimatePresence>
        {qrOuvert && (
          <Dialog open={qrOuvert} onOpenChange={setQrOuvert}>
            <DialogContent
              className="max-w-sm mx-auto p-0 rounded-2xl overflow-hidden border-0 shadow-2xl"
              data-ocid="dashboard.qr_dialog"
            >
              <div className="bg-primary flex flex-col items-center gap-5 p-6">
                {/* En-tête du modal */}
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h2 className="text-primary-foreground font-display font-bold text-lg leading-tight">
                      QR Code de paiement
                    </h2>
                    <p className="text-primary-foreground/65 text-xs font-mono mt-0.5">
                      {utilisateur.numeroCarte}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQrOuvert(false)}
                    className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-smooth"
                    aria-label="Fermer"
                    data-ocid="dashboard.qr_close_button"
                  >
                    <X className="w-5 h-5 text-primary-foreground" />
                  </button>
                </div>

                {/* QR grande taille */}
                <motion.div
                  initial={{ scale: 0.82, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.82, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  className="bg-card rounded-2xl p-4 shadow-xl"
                >
                  <QRCodeSVG
                    value={qrData}
                    size={224}
                    level="H"
                    fgColor="#166534"
                    bgColor="transparent"
                  />
                </motion.div>

                {/* Solde résumé */}
                <div className="text-center">
                  <p className="text-primary-foreground/70 text-sm">
                    Solde disponible
                  </p>
                  <p className="text-primary-foreground font-display font-bold text-2xl mt-0.5">
                    {soldeFormate}{" "}
                    <span className="text-primary-foreground/60 text-base">
                      DZD
                    </span>
                  </p>
                </div>

                {/* Indicateur dynamique */}
                <div className="flex items-center gap-2 text-primary-foreground/55 text-xs">
                  <Maximize2 className="w-3.5 h-3.5" />
                  Code dynamique · valide 60 secondes
                </div>

                {/* Bouton rafraîchir */}
                <button
                  type="button"
                  onClick={rafraichirQr}
                  className="w-full py-3 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 transition-smooth active:scale-95"
                  data-ocid="dashboard.qr_dialog_refresh_button"
                >
                  <RefreshCw className="w-4 h-4" />
                  Rafraîchir le code
                </button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </Layout>
  );
}
