import type { SearchFormConfig } from "@/components";
import type { RoleQuery } from "../../models/roleQuery";
import { Input } from "@/components";

export const rolesSearchConfig: SearchFormConfig<RoleQuery> = {
    options: [
        { name: 'id', label: 'Id', width: 2, type: (props) => Input(props) },
        { name: 'name', label: 'Nombre', width: 10, type: (props) => Input(props) },
    ],
    advanced: [],
}