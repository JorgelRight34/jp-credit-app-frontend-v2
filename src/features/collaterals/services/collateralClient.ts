import type { CollateralFormValues } from "../lib/schemas/collateralFormSchema";
import type { CollateralQuery } from "../models/collateralQuery";
import type { Collateral } from "../models/collateral";
import type { PagedResponse } from "@/models";
import api from "@/lib/services/api";
import { FileStorageService } from "@/lib/services";

const baseUrl = "collaterals"

export const getCollaterals = async (params: CollateralQuery): Promise<PagedResponse<Collateral>> => {
    const { data } = await api.get(baseUrl, { params });
    return data;
}

export const createCollateral = async (body: CollateralFormValues): Promise<Collateral> => {
    const { data } = await api.post(baseUrl, body);
    return data;
}

export const updateCollateral = async (id: Collateral["id"], body: CollateralFormValues) => {
    await api.patch(baseUrl + "/" + id, body);
}

export const uploadCollateralFiles = async (id: Collateral["id"], files: Array<File>) => {
    return FileStorageService.upload(files, { collateralId: id })
}

export const deleteCollateralFiles = async (ids: Array<number>) => {
    await FileStorageService.delete(ids);
} 