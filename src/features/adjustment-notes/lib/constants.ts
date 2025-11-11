import { CacheKey } from "@/models";
import { AdjusmentNoteType } from "../models/adjusment-note-type";

export const adjustmentNoteCacheKey: CacheKey = ["adjustment-notes"]

export const adjustmentNoteTypes: Record<AdjusmentNoteType, AdjusmentNoteType> = {
    NC: "NC",
    ND: "ND",
    nc: "NC",
    nd: "ND"
}