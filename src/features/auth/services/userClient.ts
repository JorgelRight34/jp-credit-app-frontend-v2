import type { UserFormValues } from "../lib/schemas/userFormSchema";
import type { UserQuery } from "../models/userQuery";
import type { PossiblePermissions } from "../models/possiblePermissions";
import type { UserPermissions } from "../models/userPermissions";
import type { User } from "../models/user";
import type { PagedResponse } from "@/models";
import type { ChangePasswordSchemaType } from "../lib/schemas/changePasswordSchema";
import api from "@/lib/services/api";

const baseUrl = "users"

export const createUser = async (data: UserFormValues): Promise<User> => {
  const response = await api.post(baseUrl, data);
  return response.data;
}

export const getUser = (async (username: string): Promise<User> => {
  const { data } = await api.get(`${baseUrl}/${username}`);
  return data;
});

export const getUserPermissions = async (username: string): Promise<UserPermissions> => {
  const response = await api.get(`${baseUrl}/${username}/permissions`);
  return response.data;
};

export const getAllPosiblePermissions =
  async (): Promise<PossiblePermissions> => {
    const response = await api.get(`permissions/possible-permissions`);
    return response.data;
  };

export const getPermissions = async (id: number): Promise<UserPermissions> => {
  const response = await api.get(`${baseUrl}/${id}/permissions/`);
  return response.data;
};


export const changePassword = async (
  id: User["id"],
  data: ChangePasswordSchemaType,
) => {
  const response = await api.put(
    `users/${id}/change-password`,
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
  const { data } = await api.get("users", { params })
  return data;
}

export const deleteUser = async (id: number) => {
  await api.delete(`${baseUrl}/${id}`)
}

export const userClient = {
  getUser,
  getUsers,
  deleteUser
}