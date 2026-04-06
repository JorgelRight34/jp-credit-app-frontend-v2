import { ChangeLog } from "./changeLog";

export interface ChangeLogQuery extends Partial<ChangeLog> {
    minDate?: string;
    maxDate?: string;
}