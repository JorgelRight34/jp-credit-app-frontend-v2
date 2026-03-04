import { UseDataFormProps, useForm } from "@/components"
import { Report } from "../models/report"
import { reportFormSchema, ReportFormValues } from "../lib/schemas/reportFormSchema"
import { createReport } from "../services/reportsClient"
import { reporstQueryKey } from "../lib/query-keys"

interface UseReportFormProps extends UseDataFormProps<Report, ReportFormValues> { }

export const useReportForm = ({ initialValues, ...config }: UseReportFormProps) => {
    return useForm({
        schema: reportFormSchema,
        defaultValues: initialValues ?? { title: "", description: "", key: "", bookmark: true },
        onSubmit: createReport,
        keysToInvalidate: [[reporstQueryKey]],
        ...config
    })
}