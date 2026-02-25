import { Query } from "@/components";
import { AdjustmentNoteType } from "./adjustmentNoteType";

export interface AdjustmentNoteQuery extends Query {
    type?: AdjustmentNoteType;
    description?: string;
    amount?: number;
    minAmount?: number;
    maxAmount?: number;
    startDate?: string;
    endDate?: string
}