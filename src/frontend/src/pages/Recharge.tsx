// ── Page Recharge — BusPass Algeria ──────────────────────────────────────────
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatSolde } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle2,
  CreditCard,
  Loader2,
  RefreshCw,
  Smartphone,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ── Montants prédéfinis ──────────────────────────────────────────────────────
const MONTANTS_PREDEFS = [
  { valeur: 100000, label: "1 000 DA" },
  { valeur: 250000, label: "2 500 DA" },
  { valeur: 500000, label: "5 000 DA" },
];

// ── Générateur référence transaction ────────────────────────────────────────
function genererRefTransaction(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "BM-";
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

// ── Types état ────────────────────────────────────────────────────────────────
type EtatRecharge = "idle" | "chargement" | "succes" | "erreur";

// ── Composant principal ───────────────────────────────────────────────────────
export default function Recharge() {
  const { utilisateur, mettreAJourSolde } = useAuth();
  const { ajouterNotification } = useNotifications();

  const [montantSelectionne, setMontantSelectionne] = useState<number | null>(
    null,
  );
  const [montantPersonnalise, setMontantPersonnalise] = useState("");
  const [etat, setEtat] = useState<EtatRecharge>("idle");
  const [refTransaction, setRefTransaction] = useState("");
  const [montantConfirme, setMontantConfirme] = useState(0);

  // Calcul montant effectif (en centimes)
  const montantEffectif =
    montantSelectionne !== null
      ? montantSelectionne
      : montantPersonnalise
        ? Math.round(Number.parseFloat(montantPersonnalise) * 100)
        : 0;

  const montantValide = montantEffectif >= 50000 && montantEffectif <= 5000000;

  function handleMontantPersonnalise(val: string) {
    setMontantSelectionne(null);
    setMontantPersonnalise(val.replace(/[^0-9]/g, ""));
  }

  function handleSelectPredef(valeur: number) {
    setMontantSelectionne(valeur);
    setMontantPersonnalise("");
  }

  async function handleRecharger() {
    if (!utilisateur || !montantValide) return;
    const montantFinal = montantEffectif;
    setEtat("chargement");

    // Simulation délai BaridiMob (2–3 secondes)
    const delai = 2000 + Math.random() * 1000;
    await new Promise((r) => setTimeout(r, delai));

    // 90% succès, 10% erreur
    const estSucces = Math.random() < 0.9;

    if (estSucces) {
      const ref = genererRefTransaction();
      const nouveauSolde = utilisateur.solde + montantFinal;
      mettreAJourSolde(nouveauSolde);
      ajouterNotification(
        "recharge_succes",
        `Votre solde a été rechargé de ${formatSolde(montantFinal)} DZD via BaridiMob. Nouveau solde: ${formatSolde(nouveauSolde)} DZD. Réf: ${ref}`,
      );
      setRefTransaction(ref);
      setMontantConfirme(montantFinal);
      setEtat("succes");
      toast.success("Recharge effectuée avec succès !");
    } else {
      setEtat("erreur");
      toast.error("Échec de la recharge. Veuillez réessayer.");
    }
  }

  function handleRecommencer() {
    setEtat("idle");
    setMontantSelectionne(null);
    setMontantPersonnalise("");
    setRefTransaction("");
    setMontantConfirme(0);
  }

  return (
    <Layout titre="Recharger le solde" retour="/tableau-de-bord">
      <div className="px-4 pt-6 pb-8 space-y-6 max-w-lg mx-auto">
        {/* ── Solde actuel ── */}
        {utilisateur && (
          <div
            className="rounded-2xl bg-primary text-primary-foreground p-5 flex items-center justify-between"
            data-ocid="recharge.balance_card"
          >
            <div>
              <p className="text-sm opacity-80 mb-0.5">Solde actuel</p>
              <p className="text-3xl font-display font-bold tracking-tight">
                {formatSolde(utilisateur.solde)}
                <span className="text-base font-normal ml-1 opacity-80">
                  DZD
                </span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
        )}

        {/* ── État succès ── */}
        {etat === "succes" && utilisateur && (
          <div
            className="rounded-2xl bg-card border border-border p-6 text-center space-y-4"
            data-ocid="recharge.success_state"
          >
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-foreground mb-1">
                Recharge réussie !
              </h2>
              <p className="text-muted-foreground text-sm">
                {formatSolde(montantConfirme)} DZD ajoutés à votre compte
              </p>
            </div>
            <div className="bg-muted/40 rounded-xl p-4 space-y-2 text-left">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Méthode</span>
                <span className="font-semibold flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-accent" /> BaridiMob
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Montant rechargé</span>
                <span className="font-bold text-primary">
                  {formatSolde(montantConfirme)} DZD
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Référence</span>
                <span className="font-mono font-semibold text-foreground text-xs">
                  {refTransaction}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-border pt-2 mt-1">
                <span className="text-muted-foreground">Nouveau solde</span>
                <span className="font-bold text-foreground text-base">
                  {formatSolde(utilisateur.solde)} DZD
                </span>
              </div>
            </div>
            <Button
              onClick={handleRecommencer}
              variant="outline"
              className="w-full h-12"
              data-ocid="recharge.new_recharge_button"
            >
              Effectuer une autre recharge
            </Button>
          </div>
        )}

        {/* ── État erreur ── */}
        {etat === "erreur" && (
          <div
            className="rounded-2xl bg-destructive/5 border border-destructive/20 p-5 text-center space-y-4"
            data-ocid="recharge.error_state"
          >
            <div className="flex justify-center">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-foreground mb-1">
                Échec de la recharge
              </h2>
              <p className="text-sm text-muted-foreground">
                La transaction BaridiMob n'a pas abouti. Vérifiez votre solde
                BaridiMob et réessayez.
              </p>
            </div>
            <Button
              onClick={handleRecommencer}
              className="w-full h-12 gap-2"
              data-ocid="recharge.retry_button"
            >
              <RefreshCw className="w-4 h-4" /> Réessayer
            </Button>
          </div>
        )}

        {/* ── Formulaire (idle + chargement) ── */}
        {(etat === "idle" || etat === "chargement") && (
          <>
            {/* Montants prédéfinis */}
            <div className="space-y-3" data-ocid="recharge.amounts_section">
              <Label className="text-sm font-semibold text-foreground">
                Montant rapide
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {MONTANTS_PREDEFS.map(({ valeur, label }, i) => (
                  <button
                    key={valeur}
                    type="button"
                    onClick={() => handleSelectPredef(valeur)}
                    disabled={etat === "chargement"}
                    className={cn(
                      "rounded-xl py-4 px-2 text-center font-semibold text-sm border-2 transition-smooth disabled:opacity-50",
                      montantSelectionne === valeur
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-foreground hover:border-primary/40",
                    )}
                    data-ocid={`recharge.preset_button.${i + 1}`}
                  >
                    <Zap
                      className={cn(
                        "w-4 h-4 mx-auto mb-1",
                        montantSelectionne === valeur
                          ? "text-primary"
                          : "text-accent",
                      )}
                    />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Séparateur */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-medium">
                ou montant personnalisé
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Montant personnalisé */}
            <div className="space-y-2">
              <Label htmlFor="montant-custom" className="text-sm font-semibold">
                Montant en dinars (DZD)
              </Label>
              <div className="relative">
                <Input
                  id="montant-custom"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ex: 3000"
                  value={montantPersonnalise}
                  onChange={(e) => handleMontantPersonnalise(e.target.value)}
                  disabled={etat === "chargement"}
                  className="h-12 pr-14 text-base"
                  data-ocid="recharge.custom_amount_input"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                  DZD
                </span>
              </div>
              {montantPersonnalise && !montantValide && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="recharge.amount_field_error"
                >
                  Montant entre 500 DA et 50 000 DA
                </p>
              )}
            </div>

            {/* Récapitulatif */}
            {montantEffectif > 0 && montantValide && (
              <div className="rounded-xl bg-muted/40 border border-border p-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Montant à recharger
                </span>
                <span className="font-bold text-primary text-lg">
                  {formatSolde(montantEffectif)} DZD
                </span>
              </div>
            )}

            {/* Bouton principal */}
            <Button
              onClick={handleRecharger}
              disabled={!montantValide || etat === "chargement"}
              className="w-full h-14 text-base font-semibold gap-3 rounded-xl"
              data-ocid="recharge.submit_button"
            >
              {etat === "chargement" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Traitement en cours…
                </>
              ) : (
                <>
                  <Smartphone className="w-5 h-5" />
                  Recharger via BaridiMob
                </>
              )}
            </Button>

            {/* Note sécurité */}
            <p className="text-center text-xs text-muted-foreground leading-relaxed">
              🔒 Paiement sécurisé via BaridiMob. Votre solde sera mis à jour
              instantanément après confirmation.
            </p>
          </>
        )}
      </div>
    </Layout>
  );
}
