import { u as useAuth, r as reactExports, h as getTransactionsByUser, j as jsxRuntimeExports, f as formatSolde, m as mockLignes } from "./index-DUhyqyFb.js";
import { L as Layout, H as History, B as Badge } from "./Layout-DDt5v_fd.js";
import { B as Button } from "./button-CdhFZ59Z.js";
import { X, A as ArrowUpRight, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DRnWDU1w.js";
import { S as Separator } from "./separator-BWVUzkOS.js";
import { c as createLucideIcon, a as cn } from "./createLucideIcon-j6fs3MjL.js";
import "./chevron-left-CGIb9UqK.js";
import "./bus-DPlZB0_1.js";
import "./index-BE_z24Hx.js";
import "./index-BFiPEdCa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M17 7 7 17", key: "15tmo1" }],
  ["path", { d: "M17 17H7V7", key: "1org7z" }]
];
const ArrowDownLeft = createLucideIcon("arrow-down-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$1);
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
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
function formatDate(ts) {
  return new Intl.DateTimeFormat("fr-DZ", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(ts));
}
function formatDateCourt(ts) {
  return new Intl.DateTimeFormat("fr-DZ", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(ts));
}
function getNomLigne(ligneId) {
  const ligne = mockLignes.find((l) => l.id === ligneId);
  return ligne ? `${ligne.numero} — ${ligne.nom}` : `Ligne #${ligneId}`;
}
function getNumeroLigne(ligneId) {
  const ligne = mockLignes.find((l) => l.id === ligneId);
  return ligne ? ligne.numero : `L-${ligneId}`;
}
function getShiftSimule(ts) {
  const heure = new Date(ts).getHours();
  if (heure < 12) return "Matin (06h00 – 12h00)";
  if (heure < 18) return "Après-midi (12h00 – 18h00)";
  return "Soir (18h00 – 00h00)";
}
function exporterCSV(transactions, nomUtilisateur) {
  const entete = [
    "Date/Heure",
    "Type",
    "Référence / Ligne",
    "Montant (DZD)",
    "Solde restant (DZD)"
  ];
  const lignes = transactions.map((t) => {
    const date = formatDate(t.timestamp);
    const type = t.typeTransaction.type === "recharge" ? "Recharge" : "Trajet";
    const ref = t.typeTransaction.type === "recharge" ? t.typeTransaction.referenceBaridi : getNomLigne(t.typeTransaction.ligneId);
    const montant = (t.montant / 100).toFixed(2);
    const solde = (t.soldeApres / 100).toFixed(2);
    return [date, type, ref, montant, solde];
  });
  const contenu = [entete, ...lignes].map((row) => row.map((c) => `"${c}"`).join(";")).join("\n");
  const blob = new Blob([`\uFEFF${contenu}`], {
    type: "text/csv;charset=utf-8;"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `historique-buspass-${nomUtilisateur.replace(/\s+/g, "-").toLowerCase()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function exporterPDF(transactions, nomUtilisateur, numeroCarte) {
  const dateExport = new Intl.DateTimeFormat("fr-DZ", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(/* @__PURE__ */ new Date());
  const lignesHTML = transactions.map((t, i) => {
    const type = t.typeTransaction.type === "recharge" ? "Recharge" : "Trajet";
    const ref = t.typeTransaction.type === "recharge" ? t.typeTransaction.referenceBaridi : getNomLigne(t.typeTransaction.ligneId);
    const montantStr = t.montant > 0 ? `+${formatSolde(t.montant)} DZD` : `${formatSolde(t.montant)} DZD`;
    const bg = i % 2 === 0 ? "#f9fafb" : "#ffffff";
    return `<tr style="background:${bg}">
        <td style="padding:8px 10px;font-size:12px;">${formatDate(t.timestamp)}</td>
        <td style="padding:8px 10px;font-size:12px;">${type}</td>
        <td style="padding:8px 10px;font-size:12px;">${ref}</td>
        <td style="padding:8px 10px;font-size:12px;text-align:right;font-weight:600;color:${t.montant > 0 ? "#16a34a" : "#d97706"};">${montantStr}</td>
        <td style="padding:8px 10px;font-size:12px;text-align:right;">${formatSolde(t.soldeApres)} DZD</td>
      </tr>`;
  }).join("");
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
function RangeeDetail({
  label,
  valeur,
  mono = false,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 py-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: cn(
          "text-sm text-right font-medium break-all",
          mono && "font-mono text-xs",
          highlight === "positive" && "text-primary font-bold",
          highlight === "negative" && "text-accent font-bold",
          highlight === "neutral" && "text-foreground font-semibold"
        ),
        children: valeur
      }
    )
  ] });
}
function ModalDetail({ transaction: t, ouvert, onFermer }) {
  if (!t) return null;
  const estRecharge = t.typeTransaction.type === "recharge";
  const soldeBefore = t.soldeApres - t.montant;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open: ouvert,
      onOpenChange: (open) => {
        if (!open) onFermer();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DialogContent,
        {
          className: "max-w-sm mx-auto rounded-2xl",
          "data-ocid": "historique.dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-base font-bold", children: estRecharge ? "Détail de la recharge" : "Détail du trajet" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "w-14 h-14 rounded-full flex items-center justify-center",
                    estRecharge ? "bg-primary/10" : "bg-accent/10"
                  ),
                  children: estRecharge ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-7 h-7 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-7 h-7 text-accent" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: cn(
                    "text-xs px-3 py-1 rounded-full font-semibold",
                    estRecharge ? "border-primary/30 text-primary bg-primary/5" : "border-accent/30 text-accent bg-accent/5"
                  ),
                  children: estRecharge ? "Recharge BaridiMob" : "Trajet en bus"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: cn(
                    "text-2xl font-bold tabular-nums",
                    estRecharge ? "text-primary" : "text-accent"
                  ),
                  children: [
                    t.montant > 0 ? "+" : "",
                    formatSolde(t.montant),
                    " DZD"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RangeeDetail, { label: "Date / Heure", valeur: formatDate(t.timestamp) }),
              estRecharge && t.typeTransaction.type === "recharge" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                RangeeDetail,
                {
                  label: "Réf. BaridiMob",
                  valeur: t.typeTransaction.referenceBaridi,
                  mono: true
                }
              ) : t.typeTransaction.type === "debitTrajet" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RangeeDetail,
                  {
                    label: "Ligne",
                    valeur: getNomLigne(t.typeTransaction.ligneId)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RangeeDetail,
                  {
                    label: "ID Bus",
                    valeur: t.typeTransaction.busId,
                    mono: true
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RangeeDetail,
                  {
                    label: "ID Trajet",
                    valeur: t.typeTransaction.trajetId,
                    mono: true
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RangeeDetail,
                  {
                    label: "Shift",
                    valeur: getShiftSimule(t.timestamp)
                  }
                )
              ] }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RangeeDetail,
                {
                  label: "Solde avant",
                  valeur: `${formatSolde(soldeBefore)} DZD`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RangeeDetail,
                {
                  label: "Solde après",
                  valeur: `${formatSolde(t.soldeApres)} DZD`,
                  highlight: "neutral"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "w-full mt-2",
                onClick: onFermer,
                "data-ocid": "historique.close_button",
                children: "Fermer"
              }
            )
          ]
        }
      )
    }
  );
}
function CarteTransaction({
  transaction: t,
  index,
  onClick
}) {
  const estRecharge = t.typeTransaction.type === "recharge";
  const libelle = t.typeTransaction.type === "recharge" ? `Recharge — ${t.typeTransaction.referenceBaridi}` : `Trajet ${getNumeroLigne(t.typeTransaction.ligneId)}`;
  const sousLibelle = t.typeTransaction.type === "debitTrajet" ? getNomLigne(t.typeTransaction.ligneId).split(" — ")[1] : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "w-full text-left card-elevated rounded-xl p-4 flex items-center gap-3 hover:shadow-md active:scale-[0.99] transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      onClick,
      "data-ocid": `historique.item.${index}`,
      "aria-label": `Détail transaction ${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
              estRecharge ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
            ),
            children: estRecharge ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate leading-tight", children: libelle }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: cn(
                  "text-sm font-bold shrink-0 tabular-nums leading-tight",
                  estRecharge ? "text-primary" : "text-accent"
                ),
                children: [
                  t.montant > 0 ? "+" : "",
                  formatSolde(t.montant),
                  " DZD"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: sousLibelle ? `${sousLibelle} · ${formatDateCourt(t.timestamp)}` : formatDateCourt(t.timestamp) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground tabular-nums shrink-0", children: [
              "Solde: ",
              formatSolde(t.soldeApres),
              " DZD"
            ] })
          ] })
        ] })
      ]
    }
  );
}
function Historique() {
  const { utilisateur } = useAuth();
  const [filtreType, setFiltreType] = reactExports.useState("tout");
  const [filtrePeriode, setFiltrePeriode] = reactExports.useState("tout");
  const [transactionSelectionnee, setTransactionSelectionnee] = reactExports.useState(null);
  const [modalOuverte, setModalOuverte] = reactExports.useState(false);
  const toutesTransactions = utilisateur ? getTransactionsByUser(utilisateur.id) : [];
  const transactions = reactExports.useMemo(() => {
    const maintenant = Date.now();
    const limites = {
      "7j": maintenant - 864e5 * 7,
      "30j": maintenant - 864e5 * 30,
      tout: 0
    };
    return toutesTransactions.filter((t) => {
      if (filtreType === "recharge")
        return t.typeTransaction.type === "recharge";
      if (filtreType === "trajet")
        return t.typeTransaction.type === "debitTrajet";
      return true;
    }).filter((t) => t.timestamp >= limites[filtrePeriode]).sort((a, b) => b.timestamp - a.timestamp);
  }, [toutesTransactions, filtreType, filtrePeriode]);
  if (!utilisateur) return null;
  const totalRecharges = toutesTransactions.filter((t) => t.typeTransaction.type === "recharge").reduce((s, t) => s + t.montant, 0);
  const totalTrajets = toutesTransactions.filter((t) => t.typeTransaction.type === "debitTrajet").reduce((s, t) => s + Math.abs(t.montant), 0);
  const filtresType = [
    { key: "tout", label: "Tout" },
    { key: "recharge", label: "Recharges" },
    { key: "trajet", label: "Trajets" }
  ];
  const filtresPeriode = [
    { key: "7j", label: "7 jours" },
    { key: "30j", label: "30 jours" },
    { key: "tout", label: "Tout" }
  ];
  const filtresActifs = filtreType !== "tout" || filtrePeriode !== "tout";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { titre: "Historique", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-6 space-y-4", "data-ocid": "historique.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "card-elevated rounded-xl p-3 text-center",
            "data-ocid": "historique.summary_recharges",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground mb-1", children: "Total rechargé" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-primary tabular-nums leading-tight", children: [
                "+",
                formatSolde(totalRecharges),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal ml-0.5", children: "DZD" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "card-elevated rounded-xl p-3 text-center",
            "data-ocid": "historique.summary_trajets",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground mb-1", children: "Total dépensé" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-accent tabular-nums leading-tight", children: [
                "-",
                formatSolde(totalTrajets),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal ml-0.5", children: "DZD" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "card-elevated rounded-xl p-3.5 space-y-3",
          "data-ocid": "historique.filters_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Filtres" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Type de transaction" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: filtresType.map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: cn(
                    "flex-1 py-2 rounded-lg text-xs font-medium transition-smooth border",
                    filtreType === key ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-secondary text-secondary-foreground border-transparent hover:border-border"
                  ),
                  onClick: () => setFiltreType(key),
                  "data-ocid": `historique.filter_type_${key}`,
                  children: label
                },
                key
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Période" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: filtresPeriode.map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: cn(
                    "flex-1 py-2 rounded-lg text-xs font-medium transition-smooth border",
                    filtrePeriode === key ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-secondary text-secondary-foreground border-transparent hover:border-border"
                  ),
                  onClick: () => setFiltrePeriode(key),
                  "data-ocid": `historique.filter_periode_${key}`,
                  children: label
                },
                key
              )) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "flex-1 gap-2 text-xs font-medium h-10",
            onClick: () => exporterCSV(transactions, utilisateur.nomComplet),
            disabled: transactions.length === 0,
            "data-ocid": "historique.export_csv_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              "Exporter CSV"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "flex-1 gap-2 text-xs font-medium h-10",
            onClick: () => exporterPDF(
              transactions,
              utilisateur.nomComplet,
              utilisateur.numeroCarte
            ),
            disabled: transactions.length === 0,
            "data-ocid": "historique.export_pdf_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }),
              "Exporter PDF"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          transactions.length,
          " transaction",
          transactions.length !== 1 ? "s" : ""
        ] }),
        filtresActifs && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-center gap-1 text-xs text-primary font-medium hover:underline focus-visible:outline-none focus-visible:underline",
            onClick: () => {
              setFiltreType("tout");
              setFiltrePeriode("tout");
            },
            "data-ocid": "historique.clear_filters_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
              "Réinitialiser"
            ]
          }
        )
      ] }),
      transactions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "card-elevated rounded-xl p-8 text-center space-y-3",
          "data-ocid": "historique.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-7 h-7 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Aucune transaction" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Aucune transaction ne correspond à vos filtres." })
            ] }),
            filtresActifs && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => {
                  setFiltreType("tout");
                  setFiltrePeriode("tout");
                },
                "data-ocid": "historique.empty_reset_button",
                children: "Voir tout"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", "data-ocid": "historique.transactions_list", children: transactions.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CarteTransaction,
        {
          transaction: t,
          index: i + 1,
          onClick: () => {
            setTransactionSelectionnee(t);
            setModalOuverte(true);
          }
        },
        t.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ModalDetail,
      {
        transaction: transactionSelectionnee,
        ouvert: modalOuverte,
        onFermer: () => {
          setModalOuverte(false);
          setTransactionSelectionnee(null);
        }
      }
    )
  ] });
}
export {
  Historique as default
};
