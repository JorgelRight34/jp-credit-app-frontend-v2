import { claimsQueryKey, usersQueryKey } from "./constants"

export const createUserQueryKey = (username: string) => {
    return [usersQueryKey, username]
}

export const createUserPermissionsQueryKey = (username: string) => {
    return [usersQueryKey, username, claimsQueryKey]
}