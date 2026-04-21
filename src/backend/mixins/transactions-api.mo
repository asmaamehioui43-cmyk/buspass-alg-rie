import Runtime "mo:core/Runtime";
import List "mo:core/List";
import TxTypes "../types/transactions";
import AuthTypes "../types/auth";
import CommonTypes "../types/common";

mixin (
  transactions : List.List<TxTypes.Transaction>,
  utilisateurs : List.List<AuthTypes.Utilisateur>,
  nextTxId : Nat,
) {

  /// Recharge le solde via BaridiMob (simulé).
  public shared func rechargerSolde(
    params : TxTypes.ParamsRecharge
  ) : async CommonTypes.ResultOk<TxTypes.Transaction> {
    Runtime.trap("not implemented");
  };

  /// Débite le tarif d'un trajet (paiement QR code).
  public shared func debiterTrajet(
    params : TxTypes.ParamsDebitTrajet
  ) : async CommonTypes.ResultOk<TxTypes.Transaction> {
    Runtime.trap("not implemented");
  };

  /// Retourne l'historique paginé des transactions d'un utilisateur.
  public query func listerTransactions(
    utilisateurId : TxTypes.UserId,
    filtre : TxTypes.FiltreTransactions,
  ) : async TxTypes.PageTransactions {
    Runtime.trap("not implemented");
  };

  /// Retourne le solde actuel d'un utilisateur.
  public query func obtenirSolde(utilisateurId : TxTypes.UserId) : async ?Nat {
    Runtime.trap("not implemented");
  };
};
