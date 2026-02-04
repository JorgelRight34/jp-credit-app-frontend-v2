import { permissionsQueryKey, rolesQueryKey, usersQueryKey } from "./constants"

export const createUserQueryKey = (username: string) => {
    return [usersQueryKey, "users", username]
}

export const createRoleQueryKey = (id: number | string) => {
    return [rolesQueryKey, +id]
}

export const createUserPermissionsQueryKey = (userId: number) => {
    return [permissionsQueryKey, usersQueryKey, userId]
}