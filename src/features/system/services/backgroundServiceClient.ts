import { PagedResponse } from "@/models";
import { BackgroundServiceFilter } from "../models/backgroundServiceFilter";
import { BackgroundService } from "../models/backgroundService";
import api from "@/lib/services/api";
import { BackgroundServiceConfigurationFormValues } from "../lib/schemas/backgroundServiceConfigurationSchema";

const baseUrl = "background-service-configurations"

export const getBackgroundServices = async (params: BackgroundServiceFilter): Promise<PagedResponse<BackgroundService>> => {
    const { data } = await api.get(baseUrl, { params })
    return data;
}

export const getBackgroundService = async (id: BackgroundService["id"]): Promise<BackgroundService> => {
    const { data } = await api.get(baseUrl + "/" + id)
    return data;
}

export const updateBackgroundServiceConfiguration = async (id: BackgroundService["id"], body: BackgroundServiceConfigurationFormValues): Promise<void> => {
    await api.put(baseUrl + "/" + id, body)
}