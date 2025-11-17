import { ModulePermissions } from "@/features/Auth/models/modulePermissions"
import { getModulePermissions } from "@/features/auth/services/userClient"
import { ReportFormFields, ReportRunFormFields } from "../lib/form"
import api from "@/services/api"
import { ApiFile, PagedResponse } from "@/models"
import { PERMISSIONS_ENDPOINT_SUFFIX } from "@/utils/constants"
import { ReportQuery } from "../models/reportQuery"
import { fetchBlobWithQueryParams, fetchWithQueryParams } from "@/utils/utils"
import { Report } from "../models/report"
import { flattenObject } from "../lib/utils"

const baseUrl = "reports"

export const getReportsModulePermissions = async (): Promise<ModulePermissions> => {
    return await getModulePermissions(`${baseUrl}/${PERMISSIONS_ENDPOINT_SUFFIX}`)
}

export const createReport = async (data: ReportFormFields): Promise<Report> => {
    const response = await api.post(baseUrl, data);
    return response.data
}

export const editReport = async (data: ReportFormFields, id: number) => {
    await api.put(`${baseUrl}/${id}`, data)
}

export const generateReport = async (data: ReportRunFormFields): Promise<Blob> => {
    const record: Record<string, string> = Object.keys(data.context).reduce((acc, curr) => {
        acc[curr] = String(data[curr as keyof typeof data] ?? "");
        return acc
    }, {} as Record<string, string>)

    const response = await api.post(`${baseUrl}/generate`, { ...data, context: flattenObject(record) }, {
        responseType: "blob"
    });
    return response.data;
}

export const deleteReport = async (id: number) => {
    await api.delete(`${baseUrl}/${id}`)
}

export const getReports = async (query?: ReportQuery): Promise<PagedResponse<Report>> => {
    return await fetchWithQueryParams(baseUrl, query);
}

export const getReport = async (id: number): Promise<Report> => {
    const response = await api.get(`${baseUrl}/${id}`);
    return response.data;
}

export const downloadReportRun = async (data: ReportRunFormFields) => {
    return await fetchBlobWithQueryParams(`${baseUrl}/generate`, data);
}

export const uploadReport = async (file: File): Promise<ApiFile> => {
    const formData = new FormData();
    formData.set("file", file);

    const response = await api.post(`files/upload`, formData);

    return response.data;
}

export const bookmarkReport = async (id: number, bookmark: boolean) => {
    await api.put(`${baseUrl}/bookmark/${id}`, { bookmark })
}
