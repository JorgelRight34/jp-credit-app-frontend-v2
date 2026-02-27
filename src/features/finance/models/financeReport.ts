
import { PagedResponse } from "@/models";
import { FinancialBreakdown } from "./financialBreakdown";

export type FinanceReport<T> = PagedResponse<FinancialBreakdown<T>> & {
    summary: FinancialBreakdown;
    start: string;
    end: string;
};
