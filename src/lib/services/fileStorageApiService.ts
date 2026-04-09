import axios from "axios";
import api from "./api";


export interface FileOperationResult {
    publicId: string;
    success: boolean;
    errorMessage?: string;
}

export class FileStorageApiService {
    static async upload(files: Array<File>, endpoint: string): Promise<Array<FileOperationResult>> {
        const formData = new FormData();

        for (const file of files) {
            formData.append("files", file);
        }

        const { data, headers } = await api.post(endpoint, formData);
        this.validateFileOperationResults(data, headers);

        return data;
    }

    static async delete(ids: Array<string>, endpoint: string): Promise<Array<FileOperationResult>> {
        const { data, headers } = await api.delete<Array<FileOperationResult>>(endpoint, { data: ids });
        this.validateFileOperationResults(data, headers);

        return data;
    }

    static validateFileOperationResults(data: Array<FileOperationResult>, headers: object) {
        if (data.some((r) => !r.success)) {
            const failed = data.filter(r => !r.success)
            throw new axios.AxiosError("Algunos archivos no se pudieron eliminar", undefined, undefined, undefined,
                {
                    data: {
                        errors: Object.fromEntries(failed.map(error => [error.publicId, error.errorMessage])),
                    },
                    status: 500,
                    statusText: "Internal Server Error",
                    headers,
                    config: { headers: headers as any }
                }
            )
        }

    }
}
