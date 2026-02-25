import { AdjustmentNote } from "../models/adjustmentNote";

export const buildAdjustmentNoteLabel = (note: AdjustmentNote) => `${note.type.toUpperCase()}-${note.id}`