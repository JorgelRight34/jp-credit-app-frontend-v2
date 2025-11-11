
import { PagedResponse } from "@/models";
import { FinancialBreakdown } from "./financialBreakdown";

export type FinanceReport = PagedResponse<FinancialBreakdown> &
{
    summary: FinancialBreakdown;
    start: string;
    end: string;
};
