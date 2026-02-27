import { Loan } from "@/features/loans";

export interface FinancialBreakdown<T = unknown> {
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