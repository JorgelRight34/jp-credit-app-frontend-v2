import type { SearchFormConfig } from "@/components";
import type { ProfileQuery } from "../../models/profileQuery";
import { CitizenIdInput, GenderSelect, Input, NumericInput } from "@/components";

export const profileSearchConfig: SearchFormConfig<ProfileQuery> = {
    options: [
        { name: "names", label: "Nombres", width: 4, type: (p) => Input(p) },
        { name: "lastName", label: "Apellidos", width: 4, type: (p) => Input(p) },
        { name: "DNI", label: "Cédula", width: 4, type: (p) => CitizenIdInput(p) }
    ],
    advanced: [
        { name: "id", label: "Id", width: 6, type: (p) => NumericInput(p) },
        { name: "gender", label: "Género", width: 6, type: (p) => GenderSelect(p) },
        { name: "maritalStatus", label: "Estado civil", width: 6, type: (p) => GenderSelect(p) },
        { name: "address", label: "Direcciones", width: 6, type: (p) => Input(p) }
    ]
}