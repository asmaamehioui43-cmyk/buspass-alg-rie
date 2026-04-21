import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type InscriptionData, useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  RefreshCw,
  Shield,
} from "lucide-react";
// ── Page Inscription multi-étapes — BusPass Algeria ───────────────────────────
import { useState } from "react";
import { toast } from "sonner";

// ── Force du mot de passe ─────────────────────────────────────────────────────
type ForceMotDePasse = "faible" | "moyen" | "fort";

function evaluerForceMdp(mdp: string): ForceMotDePasse {
  if (mdp.length < 6) return "faible";
  let score = 0;
  if (mdp.length >= 8) score++;
  if (/[A-Z]/.test(mdp)) score++;
  if (/[0-9]/.test(mdp)) score++;
  if (/[^A-Za-z0-9]/.test(mdp)) score++;
  if (score <= 1) return "faible";
  if (score <= 2) return "moyen";
  return "fort";
}

function genererMotDePasse(): string {
  const lettres = "abcdefghijklmnopqrstuvwxyz";
  const majuscules = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const chiffres = "0123456789";
  const speciaux = "@#!$%";
  const pool = lettres + majuscules + chiffres + speciaux;
  let mdp = "";
  mdp += lettres[Math.floor(Math.random() * lettres.length)];
  mdp += majuscules[Math.floor(Math.random() * majuscules.length)];
  mdp += chiffres[Math.floor(Math.random() * chiffres.length)];
  mdp += speciaux[Math.floor(Math.random() * speciaux.length)];
  for (let i = 0; i < 8; i++) {
    mdp += pool[Math.floor(Math.random() * pool.length)];
  }
  return mdp
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

const FORCE_CONFIG: Record<
  ForceMotDePasse,
  { label: string; couleur: string; barres: number }
> = {
  faible: { label: "Faible", couleur: "bg-destructive", barres: 1 },
  moyen: { label: "Moyen", couleur: "bg-accent", barres: 2 },
  fort: { label: "Fort", couleur: "bg-primary", barres: 3 },
};

// ── Composant indicateur de force ─────────────────────────────────────────────
function IndicateurForce({ motDePasse }: { motDePasse: string }) {
  if (!motDePasse) return null;
  const force = evaluerForceMdp(motDePasse);
  const { label, couleur, barres } = FORCE_CONFIG[force];
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex gap-1 flex-1">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full transition-smooth ${n <= barres ? couleur : "bg-muted"}`}
          />
        ))}
      </div>
      <span
        className={`text-xs font-medium ${couleur.replace("bg-", "text-")}`}
      >
        {label}
      </span>
    </div>
  );
}

// ── Indicateur d'étapes ───────────────────────────────────────────────────────
function IndicateurEtapes({ etape }: { etape: 1 | 2 }) {
  return (
    <div className="flex items-center gap-2">
      {([1, 2] as const).map((n) => (
        <div key={n} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${
              n <= etape
                ? "bg-primary-foreground text-primary"
                : "bg-primary-foreground/20 text-primary-foreground/50"
            }`}
          >
            {n}
          </div>
          {n === 1 && (
            <div
              className={`w-8 h-0.5 rounded transition-smooth ${etape >= 2 ? "bg-primary-foreground/60" : "bg-primary-foreground/20"}`}
            />
          )}
        </div>
      ))}
      <span className="text-primary-foreground/80 text-xs ml-1 font-medium">
        Étape {etape} sur 2
      </span>
    </div>
  );
}

// ── Page principale ───────────────────────────────────────────────────────────
export default function Inscription() {
  const { inscription } = useAuth();
  const navigate = useNavigate();
  const [etape, setEtape] = useState<1 | 2>(1);
  const [afficherMdp, setAfficherMdp] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [form, setForm] = useState<InscriptionData>({
    nomComplet: "",
    telephone: "",
    email: "",
    motDePasse: "",
  });
  const [erreurs, setErreurs] = useState<
    Partial<Record<keyof InscriptionData | "global", string>>
  >({});

  const setField =
    (key: keyof InscriptionData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      setErreurs((prev) => ({ ...prev, [key]: undefined }));
    };

  function validerEtape1(): boolean {
    const e: typeof erreurs = {};
    if (!form.nomComplet.trim() || form.nomComplet.trim().length < 3)
      e.nomComplet = "Le nom complet doit contenir au moins 3 caractères.";
    if (!/^0[5-7]\d{8}$/.test(form.telephone))
      e.telephone = "Numéro algérien invalide (ex: 0551234567).";
    setErreurs(e);
    return Object.keys(e).length === 0;
  }

  function validerEtape2(): boolean {
    const e: typeof erreurs = {};
    if (!form.motDePasse || form.motDePasse.length < 8)
      e.motDePasse = "Le mot de passe doit contenir au moins 8 caractères.";
    setErreurs(e);
    return Object.keys(e).length === 0;
  }

  function handleContinuer() {
    if (validerEtape1()) setEtape(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validerEtape2()) return;
    setChargement(true);
    try {
      const { succes, message } = await inscription({
        ...form,
        email: form.email?.trim() || undefined,
      });
      if (succes) {
        toast.success("Compte créé ! Vérifiez votre numéro.");
        localStorage.setItem("buspass_pending_phone", form.telephone.trim());
        navigate({ to: "/otp" });
      } else {
        setErreurs({ global: message });
      }
    } finally {
      setChargement(false);
    }
  }

  function suggererMotDePasse() {
    const mdp = genererMotDePasse();
    setForm((prev) => ({ ...prev, motDePasse: mdp }));
    setAfficherMdp(true);
    setErreurs((prev) => ({ ...prev, motDePasse: undefined }));
    toast.info("Mot de passe suggéré — pensez à le noter !");
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      {/* En-tête vert avec indicateur d'étapes */}
      <div className="bg-primary px-6 pt-10 pb-6 text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          {etape === 1 ? (
            <Link
              to="/"
              className="flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-smooth w-fit"
              data-ocid="inscription.back_button"
            >
              <ChevronLeft className="w-4 h-4" /> Accueil
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setEtape(1)}
              className="flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-smooth"
              data-ocid="inscription.back_step_button"
            >
              <ChevronLeft className="w-4 h-4" /> Retour
            </button>
          )}
          <IndicateurEtapes etape={etape} />
        </div>
        <h1 className="text-2xl font-display font-bold">Créer un compte</h1>
        <p className="text-primary-foreground/70 text-sm mt-1">
          {etape === 1
            ? "Vos informations personnelles"
            : "Sécurisez votre compte"}
        </p>
      </div>

      {/* Contenu */}
      <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* ── Étape 1 : Informations ─────────────────────────────────────── */}
        {etape === 1 && (
          <Card className="p-6 shadow-sm" data-ocid="inscription.etape1_card">
            <div className="flex flex-col gap-4">
              {/* Nom complet */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="nomComplet">Nom complet</Label>
                <Input
                  id="nomComplet"
                  type="text"
                  placeholder="Khalid Bensalem"
                  value={form.nomComplet}
                  onChange={setField("nomComplet")}
                  className="h-12 text-base"
                  autoComplete="name"
                  data-ocid="inscription.nom_input"
                />
                {erreurs.nomComplet && (
                  <p
                    className="text-destructive text-xs"
                    data-ocid="inscription.nom.field_error"
                  >
                    {erreurs.nomComplet}
                  </p>
                )}
              </div>

              {/* Téléphone */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="telephone">Numéro de téléphone</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground select-none">
                    🇩🇿
                  </span>
                  <Input
                    id="telephone"
                    type="tel"
                    placeholder="0551234567"
                    value={form.telephone}
                    onChange={setField("telephone")}
                    className="h-12 text-base pl-10"
                    inputMode="tel"
                    autoComplete="tel"
                    data-ocid="inscription.telephone_input"
                  />
                </div>
                {erreurs.telephone ? (
                  <p
                    className="text-destructive text-xs"
                    data-ocid="inscription.telephone.field_error"
                  >
                    {erreurs.telephone}
                  </p>
                ) : (
                  <p className="text-muted-foreground text-xs">
                    Format: 05X, 06X ou 07X + 8 chiffres
                  </p>
                )}
              </div>

              {/* Email (optionnel) */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">
                  Adresse e-mail{" "}
                  <span className="text-muted-foreground font-normal">
                    (optionnel)
                  </span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="khalid@exemple.dz"
                  value={form.email}
                  onChange={setField("email")}
                  className="h-12 text-base"
                  autoComplete="email"
                  data-ocid="inscription.email_input"
                />
              </div>

              {/* Bouton continuer */}
              <Button
                type="button"
                onClick={handleContinuer}
                className="h-14 text-base font-bold mt-2 transition-smooth"
                data-ocid="inscription.continuer_button"
              >
                Continuer
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Déjà inscrit ?{" "}
                <Link
                  to="/connexion"
                  className="text-primary font-semibold hover:underline"
                  data-ocid="inscription.connexion_link"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </Card>
        )}

        {/* ── Étape 2 : Mot de passe ─────────────────────────────────────── */}
        {etape === 2 && (
          <form onSubmit={handleSubmit} noValidate>
            <Card className="p-6 shadow-sm" data-ocid="inscription.etape2_card">
              <div className="flex flex-col gap-5">
                {/* Récap numéro */}
                <div className="bg-muted/50 rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Numéro vérifié
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {form.telephone}
                    </p>
                  </div>
                </div>

                {/* Mot de passe */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="motDePasse">Mot de passe</Label>
                    <button
                      type="button"
                      onClick={suggererMotDePasse}
                      className="flex items-center gap-1 text-xs text-accent font-medium hover:underline transition-smooth"
                      data-ocid="inscription.suggest_password_button"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Suggérer un mot de passe
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="motDePasse"
                      type={afficherMdp ? "text" : "password"}
                      placeholder="Minimum 8 caractères"
                      value={form.motDePasse}
                      onChange={setField("motDePasse")}
                      className="h-12 text-base pr-11"
                      autoComplete="new-password"
                      data-ocid="inscription.password_input"
                    />
                    <button
                      type="button"
                      onClick={() => setAfficherMdp(!afficherMdp)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth p-1"
                      aria-label={afficherMdp ? "Masquer" : "Afficher"}
                    >
                      {afficherMdp ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <IndicateurForce motDePasse={form.motDePasse} />
                  {erreurs.motDePasse && (
                    <p
                      className="text-destructive text-xs"
                      data-ocid="inscription.password.field_error"
                    >
                      {erreurs.motDePasse}
                    </p>
                  )}
                  <ul className="text-xs text-muted-foreground mt-1 space-y-0.5 pl-3 list-disc">
                    <li
                      className={
                        form.motDePasse.length >= 8
                          ? "text-primary font-medium"
                          : ""
                      }
                    >
                      8 caractères minimum
                    </li>
                    <li
                      className={
                        /[A-Z]/.test(form.motDePasse)
                          ? "text-primary font-medium"
                          : ""
                      }
                    >
                      Une lettre majuscule
                    </li>
                    <li
                      className={
                        /[0-9]/.test(form.motDePasse)
                          ? "text-primary font-medium"
                          : ""
                      }
                    >
                      Un chiffre
                    </li>
                  </ul>
                </div>

                {/* Erreur globale */}
                {erreurs.global && (
                  <div
                    className="bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3"
                    data-ocid="inscription.error_state"
                    role="alert"
                  >
                    <p className="text-destructive text-sm font-medium">
                      {erreurs.global}
                    </p>
                  </div>
                )}

                {/* Bouton créer */}
                <Button
                  type="submit"
                  className="h-14 text-base font-bold mt-1 transition-smooth"
                  disabled={chargement}
                  data-ocid="inscription.submit_button"
                >
                  {chargement ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                      Création du compte…
                    </span>
                  ) : (
                    "Créer mon compte"
                  )}
                </Button>
              </div>
            </Card>
          </form>
        )}
      </div>
    </div>
  );
}
