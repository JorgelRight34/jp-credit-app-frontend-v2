import { Query } from "../../../models/query";
import { Loan } from "./loan";
import { LoanStatus } from "./loanStatus";

export type LoanQuery = Query & Partial<Loan> & {
  profileId?: number;
  startDate?: string;
  minPrincipalBalance?: number;
  endDate?: string;
  status?: LoanStatus;
  minPaymentValue?: number;
  maxPaymentValue?: number;
  isOverdue?: boolean;
}
