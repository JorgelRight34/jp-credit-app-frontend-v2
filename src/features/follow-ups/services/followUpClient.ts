import { Query } from "@/components";
import { PagedResponse } from "@/models";
import { FollowUp } from "../models/followUp";
import api from "@/lib/services/api";
import { FollowUpFormValues } from "../lib/schemas/followUpFormSchema";

const baseUrl = "follow-ups"

export const getFollowUps = async (params: Query): Promise<PagedResponse<FollowUp>> => {
    const { data } = await api.get(baseUrl, { params })
    return data;
}

export const getFollowUp = async (id: FollowUp["id"]): Promise<FollowUp> => {
    const { data } = await api.get(baseUrl + "/" + id);
    return data;
}

export const createFollowUp = async (body: FollowUpFormValues): Promise<FollowUp> => {
    const { data } = await api.post(baseUrl, body);
    return data;
}

export const updateFollowUp = async (id: FollowUp["id"], body: FollowUpFormValues) => {
    await api.patch(baseUrl + "/" + id, body);
}

export const deleteFollowUp = async (id: FollowUp["id"]) => {
    await api.delete(baseUrl + "/" + id);
}