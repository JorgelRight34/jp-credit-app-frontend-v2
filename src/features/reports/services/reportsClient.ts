import api from "@/lib/services/api";
import { Report } from "../models/report";
import { PagedResponse } from "@/models";
import { ReportQuery } from "../models/reportQuery";
import { ReportFormValues } from "../lib/schemas/reportFormSchema";
import { FileStorageApiService } from "@/lib/services";
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
        const { data } = await api.get(`${prefix}/reports/subkeys/${subkey}`);
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

const createDeleteReportHandler = (prefix: string) =>
    async (id: Report["id"]) => { await api.delete(`${prefix}/reports/${id}`) };

const createUploadReportFilesHandler = (prefix: string) =>
    async (id: Report["id"], files: Array<File>) => {
        await FileStorageApiService.upload(files, `${prefix}/reports/${id}/files`);
    };

const createDeleteReportFilesHandler = (prefix: string) =>
    async (id: Report["id"], files: Array<string>) => {
        await FileStorageApiService.delete(files, `${prefix}/reports/${id}/files`);
    };

// ─── Loan ──────────────────────────────────────────────────────────────────────

const loanBaseUrl = "loans";

export const getLoanReports = createGetReportsHandler(loanBaseUrl);
export const getLoanReport = createGetReportHandler(loanBaseUrl);
export const getLoanReportByKey = createGetReportByKeyHandler(loanBaseUrl);
export const createLoanReport = createCreateReportHandler(loanBaseUrl);
export const editLoanReport = createUpdateReportHandler(loanBaseUrl);
export const deleteLoanReport = createDeleteReportHandler(loanBaseUrl);
export const uploadLoanReportFiles = createUploadReportFilesHandler(loanBaseUrl);
export const deleteLoanReportFiles = createDeleteReportFilesHandler(loanBaseUrl);

export const getLoanReportModel = async (id: number): Promise<LoanReportModel> => {
    const { data } = await api.get(`/loans/${baseUrl}/${id}/report-data`);
    return data;
};

export const generateLoanReport = async ({ id, file }: ReportGenerationFormValues): Promise<Blob> => {
    const loan = await getLoanReportModel(id as number);
    const context = mapTemplate(loan, loanTemplateDefinition);
    return postGenerateReport(loanBaseUrl, context, file);
};

// ─── Collateral ────────────────────────────────────────────────────────────────

const collateralsBaseUrl = "collaterals";

export const getCollateralsReport = createGetReportsHandler(collateralsBaseUrl);
export const getCollateralReport = createGetReportHandler(collateralsBaseUrl);
export const getCollateralReportByKey = createGetReportByKeyHandler(collateralsBaseUrl);
export const createCollateralReport = createCreateReportHandler(collateralsBaseUrl);
export const editCollateralReport = createUpdateReportHandler(collateralsBaseUrl);
export const deleteCollateralReport = createDeleteReportHandler(collateralsBaseUrl);
export const uploadCollateralReportFiles = createUploadReportFilesHandler(collateralsBaseUrl);
export const deleteCollateralReportFiles = createDeleteReportFilesHandler(collateralsBaseUrl);

export const getCollateralReportModel = async (id: number): Promise<CollateralReportModel> => {
    const { data } = await api.get(`${baseUrl}/collaterals/${id}/report-data`);
    return data;
};

export const generateCollateralReport = async ({ id, file }: ReportGenerationFormValues): Promise<Blob> => {
    const collateral = await getCollateralReportModel(id as number);
    const context = mapTemplate(collateral, collateralTemplateDefinition);
    return postGenerateReport(collateralsBaseUrl, context, file);
};

// ─── Transaction ───────────────────────────────────────────────────────────────

const transactionsBaseUrl = "transactions";

export const getTransactionReports = createGetReportsHandler(transactionsBaseUrl);
export const getTransactionReport = createGetReportHandler(transactionsBaseUrl);
export const getTransactionReportByKey = createGetReportByKeyHandler(transactionsBaseUrl);
export const createTransactionReport = createCreateReportHandler(transactionsBaseUrl);
export const editTransactionReport = createUpdateReportHandler(transactionsBaseUrl);
export const deleteTransactionReport = createDeleteReportHandler(transactionsBaseUrl);
export const uploadTransactionReportFiles = createUploadReportFilesHandler(transactionsBaseUrl);
export const deleteTransactionReportFiles = createDeleteReportFilesHandler(transactionsBaseUrl);

export const getTransactionReportModel = async (id: number): Promise<TransactionReportModel> => {
    const { data } = await api.get(`transactions/${id}`);
    return data;
};

export const generateTransactionReport = async ({ id, file }: ReportGenerationFormValues): Promise<Blob> => {
    const transaction = await getTransactionReportModel(id as number);
    const context = mapTemplate(transaction, transactionTemplateDefinition);
    return postGenerateReport(transactionsBaseUrl, context, file);
};

// ─── Internal ──────────────────────────────────────────────────────────────────

const postGenerateReport = async (prefix: string, context: unknown, file: ReportGenerationFormValues["file"]): Promise<Blob> => {
    const formData = new FormData();
    formData.append("Context", JSON.stringify(context));

    if (file) {
        for (const f of file) {
            formData.append("File", f);
        }
    }

    const { data } = await api.post(`${prefix}/${baseUrl}/generate`, formData, {
        responseType: "blob",
    });

    return data;
};