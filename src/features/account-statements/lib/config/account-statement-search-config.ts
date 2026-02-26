import { SearchFormConfig } from "@/components";
import { AccountStatementQuery } from "../../models/accountStatementQuery";
import { ClientSearchInput, GuarantorSearchInput, ProfileSearchInput } from "@/features/profiles";

export const accountStatementSearchConfig: SearchFormConfig<AccountStatementQuery> = {
    options: [{ name: "profileId", label: "Pérfil", width: 12, type: p => ProfileSearchInput(p) }],
    advanced: [],
    defaultValues: { profileId: "" }
}

export const clientAccountStatementSearchConfig: SearchFormConfig<AccountStatementQuery> = {
    options: [{ name: "profileId", label: "Cliente", width: 12, type: p => ClientSearchInput(p) }],
    advanced: [],
    defaultValues: { profileId: "" }
}

export const guarantorAccountStatementSearchConfig: SearchFormConfig<AccountStatementQuery> = {
    options: [{ name: "profileId", label: "Garante", width: 12, type: p => GuarantorSearchInput(p) }],
    advanced: [],
    defaultValues: { profileId: "" }
}
