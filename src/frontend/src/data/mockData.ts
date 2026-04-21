// ── Données de démonstration — BusPass Algeria ─────────────────────────────────
import type {
  Bus,
  Ligne,
  Notification,
  Transaction,
  Utilisateur,
} from "@/types";

// ── Utilisateurs ──────────────────────────────────────────────────────────────
export const mockUtilisateurs: Utilisateur[] = [
  {
    id: "usr_001",
    nomComplet: "Khalid Bensalem",
    telephone: "0551234567",
    email: "khalid.bensalem@example.dz",
    motDePasseHache: "hashed_password_1",
    numeroCarte: "BP-2024-001",
    solde: 125000, // 1 250,00 DZD
    estVerifie: true,
    dateInscription: Date.now() - 86400000 * 90,
  },
  {
    id: "usr_002",
    nomComplet: "Fatima Zerrouki",
    telephone: "0661987654",
    email: undefined,
    motDePasseHache: "hashed_password_2",
    numeroCarte: "BP-2024-002",
    solde: 45000, // 450,00 DZD
    estVerifie: true,
    dateInscription: Date.now() - 86400000 * 45,
  },
  {
    id: "usr_003",
    nomComplet: "Youcef Hamidi",
    telephone: "0771456789",
    email: "y.hamidi@mail.dz",
    motDePasseHache: "hashed_password_3",
    numeroCarte: "BP-2024-003",
    solde: 8500, // 85,00 DZD
    estVerifie: false,
    dateInscription: Date.now() - 86400000 * 10,
  },
];

// ── Lignes de bus ─────────────────────────────────────────────────────────────
export const mockLignes: Ligne[] = [
  // Naâma
  {
    id: 1,
    numero: "L-102",
    nom: "Centre-ville — Cité El Badr",
    region: "naama",
    tarif: 70,
    frequenceMin: 30,
    statut: "en_service",
    stations: [
      { nom: "Gare routière Naâma", ordre: 0, etaMinutes: 0 },
      { nom: "Place de la République", ordre: 1, etaMinutes: 5 },
      { nom: "Hôpital de Naâma", ordre: 2, etaMinutes: 12 },
      { nom: "Marché couvert", ordre: 3, etaMinutes: 18 },
      { nom: "Cité El Badr — Terminus", ordre: 4, etaMinutes: 25 },
    ],
  },
  {
    id: 2,
    numero: "L-215",
    nom: "Université — Zone Industrielle",
    region: "naama",
    tarif: 65,
    frequenceMin: 25,
    statut: "actif",
    stations: [
      { nom: "Université de Naâma", ordre: 0, etaMinutes: 0 },
      { nom: "Rue Didouche Mourad", ordre: 1, etaMinutes: 7 },
      { nom: "Mairie de Naâma", ordre: 2, etaMinutes: 13 },
      { nom: "Zone Industrielle — Terminus", ordre: 3, etaMinutes: 22 },
    ],
  },
  // M'sharia
  {
    id: 3,
    numero: "L-107",
    nom: "Avenue ALN — Cite des Orangers",
    region: "msharia",
    tarif: 65,
    frequenceMin: 30,
    statut: "en_service",
    stations: [
      { nom: "Terminus M'sharia Centre", ordre: 0, etaMinutes: 0 },
      { nom: "Avenue ALN", ordre: 1, etaMinutes: 6 },
      { nom: "École primaire", ordre: 2, etaMinutes: 11 },
      { nom: "Poste M'sharia", ordre: 3, etaMinutes: 16 },
      { nom: "Cité des Orangers — Terminus", ordre: 4, etaMinutes: 24 },
    ],
  },
  {
    id: 4,
    numero: "L-340",
    nom: "M'sharia — Chellala",
    region: "msharia",
    tarif: 80,
    frequenceMin: 45,
    statut: "actif",
    stations: [
      { nom: "Gare M'sharia", ordre: 0, etaMinutes: 0 },
      { nom: "Croisement RN6", ordre: 1, etaMinutes: 10 },
      { nom: "Chellala Centre — Terminus", ordre: 2, etaMinutes: 35 },
    ],
  },
  // Aïn Sefra
  {
    id: 5,
    numero: "L-088",
    nom: "Gare — Cite Zaaroura",
    region: "ainSefra",
    tarif: 60,
    frequenceMin: 20,
    statut: "en_service",
    stations: [
      { nom: "Gare ferroviaire Aïn Sefra", ordre: 0, etaMinutes: 0 },
      { nom: "Boulevard 1er Novembre", ordre: 1, etaMinutes: 5 },
      { nom: "Lycée Ibn Khaldoun", ordre: 2, etaMinutes: 10 },
      { nom: "Cité Zaaroura — Terminus", ordre: 3, etaMinutes: 17 },
    ],
  },
  {
    id: 6,
    numero: "L-421",
    nom: "Aïn Sefra — Sfissifa",
    region: "ainSefra",
    tarif: 90,
    frequenceMin: 60,
    statut: "actif",
    stations: [
      { nom: "Place du 1er Mai — Aïn Sefra", ordre: 0, etaMinutes: 0 },
      { nom: "Douar Ouled Sidi Ali", ordre: 1, etaMinutes: 15 },
      { nom: "Sfissifa Centre — Terminus", ordre: 2, etaMinutes: 45 },
    ],
  },
];

// ── Bus en service ────────────────────────────────────────────────────────────
export const mockBus: Bus[] = [
  {
    id: "bus_01",
    ligneId: 1,
    numeroBus: "15-DZD-001",
    conducteur: "Moussa Benali",
    positionStation: 1,
    enService: true,
  },
  {
    id: "bus_02",
    ligneId: 2,
    numeroBus: "15-DZD-002",
    conducteur: "Rachid Ameur",
    positionStation: 0,
    enService: true,
  },
  {
    id: "bus_03",
    ligneId: 3,
    numeroBus: "15-DZD-003",
    conducteur: "Kamel Tebani",
    positionStation: 2,
    enService: true,
  },
  {
    id: "bus_04",
    ligneId: 5,
    numeroBus: "15-DZD-005",
    conducteur: "Omar Brahim",
    positionStation: 1,
    enService: true,
  },
];

// ── Transactions ──────────────────────────────────────────────────────────────
export const mockTransactions: Transaction[] = [
  {
    id: 1,
    utilisateurId: "usr_001",
    montant: 50000,
    soldeApres: 125000,
    typeTransaction: { type: "recharge", referenceBaridi: "BAR-2024-78901" },
    timestamp: Date.now() - 86400000 * 2,
  },
  {
    id: 2,
    utilisateurId: "usr_001",
    montant: -7000,
    soldeApres: 75000,
    typeTransaction: {
      type: "debitTrajet",
      ligneId: 1,
      busId: "bus_01",
      trajetId: "TRJ-001",
    },
    timestamp: Date.now() - 86400000 * 3,
  },
  {
    id: 3,
    utilisateurId: "usr_001",
    montant: -6500,
    soldeApres: 82000,
    typeTransaction: {
      type: "debitTrajet",
      ligneId: 2,
      busId: "bus_02",
      trajetId: "TRJ-002",
    },
    timestamp: Date.now() - 86400000 * 5,
  },
  {
    id: 4,
    utilisateurId: "usr_001",
    montant: 100000,
    soldeApres: 88500,
    typeTransaction: { type: "recharge", referenceBaridi: "BAR-2024-65432" },
    timestamp: Date.now() - 86400000 * 7,
  },
  {
    id: 5,
    utilisateurId: "usr_002",
    montant: 50000,
    soldeApres: 45000,
    typeTransaction: { type: "recharge", referenceBaridi: "BAR-2024-11223" },
    timestamp: Date.now() - 86400000 * 1,
  },
  {
    id: 6,
    utilisateurId: "usr_001",
    montant: -9000,
    soldeApres: 116000,
    typeTransaction: {
      type: "debitTrajet",
      ligneId: 3,
      busId: "bus_03",
      trajetId: "TRJ-003",
    },
    timestamp: Date.now() - 86400000 * 1,
  },
];

// ── Notifications ─────────────────────────────────────────────────────────────
export const mockNotifications: Notification[] = [
  {
    id: 1,
    utilisateurId: "usr_001",
    typeNotif: "recharge_succes",
    message:
      "Votre solde a été rechargé de 500,00 DZD via BaridiMob. Nouveau solde: 1 250,00 DZD.",
    timestamp: Date.now() - 86400000 * 2,
    lue: false,
  },
  {
    id: 2,
    utilisateurId: "usr_001",
    typeNotif: "bus_arrive",
    message:
      "La ligne L-102 arrivera à la station Marché couvert dans 5 minutes.",
    timestamp: Date.now() - 3600000 * 2,
    lue: false,
  },
  {
    id: 3,
    utilisateurId: "usr_001",
    typeNotif: "trajet_debit",
    message:
      "Trajet ligne L-088: 90,00 DZD déduits. Solde restant: 1 160,00 DZD.",
    timestamp: Date.now() - 86400000 * 1,
    lue: true,
  },
  {
    id: 4,
    utilisateurId: "usr_001",
    typeNotif: "promotion",
    message:
      "Offre spéciale: Rechargez 1 000 DZD et obtenez 50 DZD de bonus! Valable jusqu'au 30 avril.",
    timestamp: Date.now() - 86400000 * 3,
    lue: true,
  },
  {
    id: 5,
    utilisateurId: "usr_001",
    typeNotif: "bus_retard",
    message:
      "La ligne L-215 est retardée de 10 minutes en raison d'un incident de circulation.",
    timestamp: Date.now() - 3600000 * 5,
    lue: true,
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
export function formatSolde(centimes: number): string {
  return (centimes / 100).toLocaleString("fr-DZ", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function getLignesByRegion(region: string): Ligne[] {
  return mockLignes.filter((l) => l.region === region);
}

export function getTransactionsByUser(userId: string): Transaction[] {
  return mockTransactions.filter((t) => t.utilisateurId === userId);
}

export function getNotificationsByUser(userId: string): Notification[] {
  return mockNotifications.filter((n) => n.utilisateurId === userId);
}
