import type { SearchFormConfig } from "@/components";
import type { RoleQuery } from "../../models/roleQuery";
import { Input, NumericInput } from "@/components";

export const rolesSearchConfig: SearchFormConfig<RoleQuery> = {
    options: [
        { name: 'name', label: 'Nombre', width: 12, type: (props) => Input(props) },
    ],
    advanced: [
        { name: 'id', label: 'Id', width: 2, type: (props) => NumericInput(props) },
    ],
}