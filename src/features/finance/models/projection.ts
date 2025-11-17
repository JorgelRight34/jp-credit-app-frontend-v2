import { Loan } from "@/features/loans";
import { FinancialBreakdown } from "./financialBreakdown";


export interface Projection extends FinancialBreakdown {
    loan: Loan;
    projections: Projection[];
}