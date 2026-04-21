import { mockNotifications } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";
import type { Notification, TypeNotification } from "@/types";
// ── Gestion des notifications — BusPass Algeria ───────────────────────────────
import { useCallback, useEffect, useState } from "react";

// ── Hook principal ────────────────────────────────────────────────────────────
export function useNotifications() {
  const { utilisateur } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Charger les notifications de l'utilisateur connecté
  useEffect(() => {
    if (!utilisateur) {
      setNotifications([]);
      return;
    }
    const notifs = mockNotifications
      .filter((n) => n.utilisateurId === utilisateur.id)
      .sort((a, b) => b.timestamp - a.timestamp);
    setNotifications(notifs);
  }, [utilisateur]);

  const nonLues = notifications.filter((n) => !n.lue).length;

  const marquerLue = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lue: true } : n)),
    );
  }, []);

  const marquerToutesLues = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, lue: true })));
  }, []);

  const ajouterNotification = useCallback(
    (typeNotif: TypeNotification, message: string) => {
      if (!utilisateur) return;
      const nouvelle: Notification = {
        id: Date.now(),
        utilisateurId: utilisateur.id,
        typeNotif,
        message,
        timestamp: Date.now(),
        lue: false,
      };
      setNotifications((prev) => [nouvelle, ...prev]);
    },
    [utilisateur],
  );

  const supprimerNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return {
    notifications,
    nonLues,
    marquerLue,
    marquerToutesLues,
    ajouterNotification,
    supprimerNotification,
  };
}
