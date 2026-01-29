import { Client, Guarantor, LoanOfficer } from "@/features/profiles";

export interface LoanMembers {
    client?: Client;
    guarantor?: Guarantor;
    loanOfficer?: LoanOfficer;
}