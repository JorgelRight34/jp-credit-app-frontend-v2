import type { CollateralFormValues } from "../lib/schemas/collateralFormSchema";
import type { CollateralQuery } from "../models/collateralQuery";
import type { Collateral } from "../models/collateral";
import type { PagedResponse } from "@/models";
import api from "@/lib/services/api";
import { FileStorageService } from "@/lib/services";
import { CollateralLiquidateFormValues } from "../lib/schemas/collateralLiquidateFormSchema";
import { PaymentResult } from "@/features/transactions";
import { CollateralSellFormValues } from "../lib/schemas/collateralSellFormSchema";

const baseUrl = "collaterals"

export const getCollaterals = async (params: CollateralQuery): Promise<PagedResponse<Collateral>> => {
    const { data } = await api.get(baseUrl, { params });
    return data;
}

export const getCollateral = async (id: number): Promise<Collateral> => {
    const { data } = await api.get(baseUrl + "/" + id);
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

export const deleteCollateral = async (id: Collateral["id"]) => {
    await api.delete(baseUrl + "/" + id)
}

export const liquidateCollateral = async (id: Collateral["id"], body: CollateralLiquidateFormValues) => {
    const { data } = await api.post(baseUrl + "/" + id + "/liquidation", { ...body, isPreview: true }); // JUST FOR TESTS OF NOW
    return data;
}

export const previewLiquidateCollateral = async (id: Collateral["id"], body: CollateralLiquidateFormValues) => {
    const { data } = await api.post<PaymentResult>(baseUrl + "/" + id + "/liquidation", { ...body, isPreview: true });
    return data
}

export const sellCollateral = async (id: Collateral["id"], body: CollateralSellFormValues) => {
    const { data } = await api.post<PaymentResult>(baseUrl + "/" + id + "/sell", { ...body, isPreview: true });
    return data
}