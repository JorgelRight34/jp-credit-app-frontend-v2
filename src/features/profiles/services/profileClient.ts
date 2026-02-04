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
export const getLoanOfficers = createGetProfileRoleHandler("/loanOfficers")