import { DefaultFormValues, UseDataFormProps, useForm } from "@/components"
import { Report } from "../models/report"
import { reportFormSchema, ReportFormValues } from "../lib/schemas/reportFormSchema"
import { createReport, updateReport } from "../services/reportsClient"
import { reporstQueryKey } from "../lib/query-keys"

interface UseReportFormProps extends UseDataFormProps<Report, ReportFormValues> {
    reportId?: Report["id"];
    reportKey: Report["key"]
    defaultValues: DefaultFormValues<ReportFormValues>
}

export const useReportForm = ({ defaultValues, reportKey, reportId, ...config }: UseReportFormProps) => {
    return useForm({
        schema: reportFormSchema,
        defaultValues,
        onSubmit: (body) => createReport(body, reportKey),
        onEdit: (body) => updateReport(reportId!, body, reportKey),
        keysToInvalidate: [[reporstQueryKey, reportKey]],
        ...config
    })
}