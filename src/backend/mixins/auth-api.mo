import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Map "mo:core/Map";
import AuthTypes "../types/auth";
import CommonTypes "../types/common";

mixin (
  utilisateurs : List.List<AuthTypes.Utilisateur>,
  otpEnAttente : Map.Map<Text, AuthTypes.DonneesOtp>,
  tentativesOtp : List.List<AuthTypes.TentativeOtp>,
  nextUserId : Nat,
) {

  /// Inscrit un nouvel utilisateur. Retourne l'ID créé ou une erreur.
  public shared func inscrire(
    params : AuthTypes.ParamsInscription
  ) : async CommonTypes.ResultOk<AuthTypes.Utilisateur> {
    Runtime.trap("not implemented");
  };

  /// Envoie un OTP SMS (simulé) au numéro donné.
  public shared func envoyerOtp(telephone : Text) : async CommonTypes.ResultOk<Text> {
    Runtime.trap("not implemented");
  };

  /// Vérifie l'OTP soumis par l'utilisateur.
  public shared func verifierOtp(
    telephone : Text,
    code : Text,
  ) : async CommonTypes.ResultOk<Bool> {
    Runtime.trap("not implemented");
  };

  /// Connecte un utilisateur (téléphone + mot de passe haché).
  public shared func seConnecter(
    telephone : Text,
    motDePasseHache : Text,
  ) : async CommonTypes.ResultOk<AuthTypes.Utilisateur> {
    Runtime.trap("not implemented");
  };

  /// Retourne le profil d'un utilisateur par ID.
  public query func obtenirProfil(
    id : AuthTypes.UserId
  ) : async ?AuthTypes.Utilisateur {
    Runtime.trap("not implemented");
  };

  /// Met à jour l'email ou le téléphone d'un utilisateur.
  public shared func mettreAJourProfil(
    id : AuthTypes.UserId,
    email : ?Text,
    telephone : ?Text,
  ) : async CommonTypes.ResultOk<Bool> {
    Runtime.trap("not implemented");
  };
};
