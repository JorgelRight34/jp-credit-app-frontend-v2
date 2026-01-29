
import api from "@/lib/services/api";
import { Collateral } from "../models/collateral";
import { fetchBlobWithQueryParams, fetchEntity, fetchWithQueryParams } from "@/lib/utils/utils";
import { PagedResponse } from "@/models";
import { PERMISSIONS_ENDPOINT_SUFFIX } from "@/lib/utils/constants";
import { Query } from "@/models/query";
import { Collateralization } from "../models/collateralization";
import { CollateralFormValues } from "../lib/form";
import { CollateralQuery } from "../models/collateralQuery";
import { collateralsTag } from "../lib/constants"
import { FileModel } from "@/models/fileModel";
import { getModulePermissions } from "@/features/auth";

const baseUrl = "collaterals";

export const createCollateral = async (data: CollateralFormValues) => {
  const response = await api.post(baseUrl, {
    ...data,
    expirationDate: data.expirationDate || null,
  });
  return response.data;
};

export const liquidateCollateral = async (collateralId: number): Promise<Collateralization> => {
  const response = await api.post("collateralizations", { collateralId });
  return response.data;
};

export const deleteCollateralizationByCollateralId = async (
  collateralId: number
) => {
  const response = await api.delete(
    `collateralizations/collaterals/${collateralId}`
  );
  return response.data;
};

export const getCollateral = async (id: number): Promise<Collateral> => {
  return await fetchEntity(`${baseUrl}/${id}`, [collateralsTag, id.toString()]);
};

export const editCollateral = async (
  id: number,
  data: CollateralFormValues,
): Promise<Collateral> => {
  const response = await api.put(`${baseUrl}/${id}`, {
    ...data,
  });
  return response.data;
};

export const deleteCollateral = async (id?: number) => {
  const response = await api.delete(`${baseUrl}/${id}`);
  return response.data;
};

export const getCollaterals = async (query?: CollateralQuery): Promise<PagedResponse<Collateral>> => {
  const response = await fetchWithQueryParams(baseUrl, query)
  return response;
}

export const uploadCollateralFiles = async (id: number, files: File[]) => {
  const data = new FormData();
  files.forEach(file => data.append("files", file))

  await api.post(`${baseUrl}/${id}/files`, data)
}

export const deleteCollateralFiles = async (files: FileModel[]) => {
  await Promise.all(files.map(file => api.delete(`${baseUrl}/${file.id}/photo`)));
}

export const getCollateralModulePermissions = async () => {
  return await getModulePermissions(`${baseUrl}/${PERMISSIONS_ENDPOINT_SUFFIX}`);
}

export const getCollateralsReportBlob = async (query?: Query) => {
  return await fetchBlobWithQueryParams("collaterals/export", query)
}

export const collateralClient = {
  getCollateral,
  getCollaterals,
  createCollateral,
  liquidateCollateral,
  deleteCollateral
}