import { Query } from "@/models/query";
import { TransactionType } from "./transactionType";
import { ProfileRole } from "@/features/profiles";

export interface TransactionsQuery extends Query {
  type?: TransactionType;
  loanId?: number;
  transactionId?: number;
  startDate?: string;
  minValue?: number;
  maxValue?: number;
  isLate?: boolean;
  endDate?: string;
  profileId?: number;
  profileAs?: ProfileRole;
  date?: [string | undefined, string | undefined]
}
