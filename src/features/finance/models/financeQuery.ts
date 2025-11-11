import { LoanQuery } from "@/features/Loans/models/loanQuery";
import { TransactionType } from "@/features/Transactions/models/transactionType";
import { TimeUnit } from "@/models";

export type FinanceQuery = LoanQuery & {
    timeUnit: TimeUnit;
    start: Date;
    end: Date;
    type?: TransactionType;
}