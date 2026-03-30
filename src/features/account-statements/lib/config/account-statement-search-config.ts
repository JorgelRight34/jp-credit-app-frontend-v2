import { SearchFormConfig } from "@/components";
import { AccountStatementQuery } from "../../models/accountStatementQuery";
import { GuarantorSearchInput, ProfileSearchInput } from "@/features/profiles";
import { LoanSearchInput } from "@/features/loans";

export const accountStatementSearchConfig: SearchFormConfig<AccountStatementQuery> = {
    options: [{ name: "profileId", label: "Pérfil", width: 12, type: p => ProfileSearchInput(p) }],
    advanced: [],
}

export const clientAccountStatementSearchConfig: SearchFormConfig<AccountStatementQuery> = {
    options: [{ name: "loanId", label: "Préstamo", width: 12, type: p => LoanSearchInput(p) }],
    advanced: [],
}

export const guarantorAccountStatementSearchConfig: SearchFormConfig<AccountStatementQuery> = {
    options: [{ name: "profileId", label: "Garante", width: 12, type: p => GuarantorSearchInput(p) }],
    advanced: [],
}
