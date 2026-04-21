import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ShieldCheck } from "lucide-react";
// ── Page OTP — BusPass Algeria ────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const OTP_DEMO = "123456";
const RESEND_DELAY = 30;

function masquerTelephone(tel: string): string {
  if (!tel || tel.length < 6) return tel || "05•• ••• •••";
  return `${tel.slice(0, 2)}•• ••• ${tel.slice(-3)}`;
}

export default function OTP() {
  const navigate = useNavigate();
  const { verifierOtp } = useAuth();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");
  const [resendTimer, setResendTimer] = useState(RESEND_DELAY);
  const [tentatives, setTentatives] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const pendingPhone = localStorage.getItem("buspass_pending_phone") ?? "";
  const telephoneMasque = masquerTelephone(pendingPhone);

  // Décompte renvoi
  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  // Focus premier champ au montage
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  function handleChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    setErreur("");
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted.split(""));
      setErreur("");
      inputRefs.current[5]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace") {
      if (code[index]) {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
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
      toast.success("Numéro vérifié avec succès !");
      navigate({ to: "/connexion" });
    } else {
      const nouvellesTentatives = tentatives + 1;
      setTentatives(nouvellesTentatives);
      if (nouvellesTentatives >= 3) {
        setErreur("Trop de tentatives incorrectes. Demandez un nouveau code.");
      } else {
        setErreur(
          `Code incorrect (${nouvellesTentatives}/3 tentative${nouvellesTentatives > 1 ? "s" : ""}).`,
        );
      }
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
    setChargement(false);
  }

  function handleResend() {
    if (resendTimer > 0) return;
    setResendTimer(RESEND_DELAY);
    setTentatives(0);
    setErreur("");
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    toast.success("Un nouveau code a été envoyé par SMS.");
  }

  const codeComplet = code.every((d) => d !== "");

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      {/* En-tête vert */}
      <div className="bg-primary px-6 pt-10 pb-8 text-primary-foreground">
        <button
          type="button"
          onClick={() => navigate({ to: "/inscription" })}
          className="flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4 transition-smooth"
          data-ocid="otp.back_button"
        >
          <ChevronLeft className="w-4 h-4" /> Retour
        </button>

        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">
              Vérification OTP
            </h1>
            <p className="text-primary-foreground/70 text-sm">
              Code envoyé par SMS
            </p>
          </div>
        </div>

        {/* Numéro masqué */}
        <div className="bg-primary-foreground/10 rounded-xl px-4 py-2.5 inline-flex items-center gap-2 border border-primary-foreground/15">
          <span className="text-lg">📱</span>
          <div>
            <p className="text-xs text-primary-foreground/60">
              Numéro de téléphone
            </p>
            <p className="font-mono font-bold text-sm">{telephoneMasque}</p>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        <Card className="p-6 shadow-sm">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6"
          >
            {/* Instruction */}
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Entrez le code à{" "}
              <strong className="text-foreground">6 chiffres</strong> envoyé au
              numéro ci-dessus.
            </p>

            {/* Champs OTP */}
            <div
              className="flex gap-2.5 justify-center w-full"
              data-ocid="otp.inputs"
              onPaste={handlePaste}
            >
              {([0, 1, 2, 3, 4, 5] as const).map((pos) => (
                <input
                  key={`digit-${pos}`}
                  ref={(el) => {
                    inputRefs.current[pos] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={code[pos]}
                  onChange={(e) => handleChange(pos, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(pos, e)}
                  className={`
                    w-12 h-14 text-center text-xl font-bold rounded-xl outline-none
                    border-2 transition-smooth
                    ${
                      code[pos]
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-input bg-background text-foreground"
                    }
                    focus:border-primary focus:ring-2 focus:ring-primary/20
                    ${erreur ? "border-destructive/50" : ""}
                  `}
                  data-ocid={`otp.digit_input.${pos + 1}`}
                  aria-label={`Chiffre ${pos + 1}`}
                />
              ))}
            </div>

            {/* Séparateur visuel entre digits 3 et 4 */}
            <style>{`
              /* handled via gap — no extra marker needed */
            `}</style>

            {/* Erreur */}
            {erreur && (
              <div
                className="w-full bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3"
                data-ocid="otp.error_state"
                role="alert"
              >
                <p className="text-destructive text-sm font-medium text-center">
                  {erreur}
                </p>
              </div>
            )}

            {/* Bouton vérifier */}
            <Button
              type="submit"
              className="w-full h-14 text-base font-bold transition-smooth"
              disabled={
                chargement || (!codeComplet && code.join("").length < 6)
              }
              data-ocid="otp.submit_button"
            >
              {chargement ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  Vérification en cours…
                </span>
              ) : (
                "Vérifier le code"
              )}
            </Button>

            {/* Renvoi */}
            <div className="text-center">
              {resendTimer > 0 ? (
                <p className="text-sm text-muted-foreground">
                  Renvoyer le code dans{" "}
                  <span className="font-bold text-primary tabular-nums">
                    {String(Math.floor(resendTimer / 60)).padStart(2, "0")}:
                    {String(resendTimer % 60).padStart(2, "0")}
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm text-primary font-semibold hover:underline transition-smooth"
                  data-ocid="otp.resend_button"
                >
                  Renvoyer le code
                </button>
              )}
            </div>
          </form>
        </Card>

        {/* Aide démo */}
        <Card className="mt-4 p-4 bg-accent/10 border-accent/30">
          <p className="text-xs font-semibold text-accent mb-1">
            Mode démonstration
          </p>
          <p className="text-xs text-muted-foreground">
            Code OTP de test :{" "}
            <span className="font-mono font-bold text-foreground tracking-[0.2em]">
              {OTP_DEMO}
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
}
