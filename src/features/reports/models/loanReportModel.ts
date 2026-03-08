import { Loan } from "@/features/loans";
import { Profile } from "@/features/profiles";

export interface LoanReportModel extends Loan {
    client: Profile;
}