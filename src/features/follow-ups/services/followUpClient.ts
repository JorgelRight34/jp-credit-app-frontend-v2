
import { fetchEntity, fetchWithQueryParams } from "@/lib/utils/utils";
import { FollowUp } from "../models/followUp";
import { FollowUpQuery } from "../models/followUpQuery";
import { PagedResponse } from "@/models";
import { FollowUpFormValues } from "../lib/form";
import api from "@/lib/services/api";
import { getModulePermissions, permissionsQueryKey } from "@/features/auth";
import { PERMISSIONS_ENDPOINT_SUFFIX } from "@/lib/utils/constants";
import { PermissionsProvider } from "@/models/permissionsProvider";
import { followUpsTag } from "../lib/constants";

const baseUrl = "follow-ups";

export const getFollowUp = async (id: number) => {
  return await fetchEntity(`${baseUrl}/${id}`, [followUpsTag, id.toString()])
};

export const getFollowUps = async (
  query: FollowUpQuery
): Promise<PagedResponse<FollowUp>> => {
  return await fetchWithQueryParams(baseUrl, query);
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

export const followUpClient = {
  getFollowUp,
  getFollowUps,
  getFollowUpModulePermissions,
  createFollowUp,
  deleteFollowUp
}