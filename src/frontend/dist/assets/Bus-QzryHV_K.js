import { r as reactExports, g as getLignesByRegion, j as jsxRuntimeExports, L as Link } from "./index-DUhyqyFb.js";
import { L as Layout, B as Badge } from "./Layout-DDt5v_fd.js";
import { C as Card } from "./card-MZW6CVrX.js";
import { I as Input } from "./input-CbtPJOZt.js";
import { c as createLucideIcon, a as cn } from "./createLucideIcon-j6fs3MjL.js";
import { R as REGIONS } from "./index-CDC68prk.js";
import { B as Bus$1 } from "./bus-DPlZB0_1.js";
import { M as MapPin } from "./map-pin-xx-aFEzN.js";
import { C as Clock } from "./clock-LzN1NZmX.js";
import { C as ChevronRight } from "./chevron-right-Bs2Jjrmm.js";
import "./chevron-left-CGIb9UqK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const REGIONS_LIST = ["naama", "msharia", "ainSefra"];
function Bus() {
  const [recherche, setRecherche] = reactExports.useState("");
  const [regionActive, setRegionActive] = reactExports.useState("naama");
  const [animating, setAnimating] = reactExports.useState(false);
  const prevRegion = reactExports.useRef("naama");
  const lignesFiltrees = getLignesByRegion(regionActive).filter((l) => {
    return !recherche || l.numero.toLowerCase().includes(recherche.toLowerCase()) || l.nom.toLowerCase().includes(recherche.toLowerCase());
  });
  function handleRegionChange(region) {
    if (region === regionActive) return;
    prevRegion.current = regionActive;
    setAnimating(true);
    setRegionActive(region);
  }
  reactExports.useEffect(() => {
    if (!animating) return;
    const t = setTimeout(() => setAnimating(false), 350);
    return () => clearTimeout(t);
  }, [animating]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { titre: "Autobus", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border border-border rounded-2xl p-1 flex gap-1",
        "data-ocid": "bus.region_selector",
        children: REGIONS_LIST.map((region) => {
          const actif = regionActive === region;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleRegionChange(region),
              className: cn(
                "flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-smooth text-center",
                actif ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              ),
              "data-ocid": `bus.region_tab.${region}`,
              "aria-pressed": actif,
              children: REGIONS[region]
            },
            region
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "search",
          placeholder: "Rechercher ligne ou destination…",
          value: recherche,
          onChange: (e) => setRecherche(e.target.value),
          className: "pl-9 h-12 text-base",
          "data-ocid": "bus.search_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: lignesFiltrees.length }),
      " ",
      "ligne",
      lignesFiltrees.length !== 1 ? "s" : "",
      " —",
      " ",
      REGIONS[regionActive]
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "flex flex-col gap-3 transition-all duration-350",
          animating ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
        ),
        "data-ocid": "bus.lignes_list",
        children: lignesFiltrees.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "p-8 flex flex-col items-center gap-3 text-center",
            "data-ocid": "bus.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bus$1, { className: "w-8 h-8 text-muted-foreground/50" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Aucune ligne trouvée" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Modifiez votre recherche ou choisissez une autre région." })
            ]
          }
        ) : lignesFiltrees.map((ligne, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/bus/$ligneId",
            params: { ligneId: String(ligne.id) },
            "data-ocid": `bus.ligne_card.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 flex items-center gap-4 hover:shadow-md active:scale-[0.98] transition-smooth cursor-pointer border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center shrink-0 gap-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bus$1, { className: "w-5 h-5 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-primary leading-none mt-0.5", children: ligne.numero })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base", children: ligne.numero }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: cn(
                        "text-[10px] px-1.5 py-0 border-0 shrink-0",
                        ligne.statut === "en_service" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                      ),
                      children: ligne.statut === "en_service" ? "En service" : "Planifié"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground truncate", children: ligne.nom }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1.5 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                    ligne.stations.length,
                    " arrêts"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                    "Toutes les ",
                    ligne.frequenceMin,
                    " min"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-accent", children: [
                    ligne.tarif,
                    " DZD"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground shrink-0" })
            ] })
          },
          ligne.id
        ))
      }
    )
  ] }) });
}
export {
  Bus as default
};
