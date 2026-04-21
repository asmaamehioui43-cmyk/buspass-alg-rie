import { Button } from "@/components/ui/button";
// ── Page d'accueil — BusPass Algeria ─────────────────────────────────────────
import { Link } from "@tanstack/react-router";
import { Bus, CheckCircle2, MapPin, Smartphone } from "lucide-react";

const AVANTAGES = [
  { icone: MapPin, texte: "Suivez vos lignes en temps réel" },
  { icone: Smartphone, texte: "Paiement rapide par QR code" },
  { icone: CheckCircle2, texte: "Historique complet de vos trajets" },
];

export default function Accueil() {
  return (
    <div className="flex flex-col min-h-dvh bg-primary overflow-hidden">
      {/* Zone héro — fond vert primaire */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-14 pb-8 text-center text-primary-foreground relative">
        {/* Cercles décoratifs */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3"
          style={{ background: "oklch(var(--primary-foreground))" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 translate-y-1/3 -translate-x-1/3"
          style={{ background: "oklch(var(--primary-foreground))" }}
          aria-hidden="true"
        />

        {/* Logo */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center shadow-lg border border-primary-foreground/20">
            <Bus className="w-12 h-12 text-primary-foreground" />
          </div>
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow-md">
            <span className="w-2 h-2 rounded-full bg-accent-foreground" />
          </span>
        </div>

        {/* Titre */}
        <h1 className="font-display text-5xl font-bold tracking-tight mb-1">
          BusPass
        </h1>
        <p className="text-primary-foreground/90 text-lg font-medium mb-2">
          Transport urbain Algérie
        </p>
        <p className="text-primary-foreground/60 text-sm max-w-[280px] leading-relaxed">
          Naâma · M'sharia · Aïn Sefra
        </p>

        {/* Avantages */}
        <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
          {AVANTAGES.map(({ icone: Icone, texte }) => (
            <div
              key={texte}
              className="flex items-center gap-3 bg-primary-foreground/10 rounded-xl px-4 py-3 border border-primary-foreground/15"
            >
              <div className="w-8 h-8 rounded-lg bg-accent/80 flex items-center justify-center shrink-0">
                <Icone className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium text-primary-foreground/90 text-left">
                {texte}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Zone CTA — fond légèrement plus foncé */}
      <div className="bg-primary/90 px-6 pb-10 pt-6 flex flex-col gap-3 max-w-sm mx-auto w-full">
        <Link to="/connexion" className="w-full">
          <Button
            className="w-full h-14 text-base font-bold bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-smooth shadow-md"
            data-ocid="accueil.connexion_button"
          >
            Se connecter
          </Button>
        </Link>

        <Link to="/inscription" className="w-full">
          <Button
            variant="outline"
            className="w-full h-14 text-base font-semibold border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 transition-smooth"
            data-ocid="accueil.inscription_button"
          >
            Créer un compte gratuit
          </Button>
        </Link>

        <p className="text-center text-primary-foreground/40 text-xs mt-1">
          Version démo — données simulées
        </p>
      </div>
    </div>
  );
}
