import type { UserQuery } from "../models/userQuery";
import type { PossiblePermissions } from "../models/possiblePermissions";
import type { UserPermissions } from "../models/userPermissions";
import type { UserFormValues } from "../lib/form";
import type { User } from "../models/user";
import type { PagedResponse } from "@/models";
import type { Claim } from "../models/claim";
import type { ChangePasswordSchemaType } from "../lib/schemas/changePasswordSchema";
import { PERMISSIONS_ENDPOINT_SUFFIX } from "@/lib/utils/constants";
import api from "@/lib/services/api";

const baseUrl = "users"

export const createUser = async (data: UserFormValues): Promise<User> => {
  const response = await api.post(baseUrl, data);
  return response.data;
}

export const getUser = async (id: number): Promise<User> => {
  return await api.get(`${baseUrl}/${id}`);
}

export const getUserClaims = async (username: string): Promise<Array<Claim>> => {
  const response = await api.get(`${baseUrl}/${username}/claims`);
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
  data: ChangePasswordSchemaType,
  UserUsername: string
) => {
  const response = await api.put(
    `users/${UserUsername}/change-password`,
    data
  );
  return response.data;
};

export const editUser = async (
  data: UserFormValues,
  id: number
): Promise<User> => {
  const response = await api.put(`${baseUrl}/${id}`, data);
  return response.data;
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