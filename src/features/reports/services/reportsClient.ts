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
import { ReportGenerationFormValues } from "../lib/schemas/reportGenerationFormSchema";

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

export const generateReport = async ({ id, key, file }: ReportGenerationFormValues): Promise<Blob> => {
    let context = null;

    switch (key) {
        case "loan":
            const loan = await getLoan(id as number)
            context = templateMapper(loan, loanTemplateDefinition)
            break;
        case "collateral":
            const colateral = await getCollateral(id as number);
            context = templateMapper(colateral, collateralTemplateDefinition)
            break;
    }

    const formData = new FormData();
    formData.append("Context", JSON.stringify(context));

    console.log(file)

    for (const f of file) {
        formData.append("File", f)
    }

    console.log(formData)

    const { data } = await api.post(`${baseUrl}/generate`, formData, {
        responseType: "blob"
    });

    return data;
}