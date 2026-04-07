import { FieldValues, UseDataFormProps, useForm } from "@/components"
import { Report } from "../models/report";
import { generateReport } from "../services/reportsClient";
import { fileFromUrl } from "@/lib/utils";

interface UseReportGenerationFormValuesProps extends UseDataFormProps<Blob, ReportGenerationFormValues> {
    report?: Report
    reportKey: Report["key"]
}

export interface ReportGenerationFormValues extends FieldValues {
    file?: Array<File>;
    id?: number | string;
}

export const useReportGenerationForm = ({ report, reportKey, initialValues, ...config }: UseReportGenerationFormValuesProps) => {
    return useForm<Blob, ReportGenerationFormValues, Blob>({
        onSubmit: (body) => generateReport(body, reportKey),
        onEdit: async (body) => {
            const files = await Promise.all(report!.documents.map(d => fileFromUrl(d.url)))
            return await generateReport({ id: body.id, file: files }, reportKey)
        },
        shouldEdit: !!report,
        shouldUseNativeValidation: true,
        defaultValues: { key: 'loan', url: [], file: [], ...initialValues },
        ...config
    })
}