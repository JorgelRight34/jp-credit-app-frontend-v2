import api from "@/lib/services/api";
import { Report } from "../models/report";
import { PagedResponse } from "@/models";
import { ReportQuery } from "../models/reportQuery";
import { ReportFormValues } from "../lib/schemas/reportFormSchema";
import { FileStorageService } from "@/lib/services";
import { loanTemplateDefinition } from "../lib/templates/loan-template-definition";
import { collateralTemplateDefinition } from "../lib/templates/collateral-template-definition";
import { LoanReportModel } from "../models/loanReportModel";
import { CollateralReportModel } from "../models/collateralReportModel";
import { TransactionReportModel } from "../models/transactionReportModel";
import { transactionTemplateDefinition } from "../lib/templates/transaction-template-definition";
import { ReportGenerationFormValues } from "../hooks/useReportGenerationForm";
import { mapTemplate } from "../lib/templates/map-template";

const baseUrl = "reports";

// ─── Factory Helpers ───────────────────────────────────────────────────────────

const createGetReportsHandler = (prefix: string) =>
    async (params: ReportQuery): Promise<PagedResponse<Report>> => {
        const { data } = await api.get(`${prefix}/reports`, { params });
        return data;
    };

const createGetReportHandler = (prefix: string) =>
    async (id: Report["id"]): Promise<Report> => {
        const { data } = await api.get(`${prefix}/reports/${id}`);
        return data;
    };

const createGetReportByKeyHandler = (prefix: string) =>
    async (subkey: string): Promise<Report> => {
        const { data } = await api.get(`${prefix}/subkeys/${subkey}`);
        return data;
    };

const createCreateReportHandler = (prefix: string) =>
    async (body: ReportFormValues): Promise<Report> => {
        const { data } = await api.post(`${prefix}/reports`, body);
        return data;
    };

const createUpdateReportHandler = (prefix: string) =>
    async (id: Report["id"], body: ReportFormValues): Promise<void> => {
        await api.patch(`${prefix}/reports/${id}`, body);
    };

// ─── Loan ──────────────────────────────────────────────────────────────────────

export const getLoanReports = createGetReportsHandler("loans");
export const getLoanReport = createGetReportHandler("loans");
export const createLoanReport = createCreateReportHandler("loans");
export const editLoanReport = createUpdateReportHandler("loans");

export const getLoanReportModel = async (id: number): Promise<LoanReportModel> => {
    const { data } = await api.get(`${baseUrl}/loans/${id}/report-data`);
    return data;
};

export const generateLoanReport = async ({ id, file }: ReportGenerationFormValues): Promise<Blob> => {
    const loan = await getLoanReportModel(id as number);
    const context = mapTemplate(loan, loanTemplateDefinition);
    return postGenerateReport(context, file);
};

// ─── Collateral ────────────────────────────────────────────────────────────────

export const getCollateralsReport = createGetReportsHandler("collaterals");
export const getCollateralReport = createGetReportHandler("collaterals");
export const createCollateralReport = createCreateReportHandler("collaterals");
export const editCollateralReport = createUpdateReportHandler("collaterals");

export const getCollateralReportModel = async (id: number): Promise<CollateralReportModel> => {
    const { data } = await api.get(`${baseUrl}/collaterals/${id}/report-data`);
    return data;
};

export const generateCollateralReport = async ({ id, file }: ReportGenerationFormValues): Promise<Blob> => {
    const collateral = await getCollateralReportModel(id as number);
    const context = mapTemplate(collateral, collateralTemplateDefinition);
    return postGenerateReport(context, file);
};

// ─── Transaction ───────────────────────────────────────────────────────────────

export const getTransactionReports = createGetReportsHandler("transactions");
export const getTransactionReport = createGetReportHandler("transactions");
export const getTransactionReportByKey = createGetReportByKeyHandler("transactions");
export const createTransactionReport = createCreateReportHandler("transactions");
export const editTransactionReport = createUpdateReportHandler("transactions");

export const getTransactionReportModel = async (id: number): Promise<TransactionReportModel> => {
    const { data } = await api.get(`transactions/${id}`);
    return data;
};

export const generateTransactionReport = async ({ id, file }: ReportGenerationFormValues): Promise<Blob> => {
    const transaction = await getTransactionReportModel(id as number);
    const context = mapTemplate(transaction, transactionTemplateDefinition);
    return postGenerateReport(context, file);
};

// ─── Files ─────────────────────────────────────────────────────────────────────

export const uploadReportFiles = async (id: Report["id"], files: Array<File>) => {
    return FileStorageService.upload(files, { reportId: id });
};

export const deleteReportFiles = async (ids: Array<number>) => {
    await FileStorageService.delete(ids);
};

// ─── Generic dispatchers (use only when key is not known at call site) ─────────

// ─── Internal ──────────────────────────────────────────────────────────────────

const postGenerateReport = async (context: unknown, file: ReportGenerationFormValues["file"]): Promise<Blob> => {
    const formData = new FormData();
    formData.append("Context", JSON.stringify(context));

    if (file) {
        for (const f of file) {
            formData.append("File", f);
        }
    }

    const { data } = await api.post(`${baseUrl}/generate`, formData, {
        responseType: "blob",
    });

    return data;
};