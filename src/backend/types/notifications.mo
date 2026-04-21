import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;

  // Type de notification
  public type TypeNotification = {
    #recharge;
    #trajet;
    #alerte;
  };

  // Notification stockée
  public type Notification = {
    id : Nat;
    utilisateurId : UserId;
    typeNotif : TypeNotification;
    message : Text;
    timestamp : Timestamp;
    lue : Bool;
  };
};
