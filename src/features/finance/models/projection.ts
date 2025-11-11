import { Loan } from "@/features/Loans/models/loan";
import { FinancialBreakdown } from "./financialBreakdown";


export interface Projection extends FinancialBreakdown {
    loan: Loan;
    projections: Projection[];
}