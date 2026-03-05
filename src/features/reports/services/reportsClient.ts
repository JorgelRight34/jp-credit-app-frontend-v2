import api from "@/lib/services/api";
import { Report } from "../models/report";
import { PagedResponse } from "@/models";
import { ReportQuery } from "../models/reportQuery";
import { ReportFormValues } from "../lib/schemas/reportFormSchema";
import { FileStorageService } from "@/lib/services";
import { getLoan } from "@/features/loans";
import { loanTemplateDefinition } from "../lib/templates/loan-template-definition";
import { templateMapper } from "../lib/templates/report-templates-map";
import { getCollateral } from "@/features/collaterals";
import { collateralTemplateDefinition } from "../lib/templates/collateral-template-definition";

const baseUrl = "reports"

export const getReports = async (params: ReportQuery): Promise<PagedResponse<Report>> => {
    const { data } = await api.get(baseUrl, { params });
    return data;
}

export const createReport = async (body: ReportFormValues): Promise<Report> => {
    const { data } = await api.post(baseUrl, body);
    return data;
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

export const generateReport = async (objId: number | string, id: Report["id"], key: Report["key"]): Promise<Blob> => {
    let context = null;

    switch (key) {
        case "loan":
            const loan = await getLoan(objId as number)
            context = templateMapper(loan, loanTemplateDefinition)
            break;
        case "collateral":
            const colateral = await getCollateral(objId as number);
            context = templateMapper(colateral, collateralTemplateDefinition)
            break;
    }

    const { data } = await api.post(`${baseUrl}/generate`, {
        context, id
    }, { responseType: "blob" });

    return data;
}