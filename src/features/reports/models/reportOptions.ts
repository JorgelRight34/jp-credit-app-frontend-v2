

export interface ReportOptions extends Record<string, unknown> {
  initialPage?: number;
  endPage?: number;
  page?: number;
  query?: object,
  format?: "csv" | "pdf" | "docx"
  reportTitle?: string;
}
