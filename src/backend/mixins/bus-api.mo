import Runtime "mo:core/Runtime";
import List "mo:core/List";
import BusTypes "../types/bus";

mixin (
  lignes : List.List<BusTypes.Ligne>,
  bus : List.List<BusTypes.Bus>,
) {

  /// Retourne toutes les lignes disponibles.
  public query func listerLignes() : async [BusTypes.Ligne] {
    Runtime.trap("not implemented");
  };

  /// Retourne les lignes filtrées par région.
  public query func lignesParRegion(region : BusTypes.Region) : async [BusTypes.Ligne] {
    Runtime.trap("not implemented");
  };

  /// Retourne le détail d'une ligne par ID.
  public query func obtenirLigne(id : Nat) : async ?BusTypes.Ligne {
    Runtime.trap("not implemented");
  };

  /// Retourne les bus actifs sur une ligne.
  public query func busParLigne(ligneId : Nat) : async [BusTypes.Bus] {
    Runtime.trap("not implemented");
  };
};
