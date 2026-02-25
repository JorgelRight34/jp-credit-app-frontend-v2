import { serverClient } from "@/lib/services/serverClient";
import { AdjustmentNote } from "../models/adjustmentNote";

export const getAdjustmentNoteFromServer = async (id: AdjustmentNote["id"]): Promise<AdjustmentNote> => {
    return await serverClient.get("adjustment-notes/" + id);
}