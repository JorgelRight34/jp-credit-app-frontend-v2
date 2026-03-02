import { Query } from "@/components";
import { TransactionType } from "@/features/transactions";

export interface FinanceQuery extends Query {
    interval?: 365 | 30 | 1;
    startDate?: string;
    endDate?: string;
    chart?: "pie" | "linear" | "bar"
    type?: TransactionType;
    vsStartDate?: string;
    vsEndDate?: string;
}