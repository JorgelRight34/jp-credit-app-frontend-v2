import type { SearchFormConfig } from "@/components";
import type { ProfileQuery } from "../../models/profileQuery";
import { Input } from "@/components";

export const profileSearchConfig: SearchFormConfig<ProfileQuery> = {
    options: [
        { name: "names", label: "Nombres", width: 6, type: (p) => Input(p) },
        { name: "lastName", label: "Apellidos", width: 6, type: (p) => Input(p) },
    ],
    advanced: []
}