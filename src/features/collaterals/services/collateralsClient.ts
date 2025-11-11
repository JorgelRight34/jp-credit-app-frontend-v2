
import api from "@/services/api";
import { CollateralFormValues } from "../lib/form";
import { Collateral } from "../models/collateral";
import { Collateralization } from "../models/collateralization";
import { CollateralQuery } from "../models/collateralQuery";
import { fetchBlobWithQueryParams, fetchWithQueryParams } from "@/utils/utils";
import { ApiFile, PagedResponse } from "@/models";
import { getModulePermissions } from "@/features/Auth/services/userService";
import { PERMISSIONS_ENDPOINT_SUFFIX } from "@/utils/constants";
import { Query } from "@/models/query";

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
  const response = await api.get(`${baseUrl}/${id}`);
  return response.data;
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

export const deleteCollateralFiles = async (files: ApiFile[]) => {
  await Promise.all(files.map(file => api.delete(`${baseUrl}/${file.id}/photo`)));
}

export const getCollateralModulePermissions = async () => {
  return await getModulePermissions(`${baseUrl}/${PERMISSIONS_ENDPOINT_SUFFIX}`);
}

export const getCollateralsReportBlob = async (query?: Query) => {
  return await fetchBlobWithQueryParams("collaterals/export", query)
}