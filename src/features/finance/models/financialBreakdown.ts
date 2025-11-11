import { Loan } from "@/features/Loans/models/loan";

export interface FinancialBreakdown<T = unknown> {
    date: Date | string;
    interest: number;
    capital: number;
    loan?: Loan;
    fee: number;
    total: number;
    id: number;
    start: Date | string;
    end: Date | string;
    items: T[];
}