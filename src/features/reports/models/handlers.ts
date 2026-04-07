import { ReportGenerationFormValues } from "../hooks/useReportGenerationForm";
import { ReportFormValues } from "../lib/schemas/reportFormSchema";
import { Report } from "./report";

export type CreateReportHandler = (data: ReportFormValues) => Promise<Report>;
export type EditReportHandler = (id: Report["id"], data: ReportFormValues) => Promise<void>;
export type GenerateReportHandler = (data: ReportGenerationFormValues) => Promise<Blob>;