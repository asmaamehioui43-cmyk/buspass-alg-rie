import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Map "mo:core/Map";
import Types "../types/auth";

module {
  // Génère un numéro de carte unique (stub)
  public func genererNumeroCarte(nextId : Nat) : Text {
    Runtime.trap("not implemented");
  };

  // Hache un mot de passe (stub — le client envoie déjà le hash)
  public func validerMotDePasse(hacheFourni : Text, hacheStocke : Text) : Bool {
    Runtime.trap("not implemented");
  };

  // Génère un code OTP à 6 chiffres (mock)
  public func genererOtp() : Text {
    Runtime.trap("not implemented");
  };

  // Vérifie si un OTP est encore valide
  public func otpEstValide(donnees : Types.DonneesOtp, maintenant : Types.Timestamp) : Bool {
    Runtime.trap("not implemented");
  };

  // Cherche un utilisateur par téléphone dans la liste
  public func trouverParTelephone(
    utilisateurs : List.List<Types.Utilisateur>,
    telephone : Text,
  ) : ?Types.Utilisateur {
    Runtime.trap("not implemented");
  };

  // Cherche un utilisateur par ID
  public func trouverParId(
    utilisateurs : List.List<Types.Utilisateur>,
    id : Types.UserId,
  ) : ?Types.Utilisateur {
    Runtime.trap("not implemented");
  };

  // Construit un nouvel utilisateur à partir des paramètres d'inscription
  public func nouveauUtilisateur(
    params : Types.ParamsInscription,
    id : Types.UserId,
    numeroCarte : Text,
    maintenant : Types.Timestamp,
  ) : Types.Utilisateur {
    Runtime.trap("not implemented");
  };

  // Met à jour le profil (email ou téléphone)
  public func mettreAJourProfil(
    utilisateurs : List.List<Types.Utilisateur>,
    id : Types.UserId,
    email : ?Text,
    telephone : ?Text,
  ) : Bool {
    Runtime.trap("not implemented");
  };
};
