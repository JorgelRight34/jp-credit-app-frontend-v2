import api from "./api";
import type { FileModel } from "@/models/fileModel";

export class FileStorageService {
    static async upload(files: Array<File>, body: object): Promise<Array<FileModel>> {
        const formData = new FormData();

        for (const file of files) {
            formData.append("file", file)
        }

        Object.entries(body).forEach(([key, value]) => {
            if (value === undefined || value === null) return;

            formData.append(key, String(value));
        });

        const { data } = await api.post("files/upload")
        return data;
    }

    static async delete(ids: Array<number>) {
        await Promise.all(ids.map(id => api.delete("files/" + id)))
    }
}