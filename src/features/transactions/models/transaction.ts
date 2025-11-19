import { Client, Profile } from "@/features/profiles";
import { TransactionType } from "./transactionType";
import { User } from "@/features/auth";
import { Loan } from "@/features/loans";

export interface Transaction {
  id: number;
  capitalValue: number;
  description?: string;
  interestValue: number;
  loanOwner?: Client;
  penaltyFee: number;
  outstandingAmount: number;
  loanId: number;
  payerId: number;
  date: Date | string;
  createdBy: User;
  type: TransactionType;
  value: number;
  lateDays: number;
  isClosed: boolean;
  clientName: string;
  total: number;
  loan?: Loan;
  payer?: Profile;
}
