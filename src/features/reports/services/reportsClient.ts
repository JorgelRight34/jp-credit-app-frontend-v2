import api from "@/lib/services/api";
import { Report } from "../models/report";
import { PagedResponse } from "@/models";
import { ReportQuery } from "../models/reportQuery";
import { ReportFormValues } from "../lib/schemas/reportFormSchema";
import { ReportTemplateDefinition } from "../models/reportTemplateDefinition";
import { FileStorageService } from "@/lib/services";

const baseUrl = "reports"

export const getReports = async (params: ReportQuery): Promise<PagedResponse<Report>> => {
    const { data } = await api.get(baseUrl, { params });
    return data;
}

export const createReport = async (body: ReportFormValues): Promise<Report> => {
    const { data } = await api.post(baseUrl, body);
    return data;
}

export const getReportTemplateDefinition = async (key: Report["key"]): Promise<ReportTemplateDefinition> => {
    const { data } = await api.get(baseUrl + "/templates/" + key);
    return data;
}

export const uploadReportFiles = async (id: Report["id"], files: Array<File>) => {
    return FileStorageService.upload(files, { reportId: id })
}

export const deleteReportFiles = async (ids: Array<number>) => {
    await FileStorageService.delete(ids);
}
