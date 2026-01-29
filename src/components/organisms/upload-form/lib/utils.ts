import { FileModel } from "@/models/fileModel";
import { DatatableFile } from "../models/datatableFile";
import { FileFormFieldValues } from "./form";
import { FormInterceptor } from "../../../../../bk/form-builder";

export const mapApiFileToDatatableFile = (file: FileModel): DatatableFile => {
    return (
        {
            id: file.id,
            url: file.url,
            name: file.name,
            createdAt: file.createdAt,
            lastModified: file.lastModified,
            fileType: file.fileType,
            key: "loaded"
        }
    )
}

export const mapFileToDatatableFile = (file: File): DatatableFile => {
    return (
        {
            id: 0,
            url: URL.createObjectURL(file),
            name: file.name,
            createdAt: new Date(file.lastModified),
            lastModified: new Date(file.lastModified),
            fileType: file.type,
            key: "uploaded"
        }
    )
}

export const mapFileFormFieldValuesToDatatableFile = (file: FileFormFieldValues): DatatableFile => {
    return {
        url: file.url,
        name: file.name,
        fileType: "N/D",
        id: 0,
        createdAt: "---",
        lastModified: "---",
        key: "created"
    }
}

export const transformCloudDocUrlToDownloadUrlFormInterceptor:
    FormInterceptor<FileFormFieldValues> = (data) => {
        const match = new URL(data.url)
        const host = match.host;

        // CONVERSION LOGIC
        data.downloadUrl = host;

        return data
    }
