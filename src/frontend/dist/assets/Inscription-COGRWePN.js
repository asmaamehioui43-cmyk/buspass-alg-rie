import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link, b as ue } from "./index-DUhyqyFb.js";
import { B as Button } from "./button-CdhFZ59Z.js";
import { C as Card } from "./card-MZW6CVrX.js";
import { I as Input } from "./input-CbtPJOZt.js";
import { L as Label } from "./label-Djb-Jo-w.js";
import { C as ChevronLeft } from "./chevron-left-CGIb9UqK.js";
import { C as ChevronRight } from "./chevron-right-Bs2Jjrmm.js";
import { c as createLucideIcon } from "./createLucideIcon-j6fs3MjL.js";
import { R as RefreshCw } from "./refresh-cw-oKlGoEO4.js";
import { E as EyeOff, a as Eye } from "./eye-Xkcfa9oB.js";
import "./index-BFiPEdCa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
function evaluerForceMdp(mdp) {
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
function genererMotDePasse() {
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
  return mdp.split("").sort(() => Math.random() - 0.5).join("");
}
const FORCE_CONFIG = {
  faible: { label: "Faible", couleur: "bg-destructive", barres: 1 },
  moyen: { label: "Moyen", couleur: "bg-accent", barres: 2 },
  fort: { label: "Fort", couleur: "bg-primary", barres: 3 }
};
function IndicateurForce({ motDePasse }) {
  if (!motDePasse) return null;
  const force = evaluerForceMdp(motDePasse);
  const { label, couleur, barres } = FORCE_CONFIG[force];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-1", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-1.5 flex-1 rounded-full transition-smooth ${n <= barres ? couleur : "bg-muted"}`
      },
      n
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `text-xs font-medium ${couleur.replace("bg-", "text-")}`,
        children: label
      }
    )
  ] });
}
function IndicateurEtapes({ etape }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    [1, 2].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${n <= etape ? "bg-primary-foreground text-primary" : "bg-primary-foreground/20 text-primary-foreground/50"}`,
          children: n
        }
      ),
      n === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-8 h-0.5 rounded transition-smooth ${etape >= 2 ? "bg-primary-foreground/60" : "bg-primary-foreground/20"}`
        }
      )
    ] }, n)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary-foreground/80 text-xs ml-1 font-medium", children: [
      "Étape ",
      etape,
      " sur 2"
    ] })
  ] });
}
function Inscription() {
  const { inscription } = useAuth();
  const navigate = useNavigate();
  const [etape, setEtape] = reactExports.useState(1);
  const [afficherMdp, setAfficherMdp] = reactExports.useState(false);
  const [chargement, setChargement] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    nomComplet: "",
    telephone: "",
    email: "",
    motDePasse: ""
  });
  const [erreurs, setErreurs] = reactExports.useState({});
  const setField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setErreurs((prev) => ({ ...prev, [key]: void 0 }));
  };
  function validerEtape1() {
    const e = {};
    if (!form.nomComplet.trim() || form.nomComplet.trim().length < 3)
      e.nomComplet = "Le nom complet doit contenir au moins 3 caractères.";
    if (!/^0[5-7]\d{8}$/.test(form.telephone))
      e.telephone = "Numéro algérien invalide (ex: 0551234567).";
    setErreurs(e);
    return Object.keys(e).length === 0;
  }
  function validerEtape2() {
    const e = {};
    if (!form.motDePasse || form.motDePasse.length < 8)
      e.motDePasse = "Le mot de passe doit contenir au moins 8 caractères.";
    setErreurs(e);
    return Object.keys(e).length === 0;
  }
  function handleContinuer() {
    if (validerEtape1()) setEtape(2);
  }
  async function handleSubmit(e) {
    var _a;
    e.preventDefault();
    if (!validerEtape2()) return;
    setChargement(true);
    try {
      const { succes, message } = await inscription({
        ...form,
        email: ((_a = form.email) == null ? void 0 : _a.trim()) || void 0
      });
      if (succes) {
        ue.success("Compte créé ! Vérifiez votre numéro.");
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
    setErreurs((prev) => ({ ...prev, motDePasse: void 0 }));
    ue.info("Mot de passe suggéré — pensez à le noter !");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-dvh bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary px-6 pt-10 pb-6 text-primary-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        etape === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-smooth w-fit",
            "data-ocid": "inscription.back_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
              " Accueil"
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setEtape(1),
            className: "flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-smooth",
            "data-ocid": "inscription.back_step_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
              " Retour"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IndicateurEtapes, { etape })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold", children: "Créer un compte" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-sm mt-1", children: etape === 1 ? "Vos informations personnelles" : "Sécurisez votre compte" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-4 py-6 max-w-lg mx-auto w-full", children: [
      etape === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 shadow-sm", "data-ocid": "inscription.etape1_card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nomComplet", children: "Nom complet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "nomComplet",
              type: "text",
              placeholder: "Khalid Bensalem",
              value: form.nomComplet,
              onChange: setField("nomComplet"),
              className: "h-12 text-base",
              autoComplete: "name",
              "data-ocid": "inscription.nom_input"
            }
          ),
          erreurs.nomComplet && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-destructive text-xs",
              "data-ocid": "inscription.nom.field_error",
              children: erreurs.nomComplet
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "telephone", children: "Numéro de téléphone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground select-none", children: "🇩🇿" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "telephone",
                type: "tel",
                placeholder: "0551234567",
                value: form.telephone,
                onChange: setField("telephone"),
                className: "h-12 text-base pl-10",
                inputMode: "tel",
                autoComplete: "tel",
                "data-ocid": "inscription.telephone_input"
              }
            )
          ] }),
          erreurs.telephone ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-destructive text-xs",
              "data-ocid": "inscription.telephone.field_error",
              children: erreurs.telephone
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "Format: 05X, 06X ou 07X + 8 chiffres" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "email", children: [
            "Adresse e-mail",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optionnel)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "email",
              type: "email",
              placeholder: "khalid@exemple.dz",
              value: form.email,
              onChange: setField("email"),
              className: "h-12 text-base",
              autoComplete: "email",
              "data-ocid": "inscription.email_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: handleContinuer,
            className: "h-14 text-base font-bold mt-2 transition-smooth",
            "data-ocid": "inscription.continuer_button",
            children: [
              "Continuer",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 ml-1" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
          "Déjà inscrit ?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/connexion",
              className: "text-primary font-semibold hover:underline",
              "data-ocid": "inscription.connexion_link",
              children: "Se connecter"
            }
          )
        ] })
      ] }) }),
      etape === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, noValidate: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 shadow-sm", "data-ocid": "inscription.etape2_card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-xl px-4 py-3 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Numéro vérifié" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: form.telephone })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "motDePasse", children: "Mot de passe" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: suggererMotDePasse,
                className: "flex items-center gap-1 text-xs text-accent font-medium hover:underline transition-smooth",
                "data-ocid": "inscription.suggest_password_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                  "Suggérer un mot de passe"
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
                placeholder: "Minimum 8 caractères",
                value: form.motDePasse,
                onChange: setField("motDePasse"),
                className: "h-12 text-base pr-11",
                autoComplete: "new-password",
                "data-ocid": "inscription.password_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setAfficherMdp(!afficherMdp),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth p-1",
                "aria-label": afficherMdp ? "Masquer" : "Afficher",
                children: afficherMdp ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IndicateurForce, { motDePasse: form.motDePasse }),
          erreurs.motDePasse && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-destructive text-xs",
              "data-ocid": "inscription.password.field_error",
              children: erreurs.motDePasse
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-muted-foreground mt-1 space-y-0.5 pl-3 list-disc", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "li",
              {
                className: form.motDePasse.length >= 8 ? "text-primary font-medium" : "",
                children: "8 caractères minimum"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "li",
              {
                className: /[A-Z]/.test(form.motDePasse) ? "text-primary font-medium" : "",
                children: "Une lettre majuscule"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "li",
              {
                className: /[0-9]/.test(form.motDePasse) ? "text-primary font-medium" : "",
                children: "Un chiffre"
              }
            )
          ] })
        ] }),
        erreurs.global && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3",
            "data-ocid": "inscription.error_state",
            role: "alert",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-sm font-medium", children: erreurs.global })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "h-14 text-base font-bold mt-1 transition-smooth",
            disabled: chargement,
            "data-ocid": "inscription.submit_button",
            children: chargement ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }),
              "Création du compte…"
            ] }) : "Créer mon compte"
          }
        )
      ] }) }) })
    ] })
  ] });
}
export {
  Inscription as default
};
