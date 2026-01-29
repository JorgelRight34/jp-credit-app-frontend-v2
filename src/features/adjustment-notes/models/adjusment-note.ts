import { AdjusmentNoteType } from "./adjusment-note-type";

export interface AdjustmentNote {
    id: number;
    amount: number;
    date: string | Date;
    loanId: number;
    type: AdjusmentNoteType;
}