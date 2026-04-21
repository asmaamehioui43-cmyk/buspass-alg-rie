// ── Page Bus (liste des lignes) — BusPass Algeria ─────────────────────────────
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getLignesByRegion } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { REGIONS, type Region } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Bus as BusIcon,
  ChevronRight,
  Clock,
  MapPin,
  Search,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const REGIONS_LIST: Region[] = ["naama", "msharia", "ainSefra"];

export default function Bus() {
  const [recherche, setRecherche] = useState("");
  const [regionActive, setRegionActive] = useState<Region>("naama");
  const [animating, setAnimating] = useState(false);
  const prevRegion = useRef<Region>("naama");

  const lignesFiltrees = getLignesByRegion(regionActive).filter((l) => {
    return (
      !recherche ||
      l.numero.toLowerCase().includes(recherche.toLowerCase()) ||
      l.nom.toLowerCase().includes(recherche.toLowerCase())
    );
  });

  function handleRegionChange(region: Region) {
    if (region === regionActive) return;
    prevRegion.current = regionActive;
    setAnimating(true);
    setRegionActive(region);
  }

  useEffect(() => {
    if (!animating) return;
    const t = setTimeout(() => setAnimating(false), 350);
    return () => clearTimeout(t);
  }, [animating]);

  return (
    <Layout titre="Autobus">
      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Sélecteur de région */}
        <div
          className="bg-card border border-border rounded-2xl p-1 flex gap-1"
          data-ocid="bus.region_selector"
        >
          {REGIONS_LIST.map((region) => {
            const actif = regionActive === region;
            return (
              <button
                key={region}
                type="button"
                onClick={() => handleRegionChange(region)}
                className={cn(
                  "flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-smooth text-center",
                  actif
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
                data-ocid={`bus.region_tab.${region}`}
                aria-pressed={actif}
              >
                {REGIONS[region]}
              </button>
            );
          })}
        </div>

        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Rechercher ligne ou destination…"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="pl-9 h-12 text-base"
            data-ocid="bus.search_input"
          />
        </div>

        {/* Compteur */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {lignesFiltrees.length}
            </span>{" "}
            ligne{lignesFiltrees.length !== 1 ? "s" : ""} —{" "}
            {REGIONS[regionActive]}
          </p>
        </div>

        {/* Liste des lignes */}
        <div
          className={cn(
            "flex flex-col gap-3 transition-all duration-350",
            animating ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0",
          )}
          data-ocid="bus.lignes_list"
        >
          {lignesFiltrees.length === 0 ? (
            <Card
              className="p-8 flex flex-col items-center gap-3 text-center"
              data-ocid="bus.empty_state"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                <BusIcon className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="font-semibold">Aucune ligne trouvée</p>
              <p className="text-sm text-muted-foreground">
                Modifiez votre recherche ou choisissez une autre région.
              </p>
            </Card>
          ) : (
            lignesFiltrees.map((ligne, idx) => (
              <Link
                key={ligne.id}
                to="/bus/$ligneId"
                params={{ ligneId: String(ligne.id) }}
                data-ocid={`bus.ligne_card.${idx + 1}`}
              >
                <Card className="p-4 flex items-center gap-4 hover:shadow-md active:scale-[0.98] transition-smooth cursor-pointer border border-border">
                  {/* Icône / numéro */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center shrink-0 gap-0">
                    <BusIcon className="w-5 h-5 text-primary" />
                    <span className="text-[9px] font-bold text-primary leading-none mt-0.5">
                      {ligne.numero}
                    </span>
                  </div>

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="font-display font-bold text-base">
                        {ligne.numero}
                      </span>
                      <Badge
                        className={cn(
                          "text-[10px] px-1.5 py-0 border-0 shrink-0",
                          ligne.statut === "en_service"
                            ? "bg-primary/15 text-primary"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {ligne.statut === "en_service"
                          ? "En service"
                          : "Planifié"}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground truncate">
                      {ligne.nom}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {ligne.stations.length} arrêts
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        Toutes les {ligne.frequenceMin} min
                      </span>
                      <span className="text-sm font-bold text-accent">
                        {ligne.tarif} DZD
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
