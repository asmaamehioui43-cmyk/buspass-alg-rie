import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Types "../types/notifications";

module {
  // Crée une nouvelle notification
  public func creerNotification(
    notifications : List.List<Types.Notification>,
    utilisateurId : Types.UserId,
    typeNotif : Types.TypeNotification,
    message : Text,
    nextId : Nat,
    maintenant : Types.Timestamp,
  ) : Types.Notification {
    Runtime.trap("not implemented");
  };

  // Marque une notification comme lue
  public func marquerCommeLue(
    notifications : List.List<Types.Notification>,
    notifId : Nat,
    utilisateurId : Types.UserId,
  ) : Bool {
    Runtime.trap("not implemented");
  };

  // Retourne les notifications non lues pour un utilisateur
  public func notificationsNonLues(
    notifications : List.List<Types.Notification>,
    utilisateurId : Types.UserId,
  ) : [Types.Notification] {
    Runtime.trap("not implemented");
  };

  // Retourne toutes les notifications d'un utilisateur
  public func toutesNotifications(
    notifications : List.List<Types.Notification>,
    utilisateurId : Types.UserId,
  ) : [Types.Notification] {
    Runtime.trap("not implemented");
  };
};
