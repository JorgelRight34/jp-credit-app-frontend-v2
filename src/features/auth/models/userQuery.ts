import type { Query } from "@/components";

export interface UserQuery extends Query {
    username?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    email?: string;
}