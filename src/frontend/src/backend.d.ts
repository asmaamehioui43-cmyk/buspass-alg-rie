import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface ParamsInscription {
    motDePasseHache: string;
    email?: string;
    nomComplet: string;
    telephone: string;
}
export interface PageTransactions {
    total: bigint;
    page: bigint;
    elements: Array<Transaction>;
    parPage: bigint;
}
export type ResultOk_2 = {
    __kind__: "ok";
    ok: Transaction;
} | {
    __kind__: "err";
    err: string;
};
export interface Ligne {
    id: bigint;
    nom: string;
    region: Region;
    tarif: bigint;
    stations: Array<Station>;
    numero: string;
}
export interface ParamsRecharge {
    utilisateurId: UserId;
    montant: bigint;
    referenceBaridi: string;
}
export interface Utilisateur {
    id: UserId;
    dateInscription: Timestamp;
    motDePasseHache: string;
    numeroCarte: string;
    email?: string;
    solde: bigint;
    nomComplet: string;
    estVerifie: boolean;
    telephone: string;
}
export type ResultOk_3 = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface ParamsDebitTrajet {
    ligneId: bigint;
    utilisateurId: UserId;
    trajetId: string;
    montant: bigint;
    busId: string;
}
export interface Transaction {
    id: bigint;
    typeTransaction: TypeTransaction;
    soldeApres: bigint;
    utilisateurId: UserId;
    timestamp: Timestamp;
    montant: bigint;
}
export type UserId = bigint;
export interface FiltreTransactions {
    dateFin?: Timestamp;
    ligneId?: bigint;
    page: bigint;
    dateDebut?: Timestamp;
    parPage: bigint;
}
export interface Notification {
    id: bigint;
    lue: boolean;
    typeNotif: TypeNotification;
    utilisateurId: UserId;
    message: string;
    timestamp: Timestamp;
}
export interface Bus {
    id: string;
    ligneId: bigint;
    numeroPlaque: string;
    estEnService: boolean;
    conducteur: string;
}
export type ResultOk_1 = {
    __kind__: "ok";
    ok: Utilisateur;
} | {
    __kind__: "err";
    err: string;
};
export interface Station {
    nom: string;
    ordre: bigint;
    etaMinutes?: bigint;
}
export type ResultOk = {
    __kind__: "ok";
    ok: boolean;
} | {
    __kind__: "err";
    err: string;
};
export type TypeTransaction = {
    __kind__: "recharge";
    recharge: {
        referenceBaridi: string;
    };
} | {
    __kind__: "debitTrajet";
    debitTrajet: {
        ligneId: bigint;
        trajetId: string;
        busId: string;
    };
};
export enum Region {
    naama = "naama",
    ainSefra = "ainSefra",
    msharia = "msharia"
}
export enum TypeNotification {
    alerte = "alerte",
    trajet = "trajet",
    recharge = "recharge"
}
export interface backendInterface {
    busParLigne(ligneId: bigint): Promise<Array<Bus>>;
    debiterTrajet(params: ParamsDebitTrajet): Promise<ResultOk_2>;
    envoyerOtp(telephone: string): Promise<ResultOk_3>;
    inscrire(params: ParamsInscription): Promise<ResultOk_1>;
    lignesParRegion(region: Region): Promise<Array<Ligne>>;
    listerLignes(): Promise<Array<Ligne>>;
    listerTransactions(utilisateurId: UserId, filtre: FiltreTransactions): Promise<PageTransactions>;
    marquerCommeLue(notifId: bigint, utilisateurId: UserId): Promise<ResultOk>;
    mettreAJourProfil(id: UserId, email: string | null, telephone: string | null): Promise<ResultOk>;
    notificationsNonLues(utilisateurId: UserId): Promise<Array<Notification>>;
    obtenirLigne(id: bigint): Promise<Ligne | null>;
    obtenirProfil(id: UserId): Promise<Utilisateur | null>;
    obtenirSolde(utilisateurId: UserId): Promise<bigint | null>;
    rechargerSolde(params: ParamsRecharge): Promise<ResultOk_2>;
    seConnecter(telephone: string, motDePasseHache: string): Promise<ResultOk_1>;
    toutesNotifications(utilisateurId: UserId): Promise<Array<Notification>>;
    verifierOtp(telephone: string, code: string): Promise<ResultOk>;
}
