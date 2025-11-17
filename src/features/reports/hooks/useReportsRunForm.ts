
import { ReportRunFormFields, reportsRunFormProvider } from "../lib/form";
import { Report } from "../models/report";
import { useMemo } from "react";
import { generateReport } from "../services/reportsClient";
import { useDataClient } from "@/hooks/useDataClient";
import { reportsCacheKey } from "../lib/constants";
import { getReportFetcher, getReportInputType, getReportLabel } from "../lib/contextMap";
import { EntityFormProps, FormProvider, UseEntityFormReturn } from "@/components";

type UseReportsRunFormProps = EntityFormProps<Report, ReportRunFormFields> & {
    report: Report;
}

type UseReportsRunFormReturn = UseEntityFormReturn<Report, ReportRunFormFields, Blob> & {
}

export const useReportsRunForm = ({ report }: UseReportsRunFormProps): UseReportsRunFormReturn => {
    const client = useDataClient();

    const formProvider = useMemo<FormProvider<ReportRunFormFields>>(() => {
        return {
            ...reportsRunFormProvider, fields: [{
                name: "key",
                id: "key",
                floatingLabel: false,
                label: getReportLabel(report.key)!,
                type: getReportInputType(report.key)
            },
            {
                name: "context",
                label: "",
                type: "hidden",
                watchedValues: ["key"],
                changeWhen: async ({ key }, setValue) => {
                    if (!key) return;
                    const response = await client.ensure({
                        key: [...reportsCacheKey, "report-context", key],
                        getData: () => getReportFetcher(report.key)(key!)
                    })
                    setValue("context", response);
                }
            }]
        }
    }, [client, report.key])

    const onSubmit = async (data: ReportRunFormFields) => {
        const response = await generateReport(data);
        return response;
    }

    return {
        onSubmit,
        config: {
            formProvider,
            cacheKeysToInvalidate: [],
            defaultValues: { id: report.id },
            tagsToInvalidate: [],
            resetValues: false
        },
    }
}