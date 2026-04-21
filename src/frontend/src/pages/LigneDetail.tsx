// ── Page détail d'une ligne — BusPass Algeria ─────────────────────────────────
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockBus, mockLignes } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { REGIONS } from "@/types";
import { useParams } from "@tanstack/react-router";
import {
  Banknote,
  Bus,
  CheckCircle2,
  ChevronLeft,
  Clock,
  MapPin,
  Navigation,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── Horaires simulés ──────────────────────────────────────────────────────────
function genererHoraires(nbStations: number) {
  const base = new Date();
  base.setMinutes(Math.floor(base.getMinutes() / 15) * 15, 0, 0);
  return Array.from({ length: nbStations }, (_, i) => {
    const t = new Date(base.getTime() + i * 8 * 60000);
    return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
  });
}

export default function LigneDetail() {
  const { ligneId } = useParams({ from: "/bus/$ligneId" });
  const ligne = mockLignes.find((l) => l.id === Number(ligneId));

  // Position initiale du bus sur cette ligne
  const busEnLigne = mockBus.find((b) => b.ligneId === Number(ligneId));
  const positionInitiale = busEnLigne?.positionStation ?? 0;

  const [positionBus, setPositionBus] = useState(positionInitiale);
  const [enMouvement, setEnMouvement] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulation : le bus avance d'une station toutes les 8 secondes
  useEffect(() => {
    if (!ligne) return;
    const total = ligne.stations.length;

    intervalRef.current = setInterval(() => {
      setEnMouvement(true);
      setTimeout(() => {
        setPositionBus((prev) => (prev + 1) % total);
        setEnMouvement(false);
      }, 600);
    }, 8000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [ligne]);

  if (!ligne) {
    return (
      <Layout titre="Ligne introuvable" retour="/bus">
        <div className="flex flex-col items-center justify-center gap-4 py-16 px-4">
          <Bus className="w-16 h-16 text-muted-foreground/40" />
          <p className="font-semibold text-lg">Ligne introuvable</p>
          <p className="text-sm text-muted-foreground text-center">
            Cette ligne n'existe pas ou a été supprimée.
          </p>
        </div>
      </Layout>
    );
  }

  const horaires = genererHoraires(ligne.stations.length);
  const stationDepart = ligne.stations[0];
  const stationArrivee = ligne.stations[ligne.stations.length - 1];
  const progression = Math.round(
    (positionBus / (ligne.stations.length - 1)) * 100,
  );

  function handlePaiement() {
    toast.success(
      `Trajet ligne ${ligne!.numero} — ${ligne!.tarif} DZD débité de votre solde.`,
      { description: "Transaction enregistrée via BaridiMob." },
    );
  }

  return (
    <Layout titre={ligne.numero} retour="/bus">
      <div className="flex flex-col gap-0">
        {/* ── Hero avec dégradé ── */}
        <div className="bg-primary px-4 pt-5 pb-10 text-primary-foreground">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
              <Bus className="w-7 h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display text-xl font-bold">
                  {ligne.numero}
                </h1>
                <Badge className="bg-accent text-accent-foreground border-0 text-xs">
                  {ligne.statut === "en_service" ? "En service" : "Planifié"}
                </Badge>
              </div>
              <p className="text-primary-foreground/80 text-sm mt-0.5 line-clamp-2">
                {ligne.nom}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 opacity-70" />
                <span className="text-primary-foreground/70 text-xs">
                  {REGIONS[ligne.region]}
                </span>
              </div>
            </div>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { label: "Tarif", value: `${ligne.tarif} DZD`, icon: Banknote },
              {
                label: "Fréquence",
                value: `${ligne.frequenceMin} min`,
                icon: Clock,
              },
              {
                label: "Arrêts",
                value: String(ligne.stations.length),
                icon: MapPin,
              },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="bg-primary-foreground/10 rounded-xl p-3 text-center"
              >
                <Icon className="w-4 h-4 mx-auto mb-1 opacity-70" />
                <p className="text-sm font-bold">{value}</p>
                <p className="text-[10px] opacity-60">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Contenu principal ── */}
        <div className="px-4 -mt-5 flex flex-col gap-4 pb-8">
          {/* Barre de progression du trajet */}
          <Card
            className="p-4 flex flex-col gap-3"
            data-ocid="ligne.progression_card"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Progression du trajet
              </p>
              <span className="text-xs font-bold text-primary">
                {progression}%
              </span>
            </div>
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-700 ease-in-out"
                style={{ width: `${progression}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span className="truncate max-w-[45%]">{stationDepart.nom}</span>
              <span className="truncate max-w-[45%] text-right">
                {stationArrivee.nom}
              </span>
            </div>
          </Card>

          {/* Bouton payer */}
          <Button
            className="w-full h-14 text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-md transition-smooth"
            onClick={handlePaiement}
            data-ocid="ligne.payer_button"
          >
            <Banknote className="w-5 h-5 mr-2" />
            Payer {ligne.tarif} DZD avec QR Code
          </Button>

          {/* Horaires départ / arrivée */}
          <Card
            className="p-4 flex items-center gap-0"
            data-ocid="ligne.horaires_card"
          >
            <div className="flex-1 text-center">
              <p className="text-xs text-muted-foreground mb-0.5">Départ</p>
              <p className="text-lg font-display font-bold text-foreground">
                {horaires[0]}
              </p>
              <p className="text-[11px] text-muted-foreground truncate max-w-[100px] mx-auto">
                {stationDepart.nom.split(" ")[0]}
              </p>
            </div>
            <div className="flex flex-col items-center gap-1 px-4">
              <div className="flex items-center gap-1">
                <div className="w-8 h-px bg-border" />
                <Navigation className="w-3.5 h-3.5 text-primary rotate-90" />
                <div className="w-8 h-px bg-border" />
              </div>
              <p className="text-[10px] text-muted-foreground">
                {stationArrivee.etaMinutes} min
              </p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-xs text-muted-foreground mb-0.5">Arrivée</p>
              <p className="text-lg font-display font-bold text-foreground">
                {horaires[horaires.length - 1]}
              </p>
              <p className="text-[11px] text-muted-foreground truncate max-w-[100px] mx-auto">
                {stationArrivee.nom.split(" ")[0]}
              </p>
            </div>
          </Card>

          {/* Liste des stations — style chemin de fer vertical */}
          <Card className="p-4" data-ocid="ligne.stations_card">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-sm">Arrêts de la ligne</p>
              <Badge className="bg-primary/10 text-primary border-0 text-[10px]">
                {ligne.stations.length} arrêts
              </Badge>
            </div>

            <div className="flex flex-col">
              {ligne.stations.map((station, index) => {
                const estActuel = index === positionBus;
                const estPasse = index < positionBus;
                const estDernier = index === ligne.stations.length - 1;
                const estPremier = index === 0;

                return (
                  <div
                    key={`station-${station.ordre}`}
                    className="flex items-start gap-3"
                    data-ocid={`ligne.station.${index + 1}`}
                  >
                    {/* Colonne timeline */}
                    <div className="flex flex-col items-center w-6 shrink-0">
                      {/* Point de station */}
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-smooth z-10",
                          estActuel
                            ? "border-accent bg-accent scale-110 shadow-md"
                            : estPasse
                              ? "border-primary bg-primary"
                              : estPremier || estDernier
                                ? "border-primary bg-primary"
                                : "border-border bg-card",
                        )}
                      >
                        {estActuel ? (
                          <Bus
                            className={cn(
                              "w-2.5 h-2.5 text-accent-foreground transition-smooth",
                              enMouvement && "animate-bounce",
                            )}
                          />
                        ) : estPasse ? (
                          <CheckCircle2 className="w-2.5 h-2.5 text-primary-foreground" />
                        ) : estPremier || estDernier ? (
                          <CheckCircle2 className="w-2.5 h-2.5 text-primary-foreground" />
                        ) : null}
                      </div>

                      {/* Ligne de connexion */}
                      {!estDernier && (
                        <div
                          className={cn(
                            "w-0.5 flex-1 min-h-[32px] my-0.5 transition-smooth",
                            estPasse ? "bg-primary/60" : "bg-border",
                          )}
                        />
                      )}
                    </div>

                    {/* Contenu station */}
                    <div
                      className={cn(
                        "flex-1 pb-4 min-w-0 flex items-start justify-between gap-2",
                        estDernier && "pb-0",
                      )}
                    >
                      <div className="min-w-0">
                        <p
                          className={cn(
                            "text-sm font-medium leading-tight",
                            estActuel
                              ? "text-accent font-bold"
                              : estPasse
                                ? "text-muted-foreground line-through decoration-muted-foreground/40"
                                : estPremier || estDernier
                                  ? "text-primary font-semibold"
                                  : "text-foreground",
                          )}
                        >
                          {station.nom}
                        </p>
                        {estActuel && (
                          <span className="inline-flex items-center gap-1 mt-0.5 text-[10px] font-semibold text-accent bg-accent/10 px-1.5 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            Bus ici maintenant
                          </span>
                        )}
                        {!estActuel && station.etaMinutes !== undefined && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {station.etaMinutes === 0
                              ? "Départ"
                              : `+${station.etaMinutes} min`}
                          </p>
                        )}
                      </div>

                      {/* Heure planifiée */}
                      <span
                        className={cn(
                          "text-xs font-mono shrink-0",
                          estActuel
                            ? "text-accent font-bold"
                            : estPasse
                              ? "text-muted-foreground/50"
                              : "text-muted-foreground",
                        )}
                      >
                        {horaires[index]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Bouton retour */}
          <Button
            variant="outline"
            className="w-full h-12 font-medium transition-smooth"
            onClick={() => window.history.back()}
            data-ocid="ligne.retour_button"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Retour aux lignes
          </Button>
        </div>
      </div>
    </Layout>
  );
}
