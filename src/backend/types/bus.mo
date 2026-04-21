module {
  // Régions couvertes
  public type Region = {
    #naama;
    #msharia;
    #ainSefra;
  };

  // Station avec ETA estimé
  public type Station = {
    nom : Text;
    ordre : Nat;
    etaMinutes : ?Nat; // null si pas de données temps réel
  };

  // Ligne de bus
  public type Ligne = {
    id : Nat;
    numero : Text;
    nom : Text;
    region : Region;
    tarif : Nat; // centimes DA
    stations : [Station];
  };

  // Bus en service
  public type Bus = {
    id : Text;
    ligneId : Nat;
    numeroPlaque : Text;
    conducteur : Text;
    estEnService : Bool;
  };
};
