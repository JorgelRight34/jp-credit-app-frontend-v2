import { PagedResponse } from "@/models";

export interface ChangeLog {
    id: number;
    userId: number;
    entityId: number;
    entityType: string;
    username: string;
    changes: string;
    date: string;
}

export type ChangeHistory = PagedResponse<ChangeLog>;
