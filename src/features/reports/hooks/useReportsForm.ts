import { UseEntityModuleFormProps } from "@/components/EntityForm/models/UseEntityModuleFormProps";
import { ReportFormFields, reportsFormProvider } from "../lib/form";
import { createReport, editReport } from "../services/reportsClient";
import { toastService } from "@/services";
import { UseEntityFormReturn } from "@/models";
import { reportsCacheKey } from "../lib/constants";
import { useMemo } from "react";
import { Report } from "../models/report";

type UseReportsFormProps = UseEntityModuleFormProps<Report, ReportFormFields>;

export const useReportsForm = ({ edit }: UseReportsFormProps): UseEntityFormReturn<Report, ReportFormFields> => {
    const defaultValues = useMemo(() => ({ key: "loan", ...edit }), [edit]);

    const onSubmit = async (data: ReportFormFields) => {
        const response = await createReport(data);

        toastService.success("Reporte creado!");

        return response;
    }

    const onEdit = async (data: ReportFormFields) => {
        await editReport(data, edit!.id);
        return edit!;
    }

    return {
        onSubmit,
        onEdit,
        config: {
            formProvider: reportsFormProvider,
            cacheKeysToInvalidate: [reportsCacheKey],
            defaultValues,
            resetValues: !!edit
        }
    }
}