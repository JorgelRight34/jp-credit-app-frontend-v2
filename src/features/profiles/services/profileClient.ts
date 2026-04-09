import { withProjectIdParams } from "@/features/projects";
import type { ProfileFormValues } from "../lib/schemas/profileFormSchema";
import type { Profile } from "../models/profile";
import type { ProfileQuery } from "../models/profileQuery";
import { FileStorageApiService } from "@/lib/services";
import api from "@/lib/services/api";
import { ChangeHistory, ChangeLogQuery } from "@/features/audit";

const baseUrl = "profiles"

const createGetProfileRoleHandler = (suffix: string) => async (params: ProfileQuery) => {
    const { data } = await api.get(baseUrl + suffix, { params: withProjectIdParams(params) });
    return data;
}

export const getProfiles = createGetProfileRoleHandler("");
export const getClients = createGetProfileRoleHandler("/clients")
export const getGuarantors = createGetProfileRoleHandler("/guarantors")
export const getLoanOfficers = createGetProfileRoleHandler("/loan-officers")

export const getProfileChangeHistory = async (id: number, params: ChangeLogQuery): Promise<ChangeHistory> => {
    const { data } = await api.get(`${baseUrl}/${id}/changes`, { params })
    return data;
}

export const createProfile = async (body: ProfileFormValues): Promise<Profile> => {
    const { data } = await api.post(baseUrl, body);
    return data;
}

export const updateProfile = async (id: Profile["id"], body: ProfileFormValues) => {
    await api.patch(baseUrl + "/" + id, body);
}

export const uploadProfilePhoto = async (id: number, file: File) => {
    return FileStorageApiService.upload([file], `${baseUrl}/${id}/files`)
}

export const deleteProfilePhoto = async (id: number, publicId: string) => {
    await FileStorageApiService.delete([publicId], `${baseUrl}/${id}/files`);
}

export const getProfile = async (id: number): Promise<Profile> => {
    const { data } = await api.get(`${baseUrl}/${id}`);
    return data;
}