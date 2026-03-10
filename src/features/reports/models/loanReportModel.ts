import { Loan } from "@/features/loans";
import { Profile } from "@/features/profiles";

export interface LoanReportModel extends Omit<Loan, "client" | "guarantor" | "loanOfficer"> {
    clientProfile: Profile;
    guarantorProfile: Profile;
    loanOfficerProfile: Profile
}