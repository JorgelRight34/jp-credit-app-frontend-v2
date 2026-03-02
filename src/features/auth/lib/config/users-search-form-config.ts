import { getRoles } from "../../services/authService";
import { rolesQueryKey } from "../constants";
import type { UserQuery } from "../../models/userQuery";
import type { SearchFormConfig, SelectOptions } from "@/components";
import { EmailInput, Input, LazySelect } from "@/components";

export const userSearchConfig: SearchFormConfig<UserQuery> = {
    options: [
        { name: 'id', label: 'Id', width: 2, type: (props) => Input(props) },
        { name: 'username', label: 'Usuario', width: 4, type: (props) => Input(props) },
        { name: 'firstName', label: 'Nombres', width: 3, type: (props) => Input(props) },
        { name: 'lastName', label: 'Apellidos', width: 3, type: (props) => Input(props) },
    ],
    advanced: [
        { name: 'email', label: 'Email', width: 12, type: (props) => EmailInput(props) },
        {
            name: "role",
            label: "Rol",
            width: 12, type: (props) => LazySelect({
                ...props,
                loader: getRolesSelectOptions,
                cacheKey: [rolesQueryKey, "select-options"]
            })
        }],
}

const getRolesSelectOptions = async (): Promise<SelectOptions> => {
    const { items } = await getRoles({ all: true });
    return items.map(r => [r.normalizedName, `${r.id} - ${r.name}`]);
}
