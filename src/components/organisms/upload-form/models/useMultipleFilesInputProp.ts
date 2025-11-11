import { Dispatch, SetStateAction } from "react";
import { FileUploads } from "../hooks/useUploadFilesInput";
import { FileFormFieldValues } from "../lib/form";
import { ApiFile } from "@/models";

export interface UseMultipleFilesInputProps {
    filesMaxLength?: number;
    value: FileUploads;
    onChange: Dispatch<SetStateAction<FileUploads>>;
}

export interface UseUploadFilesInputReturn {
    upload: {
        uploaded: File[];
        loaded: ApiFile[];
        created: FileFormFieldValues[];
        handleOnFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };
    remove: {
        removeFile: (index: number, key: keyof FileUploads) => void;
        removedFiles: File[];
        deleted: ApiFile[];
        removedCreations: FileFormFieldValues[],
        recoverFile: (index: number, key: keyof FileUploads) => void;
    };
    isDirty: boolean;
    reachedLimit: boolean;
    onChange: Dispatch<SetStateAction<FileUploads>>;
}
