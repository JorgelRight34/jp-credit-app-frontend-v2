import type { Dispatch, SetStateAction } from "react";
import type { FileUploads } from "../hooks/useUploadFilesInput";
import type { FileFormFieldValues } from "../lib/form";
import type { FileModel } from "@/models/fileModel";

export interface UseMultipleFilesInputProps {
    filesMaxLength?: number;
    value: FileUploads;
    onChange: Dispatch<SetStateAction<FileUploads>>;
}

export interface UseUploadFilesInputReturn {
    upload: {
        uploaded: Array<File>;
        loaded: Array<FileModel>;
        created: Array<FileFormFieldValues>;
        addFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };
    remove: {
        removedFiles: Array<File>;
        deleted: Array<FileModel>;
        removedCreations: Array<FileFormFieldValues>,
        removeFile: (index: number, key: keyof FileUploads) => void;
        recoverFile: (index: number, key: keyof FileUploads) => void;
    };
    isDirty: boolean;
    reachedLimit: boolean;
    onChange: Dispatch<SetStateAction<FileUploads>>;
}
