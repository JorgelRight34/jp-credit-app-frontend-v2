import { ReportGenerationFormValues } from "../hooks/useReportGenerationForm";
import { ReportFormValues } from "../lib/schemas/reportFormSchema";
import { Report } from "./report";

export type CreateReportHandler = (data: ReportFormValues) => Promise<Report>;
export type EditReportHandler = (id: Report["id"], data: ReportFormValues) => Promise<void>;
export type GenerateReportHandler = (data: ReportGenerationFormValues) => Promise<Blob>;
export type UploadFilesHandler = (id: Report["id"], files: Array<File>) => Promise<void>
export type DeleteFilesHandler = (id: Report["id"], publicId: Array<string>) => Promise<void>;