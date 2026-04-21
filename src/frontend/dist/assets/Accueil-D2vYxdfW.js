import { j as jsxRuntimeExports, L as Link } from "./index-DUhyqyFb.js";
import { B as Button } from "./button-CdhFZ59Z.js";
import { B as Bus } from "./bus-DPlZB0_1.js";
import { M as MapPin } from "./map-pin-xx-aFEzN.js";
import { S as Smartphone } from "./smartphone-BE8FrKkT.js";
import { C as CircleCheck } from "./circle-check-D2eFc3Gy.js";
import "./createLucideIcon-j6fs3MjL.js";
const AVANTAGES = [
  { icone: MapPin, texte: "Suivez vos lignes en temps réel" },
  { icone: Smartphone, texte: "Paiement rapide par QR code" },
  { icone: CircleCheck, texte: "Historique complet de vos trajets" }
];
function Accueil() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-dvh bg-primary overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center px-6 pt-14 pb-8 text-center text-primary-foreground relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3",
          style: { background: "oklch(var(--primary-foreground))" },
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 translate-y-1/3 -translate-x-1/3",
          style: { background: "oklch(var(--primary-foreground))" },
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-3xl bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center shadow-lg border border-primary-foreground/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bus, { className: "w-12 h-12 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-accent-foreground" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl font-bold tracking-tight mb-1", children: "BusPass" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/90 text-lg font-medium mb-2", children: "Transport urbain Algérie" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/60 text-sm max-w-[280px] leading-relaxed", children: "Naâma · M'sharia · Aïn Sefra" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-col gap-3 w-full max-w-xs", children: AVANTAGES.map(({ icone: Icone, texte }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 bg-primary-foreground/10 rounded-xl px-4 py-3 border border-primary-foreground/15",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-accent/80 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icone, { className: "w-4 h-4 text-accent-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-primary-foreground/90 text-left", children: texte })
          ]
        },
        texte
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/90 px-6 pb-10 pt-6 flex flex-col gap-3 max-w-sm mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/connexion", className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "w-full h-14 text-base font-bold bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-smooth shadow-md",
          "data-ocid": "accueil.connexion_button",
          children: "Se connecter"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/inscription", className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "w-full h-14 text-base font-semibold border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 transition-smooth",
          "data-ocid": "accueil.inscription_button",
          children: "Créer un compte gratuit"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-primary-foreground/40 text-xs mt-1", children: "Version démo — données simulées" })
    ] })
  ] });
}
export {
  Accueil as default
};
