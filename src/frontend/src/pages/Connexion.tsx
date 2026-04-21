import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bus, Eye, EyeOff, HelpCircle } from "lucide-react";
// ── Page Connexion — BusPass Algeria ─────────────────────────────────────────
import { useState } from "react";
import { toast } from "sonner";

export default function Connexion() {
  const { connexion } = useAuth();
  const navigate = useNavigate();
  const [telephone, setTelephone] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [afficherMdp, setAfficherMdp] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    if (!telephone.trim()) {
      setErreur("Veuillez saisir votre numéro de téléphone.");
      return;
    }
    if (!motDePasse) {
      setErreur("Veuillez saisir votre mot de passe.");
      return;
    }
    setChargement(true);
    try {
      const succes = await connexion(telephone.trim(), motDePasse);
      if (succes) {
        toast.success("Connexion réussie ! Bienvenue.");
        navigate({ to: "/tableau-de-bord" });
      } else {
        setErreur("Numéro de téléphone ou mot de passe incorrect.");
      }
    } finally {
      setChargement(false);
    }
  }

  function handleMotDePasseOublie() {
    toast.info(
      "Contactez le support BusPass pour réinitialiser votre mot de passe.",
    );
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      {/* En-tête vert */}
      <div className="bg-primary px-6 pt-12 pb-8 text-primary-foreground">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
            <Bus className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl">BusPass</span>
        </div>
        <h1 className="text-2xl font-display font-bold">Connexion</h1>
        <p className="text-primary-foreground/70 text-sm mt-1">
          Bon retour parmi nous !
        </p>
      </div>

      {/* Formulaire */}
      <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        <Card className="p-6 shadow-sm">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            noValidate
          >
            {/* Téléphone */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="telephone">Numéro de téléphone</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium select-none">
                  🇩🇿
                </span>
                <Input
                  id="telephone"
                  type="tel"
                  placeholder="0551234567"
                  value={telephone}
                  onChange={(e) => {
                    setTelephone(e.target.value);
                    setErreur("");
                  }}
                  className="h-12 text-base pl-10"
                  inputMode="tel"
                  autoComplete="tel"
                  data-ocid="connexion.telephone_input"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="motDePasse">Mot de passe</Label>
                <button
                  type="button"
                  onClick={handleMotDePasseOublie}
                  className="text-xs text-primary hover:underline flex items-center gap-1 transition-smooth"
                  data-ocid="connexion.forgot_password_button"
                >
                  <HelpCircle className="w-3 h-3" />
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="motDePasse"
                  type={afficherMdp ? "text" : "password"}
                  placeholder="••••••••"
                  value={motDePasse}
                  onChange={(e) => {
                    setMotDePasse(e.target.value);
                    setErreur("");
                  }}
                  className="h-12 text-base pr-11"
                  autoComplete="current-password"
                  data-ocid="connexion.password_input"
                />
                <button
                  type="button"
                  onClick={() => setAfficherMdp(!afficherMdp)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth p-1"
                  aria-label={
                    afficherMdp
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  {afficherMdp ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Erreur */}
            {erreur && (
              <div
                className="bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3"
                data-ocid="connexion.error_state"
                role="alert"
              >
                <p className="text-destructive text-sm font-medium">{erreur}</p>
              </div>
            )}

            {/* Bouton connexion */}
            <Button
              type="submit"
              className="h-14 text-base font-bold mt-1 transition-smooth"
              disabled={chargement}
              data-ocid="connexion.submit_button"
            >
              {chargement ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  Connexion en cours…
                </span>
              ) : (
                "Se connecter"
              )}
            </Button>

            {/* Lien inscription */}
            <p className="text-center text-sm text-muted-foreground">
              Pas encore de compte ?{" "}
              <Link
                to="/inscription"
                className="text-primary font-semibold hover:underline"
                data-ocid="connexion.inscription_link"
              >
                S'inscrire
              </Link>
            </p>
          </form>
        </Card>

        {/* Aide démo */}
        <Card className="mt-4 p-4 bg-accent/10 border-accent/30">
          <p className="text-xs font-semibold text-accent mb-1.5">
            Compte de démonstration
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Téléphone :{" "}
            <span className="font-mono font-bold text-foreground">
              0551234567
            </span>
            <br />
            Mot de passe :{" "}
            <span className="font-mono font-bold text-foreground">
              n'importe lequel
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
}
