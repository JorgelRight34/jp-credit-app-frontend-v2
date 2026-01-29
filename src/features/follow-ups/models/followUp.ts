import { Loan } from "../../Loans/models/loan";


export interface FollowUp {
  id: number;
  title: string;
  body: string;
  date: string;
  loanId: number;
  loan?: Loan;
  clientFullName?: string;
  createdAt?: string | Date;
}
