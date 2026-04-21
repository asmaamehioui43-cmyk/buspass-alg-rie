// ── Page Profil — BusPass Algeria ────────────────────────────────────────────
import { Layout } from "@/components/Layout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { formatSolde } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";
import type { Notification, TypeNotification } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  BellOff,
  CheckCheck,
  ChevronRight,
  CreditCard,
  KeyRound,
  Lock,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  Tag,
  TrendingDown,
  User,
  Wallet,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ── Icônes par type de notification ──────────────────────────────────────────
const NOTIF_ICONS: Record<TypeNotification, React.ReactNode> = {
  recharge_succes: <Wallet className="w-4 h-4 text-primary" />,
  trajet_debit: <TrendingDown className="w-4 h-4 text-accent" />,
  bus_arrive: <Zap className="w-4 h-4 text-primary" />,
  bus_retard: <BellOff className="w-4 h-4 text-destructive" />,
  compte: <ShieldCheck className="w-4 h-4 text-primary" />,
  promotion: <Tag className="w-4 h-4 text-accent" />,
};

const NOTIF_LABELS: Record<TypeNotification, string> = {
  recharge_succes: "Recharges",
  trajet_debit: "Débits trajet",
  bus_arrive: "Arrivée bus",
  bus_retard: "Retards",
  compte: "Compte",
  promotion: "Promotions",
};

// ── Temps relatif ─────────────────────────────────────────────────────────────
function tempsRelatif(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const min = Math.floor(diff / 60000);
  const heure = Math.floor(diff / 3600000);
  const jour = Math.floor(diff / 86400000);
  if (min < 1) return "À l'instant";
  if (min < 60) return `Il y a ${min} min`;
  if (heure < 24) return `Il y a ${heure}h`;
  return `Il y a ${jour}j`;
}

// ── Item notification ─────────────────────────────────────────────────────────
function ItemNotification({
  notif,
  index,
  onMarquerLue,
}: {
  notif: Notification;
  index: number;
  onMarquerLue: (id: number) => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "w-full flex items-start gap-3 px-4 py-3 text-left transition-smooth",
        !notif.lue ? "bg-primary/5" : "hover:bg-muted/30",
      )}
      onClick={() => !notif.lue && onMarquerLue(notif.id)}
      data-ocid={`profil.notification.item.${index}`}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5",
          !notif.lue ? "bg-primary/10" : "bg-muted",
        )}
      >
        {NOTIF_ICONS[notif.typeNotif]}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm leading-snug",
            !notif.lue
              ? "font-semibold text-foreground"
              : "text-muted-foreground",
          )}
        >
          {notif.message}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {tempsRelatif(notif.timestamp)}
        </p>
      </div>
      {!notif.lue && (
        <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
      )}
    </button>
  );
}

// ── Composant principal ───────────────────────────────────────────────────────
export default function Profil() {
  const { utilisateur, deconnexion } = useAuth();
  const navigate = useNavigate();
  const { notifications, nonLues, marquerLue, marquerToutesLues } =
    useNotifications();

  const [email, setEmail] = useState(utilisateur?.email ?? "");
  const [emailEnEdition, setEmailEnEdition] = useState(false);
  const [sauvegardeEmail, setSauvegardeEmail] = useState(false);
  const [ongletActif, setOngletActif] = useState<"infos" | "notifs">("infos");

  const [prefsNotif, setPrefsNotif] = useState<
    Record<TypeNotification, boolean>
  >({
    recharge_succes: true,
    trajet_debit: true,
    bus_arrive: true,
    bus_retard: true,
    compte: true,
    promotion: false,
  });

  if (!utilisateur) return null;

  async function handleSauvegarderEmail() {
    setSauvegardeEmail(true);
    await new Promise((r) => setTimeout(r, 600));
    setSauvegardeEmail(false);
    setEmailEnEdition(false);
    toast.success("Email mis à jour avec succès !");
  }

  function handleDeconnexion() {
    deconnexion();
    void navigate({ to: "/connexion" });
    toast.success("Vous avez été déconnecté.");
  }

  function toggleNotif(type: TypeNotification) {
    setPrefsNotif((prev) => ({ ...prev, [type]: !prev[type] }));
  }

  return (
    <Layout titre="Mon compte">
      <div className="max-w-lg mx-auto pb-6">
        {/* ── En-tête ── */}
        <div
          className="bg-primary text-primary-foreground px-4 pt-4 pb-8"
          data-ocid="profil.header"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl font-display font-bold shrink-0">
              {utilisateur.nomComplet.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-display font-bold truncate">
                {utilisateur.nomComplet}
              </h1>
              <p className="text-sm opacity-80 mt-0.5">
                {utilisateur.telephone}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 text-xs font-mono">
                  {utilisateur.numeroCarte}
                </Badge>
                {utilisateur.estVerifie && (
                  <Badge className="bg-accent text-accent-foreground border-0 text-xs gap-1">
                    <ShieldCheck className="w-3 h-3" /> Vérifié
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 bg-primary-foreground/10 rounded-xl p-3 flex items-center justify-between">
            <span className="text-sm opacity-80">Solde disponible</span>
            <span className="font-display font-bold text-lg">
              {formatSolde(utilisateur.solde)} DZD
            </span>
          </div>
        </div>

        {/* ── Onglets ── */}
        <div className="sticky top-[60px] z-20 bg-card border-b border-border">
          <div className="flex">
            {(["infos", "notifs"] as const).map((onglet) => (
              <button
                key={onglet}
                type="button"
                onClick={() => setOngletActif(onglet)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold border-b-2 transition-smooth",
                  ongletActif === onglet
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
                data-ocid={`profil.${onglet}_tab`}
              >
                {onglet === "infos" ? (
                  <>
                    <User className="w-4 h-4" />
                    Informations
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4" />
                    Notifications
                    {nonLues > 0 && (
                      <Badge className="h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-primary text-primary-foreground border-0">
                        {nonLues > 9 ? "9+" : nonLues}
                      </Badge>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Onglet Informations ── */}
        {ongletActif === "infos" && (
          <div className="space-y-4 px-4 pt-5" data-ocid="profil.infos_section">
            {/* Informations personnelles */}
            <section className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/30">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Informations personnelles
                </h2>
              </div>

              {/* Nom */}
              <div className="px-4 py-4 flex items-center gap-3">
                <User className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Nom complet
                  </p>
                  <p className="text-sm font-semibold truncate">
                    {utilisateur.nomComplet}
                  </p>
                </div>
              </div>
              <Separator />

              {/* Téléphone */}
              <div className="px-4 py-4 flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Numéro de téléphone
                  </p>
                  <p className="text-sm font-semibold">
                    {utilisateur.telephone}
                  </p>
                </div>
              </div>
              <Separator />

              {/* Carte PVC */}
              <div className="px-4 py-4 flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Numéro de carte PVC
                  </p>
                  <p className="text-sm font-mono font-semibold">
                    {utilisateur.numeroCarte}
                  </p>
                </div>
              </div>
              <Separator />

              {/* Email modifiable */}
              <div className="px-4 py-4">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Email (optionnel)
                  </p>
                </div>
                {emailEnEdition ? (
                  <div className="space-y-2 ml-7">
                    <Label htmlFor="email-input" className="sr-only">
                      Email
                    </Label>
                    <Input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.dz"
                      className="h-10"
                      data-ocid="profil.email_input"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleSauvegarderEmail}
                        disabled={sauvegardeEmail}
                        className="flex-1"
                        data-ocid="profil.save_email_button"
                      >
                        {sauvegardeEmail ? "Sauvegarde…" : "Enregistrer"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEmailEnEdition(false)}
                        data-ocid="profil.cancel_email_button"
                      >
                        Annuler
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between ml-7">
                    <p className="text-sm font-semibold text-foreground">
                      {utilisateur.email || email || (
                        <span className="text-muted-foreground font-normal italic">
                          Non renseigné
                        </span>
                      )}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEmailEnEdition(true)}
                      className="text-primary text-xs h-8 px-2"
                      data-ocid="profil.edit_email_button"
                    >
                      Modifier <ChevronRight className="w-3 h-3 ml-0.5" />
                    </Button>
                  </div>
                )}
              </div>
            </section>

            {/* Sécurité */}
            <section className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/30">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Sécurité
                </h2>
              </div>
              <button
                type="button"
                className="w-full px-4 py-4 flex items-center gap-3 hover:bg-muted/30 transition-smooth"
                onClick={() =>
                  toast.info("Fonctionnalité disponible prochainement.")
                }
                data-ocid="profil.change_password_button"
              >
                <KeyRound className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold">
                    Changer le mot de passe
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Dernière modification il y a 30 jours
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
              <Separator />
              <div className="px-4 py-4 flex items-center gap-3">
                <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    Vérification en 2 étapes
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Via SMS — activée
                  </p>
                </div>
                <Badge className="bg-primary/10 text-primary border-0 text-xs">
                  Actif
                </Badge>
              </div>
            </section>

            {/* Paramètres notifications */}
            <section className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/30">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Paramètres des notifications
                </h2>
              </div>
              <div className="divide-y divide-border">
                {(Object.keys(prefsNotif) as TypeNotification[]).map((type) => (
                  <div
                    key={type}
                    className="px-4 py-3.5 flex items-center justify-between gap-3"
                    data-ocid={`profil.notif_toggle.${type}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                        {NOTIF_ICONS[type]}
                      </div>
                      <p className="text-sm font-medium truncate">
                        {NOTIF_LABELS[type]}
                      </p>
                    </div>
                    <Switch
                      checked={prefsNotif[type]}
                      onCheckedChange={() => toggleNotif(type)}
                      aria-label={`Activer ${NOTIF_LABELS[type]}`}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Déconnexion */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 gap-2 text-destructive border-destructive/30 hover:bg-destructive/5 hover:border-destructive/50 font-semibold"
                  data-ocid="profil.logout_button"
                >
                  <LogOut className="w-4 h-4" />
                  Se déconnecter
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent data-ocid="profil.logout_dialog">
                <AlertDialogHeader>
                  <AlertDialogTitle>Se déconnecter ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Vous allez quitter votre session BusPass. Votre solde et
                    votre historique seront conservés.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel data-ocid="profil.logout_cancel_button">
                    Annuler
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeconnexion}
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    data-ocid="profil.logout_confirm_button"
                  >
                    Se déconnecter
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}

        {/* ── Onglet Notifications ── */}
        {ongletActif === "notifs" && (
          <div data-ocid="profil.notifications_section">
            {/* Action bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20">
              <p className="text-sm text-muted-foreground">
                {notifications.length} notification
                {notifications.length > 1 ? "s" : ""}
                {nonLues > 0 && (
                  <span className="ml-1 text-primary font-semibold">
                    ({nonLues} non lue{nonLues > 1 ? "s" : ""})
                  </span>
                )}
              </p>
              {nonLues > 0 && (
                <button
                  type="button"
                  onClick={marquerToutesLues}
                  className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-smooth"
                  data-ocid="profil.mark_all_read_button"
                >
                  <CheckCheck className="w-3.5 h-3.5" /> Tout lire
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-16 px-8 text-center"
                data-ocid="profil.notifications_empty_state"
              >
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Bell className="w-7 h-7 text-muted-foreground" />
                </div>
                <p className="font-semibold text-foreground mb-1">
                  Aucune notification
                </p>
                <p className="text-sm text-muted-foreground">
                  Vous serez alerté lors des mises à jour importantes.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.map((notif, idx) => (
                  <ItemNotification
                    key={notif.id}
                    notif={notif}
                    index={idx + 1}
                    onMarquerLue={marquerLue}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
