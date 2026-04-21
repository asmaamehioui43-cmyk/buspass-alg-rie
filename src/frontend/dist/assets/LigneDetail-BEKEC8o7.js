import { d as useParams, m as mockLignes, e as mockBus, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-DUhyqyFb.js";
import { L as Layout, B as Badge } from "./Layout-DDt5v_fd.js";
import { B as Button } from "./button-CdhFZ59Z.js";
import { C as Card } from "./card-MZW6CVrX.js";
import { c as createLucideIcon, a as cn } from "./createLucideIcon-j6fs3MjL.js";
import { R as REGIONS } from "./index-CDC68prk.js";
import { B as Bus } from "./bus-DPlZB0_1.js";
import { M as MapPin } from "./map-pin-xx-aFEzN.js";
import { C as Clock } from "./clock-LzN1NZmX.js";
import { C as CircleCheck } from "./circle-check-D2eFc3Gy.js";
import { C as ChevronLeft } from "./chevron-left-CGIb9UqK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }]
];
const Banknote = createLucideIcon("banknote", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
];
const Navigation = createLucideIcon("navigation", __iconNode);
function genererHoraires(nbStations) {
  const base = /* @__PURE__ */ new Date();
  base.setMinutes(Math.floor(base.getMinutes() / 15) * 15, 0, 0);
  return Array.from({ length: nbStations }, (_, i) => {
    const t = new Date(base.getTime() + i * 8 * 6e4);
    return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
  });
}
function LigneDetail() {
  const { ligneId } = useParams({ from: "/bus/$ligneId" });
  const ligne = mockLignes.find((l) => l.id === Number(ligneId));
  const busEnLigne = mockBus.find((b) => b.ligneId === Number(ligneId));
  const positionInitiale = (busEnLigne == null ? void 0 : busEnLigne.positionStation) ?? 0;
  const [positionBus, setPositionBus] = reactExports.useState(positionInitiale);
  const [enMouvement, setEnMouvement] = reactExports.useState(false);
  const intervalRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!ligne) return;
    const total = ligne.stations.length;
    intervalRef.current = setInterval(() => {
      setEnMouvement(true);
      setTimeout(() => {
        setPositionBus((prev) => (prev + 1) % total);
        setEnMouvement(false);
      }, 600);
    }, 8e3);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [ligne]);
  if (!ligne) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { titre: "Ligne introuvable", retour: "/bus", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-4 py-16 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bus, { className: "w-16 h-16 text-muted-foreground/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-lg", children: "Ligne introuvable" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "Cette ligne n'existe pas ou a été supprimée." })
    ] }) });
  }
  const horaires = genererHoraires(ligne.stations.length);
  const stationDepart = ligne.stations[0];
  const stationArrivee = ligne.stations[ligne.stations.length - 1];
  const progression = Math.round(
    positionBus / (ligne.stations.length - 1) * 100
  );
  function handlePaiement() {
    ue.success(
      `Trajet ligne ${ligne.numero} — ${ligne.tarif} DZD débité de votre solde.`,
      { description: "Transaction enregistrée via BaridiMob." }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { titre: ligne.numero, retour: "/bus", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary px-4 pt-5 pb-10 text-primary-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bus, { className: "w-7 h-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold", children: ligne.numero }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent text-accent-foreground border-0 text-xs", children: ligne.statut === "en_service" ? "En service" : "Planifié" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-sm mt-0.5 line-clamp-2", children: ligne.nom }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 opacity-70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/70 text-xs", children: REGIONS[ligne.region] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mt-5", children: [
        { label: "Tarif", value: `${ligne.tarif} DZD`, icon: Banknote },
        {
          label: "Fréquence",
          value: `${ligne.frequenceMin} min`,
          icon: Clock
        },
        {
          label: "Arrêts",
          value: String(ligne.stations.length),
          icon: MapPin
        }
      ].map(({ label, value, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-primary-foreground/10 rounded-xl p-3 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 mx-auto mb-1 opacity-70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] opacity-60", children: label })
          ]
        },
        label
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 -mt-5 flex flex-col gap-4 pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "p-4 flex flex-col gap-3",
          "data-ocid": "ligne.progression_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Progression du trajet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-primary", children: [
                progression,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-700 ease-in-out",
                style: { width: `${progression}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[45%]", children: stationDepart.nom }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[45%] text-right", children: stationArrivee.nom })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "w-full h-14 text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-md transition-smooth",
          onClick: handlePaiement,
          "data-ocid": "ligne.payer_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-5 h-5 mr-2" }),
            "Payer ",
            ligne.tarif,
            " DZD avec QR Code"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "p-4 flex items-center gap-0",
          "data-ocid": "ligne.horaires_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Départ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-foreground", children: horaires[0] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground truncate max-w-[100px] mx-auto", children: stationDepart.nom.split(" ")[0] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 px-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-px bg-border" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-3.5 h-3.5 text-primary rotate-90" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-px bg-border" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                stationArrivee.etaMinutes,
                " min"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Arrivée" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-foreground", children: horaires[horaires.length - 1] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground truncate max-w-[100px] mx-auto", children: stationArrivee.nom.split(" ")[0] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", "data-ocid": "ligne.stations_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: "Arrêts de la ligne" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/10 text-primary border-0 text-[10px]", children: [
            ligne.stations.length,
            " arrêts"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: ligne.stations.map((station, index) => {
          const estActuel = index === positionBus;
          const estPasse = index < positionBus;
          const estDernier = index === ligne.stations.length - 1;
          const estPremier = index === 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-3",
              "data-ocid": `ligne.station.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center w-6 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-smooth z-10",
                        estActuel ? "border-accent bg-accent scale-110 shadow-md" : estPasse ? "border-primary bg-primary" : estPremier || estDernier ? "border-primary bg-primary" : "border-border bg-card"
                      ),
                      children: estActuel ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Bus,
                        {
                          className: cn(
                            "w-2.5 h-2.5 text-accent-foreground transition-smooth",
                            enMouvement && "animate-bounce"
                          )
                        }
                      ) : estPasse ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5 text-primary-foreground" }) : estPremier || estDernier ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5 text-primary-foreground" }) : null
                    }
                  ),
                  !estDernier && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "w-0.5 flex-1 min-h-[32px] my-0.5 transition-smooth",
                        estPasse ? "bg-primary/60" : "bg-border"
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: cn(
                      "flex-1 pb-4 min-w-0 flex items-start justify-between gap-2",
                      estDernier && "pb-0"
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: cn(
                              "text-sm font-medium leading-tight",
                              estActuel ? "text-accent font-bold" : estPasse ? "text-muted-foreground line-through decoration-muted-foreground/40" : estPremier || estDernier ? "text-primary font-semibold" : "text-foreground"
                            ),
                            children: station.nom
                          }
                        ),
                        estActuel && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 mt-0.5 text-[10px] font-semibold text-accent bg-accent/10 px-1.5 py-0.5 rounded-full", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent animate-pulse" }),
                          "Bus ici maintenant"
                        ] }),
                        !estActuel && station.etaMinutes !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                          station.etaMinutes === 0 ? "Départ" : `+${station.etaMinutes} min`
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: cn(
                            "text-xs font-mono shrink-0",
                            estActuel ? "text-accent font-bold" : estPasse ? "text-muted-foreground/50" : "text-muted-foreground"
                          ),
                          children: horaires[index]
                        }
                      )
                    ]
                  }
                )
              ]
            },
            `station-${station.ordre}`
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "w-full h-12 font-medium transition-smooth",
          onClick: () => window.history.back(),
          "data-ocid": "ligne.retour_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4 mr-1" }),
            "Retour aux lignes"
          ]
        }
      )
    ] })
  ] }) });
}
export {
  LigneDetail as default
};
