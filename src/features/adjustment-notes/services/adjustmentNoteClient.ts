import { PagedResponse } from "@/models"
import { AdjustmentNote } from "../models/adjusment-note"
import { fetchEntity, fetchWithQueryParams } from "@/lib/utils/utils"
import { Query } from "@/models/query"
import { PermissionsProvider } from "@/models/permissionsProvider"
import { adjustmentNoteCacheKey, adjustmentNoteTag } from "../lib/constants"
import { getModulePermissions } from "@/features/auth"
import { PERMISSIONS_ENDPOINT_SUFFIX } from "@/lib/utils/constants"
import { AdjustmentNoteFormValues } from "../lib/form"
import api from "@/lib/services/api"

const baseUrl = "adjustment-notes"

export const getNotes = async (query: Query): Promise<PagedResponse<AdjustmentNote>> => {
    return await fetchWithQueryParams(baseUrl, query);
}

export const getNote = async (id: number): Promise<AdjustmentNote> => {
    return await fetchEntity(`${baseUrl}/${id}`, [adjustmentNoteTag, id.toString()])
}

export const createNote = async (data: AdjustmentNoteFormValues) => {
    const response = await api.post(baseUrl, data);
    return response.data;
}

export const deleteNote = async (id: number) => {
    await api.delete(baseUrl + "/" + id);
}

const getNotesModulePermissions = async () => {
    return await getModulePermissions(baseUrl + "/" + PERMISSIONS_ENDPOINT_SUFFIX)
}

export const adjustmenNotesPermissionsProvider: PermissionsProvider = {
    cacheKey: adjustmentNoteCacheKey,
    getPermissions: getNotesModulePermissions
}

export const adjustmentNoteClient = {
    getNote,
    getNotes,
    createNote,
}