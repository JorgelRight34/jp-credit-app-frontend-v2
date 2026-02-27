import { Query } from "@/components";
import { TransactionType } from "@/features/transactions";

export interface FinanceQuery extends Query {
    interval?: 365 | 30 | 1;
    startDate?: string;
    endDate?: string;
    scale?: string; // FOR NOW
    type?: TransactionType
}