import type { UserFormValues } from "../lib/schemas/userFormSchema";
import type { UserQuery } from "../models/userQuery";
import type { IdentityPermissions } from "../models/identityPermissions";
import type { User } from "../models/user";
import type { PagedResponse } from "@/models";
import type { ChangePasswordSchemaType } from "../lib/schemas/changePasswordSchema";
import type { UpdatePermissionsHandler } from "../hooks/usePermissionsForm";
import api from "@/lib/services/api";

const baseUrl = "auth/users"

export const createUser = async (data: UserFormValues): Promise<User> => {
  const response = await api.post(baseUrl, data);
  return response.data;
}

export const getUser = (async (username: string): Promise<User> => {
  const { data } = await api.get(`${baseUrl}/${username}`);
  return data;
});

export const getUserPermissions = async (id: number): Promise<IdentityPermissions> => {
  const response = await api.get(`${baseUrl}/${id}/permissions`);
  return response.data;
};


export const getPermissions = async (id: number): Promise<IdentityPermissions> => {
  const response = await api.get(`${baseUrl}/${id}/permissions/`);
  return response.data;
};


export const changePassword = async (
  id: User["id"],
  data: ChangePasswordSchemaType,
) => {
  const response = await api.put(
    `${baseUrl}/${id}/change-password`,
    data
  );
  return response.data;
};

export const editUser = async (
  data: UserFormValues,
  id: number
) => {
  await api.put(`${baseUrl}/${id}`, data);
  return data;
};

export const editPermission = async (
  payload: { claimsToAdd: Array<string>; claimsToRemove: Array<string> },
  id: string
) => {
  const response = await api.put(
    `${baseUrl}/${id}/update-user-claims`,
    payload
  );
  return response.data;
};

export const getUsers = async (params?: UserQuery): Promise<PagedResponse<User>> => {
  const { data } = await api.get(baseUrl, { params })
  return data;
}

export const deleteUser = async (id: number) => {
  await api.delete(`${baseUrl}/${id}`)
}

export const updateUserClaims: UpdatePermissionsHandler = async (id, body) => {
  await api.patch("auth/users/" + id + "/claims", body);
}

export const updateUserRoles = async (id: User["id"], body: { add: Array<string>, remove: Array<string> }) => {
  await api.patch("auth/users/" + id + "/roles", body);
}

export const userClient = {
  getUser,
  getUsers,
  deleteUser
}