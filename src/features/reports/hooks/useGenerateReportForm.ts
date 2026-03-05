import { UseDataFormProps, useForm } from "@/components"
import { generateReport } from "../services/reportsClient"
import { Report } from "../models/report"

type FormValues = { id: number | string }

interface UseGenerateReportFormProps extends UseDataFormProps<Blob, FormValues> {
    report: Report
}

export const useGenerateReportForm = ({ report, ...config }: UseGenerateReportFormProps) => {
    return useForm<Blob, FormValues>({
        onSubmit: (data) => generateReport(data.id, report.id, report.key),
        ...config
    })
}