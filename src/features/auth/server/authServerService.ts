import type { User } from "../models/user";
import type { LoginResult } from "../models/loginResult";
import type { UserPermissions } from "../models/userPermissions";
import { CookieService } from "@/lib/services/cookieService";
import { serverClient } from "@/lib/services/serverClient";

export const loginWithIdp = async (data: { username: string; password: string; }) => {
    const response = await serverClient.post<LoginResult>(`auth/users/login`, data);
    return response
}

export const getCurrentUserFromServer = async (): Promise<User> => {
    return await serverClient.get("auth/users/me", {
        headers: {
            "Authorization": `Bearer ${CookieService.getAuthorization()}`
        }
    });
}

export const getUserFromServer = async (username: string): Promise<User> => {
    return serverClient.get(`auth/users/${username}`)
}

export const getUserPermissionsFromServer = async (username: string) => {
    return await serverClient.get<UserPermissions>(`auth/users/${username}/permissions`);
}