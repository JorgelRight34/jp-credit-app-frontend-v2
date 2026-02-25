import { ProfileSummary } from "@/features/profiles";
import { AdjustmentNoteType } from "./adjustmentNoteType";

export interface AdjustmentNote {
    id: number;
    type: AdjustmentNoteType
    client: ProfileSummary
    amount: number;
    description?: string;
    loanId: number;
    date: string;
    isClosed?: boolean;
}