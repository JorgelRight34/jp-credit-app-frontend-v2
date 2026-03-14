import api from "@/lib/services/api";
import { Report } from "../models/report";
import { PagedResponse } from "@/models";
import { ReportQuery } from "../models/reportQuery";
import { ReportFormValues } from "../lib/schemas/reportFormSchema";
import { FileStorageService } from "@/lib/services";
import { loanTemplateDefinition } from "../lib/templates/loan-template-definition";
import { templateMapper } from "../lib/templates/report-templates-map";
import { collateralTemplateDefinition } from "../lib/templates/collateral-template-definition";
import { ReportGenerationFormValues } from "../lib/schemas/reportGenerationFormSchema";
import { LoanReportModel } from "../models/loanReportModel";
import { CollateralReportModel } from "../models/collateralReportModel";

const baseUrl = "reports"

export const getReports = async (params: ReportQuery): Promise<PagedResponse<Report>> => {
    const { data } = await api.get(baseUrl, { params });
    return data;
}

export const createReport = async (body: ReportFormValues): Promise<Report> => {
    const { data } = await api.post(baseUrl, body);
    return data;
}

export const updateReport = async (id: Report["id"], body: ReportFormValues) => {
    await api.patch(`${baseUrl}/${id}`, body)
}

export const uploadReportFiles = async (id: Report["id"], files: Array<File>) => {
    return FileStorageService.upload(files, { reportId: id })
}

export const deleteReportFiles = async (ids: Array<number>) => {
    await FileStorageService.delete(ids);
}

export const getReport = async (id: Report["id"]): Promise<Report> => {
    const { data } = await api.get(`${baseUrl}/${id}`);
    return data;
}

export const getLoanReportModel = async (id: number): Promise<LoanReportModel> => {
    const { data } = await api.get(`${baseUrl}/loans/${id}/report-data`);
    return data;
}

export const getCollateralReportModel = async (id: number): Promise<CollateralReportModel> => {
    const { data } = await api.get(`${baseUrl}/collaterals/${id}/report-data`);
    return data;
}

export const generateReport = async ({ id, key, file }: ReportGenerationFormValues): Promise<Blob> => {
    let context = null;

    switch (key) {
        case "loan":
            const loan = await getLoanReportModel(id as number)
            context = templateMapper(loan, loanTemplateDefinition)
            break;
        case "collateral":
            const colateral = await getCollateralReportModel(id as number);
            context = templateMapper(colateral, collateralTemplateDefinition)
            break;
    }

    const formData = new FormData();
    formData.append("Context", JSON.stringify(context));

    for (const f of file) {
        formData.append("File", f)
    }

    const { data } = await api.post(`${baseUrl}/generate`, formData, {
        responseType: "blob"
    });

    return data;
}