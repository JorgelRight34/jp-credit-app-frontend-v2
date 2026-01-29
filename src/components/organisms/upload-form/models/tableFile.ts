import type { FileUploads } from "../hooks/useUploadFilesInput";
import type { FileModel } from "@/models/fileModel";

export type TableFile = FileModel & {
    key: keyof FileUploads;
}