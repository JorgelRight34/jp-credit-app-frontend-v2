import { DefaultFormValues, UseDataFormProps, useForm } from "@/components"
import { Report } from "../models/report"
import { reportFormSchema, ReportFormValues } from "../lib/schemas/reportFormSchema"
import { reporstQueryKey } from "../lib/query-keys"
import { CreateReportHandler, EditReportHandler } from "../models/handlers";

interface UseReportFormProps extends UseDataFormProps<Report, ReportFormValues> {
    reportId?: Report["id"];
    defaultValues: DefaultFormValues<ReportFormValues>;
    onSubmit?: CreateReportHandler;
    onEdit?: EditReportHandler;
}

export const useReportForm = ({
    onSubmit = () => { throw new Error("Not implemented") },
    onEdit,
    reportId,
    ...config
}: UseReportFormProps) => {
    return useForm({
        schema: reportFormSchema,
        onSubmit,
        onEdit: (body) => onEdit!(reportId!, body),
        keysToInvalidate: [[reporstQueryKey]],
        ...config
    })
}