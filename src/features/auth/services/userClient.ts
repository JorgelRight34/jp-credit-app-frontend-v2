import api from "@/lib/services/api";
import { PossiblePermissions } from "../models/possiblePermissions";
import { ModulePermissions } from "../models/modulePermissions";
import { UserPermissions } from "../models/userPermissions";
import { ChangeUserPasswordValues, UserFormValues } from "../lib/form";
import { User } from "../models/user";
import { fetchEntity, fetchWithQueryParams } from "@/lib/utils/utils";
import { UserQuery } from "../models/userQuery";
import { PagedResponse } from "@/models";
import { PERMISSIONS_ENDPOINT_SUFFIX } from "@/lib/utils/constants";
import { Claim } from "../lib/claim";
import { usersTag } from "../lib/constants";

const baseUrl = "users"

export const createUser = async (data: UserFormValues): Promise<User> => {
  const response = await api.post(baseUrl, data);
  return response.data;
}

export const getUser = async (id: number): Promise<User> => {
  return await fetchEntity(`${baseUrl}/${id}`, [usersTag, id.toString()]);
}

export const getUserClaims = async (username: string): Promise<Claim[]> => {
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

export const getModulePermissions = async (endpoint: string, tags: string[] = [], cache = 0)
  : Promise<ModulePermissions> => {
  const response = await fetch(endpoint, { next: { tags, revalidate: cache } });
  return response.json();
}

export const changePassword = async (
  data: ChangeUserPasswordValues,
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
  payload: { claimsToAdd: string[]; claimsToRemove: string[] },
  id: string
) => {
  const response = await api.put(
    `${baseUrl}/${id}/update-user-claims`,
    payload
  );
  return response.data;
};

export const getUsers = async (query?: UserQuery): Promise<PagedResponse<User>> => {
  const response = await fetchWithQueryParams("users", query)
  return response;
}

export const getUserModulePermissions = async () => {
  return await getModulePermissions(`${baseUrl}/${PERMISSIONS_ENDPOINT_SUFFIX}`)
}

export const deleteUser = async (id: number) => {
  await api.delete(`${baseUrl}/${id}`)
}

export const userClient = {
  getUser,
  getUsers,
  deleteUser
}