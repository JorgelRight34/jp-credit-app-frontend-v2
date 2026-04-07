import api from "@/lib/services/api";
import { Report } from "../models/report";
import { PagedResponse } from "@/models";
import { ReportQuery } from "../models/reportQuery";
import { ReportFormValues } from "../lib/schemas/reportFormSchema";
import { FileStorageService } from "@/lib/services";
import { loanTemplateDefinition } from "../lib/templates/loan-template-definition";
import { templateMapper } from "../lib/templates/report-templates-map";
import { collateralTemplateDefinition } from "../lib/templates/collateral-template-definition";
import { LoanReportModel } from "../models/loanReportModel";
import { CollateralReportModel } from "../models/collateralReportModel";
import { TransactionReportModel } from "../models/transactionReportModel";
import { transactionTemplateDefinition } from "../lib/templates/transaction-template-definition";
import { ReportGenerationFormValues } from "../hooks/useReportGenerationForm";

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
export const updateLoanReport = createUpdateReportHandler("loans");

export const getLoanReportModel = async (id: number): Promise<LoanReportModel> => {
    const { data } = await api.get(`${baseUrl}/loans/${id}/report-data`);
    return data;
};

export const generateLoanReport = async ({ id, file }: ReportGenerationFormValues): Promise<Blob> => {
    const loan = await getLoanReportModel(id as number);
    const context = templateMapper(loan, loanTemplateDefinition);
    return postGenerateReport(context, file);
};

// ─── Collateral ────────────────────────────────────────────────────────────────

export const getCollateralsReport = createGetReportsHandler("collaterals");
export const getCollateralReport = createGetReportHandler("collaterals");
export const createCollateralReport = createCreateReportHandler("collaterals");
export const updateCollateralReport = createUpdateReportHandler("collaterals");

export const getCollateralReportModel = async (id: number): Promise<CollateralReportModel> => {
    const { data } = await api.get(`${baseUrl}/collaterals/${id}/report-data`);
    return data;
};

export const generateCollateralReport = async ({ id, file }: ReportGenerationFormValues): Promise<Blob> => {
    const collateral = await getCollateralReportModel(id as number);
    const context = templateMapper(collateral, collateralTemplateDefinition);
    return postGenerateReport(context, file);
};

// ─── Transaction ───────────────────────────────────────────────────────────────

export const getTransactionReports = createGetReportsHandler("transactions");
export const getTransactionReport = createGetReportHandler("transactions");
export const getTransactionReportByKey = createGetReportByKeyHandler("transactions");
export const createTransactionReport = createCreateReportHandler("transactions");
export const updateTransactionReport = createUpdateReportHandler("transactions");

export const getTransactionReportModel = async (id: number): Promise<TransactionReportModel> => {
    const { data } = await api.get(`transactions/${id}`);
    return data;
};

export const generateTransactionReport = async ({ id, file }: ReportGenerationFormValues): Promise<Blob> => {
    const transaction = await getTransactionReportModel(id as number);
    const context = templateMapper(transaction, transactionTemplateDefinition);
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

type ReportKey = Report["key"];

const reportHandlers: Record<ReportKey, {
    getAll: (params: ReportQuery) => Promise<PagedResponse<Report>>;
    create: (body: ReportFormValues) => Promise<Report>;
    update: (id: Report["id"], body: ReportFormValues) => Promise<void>;
    generate: (form: ReportGenerationFormValues) => Promise<Blob>;
}> = {
    Loan: {
        getAll: getLoanReports,
        create: createLoanReport,
        update: updateLoanReport,
        generate: generateLoanReport,
    },
    Collateral: {
        getAll: getCollateralsReport,
        create: createCollateralReport,
        update: updateCollateralReport,
        generate: generateCollateralReport,
    },
    Transaction: {
        getAll: getTransactionReports,
        create: createTransactionReport,
        update: updateTransactionReport,
        generate: generateTransactionReport,
    },
};

export const getReports = (params: ReportQuery, key: ReportKey) =>
    reportHandlers[key].getAll(params);

export const createReport = (body: ReportFormValues, key: ReportKey) =>
    reportHandlers[key].create(body);

export const updateReport = (id: Report["id"], body: ReportFormValues, key: ReportKey) =>
    reportHandlers[key].update(id, body);

export const generateReport = (form: ReportGenerationFormValues, key: ReportKey) =>
    reportHandlers[key].generate(form);

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