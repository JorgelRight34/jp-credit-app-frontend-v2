import type { UserQuery } from "../../models/userQuery";
import type { SearchFormConfig } from "@/components";
import { Input } from "@/components";

export const userSearchConfig: SearchFormConfig<UserQuery> = {
    options: [
        { name: 'id', label: 'Id', width: 2, type: (props) => Input(props) },
        { name: 'username', label: 'Usuario', width: 4, type: (props) => Input(props) },
        { name: 'firstName', label: 'Nombres', width: 3, type: (props) => Input(props) },
        { name: 'lastName', label: 'Apellidos', width: 3, type: (props) => Input(props) },
    ],
    advanced: [{ name: 'email', label: 'Email', width: 12, type: (props) => Input(props) }],
}