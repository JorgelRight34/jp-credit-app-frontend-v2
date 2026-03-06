import { UseDataFormProps, useForm } from "@/components"
import { Report } from "../models/report"
import { reportFormSchema, ReportFormValues } from "../lib/schemas/reportFormSchema"
import { createReport, updateReport } from "../services/reportsClient"
import { reporstQueryKey } from "../lib/query-keys"

interface UseReportFormProps extends UseDataFormProps<Report, ReportFormValues> {
    reportId?: Report["id"]
}

export const useReportForm = ({ initialValues, reportId, ...config }: UseReportFormProps) => {
    return useForm({
        schema: reportFormSchema,
        defaultValues: initialValues,
        onSubmit: createReport,
        onEdit: (body) => updateReport(reportId!, body),
        keysToInvalidate: [[reporstQueryKey]],
        ...config
    })
}