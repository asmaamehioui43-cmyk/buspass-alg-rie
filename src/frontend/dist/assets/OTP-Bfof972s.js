import { a as useNavigate, u as useAuth, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-DUhyqyFb.js";
import { B as Button } from "./button-CdhFZ59Z.js";
import { C as Card } from "./card-MZW6CVrX.js";
import { C as ChevronLeft } from "./chevron-left-CGIb9UqK.js";
import { S as ShieldCheck } from "./shield-check-J0dyOM7c.js";
import "./createLucideIcon-j6fs3MjL.js";
const OTP_DEMO = "123456";
const RESEND_DELAY = 30;
function masquerTelephone(tel) {
  if (!tel || tel.length < 6) return tel || "05•• ••• •••";
  return `${tel.slice(0, 2)}•• ••• ${tel.slice(-3)}`;
}
function OTP() {
  const navigate = useNavigate();
  const { verifierOtp } = useAuth();
  const [code, setCode] = reactExports.useState(["", "", "", "", "", ""]);
  const [chargement, setChargement] = reactExports.useState(false);
  const [erreur, setErreur] = reactExports.useState("");
  const [resendTimer, setResendTimer] = reactExports.useState(RESEND_DELAY);
  const [tentatives, setTentatives] = reactExports.useState(0);
  const inputRefs = reactExports.useRef([]);
  const pendingPhone = localStorage.getItem("buspass_pending_phone") ?? "";
  const telephoneMasque = masquerTelephone(pendingPhone);
  reactExports.useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => setResendTimer((t) => t - 1), 1e3);
    return () => clearInterval(timer);
  }, [resendTimer]);
  reactExports.useEffect(() => {
    var _a;
    (_a = inputRefs.current[0]) == null ? void 0 : _a.focus();
  }, []);
  function handleChange(index, value) {
    var _a;
    const digit = value.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    setErreur("");
    if (digit && index < 5) {
      (_a = inputRefs.current[index + 1]) == null ? void 0 : _a.focus();
    }
  }
  function handlePaste(e) {
    var _a;
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted.split(""));
      setErreur("");
      (_a = inputRefs.current[5]) == null ? void 0 : _a.focus();
    }
  }
  function handleKeyDown(index, e) {
    var _a, _b, _c;
    if (e.key === "Backspace") {
      if (code[index]) {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        (_a = inputRefs.current[index - 1]) == null ? void 0 : _a.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      (_b = inputRefs.current[index - 1]) == null ? void 0 : _b.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      (_c = inputRefs.current[index + 1]) == null ? void 0 : _c.focus();
    }
  }
  async function handleSubmit(e) {
    var _a;
    e.preventDefault();
    const saisi = code.join("");
    if (saisi.length < 6) {
      setErreur("Veuillez entrer les 6 chiffres du code.");
      return;
    }
    setChargement(true);
    await new Promise((r) => setTimeout(r, 900));
    if (saisi === OTP_DEMO) {
      verifierOtp(pendingPhone);
      localStorage.removeItem("buspass_pending_phone");
      ue.success("Numéro vérifié avec succès !");
      navigate({ to: "/connexion" });
    } else {
      const nouvellesTentatives = tentatives + 1;
      setTentatives(nouvellesTentatives);
      if (nouvellesTentatives >= 3) {
        setErreur("Trop de tentatives incorrectes. Demandez un nouveau code.");
      } else {
        setErreur(
          `Code incorrect (${nouvellesTentatives}/3 tentative${nouvellesTentatives > 1 ? "s" : ""}).`
        );
      }
      setCode(["", "", "", "", "", ""]);
      (_a = inputRefs.current[0]) == null ? void 0 : _a.focus();
    }
    setChargement(false);
  }
  function handleResend() {
    var _a;
    if (resendTimer > 0) return;
    setResendTimer(RESEND_DELAY);
    setTentatives(0);
    setErreur("");
    setCode(["", "", "", "", "", ""]);
    (_a = inputRefs.current[0]) == null ? void 0 : _a.focus();
    ue.success("Un nouveau code a été envoyé par SMS.");
  }
  const codeComplet = code.every((d) => d !== "");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-dvh bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary px-6 pt-10 pb-8 text-primary-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/inscription" }),
          className: "flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4 transition-smooth",
          "data-ocid": "otp.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
            " Retour"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold", children: "Vérification OTP" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-sm", children: "Code envoyé par SMS" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary-foreground/10 rounded-xl px-4 py-2.5 inline-flex items-center gap-2 border border-primary-foreground/15", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "📱" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary-foreground/60", children: "Numéro de téléphone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold text-sm", children: telephoneMasque })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-4 py-6 max-w-lg mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "flex flex-col items-center gap-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground text-center leading-relaxed", children: [
              "Entrez le code à",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "6 chiffres" }),
              " envoyé au numéro ci-dessus."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex gap-2.5 justify-center w-full",
                "data-ocid": "otp.inputs",
                onPaste: handlePaste,
                children: [0, 1, 2, 3, 4, 5].map((pos) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: (el) => {
                      inputRefs.current[pos] = el;
                    },
                    type: "text",
                    inputMode: "numeric",
                    maxLength: 1,
                    value: code[pos],
                    onChange: (e) => handleChange(pos, e.target.value),
                    onKeyDown: (e) => handleKeyDown(pos, e),
                    className: `
                    w-12 h-14 text-center text-xl font-bold rounded-xl outline-none
                    border-2 transition-smooth
                    ${code[pos] ? "border-primary bg-primary/5 text-primary" : "border-input bg-background text-foreground"}
                    focus:border-primary focus:ring-2 focus:ring-primary/20
                    ${erreur ? "border-destructive/50" : ""}
                  `,
                    "data-ocid": `otp.digit_input.${pos + 1}`,
                    "aria-label": `Chiffre ${pos + 1}`
                  },
                  `digit-${pos}`
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
              /* handled via gap — no extra marker needed */
            ` }),
            erreur && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-full bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3",
                "data-ocid": "otp.error_state",
                role: "alert",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-sm font-medium text-center", children: erreur })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full h-14 text-base font-bold transition-smooth",
                disabled: chargement || !codeComplet && code.join("").length < 6,
                "data-ocid": "otp.submit_button",
                children: chargement ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }),
                  "Vérification en cours…"
                ] }) : "Vérifier le code"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: resendTimer > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Renvoyer le code dans",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary tabular-nums", children: [
                String(Math.floor(resendTimer / 60)).padStart(2, "0"),
                ":",
                String(resendTimer % 60).padStart(2, "0")
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleResend,
                className: "text-sm text-primary font-semibold hover:underline transition-smooth",
                "data-ocid": "otp.resend_button",
                children: "Renvoyer le code"
              }
            ) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-4 p-4 bg-accent/10 border-accent/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-accent mb-1", children: "Mode démonstration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Code OTP de test :",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-foreground tracking-[0.2em]", children: OTP_DEMO })
        ] })
      ] })
    ] })
  ] });
}
export {
  OTP as default
};
