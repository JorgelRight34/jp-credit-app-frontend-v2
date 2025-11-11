import { Client } from "@/features/Profiles/models/client";
import { Guarantor } from "@/features/Profiles/models/guarantor";
import { LoanOfficer } from "@/features/Profiles/models/loanOfficer";

export interface LoanMembers {
    client?: Client;
    guarantor?: Guarantor;
    loanOfficer?: LoanOfficer;
}