import { createIsomorphicFn } from "@tanstack/react-start";
import type { ModulePermissions } from "../models/modulePermissions";
import type { LoginResult } from "../models/loginResult";
import type { LoginSchemaType } from "../lib/schemas/loginSchema";
import type { User } from "../models/user";
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

export const getModulePermissions = createIsomorphicFn()
    .server(async (endpoint: string)
        : Promise<ModulePermissions> => {
        const { data } = await serverClient.get<ModulePermissions>(endpoint);
        return data;
    })
    .client(async (endpoint: string)
        : Promise<ModulePermissions> => {
        const { data } = await api.get(endpoint);
        return data;
    })