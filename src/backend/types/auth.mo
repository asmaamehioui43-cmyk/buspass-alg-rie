import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;

  // Statut de vérification OTP
  public type OtpStatut = {
    #enAttente;
    #verifie;
    #expire;
  };

  // Profil utilisateur (type partageable — pas de champs var)
  public type Utilisateur = {
    id : UserId;
    nomComplet : Text;
    telephone : Text;
    email : ?Text;
    motDePasseHache : Text;
    numeroCarte : Text;
    solde : Nat; // centimes DA
    estVerifie : Bool;
    dateInscription : Timestamp;
  };

  // Données OTP stockées
  public type DonneesOtp = {
    code : Text;
    telephone : Text;
    expireA : Timestamp;
    tentatives : Nat;
  };

  // Tentative OTP échouée
  public type TentativeOtp = {
    telephone : Text;
    timestamp : Timestamp;
  };

  // Paramètres d'inscription
  public type ParamsInscription = {
    nomComplet : Text;
    telephone : Text;
    email : ?Text;
    motDePasseHache : Text;
  };

  // Résultat de connexion
  public type ResultatConnexion = {
    utilisateur : Utilisateur;
  };
};
