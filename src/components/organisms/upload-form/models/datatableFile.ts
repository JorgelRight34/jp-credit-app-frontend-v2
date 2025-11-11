import { ApiFile } from "@/models";
import { FileUploads } from "../hooks/useUploadFilesInput";

export type DatatableFile = ApiFile & {
    key: keyof FileUploads;
}