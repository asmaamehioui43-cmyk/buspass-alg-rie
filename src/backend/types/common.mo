module {
  // Identifiants communs
  public type UserId = Nat;
  public type Timestamp = Int; // nanosecondes depuis epoch (Time.now())

  // Résultat générique
  public type ResultOk<T> = { #ok : T; #err : Text };
};
