import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;

  // Type de transaction
  public type TypeTransaction = {
    #recharge : { referenceBaridi : Text };
    #debitTrajet : {
      ligneId : Nat;
      busId : Text;
      trajetId : Text;
    };
  };

  // Transaction enregistrée
  public type Transaction = {
    id : Nat;
    utilisateurId : UserId;
    montant : Nat; // centimes DA
    soldeApres : Nat;
    typeTransaction : TypeTransaction;
    timestamp : Timestamp;
  };

  // Filtre pour historique paginé
  public type FiltreTransactions = {
    dateDebut : ?Timestamp;
    dateFin : ?Timestamp;
    ligneId : ?Nat;
    page : Nat;
    parPage : Nat;
  };

  // Page de résultats
  public type PageTransactions = {
    elements : [Transaction];
    total : Nat;
    page : Nat;
    parPage : Nat;
  };

  // Paramètres de recharge
  public type ParamsRecharge = {
    utilisateurId : UserId;
    montant : Nat;
    referenceBaridi : Text;
  };

  // Paramètres de débit trajet
  public type ParamsDebitTrajet = {
    utilisateurId : UserId;
    ligneId : Nat;
    busId : Text;
    trajetId : Text;
    montant : Nat;
  };
};
