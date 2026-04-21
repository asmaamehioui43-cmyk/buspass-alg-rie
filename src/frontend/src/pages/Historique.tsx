// ── Page Historique — BusPass Algeria ────────────────────────────────────────
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatSolde,
  getTransactionsByUser,
  mockLignes,
} from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  FileText,
  Filter,
  History,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

// ── Types filtres ─────────────────────────────────────────────────────────────
type FiltreType = "tout" | "recharge" | "trajet";
type FiltrePeriode = "7j" | "30j" | "tout";

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(ts: number): string {
  return new Intl.DateTimeFormat("fr-DZ", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ts));
}

function formatDateCourt(ts: number): string {
  return new Intl.DateTimeFormat("fr-DZ", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ts));
}

function getNomLigne(ligneId: number): string {
  const ligne = mockLignes.find((l) => l.id === ligneId);
  return ligne ? `${ligne.numero} — ${ligne.nom}` : `Ligne #${ligneId}`;
}

function getNumeroLigne(ligneId: number): string {
  const ligne = mockLignes.find((l) => l.id === ligneId);
  return ligne ? ligne.numero : `L-${ligneId}`;
}

function getShiftSimule(ts: number): string {
  const heure = new Date(ts).getHours();
  if (heure < 12) return "Matin (06h00 – 12h00)";
  if (heure < 18) return "Après-midi (12h00 – 18h00)";
  return "Soir (18h00 – 00h00)";
}

// ── Export CSV ────────────────────────────────────────────────────────────────
function exporterCSV(
  transactions: Transaction[],
  nomUtilisateur: string,
): void {
  const entete = [
    "Date/Heure",
    "Type",
    "Référence / Ligne",
    "Montant (DZD)",
    "Solde restant (DZD)",
  ];
  const lignes = transactions.map((t) => {
    const date = formatDate(t.timestamp);
    const type = t.typeTransaction.type === "recharge" ? "Recharge" : "Trajet";
    const ref =
      t.typeTransaction.type === "recharge"
        ? t.typeTransaction.referenceBaridi
        : getNomLigne(t.typeTransaction.ligneId);
    const montant = (t.montant / 100).toFixed(2);
    const solde = (t.soldeApres / 100).toFixed(2);
    return [date, type, ref, montant, solde];
  });

  const contenu = [entete, ...lignes]
    .map((row) => row.map((c) => `"${c}"`).join(";"))
    .join("\n");

  const blob = new Blob([`\uFEFF${contenu}`], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `historique-buspass-${nomUtilisateur.replace(/\s+/g, "-").toLowerCase()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Export PDF (via impression) ───────────────────────────────────────────────
function exporterPDF(
  transactions: Transaction[],
  nomUtilisateur: string,
  numeroCarte: string,
): void {
  const dateExport = new Intl.DateTimeFormat("fr-DZ", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

  const lignesHTML = transactions
    .map((t, i) => {
      const type =
        t.typeTransaction.type === "recharge" ? "Recharge" : "Trajet";
      const ref =
        t.typeTransaction.type === "recharge"
          ? t.typeTransaction.referenceBaridi
          : getNomLigne(t.typeTransaction.ligneId);
      const montantStr =
        t.montant > 0
          ? `+${formatSolde(t.montant)} DZD`
          : `${formatSolde(t.montant)} DZD`;
      const bg = i % 2 === 0 ? "#f9fafb" : "#ffffff";
      return `<tr style="background:${bg}">
        <td style="padding:8px 10px;font-size:12px;">${formatDate(t.timestamp)}</td>
        <td style="padding:8px 10px;font-size:12px;">${type}</td>
        <td style="padding:8px 10px;font-size:12px;">${ref}</td>
        <td style="padding:8px 10px;font-size:12px;text-align:right;font-weight:600;color:${t.montant > 0 ? "#16a34a" : "#d97706"};">${montantStr}</td>
        <td style="padding:8px 10px;font-size:12px;text-align:right;">${formatSolde(t.soldeApres)} DZD</td>
      </tr>`;
    })
    .join("");

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Historique des trajets - BusPass</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 32px; color: #111; }
    h1 { font-size: 20px; margin-bottom: 4px; color: #166534; }
    .subtitle { font-size: 13px; color: #555; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #166534; color: #fff; padding: 10px; font-size: 12px; text-align: left; }
    th:last-child, th:nth-last-child(2) { text-align: right; }
    td { border-bottom: 1px solid #e5e7eb; }
    .footer { margin-top: 24px; font-size: 11px; color: #888; text-align: center; }
    @media print { body { margin: 16px; } }
  </style>
</head>
<body>
  <h1>Historique des trajets — BusPass</h1>
  <div class="subtitle">
    Titulaire : <strong>${nomUtilisateur}</strong> &nbsp;|&nbsp;
    Carte : <strong>${numeroCarte}</strong> &nbsp;|&nbsp;
    Exporté le : <strong>${dateExport}</strong>
  </div>
  <table>
    <thead>
      <tr>
        <th>Date/Heure</th>
        <th>Type</th>
        <th>Référence / Ligne</th>
        <th style="text-align:right">Montant</th>
        <th style="text-align:right">Solde restant</th>
      </tr>
    </thead>
    <tbody>${lignesHTML}</tbody>
  </table>
  <div class="footer">BusPass Algeria — Document généré automatiquement</div>
</body>
</html>`;

  const fenetre = window.open("", "_blank");
  if (!fenetre) return;
  fenetre.document.write(html);
  fenetre.document.close();
  fenetre.onload = () => {
    fenetre.focus();
    fenetre.print();
  };
}

// ── Composant ligne de détail ─────────────────────────────────────────────────
function RangeeDetail({
  label,
  valeur,
  mono = false,
  highlight,
}: {
  label: string;
  valeur: string;
  mono?: boolean;
  highlight?: "positive" | "negative" | "neutral";
}) {
  return (
    <div className="flex items-start justify-between gap-2 py-1">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span
        className={cn(
          "text-sm text-right font-medium break-all",
          mono && "font-mono text-xs",
          highlight === "positive" && "text-primary font-bold",
          highlight === "negative" && "text-accent font-bold",
          highlight === "neutral" && "text-foreground font-semibold",
        )}
      >
        {valeur}
      </span>
    </div>
  );
}

// ── Modal détail transaction ──────────────────────────────────────────────────
interface ModalDetailProps {
  transaction: Transaction | null;
  ouvert: boolean;
  onFermer: () => void;
}

function ModalDetail({ transaction: t, ouvert, onFermer }: ModalDetailProps) {
  if (!t) return null;
  const estRecharge = t.typeTransaction.type === "recharge";
  const soldeBefore = t.soldeApres - t.montant;

  return (
    <Dialog
      open={ouvert}
      onOpenChange={(open) => {
        if (!open) onFermer();
      }}
    >
      <DialogContent
        className="max-w-sm mx-auto rounded-2xl"
        data-ocid="historique.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-base font-bold">
            {estRecharge ? "Détail de la recharge" : "Détail du trajet"}
          </DialogTitle>
        </DialogHeader>

        {/* Icône et badge type */}
        <div className="flex flex-col items-center gap-2 py-2">
          <div
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center",
              estRecharge ? "bg-primary/10" : "bg-accent/10",
            )}
          >
            {estRecharge ? (
              <ArrowDownLeft className="w-7 h-7 text-primary" />
            ) : (
              <ArrowUpRight className="w-7 h-7 text-accent" />
            )}
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-xs px-3 py-1 rounded-full font-semibold",
              estRecharge
                ? "border-primary/30 text-primary bg-primary/5"
                : "border-accent/30 text-accent bg-accent/5",
            )}
          >
            {estRecharge ? "Recharge BaridiMob" : "Trajet en bus"}
          </Badge>
          <p
            className={cn(
              "text-2xl font-bold tabular-nums",
              estRecharge ? "text-primary" : "text-accent",
            )}
          >
            {t.montant > 0 ? "+" : ""}
            {formatSolde(t.montant)} DZD
          </p>
        </div>

        <Separator />

        {/* Détails */}
        <div className="space-y-0.5">
          <RangeeDetail label="Date / Heure" valeur={formatDate(t.timestamp)} />

          {estRecharge && t.typeTransaction.type === "recharge" ? (
            <RangeeDetail
              label="Réf. BaridiMob"
              valeur={t.typeTransaction.referenceBaridi}
              mono
            />
          ) : t.typeTransaction.type === "debitTrajet" ? (
            <>
              <RangeeDetail
                label="Ligne"
                valeur={getNomLigne(t.typeTransaction.ligneId)}
              />
              <RangeeDetail
                label="ID Bus"
                valeur={t.typeTransaction.busId}
                mono
              />
              <RangeeDetail
                label="ID Trajet"
                valeur={t.typeTransaction.trajetId}
                mono
              />
              <RangeeDetail
                label="Shift"
                valeur={getShiftSimule(t.timestamp)}
              />
            </>
          ) : null}

          <Separator className="my-1" />
          <RangeeDetail
            label="Solde avant"
            valeur={`${formatSolde(soldeBefore)} DZD`}
          />
          <RangeeDetail
            label="Solde après"
            valeur={`${formatSolde(t.soldeApres)} DZD`}
            highlight="neutral"
          />
        </div>

        <Button
          variant="outline"
          className="w-full mt-2"
          onClick={onFermer}
          data-ocid="historique.close_button"
        >
          Fermer
        </Button>
      </DialogContent>
    </Dialog>
  );
}

// ── Carte transaction ─────────────────────────────────────────────────────────
interface CarteTransactionProps {
  transaction: Transaction;
  index: number;
  onClick: () => void;
}

function CarteTransaction({
  transaction: t,
  index,
  onClick,
}: CarteTransactionProps) {
  const estRecharge = t.typeTransaction.type === "recharge";
  const libelle =
    t.typeTransaction.type === "recharge"
      ? `Recharge — ${t.typeTransaction.referenceBaridi}`
      : `Trajet ${getNumeroLigne(t.typeTransaction.ligneId)}`;
  const sousLibelle =
    t.typeTransaction.type === "debitTrajet"
      ? getNomLigne(t.typeTransaction.ligneId).split(" — ")[1]
      : undefined;

  return (
    <button
      type="button"
      className="w-full text-left card-elevated rounded-xl p-4 flex items-center gap-3 hover:shadow-md active:scale-[0.99] transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onClick={onClick}
      data-ocid={`historique.item.${index}`}
      aria-label={`Détail transaction ${index}`}
    >
      {/* Icône */}
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
          estRecharge
            ? "bg-primary/10 text-primary"
            : "bg-accent/10 text-accent",
        )}
      >
        {estRecharge ? (
          <ArrowDownLeft className="w-5 h-5" />
        ) : (
          <ArrowUpRight className="w-5 h-5" />
        )}
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-foreground truncate leading-tight">
            {libelle}
          </p>
          <span
            className={cn(
              "text-sm font-bold shrink-0 tabular-nums leading-tight",
              estRecharge ? "text-primary" : "text-accent",
            )}
          >
            {t.montant > 0 ? "+" : ""}
            {formatSolde(t.montant)} DZD
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-1">
          <span className="text-xs text-muted-foreground truncate">
            {sousLibelle
              ? `${sousLibelle} · ${formatDateCourt(t.timestamp)}`
              : formatDateCourt(t.timestamp)}
          </span>
          <span className="text-xs text-muted-foreground tabular-nums shrink-0">
            Solde: {formatSolde(t.soldeApres)} DZD
          </span>
        </div>
      </div>
    </button>
  );
}

// ── Page principale ───────────────────────────────────────────────────────────
export default function Historique() {
  const { utilisateur } = useAuth();
  const [filtreType, setFiltreType] = useState<FiltreType>("tout");
  const [filtrePeriode, setFiltrePeriode] = useState<FiltrePeriode>("tout");
  const [transactionSelectionnee, setTransactionSelectionnee] =
    useState<Transaction | null>(null);
  const [modalOuverte, setModalOuverte] = useState(false);

  const toutesTransactions = utilisateur
    ? getTransactionsByUser(utilisateur.id)
    : [];

  const transactions = useMemo(() => {
    const maintenant = Date.now();
    const limites: Record<FiltrePeriode, number> = {
      "7j": maintenant - 86400000 * 7,
      "30j": maintenant - 86400000 * 30,
      tout: 0,
    };
    return toutesTransactions
      .filter((t) => {
        if (filtreType === "recharge")
          return t.typeTransaction.type === "recharge";
        if (filtreType === "trajet")
          return t.typeTransaction.type === "debitTrajet";
        return true;
      })
      .filter((t) => t.timestamp >= limites[filtrePeriode])
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [toutesTransactions, filtreType, filtrePeriode]);

  if (!utilisateur) return null;

  const totalRecharges = toutesTransactions
    .filter((t) => t.typeTransaction.type === "recharge")
    .reduce((s, t) => s + t.montant, 0);

  const totalTrajets = toutesTransactions
    .filter((t) => t.typeTransaction.type === "debitTrajet")
    .reduce((s, t) => s + Math.abs(t.montant), 0);

  const filtresType: { key: FiltreType; label: string }[] = [
    { key: "tout", label: "Tout" },
    { key: "recharge", label: "Recharges" },
    { key: "trajet", label: "Trajets" },
  ];

  const filtresPeriode: { key: FiltrePeriode; label: string }[] = [
    { key: "7j", label: "7 jours" },
    { key: "30j", label: "30 jours" },
    { key: "tout", label: "Tout" },
  ];

  const filtresActifs = filtreType !== "tout" || filtrePeriode !== "tout";

  return (
    <Layout titre="Historique">
      <div className="px-4 pt-4 pb-6 space-y-4" data-ocid="historique.page">
        {/* ── Résumé solde ── */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="card-elevated rounded-xl p-3 text-center"
            data-ocid="historique.summary_recharges"
          >
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              Total rechargé
            </p>
            <p className="text-lg font-bold text-primary tabular-nums leading-tight">
              +{formatSolde(totalRecharges)}
              <span className="text-xs font-normal ml-0.5">DZD</span>
            </p>
          </div>
          <div
            className="card-elevated rounded-xl p-3 text-center"
            data-ocid="historique.summary_trajets"
          >
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              Total dépensé
            </p>
            <p className="text-lg font-bold text-accent tabular-nums leading-tight">
              -{formatSolde(totalTrajets)}
              <span className="text-xs font-normal ml-0.5">DZD</span>
            </p>
          </div>
        </div>

        {/* ── Filtres ── */}
        <div
          className="card-elevated rounded-xl p-3.5 space-y-3"
          data-ocid="historique.filters_panel"
        >
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Filtres
            </span>
          </div>

          {/* Filtre type */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">Type de transaction</p>
            <div className="flex gap-2">
              {filtresType.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  className={cn(
                    "flex-1 py-2 rounded-lg text-xs font-medium transition-smooth border",
                    filtreType === key
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-secondary text-secondary-foreground border-transparent hover:border-border",
                  )}
                  onClick={() => setFiltreType(key)}
                  data-ocid={`historique.filter_type_${key}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Filtre période */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">Période</p>
            <div className="flex gap-2">
              {filtresPeriode.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  className={cn(
                    "flex-1 py-2 rounded-lg text-xs font-medium transition-smooth border",
                    filtrePeriode === key
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-secondary text-secondary-foreground border-transparent hover:border-border",
                  )}
                  onClick={() => setFiltrePeriode(key)}
                  data-ocid={`historique.filter_periode_${key}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Export ── */}
        <div className="flex gap-2.5">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2 text-xs font-medium h-10"
            onClick={() => exporterCSV(transactions, utilisateur.nomComplet)}
            disabled={transactions.length === 0}
            data-ocid="historique.export_csv_button"
          >
            <Download className="w-3.5 h-3.5" />
            Exporter CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2 text-xs font-medium h-10"
            onClick={() =>
              exporterPDF(
                transactions,
                utilisateur.nomComplet,
                utilisateur.numeroCarte,
              )
            }
            disabled={transactions.length === 0}
            data-ocid="historique.export_pdf_button"
          >
            <FileText className="w-3.5 h-3.5" />
            Exporter PDF
          </Button>
        </div>

        {/* ── Compteur + reset ── */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {transactions.length} transaction
            {transactions.length !== 1 ? "s" : ""}
          </p>
          {filtresActifs && (
            <button
              type="button"
              className="flex items-center gap-1 text-xs text-primary font-medium hover:underline focus-visible:outline-none focus-visible:underline"
              onClick={() => {
                setFiltreType("tout");
                setFiltrePeriode("tout");
              }}
              data-ocid="historique.clear_filters_button"
            >
              <X className="w-3 h-3" />
              Réinitialiser
            </button>
          )}
        </div>

        {/* ── Liste ── */}
        {transactions.length === 0 ? (
          <div
            className="card-elevated rounded-xl p-8 text-center space-y-3"
            data-ocid="historique.empty_state"
          >
            <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto">
              <History className="w-7 h-7 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                Aucune transaction
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Aucune transaction ne correspond à vos filtres.
              </p>
            </div>
            {filtresActifs && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFiltreType("tout");
                  setFiltrePeriode("tout");
                }}
                data-ocid="historique.empty_reset_button"
              >
                Voir tout
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-2.5" data-ocid="historique.transactions_list">
            {transactions.map((t, i) => (
              <CarteTransaction
                key={t.id}
                transaction={t}
                index={i + 1}
                onClick={() => {
                  setTransactionSelectionnee(t);
                  setModalOuverte(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Modal détail ── */}
      <ModalDetail
        transaction={transactionSelectionnee}
        ouvert={modalOuverte}
        onFermer={() => {
          setModalOuverte(false);
          setTransactionSelectionnee(null);
        }}
      />
    </Layout>
  );
}
