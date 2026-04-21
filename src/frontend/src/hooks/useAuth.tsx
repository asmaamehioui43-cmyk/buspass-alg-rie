import { mockUtilisateurs } from "@/data/mockData";
import type { Utilisateur } from "@/types";
// ── Contexte d'authentification — BusPass Algeria ─────────────────────────────
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

const STORAGE_KEY = "buspass_session";

// ── Types ─────────────────────────────────────────────────────────────────────
interface AuthContextValue {
  utilisateur: Utilisateur | null;
  estConnecte: boolean;
  chargement: boolean;
  connexion: (telephone: string, motDePasse: string) => Promise<boolean>;
  inscription: (
    data: InscriptionData,
  ) => Promise<{ succes: boolean; message: string }>;
  verifierOtp: (telephone: string) => void;
  deconnexion: () => void;
  mettreAJourSolde: (nouveauSolde: number) => void;
}

export interface InscriptionData {
  nomComplet: string;
  telephone: string;
  email?: string;
  motDePasse: string;
}

// ── Contexte ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
  const [chargement, setChargement] = useState(true);

  // Restaurer la session depuis localStorage au démarrage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: Utilisateur = JSON.parse(saved);
        setUtilisateur(parsed);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setChargement(false);
    }
  }, []);

  const connexion = useCallback(
    async (telephone: string, _motDePasse: string): Promise<boolean> => {
      // Simulation: vérification mock (en prod → appel backend)
      await new Promise((r) => setTimeout(r, 800));
      const trouve = mockUtilisateurs.find((u) => u.telephone === telephone);
      // Accepter les utilisateurs vérifiés OU fraîchement inscrits via OTP
      if (trouve) {
        setUtilisateur(trouve);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trouve));
        return true;
      }
      return false;
    },
    [],
  );

  const inscription = useCallback(
    async (
      data: InscriptionData,
    ): Promise<{ succes: boolean; message: string }> => {
      await new Promise((r) => setTimeout(r, 1000));
      // Vérifier si le téléphone est déjà utilisé
      const existe = mockUtilisateurs.find(
        (u) => u.telephone === data.telephone,
      );
      if (existe) {
        return {
          succes: false,
          message: "Ce numéro de téléphone est déjà utilisé.",
        };
      }
      // Créer un nouvel utilisateur (simulation)
      const nouvelUtilisateur: Utilisateur = {
        id: `usr_${Date.now()}`,
        nomComplet: data.nomComplet,
        telephone: data.telephone,
        email: data.email,
        motDePasseHache: btoa(data.motDePasse),
        numeroCarte: `BP-${new Date().getFullYear()}-${String(mockUtilisateurs.length + 1).padStart(3, "0")}`,
        solde: 0,
        estVerifie: false, // nécessite OTP
        dateInscription: Date.now(),
      };
      mockUtilisateurs.push(nouvelUtilisateur);
      return {
        succes: true,
        message: "Inscription réussie. Veuillez vérifier votre numéro.",
      };
    },
    [],
  );

  const verifierOtp = useCallback((telephone: string) => {
    const index = mockUtilisateurs.findIndex((u) => u.telephone === telephone);
    if (index !== -1) {
      mockUtilisateurs[index] = {
        ...mockUtilisateurs[index],
        estVerifie: true,
      };
    }
  }, []);

  const deconnexion = useCallback(() => {
    setUtilisateur(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const mettreAJourSolde = useCallback((nouveauSolde: number) => {
    setUtilisateur((prev) => {
      if (!prev) return null;
      const updated = { ...prev, solde: nouveauSolde };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        utilisateur,
        estConnecte: !!utilisateur,
        chargement,
        connexion,
        inscription,
        verifierOtp,
        deconnexion,
        mettreAJourSolde,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return ctx;
}
