import { FieldValues, UseDataFormProps, useForm } from "@/components"
import { Report } from "../models/report";
import { generateReport } from "../services/reportsClient";
import { fileFromUrl } from "@/lib/utils";

interface UseReportGenerationFormValuesProps extends UseDataFormProps<Blob, ReportGenerationFormValues> {
    report?: Report
}

export interface ReportGenerationFormValues extends FieldValues {
    file?: Array<File>;
    id?: number | string;
    key?: string;
}

export const useReportGenerationForm = ({ report, initialValues, ...config }: UseReportGenerationFormValuesProps) => {
    return useForm<Blob, ReportGenerationFormValues, Blob>({
        onSubmit: generateReport,
        onEdit: async (body) => {
            const files = await Promise.all(report!.documents.map(d => fileFromUrl(d.url)))
            return await generateReport({ id: body.id, key: report!.key, file: files })
        },
        shouldEdit: !!report,
        shouldUseNativeValidation: true,
        defaultValues: { key: 'loan', url: [], file: [], ...initialValues },
        ...config
    })
}