import { Loan } from "@/features/loans";
import { Transaction } from "@/features/transactions";

export interface FinancialBreakdown<T = Transaction> {
    date: string;
    interest: number;
    capital: number;
    loan?: Loan;
    fee: number;
    total: number;
    id: number;
    start: string;
    end: string;
    items: Array<T>;
}