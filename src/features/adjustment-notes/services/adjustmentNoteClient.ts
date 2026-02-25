import { Query } from "@/components"
import { PagedResponse } from "@/models"
import { AdjustmentNote } from "../models/adjustmentNote"
import api from "@/lib/services/api"
import { AdjustmentNoteFormValues } from "../lib/schemas/adjustmentNoteFormSchema"

const baseUrl = "adjustment-notes"

export const getAdjustmentNotes = async (params: Query): Promise<PagedResponse<AdjustmentNote>> => {
    const { data } = await api.get(baseUrl, { params });
    return data;
}

export const getAdjustmentNote = async (id: AdjustmentNote["id"]): Promise<AdjustmentNote> => {
    const { data } = await api.get(baseUrl + "/" + id);
    return data;
}

export const createAdjustmentNote = async (body: AdjustmentNoteFormValues): Promise<AdjustmentNote> => {
    const { data } = await api.post(baseUrl, body);
    return data;
}

export const deleteAdjustmentNote = async (id: AdjustmentNote["id"]) => {
    await api.delete(baseUrl + "/" + id);
}