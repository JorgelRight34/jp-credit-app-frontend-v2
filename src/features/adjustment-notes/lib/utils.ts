import { AdjusmentNoteType } from "../models/adjusment-note-type";

export const getAdjusmentNoteTypeSpanishLabel = (type: AdjusmentNoteType) => {
    if (type === "NC" || type === "nc") return "crédito"

    return "dédito"
}