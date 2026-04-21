import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Types "../types/bus";

module {
  // Retourne les données initiales (exemples statiques)
  public func lignesExemples() : [Types.Ligne] {
    Runtime.trap("not implemented");
  };

  // Filtre les lignes par région
  public func lignesParRegion(
    lignes : List.List<Types.Ligne>,
    region : Types.Region,
  ) : [Types.Ligne] {
    Runtime.trap("not implemented");
  };

  // Retourne une ligne par ID
  public func trouverLigne(
    lignes : List.List<Types.Ligne>,
    id : Nat,
  ) : ?Types.Ligne {
    Runtime.trap("not implemented");
  };

  // Retourne les bus actifs sur une ligne
  public func busParLigne(
    bus : List.List<Types.Bus>,
    ligneId : Nat,
  ) : [Types.Bus] {
    Runtime.trap("not implemented");
  };
};
