import { createIsomorphicFn } from "@tanstack/react-start";
import type { ClaimPair } from "../models/claimPair";
import type { ModulePermissions } from "../models/modulePermissions";
import type { LoginResult } from "../models/loginResult";
import type { LoginSchemaType } from "../lib/schemas/loginSchema";
import type { User } from "../models/user";
import type { IdentityClaims } from "../models/identityClaims";
import { SERVER_URI } from "@/lib/constants/server";
import api from "@/lib/services/api";
import { serverClient } from "@/lib/services/serverClient";

export const getCurrentUser = async (): Promise<User> => {
    const { data } = await api.get(`users/me`);
    return data;
};

export const login = async (body: LoginSchemaType): Promise<LoginResult> => {
    const { data } = await api.post(`login`, body, { baseURL: SERVER_URI });
    return data;
};

export const logout = async () => {

}

export const getAllPossibleClaims = async (): Promise<IdentityClaims> => {
    const { data } = await api.get("permissions");
    return data;
}

export const updateUserClaims = async (
    username: string,
    body: { add: Array<ClaimPair>; remove: Array<ClaimPair> }
) => {
    await api.patch("users/" + username + "/claims", body);
}

export const getModulePermissions = createIsomorphicFn()
    .server(async (endpoint: string)
        : Promise<ModulePermissions> => {
        return await serverClient.get<ModulePermissions>(endpoint);
    })
    .client(async (endpoint: string)
        : Promise<ModulePermissions> => {
        const { data } = await api.get(endpoint);
        return data;
    })