import { getAllPossibleClaims } from "../services/authService"
import { permissionsQueryKey, rolesQueryKey, usersQueryKey } from "./constants"

export const buildUserQueryKey = (username: string) => {
    return [usersQueryKey, "users", username]
}

export const buildRoleQueryKey = (id: number | string) => {
    return [rolesQueryKey, +id]
}

export const createUserPermissionsQueryKey = (userId: number) => {
    return [permissionsQueryKey, usersQueryKey, userId]
}

export const currentUserQueryKey = ["current-user"];

export const allPossibleClaimsQueryOptions = ({
    key: ['identity-claims'],
    loader: getAllPossibleClaims,
})


export const buildUserChangeHistoryQueryKey = (username: string) => [usersQueryKey, "users", username, "ch"]

export const buildRoleChangeHistoryQueryKey = (id: number) => [rolesQueryKey, +id, "ch"]