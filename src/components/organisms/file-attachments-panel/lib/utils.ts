import type { FileFormFieldValues } from "../../upload-form/lib/form";
import type { TableFile } from "../models/tableFile";
import type { FileModel } from "@/models/fileModel";

export const mapApiFileToTableFile = (file: FileModel): TableFile => {
    return {
        id: file.id,
        url: file.url,
        name: file.name,
        createdAt: file.createdAt,
        lastModified: file.lastModified,
        fileType: file.fileType,
        key: "existing",
    };
};

export const mapFileToTableFile = (file: File): TableFile => {
    return {
        id: 0,
        url: URL.createObjectURL(file),
        name: file.name,
        createdAt: new Date(file.lastModified),
        lastModified: new Date(file.lastModified),
        fileType: file.type.split("/")[1],
        key: "pending",
    };
};

export const mapFileFormFieldValuesToTableFile = (
    file: FileFormFieldValues,
): TableFile => {
    return {
        id: 0,
        url: file.url,
        name: file.name,
        fileType: "N/D",
        createdAt: "---",
        lastModified: "---",
        key: "existing",
    };
};
