import { UseDataFormProps, useForm } from "@/components"
import { BackgroundServiceConfigurationFormValues, backgroundServiceConfigurationsSchema } from "../lib/schemas/backgroundServiceConfigurationSchema";
import { PropsWithBackgroundService } from "../models/backgroundService";
import { updateBackgroundServiceConfiguration } from "../services/backgroundServiceClient";
import { toInputDate } from "@/lib/utils";
import { backgroundServiceQueryKey } from "../lib/config/query-keys";

interface UseBackgroundServiceConfigurationForm extends PropsWithBackgroundService<UseDataFormProps<void, BackgroundServiceConfigurationFormValues>> { }

export const useBackgroundServiceForm = ({ worker, ...config }: UseBackgroundServiceConfigurationForm) => {
    return useForm({
        schema: backgroundServiceConfigurationsSchema,
        defaultValues: {
            configurations: worker.configurations.map(c => ({
                id: c.id,
                dayDifference: c.dayDifference,
                startTime: c.startTime,
                startDate: toInputDate(c.startDate),
            }
            ))
        },
        onSubmit: (body) => updateBackgroundServiceConfiguration(worker.id, body),
        resetValues: true,
        keysToInvalidate: [[backgroundServiceQueryKey]],
        ...config
    });
}