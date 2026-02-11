import type { Query } from "@/components";
import { LoanStatus } from "./loanStatus";

export type LoanQuery = Query & {
    clientName?: string;
    status?: LoanStatus
    profileId?: number;
    startDate?: string;
    minPrincipalBalance?: number;
    endDate?: string;
    minPaymentValue?: number;
    maxPaymentValue?: number;
    isOverdue?: boolean;
}