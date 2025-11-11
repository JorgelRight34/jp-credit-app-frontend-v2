import { TransactionType } from "./transactionType";
import { User } from "../../Auth/models/user";
import { Client } from "../../Profiles/models/client";
import { Loan } from "@/features/Loans/models/loan";
import { Profile } from "@/features/Profiles/models/profile";

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
