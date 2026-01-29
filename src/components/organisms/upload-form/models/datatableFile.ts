import { FileModel } from "@/models/fileModel";
import { FileUploads } from "../hooks/useUploadFilesInput";

export type DatatableFile = FileModel & {
    key: keyof FileUploads;
}