import { u as useAuth, r as reactExports, j as jsxRuntimeExports, f as formatSolde, b as ue } from "./index-DUhyqyFb.js";
import { u as useNotifications, L as Layout } from "./Layout-DDt5v_fd.js";
import { B as Button } from "./button-CdhFZ59Z.js";
import { I as Input } from "./input-CbtPJOZt.js";
import { L as Label } from "./label-Djb-Jo-w.js";
import { c as createLucideIcon, a as cn } from "./createLucideIcon-j6fs3MjL.js";
import { C as CreditCard } from "./credit-card-ys6N7uAu.js";
import { C as CircleCheck } from "./circle-check-D2eFc3Gy.js";
import { S as Smartphone } from "./smartphone-BE8FrKkT.js";
import { R as RefreshCw } from "./refresh-cw-oKlGoEO4.js";
import { Z as Zap } from "./zap-QSmeDqVB.js";
import "./chevron-left-CGIb9UqK.js";
import "./bus-DPlZB0_1.js";
import "./index-BFiPEdCa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
const MONTANTS_PREDEFS = [
  { valeur: 1e5, label: "1 000 DA" },
  { valeur: 25e4, label: "2 500 DA" },
  { valeur: 5e5, label: "5 000 DA" }
];
function genererRefTransaction() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "BM-";
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}
function Recharge() {
  const { utilisateur, mettreAJourSolde } = useAuth();
  const { ajouterNotification } = useNotifications();
  const [montantSelectionne, setMontantSelectionne] = reactExports.useState(
    null
  );
  const [montantPersonnalise, setMontantPersonnalise] = reactExports.useState("");
  const [etat, setEtat] = reactExports.useState("idle");
  const [refTransaction, setRefTransaction] = reactExports.useState("");
  const [montantConfirme, setMontantConfirme] = reactExports.useState(0);
  const montantEffectif = montantSelectionne !== null ? montantSelectionne : montantPersonnalise ? Math.round(Number.parseFloat(montantPersonnalise) * 100) : 0;
  const montantValide = montantEffectif >= 5e4 && montantEffectif <= 5e6;
  function handleMontantPersonnalise(val) {
    setMontantSelectionne(null);
    setMontantPersonnalise(val.replace(/[^0-9]/g, ""));
  }
  function handleSelectPredef(valeur) {
    setMontantSelectionne(valeur);
    setMontantPersonnalise("");
  }
  async function handleRecharger() {
    if (!utilisateur || !montantValide) return;
    const montantFinal = montantEffectif;
    setEtat("chargement");
    const delai = 2e3 + Math.random() * 1e3;
    await new Promise((r) => setTimeout(r, delai));
    const estSucces = Math.random() < 0.9;
    if (estSucces) {
      const ref = genererRefTransaction();
      const nouveauSolde = utilisateur.solde + montantFinal;
      mettreAJourSolde(nouveauSolde);
      ajouterNotification(
        "recharge_succes",
        `Votre solde a été rechargé de ${formatSolde(montantFinal)} DZD via BaridiMob. Nouveau solde: ${formatSolde(nouveauSolde)} DZD. Réf: ${ref}`
      );
      setRefTransaction(ref);
      setMontantConfirme(montantFinal);
      setEtat("succes");
      ue.success("Recharge effectuée avec succès !");
    } else {
      setEtat("erreur");
      ue.error("Échec de la recharge. Veuillez réessayer.");
    }
  }
  function handleRecommencer() {
    setEtat("idle");
    setMontantSelectionne(null);
    setMontantPersonnalise("");
    setRefTransaction("");
    setMontantConfirme(0);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { titre: "Recharger le solde", retour: "/tableau-de-bord", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-6 pb-8 space-y-6 max-w-lg mx-auto", children: [
    utilisateur && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl bg-primary text-primary-foreground p-5 flex items-center justify-between",
        "data-ocid": "recharge.balance_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-80 mb-0.5", children: "Solde actuel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-display font-bold tracking-tight", children: [
              formatSolde(utilisateur.solde),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-normal ml-1 opacity-80", children: "DZD" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-6 h-6" }) })
        ]
      }
    ),
    etat === "succes" && utilisateur && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl bg-card border border-border p-6 text-center space-y-4",
        "data-ocid": "recharge.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-9 h-9 text-primary" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground mb-1", children: "Recharge réussie !" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
              formatSolde(montantConfirme),
              " DZD ajoutés à votre compte"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 space-y-2 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Méthode" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-4 h-4 text-accent" }),
                " BaridiMob"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Montant rechargé" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
                formatSolde(montantConfirme),
                " DZD"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Référence" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground text-xs", children: refTransaction })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm border-t border-border pt-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Nouveau solde" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground text-base", children: [
                formatSolde(utilisateur.solde),
                " DZD"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleRecommencer,
              variant: "outline",
              className: "w-full h-12",
              "data-ocid": "recharge.new_recharge_button",
              children: "Effectuer une autre recharge"
            }
          )
        ]
      }
    ),
    etat === "erreur" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl bg-destructive/5 border border-destructive/20 p-5 text-center space-y-4",
        "data-ocid": "recharge.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-10 h-10 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-bold text-foreground mb-1", children: "Échec de la recharge" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "La transaction BaridiMob n'a pas abouti. Vérifiez votre solde BaridiMob et réessayez." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleRecommencer,
              className: "w-full h-12 gap-2",
              "data-ocid": "recharge.retry_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                " Réessayer"
              ]
            }
          )
        ]
      }
    ),
    (etat === "idle" || etat === "chargement") && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "recharge.amounts_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold text-foreground", children: "Montant rapide" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: MONTANTS_PREDEFS.map(({ valeur, label }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => handleSelectPredef(valeur),
            disabled: etat === "chargement",
            className: cn(
              "rounded-xl py-4 px-2 text-center font-semibold text-sm border-2 transition-smooth disabled:opacity-50",
              montantSelectionne === valeur ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/40"
            ),
            "data-ocid": `recharge.preset_button.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Zap,
                {
                  className: cn(
                    "w-4 h-4 mx-auto mb-1",
                    montantSelectionne === valeur ? "text-primary" : "text-accent"
                  )
                }
              ),
              label
            ]
          },
          valeur
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "ou montant personnalisé" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "montant-custom", className: "text-sm font-semibold", children: "Montant en dinars (DZD)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "montant-custom",
              type: "text",
              inputMode: "numeric",
              placeholder: "Ex: 3000",
              value: montantPersonnalise,
              onChange: (e) => handleMontantPersonnalise(e.target.value),
              disabled: etat === "chargement",
              className: "h-12 pr-14 text-base",
              "data-ocid": "recharge.custom_amount_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground", children: "DZD" })
        ] }),
        montantPersonnalise && !montantValide && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "recharge.amount_field_error",
            children: "Montant entre 500 DA et 50 000 DA"
          }
        )
      ] }),
      montantEffectif > 0 && montantValide && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted/40 border border-border p-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Montant à recharger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary text-lg", children: [
          formatSolde(montantEffectif),
          " DZD"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleRecharger,
          disabled: !montantValide || etat === "chargement",
          className: "w-full h-14 text-base font-semibold gap-3 rounded-xl",
          "data-ocid": "recharge.submit_button",
          children: etat === "chargement" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }),
            "Traitement en cours…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-5 h-5" }),
            "Recharger via BaridiMob"
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground leading-relaxed", children: "🔒 Paiement sécurisé via BaridiMob. Votre solde sera mis à jour instantanément après confirmation." })
    ] })
  ] }) });
}
export {
  Recharge as default
};
