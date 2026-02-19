import { Query } from "@/components";
import { TransactionType } from "./transactionType";
import { ProfileRole } from "@/features/profiles";

export interface TransactionQuery extends Query {
    type?: TransactionType;
    loanId?: number;
    startDate?: string;
    minValue?: number;
    maxValue?: number;
    isLate?: boolean;
    endDate?: string;
    profileId?: number;
    profileAs?: ProfileRole;
    date?: string
    isOverdue?: boolean
}