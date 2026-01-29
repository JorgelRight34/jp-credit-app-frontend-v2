import { FileModel } from "@/models/fileModel";
import { UseEntityFormReturn } from "../../../../../bk/form-builder";
import { FileFormFieldValues, fileFormProvider } from "../lib/form";
import { transformCloudDocUrlToDownloadUrlFormInterceptor } from "../lib/utils";

export interface UseFileFormProps {
    onSubmit: (data: FileFormFieldValues) => Promise<FileModel>;
}

export const useFileForm = ({ onSubmit }: UseFileFormProps): UseEntityFormReturn<FileModel, FileFormFieldValues> => {
    return {
        onSubmit,
        config: {
            formProvider: fileFormProvider,
            cacheKeysToInvalidate: [],
        },
        interceptors: [transformCloudDocUrlToDownloadUrlFormInterceptor]
    }
}