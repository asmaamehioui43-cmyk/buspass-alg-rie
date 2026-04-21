import type { backendInterface, Region } from "../backend";

export const mockBackend: backendInterface = {
  busParLigne: async (_ligneId) => [
    {
      id: "BUS-001",
      ligneId: BigInt(1),
      numeroPlaque: "16-2341-NAA",
      estEnService: true,
      conducteur: "Ahmed Belkacem",
    },
    {
      id: "BUS-002",
      ligneId: BigInt(1),
      numeroPlaque: "16-1987-NAA",
      estEnService: true,
      conducteur: "Youcef Hadj",
    },
  ],

  debiterTrajet: async (_params) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(42),
      typeTransaction: {
        __kind__: "debitTrajet",
        debitTrajet: {
          ligneId: BigInt(1),
          trajetId: "TRJ-001",
          busId: "BUS-001",
        },
      },
      soldeApres: BigInt(1800),
      utilisateurId: BigInt(1),
      timestamp: BigInt(Date.now()) * BigInt(1_000_000),
      montant: BigInt(50),
    },
  }),

  envoyerOtp: async (_telephone) => ({
    __kind__: "ok",
    ok: "OTP envoyé avec succès",
  }),

  inscrire: async (_params) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(1),
      dateInscription: BigInt(Date.now()) * BigInt(1_000_000),
      motDePasseHache: "",
      numeroCarte: "CARTE-20240001",
      email: "utilisateur@example.com",
      solde: BigInt(0),
      nomComplet: "Karim Bensalem",
      estVerifie: true,
      telephone: "0555123456",
    },
  }),

  lignesParRegion: async (_region) => [
    {
      id: BigInt(1),
      nom: "Centre-Ville → Gare Routière",
      region: "naama" as unknown as Region,
      tarif: BigInt(50),
      numero: "L01",
      stations: [
        { nom: "Centre-Ville", ordre: BigInt(1), etaMinutes: BigInt(0) },
        { nom: "Marché Central", ordre: BigInt(2), etaMinutes: BigInt(5) },
        { nom: "Hôpital", ordre: BigInt(3), etaMinutes: BigInt(10) },
        { nom: "Université", ordre: BigInt(4), etaMinutes: BigInt(18) },
        { nom: "Gare Routière", ordre: BigInt(5), etaMinutes: BigInt(25) },
      ],
    },
    {
      id: BigInt(2),
      nom: "Naâma → Mécheria",
      region: "naama" as unknown as Region,
      tarif: BigInt(120),
      numero: "L02",
      stations: [
        { nom: "Naâma Centre", ordre: BigInt(1), etaMinutes: BigInt(0) },
        { nom: "Djeniene Bourezg", ordre: BigInt(2), etaMinutes: BigInt(15) },
        { nom: "Mécheria", ordre: BigInt(3), etaMinutes: BigInt(40) },
      ],
    },
  ],

  listerLignes: async () => [
    {
      id: BigInt(1),
      nom: "Centre-Ville → Gare Routière",
      region: "naama" as unknown as Region,
      tarif: BigInt(50),
      numero: "L01",
      stations: [
        { nom: "Centre-Ville", ordre: BigInt(1), etaMinutes: BigInt(0) },
        { nom: "Marché Central", ordre: BigInt(2), etaMinutes: BigInt(5) },
        { nom: "Hôpital", ordre: BigInt(3), etaMinutes: BigInt(10) },
        { nom: "Gare Routière", ordre: BigInt(4), etaMinutes: BigInt(25) },
      ],
    },
    {
      id: BigInt(2),
      nom: "Naâma → Mécheria",
      region: "naama" as unknown as Region,
      tarif: BigInt(120),
      numero: "L02",
      stations: [
        { nom: "Naâma Centre", ordre: BigInt(1), etaMinutes: BigInt(0) },
        { nom: "Mécheria", ordre: BigInt(2), etaMinutes: BigInt(40) },
      ],
    },
    {
      id: BigInt(3),
      nom: "M'Sila → Aïn Sefra",
      region: "msharia" as unknown as Region,
      tarif: BigInt(80),
      numero: "L03",
      stations: [
        { nom: "M'Sila", ordre: BigInt(1), etaMinutes: BigInt(0) },
        { nom: "Aïn Sefra", ordre: BigInt(2), etaMinutes: BigInt(30) },
      ],
    },
  ],

  listerTransactions: async (_utilisateurId, _filtre) => ({
    total: BigInt(3),
    page: BigInt(1),
    elements: [
      {
        id: BigInt(1),
        typeTransaction: {
          __kind__: "debitTrajet",
          debitTrajet: {
            ligneId: BigInt(1),
            trajetId: "TRJ-001",
            busId: "BUS-001",
          },
        },
        soldeApres: BigInt(1950),
        utilisateurId: BigInt(1),
        timestamp: BigInt(Date.now() - 3600000) * BigInt(1_000_000),
        montant: BigInt(50),
      },
      {
        id: BigInt(2),
        typeTransaction: {
          __kind__: "recharge",
          recharge: {
            referenceBaridi: "BARID-20240001",
          },
        },
        soldeApres: BigInt(2000),
        utilisateurId: BigInt(1),
        timestamp: BigInt(Date.now() - 86400000) * BigInt(1_000_000),
        montant: BigInt(500),
      },
    ],
    parPage: BigInt(10),
  }),

  marquerCommeLue: async (_notifId, _utilisateurId) => ({
    __kind__: "ok",
    ok: true,
  }),

  mettreAJourProfil: async (_id, _email, _telephone) => ({
    __kind__: "ok",
    ok: true,
  }),

  notificationsNonLues: async (_utilisateurId) => [
    {
      id: BigInt(1),
      lue: false,
      typeNotif: "recharge" as unknown as import("../backend").TypeNotification,
      utilisateurId: BigInt(1),
      message: "Votre solde a été rechargé de 500 DA via BaridiMob.",
      timestamp: BigInt(Date.now() - 7200000) * BigInt(1_000_000),
    },
    {
      id: BigInt(2),
      lue: false,
      typeNotif: "trajet" as unknown as import("../backend").TypeNotification,
      utilisateurId: BigInt(1),
      message: "Bus L01 en approche — arrivée dans 3 minutes à Centre-Ville.",
      timestamp: BigInt(Date.now() - 1800000) * BigInt(1_000_000),
    },
  ],

  obtenirLigne: async (_id) => ({
    id: BigInt(1),
    nom: "Centre-Ville → Gare Routière",
    region: "naama" as unknown as Region,
    tarif: BigInt(50),
    numero: "L01",
    stations: [
      { nom: "Centre-Ville", ordre: BigInt(1), etaMinutes: BigInt(0) },
      { nom: "Marché Central", ordre: BigInt(2), etaMinutes: BigInt(5) },
      { nom: "Hôpital", ordre: BigInt(3), etaMinutes: BigInt(10) },
      { nom: "Université", ordre: BigInt(4), etaMinutes: BigInt(18) },
      { nom: "Gare Routière", ordre: BigInt(5), etaMinutes: BigInt(25) },
    ],
  }),

  obtenirProfil: async (_id) => ({
    id: BigInt(1),
    dateInscription: BigInt(Date.now() - 30 * 86400000) * BigInt(1_000_000),
    motDePasseHache: "",
    numeroCarte: "CARTE-20240001",
    email: "karim.bensalem@example.com",
    solde: BigInt(1950),
    nomComplet: "Karim Bensalem",
    estVerifie: true,
    telephone: "0555123456",
  }),

  obtenirSolde: async (_utilisateurId) => BigInt(1950),

  rechargerSolde: async (_params) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(3),
      typeTransaction: {
        __kind__: "recharge",
        recharge: {
          referenceBaridi: "BARID-20240002",
        },
      },
      soldeApres: BigInt(2450),
      utilisateurId: BigInt(1),
      timestamp: BigInt(Date.now()) * BigInt(1_000_000),
      montant: BigInt(500),
    },
  }),

  seConnecter: async (_telephone, _motDePasseHache) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(1),
      dateInscription: BigInt(Date.now() - 30 * 86400000) * BigInt(1_000_000),
      motDePasseHache: "",
      numeroCarte: "CARTE-20240001",
      email: "karim.bensalem@example.com",
      solde: BigInt(1950),
      nomComplet: "Karim Bensalem",
      estVerifie: true,
      telephone: "0555123456",
    },
  }),

  toutesNotifications: async (_utilisateurId) => [
    {
      id: BigInt(1),
      lue: true,
      typeNotif: "recharge" as unknown as import("../backend").TypeNotification,
      utilisateurId: BigInt(1),
      message: "Votre solde a été rechargé de 500 DA via BaridiMob.",
      timestamp: BigInt(Date.now() - 7200000) * BigInt(1_000_000),
    },
    {
      id: BigInt(2),
      lue: false,
      typeNotif: "trajet" as unknown as import("../backend").TypeNotification,
      utilisateurId: BigInt(1),
      message: "Bus L01 en approche — arrivée dans 3 minutes à Centre-Ville.",
      timestamp: BigInt(Date.now() - 1800000) * BigInt(1_000_000),
    },
    {
      id: BigInt(3),
      lue: false,
      typeNotif: "alerte" as unknown as import("../backend").TypeNotification,
      utilisateurId: BigInt(1),
      message: "Alerte: solde faible. Rechargez votre carte dès que possible.",
      timestamp: BigInt(Date.now() - 900000) * BigInt(1_000_000),
    },
  ],

  verifierOtp: async (_telephone, _code) => ({
    __kind__: "ok",
    ok: true,
  }),
};
