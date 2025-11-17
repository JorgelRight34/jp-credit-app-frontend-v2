import { LoanQuery } from "@/features/loans";
import { TransactionType } from "@/features/transactions";
import { TimeUnit } from "@/models";

export type FinanceQuery = LoanQuery & {
    timeUnit: TimeUnit;
    start: Date;
    end: Date;
    type?: TransactionType;
}