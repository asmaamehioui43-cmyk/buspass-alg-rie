import Runtime "mo:core/Runtime";
import List "mo:core/List";
import NotifTypes "../types/notifications";
import CommonTypes "../types/common";

mixin (
  notifications : List.List<NotifTypes.Notification>,
  nextNotifId : Nat,
) {

  /// Retourne les notifications non lues d'un utilisateur.
  public query func notificationsNonLues(
    utilisateurId : NotifTypes.UserId
  ) : async [NotifTypes.Notification] {
    Runtime.trap("not implemented");
  };

  /// Retourne toutes les notifications d'un utilisateur.
  public query func toutesNotifications(
    utilisateurId : NotifTypes.UserId
  ) : async [NotifTypes.Notification] {
    Runtime.trap("not implemented");
  };

  /// Marque une notification comme lue.
  public shared func marquerCommeLue(
    notifId : Nat,
    utilisateurId : NotifTypes.UserId,
  ) : async CommonTypes.ResultOk<Bool> {
    Runtime.trap("not implemented");
  };
};
