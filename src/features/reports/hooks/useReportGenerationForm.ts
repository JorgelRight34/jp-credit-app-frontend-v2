import { UseDataFormProps, useForm } from "@/components"
import { Report } from "../models/report";
import { generateReport } from "../services/reportsClient";
import { fileFromUrl } from "@/lib/utils";
import { ReportGenerationFormValues } from "../lib/schemas/reportGenerationFormSchema";

interface UseReportGenerationFormValuesProps extends UseDataFormProps<Blob, ReportGenerationFormValues> {
    report?: Report
}

export const useReportGenerationForm = ({ report, initialValues, ...config }: UseReportGenerationFormValuesProps) => {
    return useForm<Blob, ReportGenerationFormValues, Blob>({
        onSubmit: generateReport,
        onEdit: async (body) => {
            const files = await Promise.all(report!.documents.map(d => fileFromUrl(d.url)))
            return await generateReport({ id: body.id, key: report!.key, file: files, url: [] })
        },
        shouldEdit: !!report,
        shouldUseNativeValidation: true,
        defaultValues: initialValues,
        ...config
    })
}