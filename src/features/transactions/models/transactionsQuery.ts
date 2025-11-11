import { ProfileRole } from "@/features/Profiles/models/profileRole";
import { Query } from "../../../models/query";
import { TransactionType } from "./transactionType";

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
}
