import { PagedResponse } from "@/models";
import { Projection } from "./projection";
import { Loan } from "@/features/loans";
import { ProfileSummary } from "@/features/profiles";

export interface LoanProjection extends Omit<Loan, "client"> {
    clientOverview: ProfileSummary
}

export interface ProjectionResult extends PagedResponse<Projection> {
    loansMap: Record<Loan["id"], LoanProjection>;
}