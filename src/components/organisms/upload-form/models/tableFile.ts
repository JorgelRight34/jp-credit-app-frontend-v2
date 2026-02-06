import type { FileUploads } from "../hooks/useFileAttachments";
import type { FileModel } from "@/models/fileModel";

export type TableFile = FileModel & {
    key: keyof FileUploads;
}