import { PagedResponse } from "@/models";
import { BackgroundServiceFilter } from "../models/backgroundServiceFilter";
import { BackgroundService } from "../models/backgroundService";
import api from "@/lib/services/api";

const baseUrl = "background-service-configurations"

export const getBackgroundServices = async (params: BackgroundServiceFilter): Promise<PagedResponse<BackgroundService>> => {
    const { data } = await api.get(baseUrl, { params })
    return data;
}