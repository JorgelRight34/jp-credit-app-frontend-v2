import type { CollateralFormValues } from "../lib/schemas/collateralFormSchema";
import type { CollateralQuery } from "../models/collateralQuery";
import type { Collateral } from "../models/collateral";
import type { PagedResponse } from "@/models";
import api from "@/lib/services/api";
import { FileStorageApiService } from "@/lib/services";
import { CollateralLiquidateFormValues } from "../lib/schemas/collateralLiquidateFormSchema";
import { PaymentResult } from "@/features/transactions";
import { CollateralSellFormValues } from "../lib/schemas/collateralSellFormSchema";
import { ExportHandler } from "@/components";
import { withProjectIdParams } from "@/features/projects";
import { ChangeHistory, ChangeLogQuery } from "@/features/audit";
import { CollateralLiquidationResult } from "../models/collateralLiquidationResult";

const baseUrl = "collaterals"

export const getCollaterals = async (params: CollateralQuery): Promise<PagedResponse<Collateral>> => {
    const { data } = await api.get(baseUrl, { params: withProjectIdParams(params) });
    return data;
}

export const getCollateral = async (id: number): Promise<Collateral> => {
    const { data } = await api.get(baseUrl + "/" + id);
    return data;
}

export const createCollateral = async (body: CollateralFormValues): Promise<Collateral> => {
    if (body.expirationDate === '') body.expirationDate = null;

    const { data } = await api.post(baseUrl, body);
    return data;
}

export const updateCollateral = async (id: Collateral["id"], body: CollateralFormValues) => {
    await api.patch(baseUrl + "/" + id, body);
}

export const uploadCollateralFiles = async (id: Collateral["id"], files: Array<File>) => {
    return FileStorageApiService.upload(files, `${baseUrl}/${id}/files`)
}

export const deleteCollateralFiles = async (id: Collateral["id"], ids: Array<string>) => {
    await FileStorageApiService.delete(ids, `${baseUrl}/${id}/files`);
}

export const deleteCollateral = async (id: Collateral["id"]) => {
    await api.delete(baseUrl + "/" + id)
}

export const liquidateCollateral = async (id: Collateral["id"], body: CollateralLiquidateFormValues): Promise<CollateralLiquidationResult> => {
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

export const exportCollaterals: ExportHandler<CollateralQuery> = async (options, params) => {
    return await api.get(baseUrl, { params: { ...params, ...options } })
}

export const getCollateralChangeHistory = async (id: Collateral["id"], params: ChangeLogQuery): Promise<ChangeHistory> => {
    return await api.get(`${baseUrl}/${id}/changes`, { params })
}