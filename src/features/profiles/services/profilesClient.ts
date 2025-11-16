import { Loan } from "../../loans/models/loan";
import { Profile } from "../models/profile";
import { fetchBlobWithQueryParams, fetchWithQueryParams } from "@/utils/utils";
import { PERMISSIONS_ENDPOINT_SUFFIX } from "@/utils/constants";
import { Query } from "@/models/query";
import { ProfileStats } from "../models/profileStats";
import { ProfileFormValues } from "../lib/profileForm";
import api from "@/services/api";
import { ProfileRole } from "../models/profileRole";
import { getProfilesEndpointForRole } from "../lib/utils";
import { getModulePermissions } from "@/features/auth";

const baseUrl = "/profiles";

export const fetchProfileStats = async (id: number): Promise<ProfileStats> => {
  const response = await api.get(`${baseUrl}/${id}/stats`);
  return response.data;
};

export const getProfile = async (id: number): Promise<Profile> => {
  const response = await api.get(`${baseUrl}/${id}`);
  return response.data;
};

export const createProfile = async (data: ProfileFormValues): Promise<Profile> => {
  const response = await api.post("profiles", data);

  return response.data;
};

export const editProfile = async (
  data: ProfileFormValues,
  id: number
): Promise<void> => {
  await api.put(`${baseUrl}/${id}`, data);
};

export const deleteProfile = async (id: number) => {
  const response = await api.delete(`${baseUrl}/${id}`);
  return response.data;
};


export const getProfileOverduePayments = async (
  id: number,
  page: number
): Promise<Loan[]> => {
  const response = await api.get(`${baseUrl}/${id}/overdue-loans?page=${page}`);
  return response.data;
};

export const uploadProfilePhoto = async (id: number, file: File) => {
  const data = new FormData();
  data.append("file", file);

  await api.post(`${baseUrl}/${id}/photo`, data)
}

export const deleteProfilePhoto = async (id: number, publicId: string) => {
  await api.delete(`${baseUrl}/${id}/photo/${publicId}`);
}

export const getProfiles = async (role: ProfileRole, options: Query) => {
  const response = await fetchWithQueryParams(getProfilesEndpointForRole(role), options);
  return response;
}

export const getProfileModulePermissions = async () => {
  return await getModulePermissions(`${baseUrl}/${PERMISSIONS_ENDPOINT_SUFFIX}`)
}


export const getProfilesReportBlob = async (role: ProfileRole, query?: Query) => {
  return await fetchBlobWithQueryParams(getProfilesEndpointForRole(role) + "/export", query);
}

export const profilesClient = {
  getProfile
}