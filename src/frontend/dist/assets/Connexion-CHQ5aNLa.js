import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link, b as ue } from "./index-DUhyqyFb.js";
import { B as Button } from "./button-CdhFZ59Z.js";
import { C as Card } from "./card-MZW6CVrX.js";
import { I as Input } from "./input-CbtPJOZt.js";
import { L as Label } from "./label-Djb-Jo-w.js";
import { B as Bus } from "./bus-DPlZB0_1.js";
import { c as createLucideIcon } from "./createLucideIcon-j6fs3MjL.js";
import { E as EyeOff, a as Eye } from "./eye-Xkcfa9oB.js";
import "./index-BFiPEdCa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleHelp = createLucideIcon("circle-help", __iconNode);
function Connexion() {
  const { connexion } = useAuth();
  const navigate = useNavigate();
  const [telephone, setTelephone] = reactExports.useState("");
  const [motDePasse, setMotDePasse] = reactExports.useState("");
  const [afficherMdp, setAfficherMdp] = reactExports.useState(false);
  const [chargement, setChargement] = reactExports.useState(false);
  const [erreur, setErreur] = reactExports.useState("");
  async function handleSubmit(e) {
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
        ue.success("Connexion réussie ! Bienvenue.");
        navigate({ to: "/tableau-de-bord" });
      } else {
        setErreur("Numéro de téléphone ou mot de passe incorrect.");
      }
    } finally {
      setChargement(false);
    }
  }
  function handleMotDePasseOublie() {
    ue.info(
      "Contactez le support BusPass pour réinitialiser votre mot de passe."
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-dvh bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary px-6 pt-12 pb-8 text-primary-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bus, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl", children: "BusPass" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold", children: "Connexion" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-sm mt-1", children: "Bon retour parmi nous !" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-4 py-6 max-w-lg mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "flex flex-col gap-5",
          noValidate: true,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "telephone", children: "Numéro de téléphone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium select-none", children: "🇩🇿" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "telephone",
                    type: "tel",
                    placeholder: "0551234567",
                    value: telephone,
                    onChange: (e) => {
                      setTelephone(e.target.value);
                      setErreur("");
                    },
                    className: "h-12 text-base pl-10",
                    inputMode: "tel",
                    autoComplete: "tel",
                    "data-ocid": "connexion.telephone_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "motDePasse", children: "Mot de passe" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleMotDePasseOublie,
                    className: "text-xs text-primary hover:underline flex items-center gap-1 transition-smooth",
                    "data-ocid": "connexion.forgot_password_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-3 h-3" }),
                      "Mot de passe oublié ?"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "motDePasse",
                    type: afficherMdp ? "text" : "password",
                    placeholder: "••••••••",
                    value: motDePasse,
                    onChange: (e) => {
                      setMotDePasse(e.target.value);
                      setErreur("");
                    },
                    className: "h-12 text-base pr-11",
                    autoComplete: "current-password",
                    "data-ocid": "connexion.password_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setAfficherMdp(!afficherMdp),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth p-1",
                    "aria-label": afficherMdp ? "Masquer le mot de passe" : "Afficher le mot de passe",
                    children: afficherMdp ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            erreur && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3",
                "data-ocid": "connexion.error_state",
                role: "alert",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-sm font-medium", children: erreur })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "h-14 text-base font-bold mt-1 transition-smooth",
                disabled: chargement,
                "data-ocid": "connexion.submit_button",
                children: chargement ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }),
                  "Connexion en cours…"
                ] }) : "Se connecter"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
              "Pas encore de compte ?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/inscription",
                  className: "text-primary font-semibold hover:underline",
                  "data-ocid": "connexion.inscription_link",
                  children: "S'inscrire"
                }
              )
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-4 p-4 bg-accent/10 border-accent/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-accent mb-1.5", children: "Compte de démonstration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
          "Téléphone :",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-foreground", children: "0551234567" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Mot de passe :",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-foreground", children: "n'importe lequel" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Connexion as default
};
