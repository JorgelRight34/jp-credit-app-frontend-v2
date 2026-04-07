import { FieldValues, UseDataFormProps, useForm } from "@/components"
import { Report } from "../models/report";
import { fileFromUrl } from "@/lib/utils";
import { GenerateReportHandler } from "../models/handlers";

interface UseReportGenerationFormValuesProps extends UseDataFormProps<Blob, ReportGenerationFormValues> {
    report?: Report
    onSubmit: GenerateReportHandler;
}

export interface ReportGenerationFormValues extends FieldValues {
    file?: Array<File>;
    id?: number | string;
}

export const useReportGenerationForm = ({ onSubmit, report, initialValues, ...config }: UseReportGenerationFormValuesProps) => {
    return useForm<Blob, ReportGenerationFormValues, Blob>({
        onSubmit,
        onEdit: async (body) => {
            const files = await Promise.all(report!.documents.map(d => fileFromUrl(d.url)))
            return await onSubmit?.({ id: body.id, file: files })
        },
        shouldEdit: !!report,
        shouldUseNativeValidation: true,
        defaultValues: { key: 'loan', url: [], file: [], ...initialValues },
        ...config
    })
}