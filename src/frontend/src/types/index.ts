// ── Types partagés — BusPass Algeria ──────────────────────────────────────────

export type UserId = string;
export type Timestamp = number; // Unix ms

// ── Utilisateur ──────────────────────────────────────────────────────────────
export interface Utilisateur {
  id: UserId;
  nomComplet: string;
  telephone: string;
  email?: string;
  motDePasseHache: string;
  numeroCarte: string;
  solde: number; // centimes DZD
  estVerifie: boolean;
  dateInscription: Timestamp;
}

// ── Transactions ──────────────────────────────────────────────────────────────
export type TypeTransaction =
  | { type: "recharge"; referenceBaridi: string }
  | { type: "debitTrajet"; ligneId: number; busId: string; trajetId: string };

export interface Transaction {
  id: number;
  utilisateurId: UserId;
  montant: number; // centimes DZD (positif = recharge, négatif = débit)
  soldeApres: number;
  typeTransaction: TypeTransaction;
  timestamp: Timestamp;
}

// ── Réseau bus ────────────────────────────────────────────────────────────────
export type Region = "naama" | "msharia" | "ainSefra";

export const REGIONS: Record<Region, string> = {
  naama: "Naâma",
  msharia: "M'sharia",
  ainSefra: "Aïn Sefra",
};

export interface Station {
  nom: string;
  ordre: number;
  etaMinutes?: number;
}

export interface Ligne {
  id: number;
  numero: string;
  nom: string;
  region: Region;
  tarif: number; // DZD
  stations: Station[];
  frequenceMin?: number; // fréquence en minutes
  statut?: "actif" | "inactif" | "en_service";
}

export interface Bus {
  id: string;
  ligneId: number;
  numeroBus: string;
  conducteur: string;
  positionStation?: number; // index station actuelle
  enService: boolean;
}

// ── Notifications ─────────────────────────────────────────────────────────────
export type TypeNotification =
  | "recharge_succes"
  | "trajet_debit"
  | "bus_arrive"
  | "bus_retard"
  | "compte"
  | "promotion";

export interface Notification {
  id: number;
  utilisateurId: UserId;
  typeNotif: TypeNotification;
  message: string;
  timestamp: Timestamp;
  lue: boolean;
}

// ── Auth state ────────────────────────────────────────────────────────────────
export interface SessionAuth {
  utilisateur: Utilisateur | null;
  estConnecte: boolean;
}
