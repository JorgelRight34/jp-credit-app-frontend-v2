import { SearchFormConfig } from "@/components";
import { AccountStatementQuery } from "../../models/accountStatementQuery";
import { GuarantorSearchInput } from "@/features/profiles";
import { LoanSearchInput } from "@/features/loans";
import { exportProfileAccountStatus } from "../../services/accountStatementsClient";

export const clientAccountStatementSearchConfig: SearchFormConfig<AccountStatementQuery> = {
    options: [{ name: "loanId", label: "Préstamo", width: 12, type: p => LoanSearchInput(p) }],
    advanced: [],
    onExport: exportProfileAccountStatus
}

export const guarantorAccountStatementSearchConfig: SearchFormConfig<AccountStatementQuery> = {
    options: [{ name: "profileId", label: "Garante", width: 12, type: p => GuarantorSearchInput(p) }],
    advanced: [],
    onExport: exportProfileAccountStatus
}
