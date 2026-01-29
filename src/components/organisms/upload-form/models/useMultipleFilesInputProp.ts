import { Dispatch, SetStateAction } from "react";
import { FileUploads } from "../hooks/useUploadFilesInput";
import { FileFormFieldValues } from "../lib/form";
import { FileModel } from "@/models/fileModel";

export interface UseMultipleFilesInputProps {
    filesMaxLength?: number;
    value: FileUploads;
    onChange: Dispatch<SetStateAction<FileUploads>>;
}

export interface UseUploadFilesInputReturn {
    upload: {
        uploaded: File[];
        loaded: FileModel[];
        created: FileFormFieldValues[];
        handleOnFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };
    remove: {
        removedFiles: File[];
        deleted: FileModel[];
        removedCreations: FileFormFieldValues[],
        removeFile: (index: number, key: keyof FileUploads) => void;
        recoverFile: (index: number, key: keyof FileUploads) => void;
    };
    isDirty: boolean;
    reachedLimit: boolean;
    onChange: Dispatch<SetStateAction<FileUploads>>;
}
