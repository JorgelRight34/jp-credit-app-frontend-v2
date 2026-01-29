import { fileFormProvider } from "../lib/form";
import { transformCloudDocUrlToDownloadUrlFormInterceptor } from "../lib/utils";
import type { FileFormFieldValues } from "../lib/form";
import type { FileModel } from "@/models/fileModel";

export interface UseFileFormProps {
    onSubmit: (data: FileFormFieldValues) => Promise<FileModel>;
}

export const useFileForm = ({ onSubmit }: UseFileFormProps) => {
    return {
        onSubmit,
        config: {
            formProvider: fileFormProvider,
            cacheKeysToInvalidate: [],
        },
        interceptors: [transformCloudDocUrlToDownloadUrlFormInterceptor]
    }
}