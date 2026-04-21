import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Types "../types/transactions";
import AuthTypes "../types/auth";

module {
  // Enregistre une recharge et retourne la transaction créée
  public func enregistrerRecharge(
    transactions : List.List<Types.Transaction>,
    utilisateurs : List.List<AuthTypes.Utilisateur>,
    params : Types.ParamsRecharge,
    nextId : Nat,
    maintenant : Types.Timestamp,
  ) : ?Types.Transaction {
    Runtime.trap("not implemented");
  };

  // Enregistre un débit trajet et retourne la transaction créée
  public func enregistrerDebitTrajet(
    transactions : List.List<Types.Transaction>,
    utilisateurs : List.List<AuthTypes.Utilisateur>,
    params : Types.ParamsDebitTrajet,
    nextId : Nat,
    maintenant : Types.Timestamp,
  ) : ?Types.Transaction {
    Runtime.trap("not implemented");
  };

  // Retourne une page paginée de transactions pour un utilisateur
  public func listerTransactions(
    transactions : List.List<Types.Transaction>,
    utilisateurId : Types.UserId,
    filtre : Types.FiltreTransactions,
  ) : Types.PageTransactions {
    Runtime.trap("not implemented");
  };
};
