import type { FileUploads } from "../../upload-form";
import type { FileModel } from "@/models/fileModel";

export type TableFile = FileModel & {
    key: keyof FileUploads;
}