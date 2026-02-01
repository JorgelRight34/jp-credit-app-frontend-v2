import { claimsQueryKey, usersQueryKey } from "./constants"

export const createUserQueryKey = (username: string) => {
    return [usersQueryKey, username]
}

export const createUserPermissionsQueryKey = (userId: number) => {
    return [usersQueryKey, userId, claimsQueryKey]
}