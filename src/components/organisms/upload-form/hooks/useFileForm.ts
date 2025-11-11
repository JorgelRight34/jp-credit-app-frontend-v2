import { ApiFile, UseEntityFormReturn } from "@/models";
import { FileFormFieldValues, fileFormProvider } from "../lib/form";
import { transformCloudDocUrlToDownloadUrlFormInterceptor } from "../lib/utils";

export interface UseFileFormProps {
    onSubmit: (data: FileFormFieldValues) => Promise<ApiFile>;
}

export const useFileForm = ({ onSubmit }: UseFileFormProps): UseEntityFormReturn<ApiFile, FileFormFieldValues> => {
    return {
        onSubmit,
        config: {
            formProvider: fileFormProvider,
            cacheKeysToInvalidate: [],
        },
        interceptors: [transformCloudDocUrlToDownloadUrlFormInterceptor]
    }
}