import { Loan } from "../../Loans/models/loan";
import { Transaction } from "../../Transactions/models/transaction";

export interface ProfileStats {
  lastLoan: Loan;
  lastTransaction?: Transaction;
  loanCount: number;
  collateralCount: number;
}
