import List "mo:core/List";
import Map "mo:core/Map";

import AuthTypes "types/auth";
import TxTypes "types/transactions";
import BusTypes "types/bus";
import NotifTypes "types/notifications";

import AuthApi "mixins/auth-api";
import TxApi "mixins/transactions-api";
import BusApi "mixins/bus-api";
import NotifApi "mixins/notifications-api";

actor {
  // --- État utilisateurs & OTP ---
  let utilisateurs = List.empty<AuthTypes.Utilisateur>();
  let otpEnAttente = Map.empty<Text, AuthTypes.DonneesOtp>();
  let tentativesOtp = List.empty<AuthTypes.TentativeOtp>();
  var nextUserId : Nat = 1;

  // --- État transactions ---
  let transactions = List.empty<TxTypes.Transaction>();
  var nextTxId : Nat = 1;

  // --- État bus & lignes ---
  let lignes = List.empty<BusTypes.Ligne>();
  let bus = List.empty<BusTypes.Bus>();

  // --- État notifications ---
  let notifications = List.empty<NotifTypes.Notification>();
  var nextNotifId : Nat = 1;

  // --- Composition des mixins ---
  include AuthApi(utilisateurs, otpEnAttente, tentativesOtp, nextUserId);
  include TxApi(transactions, utilisateurs, nextTxId);
  include BusApi(lignes, bus);
  include NotifApi(notifications, nextNotifId);
};
