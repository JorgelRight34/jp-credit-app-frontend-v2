import type { ProfileFormValues } from "../lib/schemas/profileFormSchema";
import type { Profile } from "../models/profile";
import type { ProfileQuery } from "../models/profileQuery";
import api from "@/lib/services/api";

const baseUrl = "profiles"

const createGetProfileRoleHandler = (suffix: string) => async (params: ProfileQuery) => {
    const { data } = await api.get(baseUrl + suffix, { params });
    return data;
}

export const getProfiles = createGetProfileRoleHandler("");
export const getClients = createGetProfileRoleHandler("/clients")
export const getGuarantors = createGetProfileRoleHandler("/guarantors")
export const getLoanOfficers = createGetProfileRoleHandler("/loan-officers")

export const createProfile = async (body: ProfileFormValues): Promise<Profile> => {
    const { data } = await api.post(baseUrl, body);
    return data;
}

export const updateProfile = async (body: ProfileFormValues) => {
    await api.post(baseUrl, body);
}

export const uploadProfilePhoto = async (id: number, file: File) => {
    const data = new FormData();
    data.append("file", file);

    await api.post(`${baseUrl}/${id}/photo`, data)
}

export const deleteProfilePhoto = async (id: number, publicId: string) => {
    await api.delete(`${baseUrl}/${id}/photo/${publicId}`);
}

export const getProfile = async (id: number): Promise<Profile> => {
    const { data } = await api.get(`${baseUrl}/${id}`);
    return data;
}