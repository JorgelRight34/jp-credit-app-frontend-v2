import api from "@/lib/services/api"
import { FileFormFieldValues } from "../lib/form";

export const uploadFileTo = async (url: string, data: FormData) => {
    const response = await api.post(url, data)
    return response.data;
}

export const createFile = async (data: FileFormFieldValues) => {
    const response = await api.post("files", data);
    return response.data;
}