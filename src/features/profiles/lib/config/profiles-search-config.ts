import type { SearchFormConfig } from "@/components";
import type { ProfileQuery } from "../../models/profileQuery";
import { CitizenIdInput, MaritalStatusSelect, GenderSelect, Input, NumericInput } from "@/components";

export const profileSearchConfig: SearchFormConfig<ProfileQuery> = {
    options: [
        { name: "names", label: "Nombres y apellidos", width: 12, type: (p) => Input(p) },
    ],
    advanced: [
        { name: "id", label: "Id", width: 6, type: (p) => NumericInput(p) },
        { name: "lastName", label: "Apellidos", width: 6, type: (p) => Input(p) },
        { name: "DNI", label: "Cédula", width: 6, type: (p) => CitizenIdInput(p) },
        { name: "gender", label: "Género", width: 6, type: (p) => GenderSelect(p) },
        { name: "maritalStatus", label: "Estado civil", width: 6, type: (p) => MaritalStatusSelect(p) },
        { name: "address", label: "Direcciones", width: 6, type: (p) => Input(p) }
    ],
}