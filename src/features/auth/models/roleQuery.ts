import type { Query } from "@/components";

export interface RoleQuery extends Query {
    id?: number;
    name?: string;
}