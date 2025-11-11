
import { fetchWithQueryParams } from "@/utils/utils";
import api from "../../../services/api";
import { FollowUpFormValues } from "../lib/form";
import { FollowUp } from "../models/followUp";
import { FollowUpQuery } from "../models/followUpQuery";
import { PagedResponse } from "@/models";
import { PermissionsProvider } from "@/models/permissionsProvider";
import { permissionsQueryKey } from "@/features/Auth/lib/constants";
import { getModulePermissions } from "@/features/Auth/services/userService";
import { PERMISSIONS_ENDPOINT_SUFFIX } from "@/utils/constants";

const baseUrl = "follow-ups";

export const getFollowUp = async (id: number) => {
  const response = await api.get(`${baseUrl}/${id}`);
  return response.data;
};

export const getFollowUps = async (
  query: FollowUpQuery
): Promise<PagedResponse<FollowUp>> => {
  const response = await fetchWithQueryParams(baseUrl, query);
  return response;
};

export const createFollowUp = async (data: FollowUpFormValues) => {
  const response = await api.post(`${baseUrl}`, data);
  return response.data;
};

export const editFollowUp = async (id: number, data: FollowUpFormValues) => {
  const response = await api.put(baseUrl + "/" + id, data);
  return response.data;
}

export const updateFollowUp = async (data: FollowUpFormValues, id: number) => {
  const response = await api.put(`${baseUrl}/${id}`, data);
  return response.data;
};

export const deleteFollowUp = async (id: number | string) => {
  const response = await api.delete(`${baseUrl}/${id}`);
  return response.data;
};

export const getFollowUpModulePermissions = async () => {
  return await getModulePermissions(baseUrl + "/" + PERMISSIONS_ENDPOINT_SUFFIX)
}

export const followUpPermissionsProvider: PermissionsProvider = {
  cacheKey: permissionsQueryKey,
  getPermissions: getFollowUpModulePermissions
}