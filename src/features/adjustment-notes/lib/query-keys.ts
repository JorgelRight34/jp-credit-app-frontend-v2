import { AdjustmentNote } from "../models/adjustmentNote"

export const adjustmentNoteQueryKey = "adjusment-notes"

export const buildAdjustmentNoteQueryKey = (id: AdjustmentNote["id"]) => [adjustmentNoteQueryKey, id]