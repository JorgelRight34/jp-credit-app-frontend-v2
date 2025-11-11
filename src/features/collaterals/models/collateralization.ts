import { Loan } from "../../Loans/models/loan";
import { Collateral } from "./collateral";

export interface Collateralization {
  id: number;
  loanId: number;
  collateralId: number;
  loan: Loan;
  collateral: Collateral;
}
