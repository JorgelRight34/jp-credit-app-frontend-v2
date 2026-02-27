import { Loan } from "@/features/loans";
import { FinancialBreakdown } from "./financialBreakdown";

export interface Projection extends FinancialBreakdown {
    loanId: Loan["id"];
    projections: Array<Projection>;
}