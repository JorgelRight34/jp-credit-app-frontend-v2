import { createIsomorphicFn } from "@tanstack/react-start";
import type { UpdatePermissionsHandler } from "../hooks/usePermissionsForm";
import type { RoleFormSchemaValues } from "../lib/schemas/roleFormSchema";
import type { RoleQuery } from "../models/roleQuery";
import type { ModulePermissions } from "../../../components/organisms/protected/models/modulePermissions";
import type { LoginResult } from "../models/loginResult";
import type { LoginSchemaType } from "../lib/schemas/loginSchema";
import type { User } from "../models/user";
import type { IdentityClaims } from "../models/identityClaims";
import type { PagedResponse } from "@/models";
import type { Role } from "../models/role";
import { SERVER_URI } from "@/lib/constants/server";
import api from "@/lib/services/api";
import { serverClient } from "@/lib/services/serverClient";

export const getCurrentUser = async (): Promise<User> => {
    const { data } = await api.get(`auth/users/me`);
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

export const updateRoleClaims: UpdatePermissionsHandler = async (id, body) => {
    await api.patch("auth/roles/" + id + "/claims", body);
}

export const getRoles = async (params: RoleQuery): Promise<PagedResponse<Role>> => {
    const { data } = await api.get("auth/roles", { params })
    return data;
}

export const getRole = async (id: number): Promise<Role> => {
    const { data } = await api.get("auth/roles/" + id);
    return data;
}

export const createRole = async (body: RoleFormSchemaValues): Promise<Role> => {
    const { data } = await api.post('auth/roles', body);
    return data;
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