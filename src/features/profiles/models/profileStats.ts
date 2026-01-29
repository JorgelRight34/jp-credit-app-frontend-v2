import { Loan } from "@/features/loans";
import { Transaction } from "@/features/transactions";

export interface ProfileStats {
  lastLoan: Loan;
  lastTransaction?: Transaction;
  loanCount: number;
  collateralCount: number;
}
